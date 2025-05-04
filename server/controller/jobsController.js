const pool = require('../src/db');

exports.getAllJobs = async ( req, res ) => {
    try {
        const userId = req.user.id;
        const [ jobs ] = await pool.query(
            'SELECT * FROM jobs WHERE user_id = ?', [userId]
        )

        res.json(jobs);

    } catch (err) {
        console.error('Erorr fetcing the data', err);
        res.status(500).json({message:'Error fetching the data', err: err.message});
    }
}

exports.addJob = async ( req, res ) => {

    const newFields = req.body;
    const userId = req.user.id;
    
    const allowedFields = ['company_name','job_title','application_date','job_link','notes']
    const queryParts = [];
    const queryValues = [];

    for (const field in newFields) {
        if (allowedFields.includes(field)) {
            queryParts.push(field);
            queryValues.push(newFields[field]);
        };
    }

    queryParts.push("user_id");
    queryValues.push(userId);

    const placeholders = queryParts.map(() => '?').join(', ');
    const sql = `INSERT INTO jobs (${queryParts.join(', ')}) VALUES (${placeholders})`;

    try {
        const [ result ] = await pool.query(sql, queryValues);

        if (result.affectedRows === 0) {
            return res.status(400).json({message: 'Failed to add the job application.'})
        }
        
        const newJobId = result.insertId;
        const [ newJobRows ] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?',[newJobId]
        );
        res.status(201).json(newJobRows[0]);

    } catch (err) {
        console.error('Erorr adding the data', err);
        res.status(500).json({message:'Error adding the data', err: err.message})
        
    }
}

exports.updateJob = async ( req, res ) => {

    const { id } = req.params;
    const userId = req.user.id;
    const updatedFields = req.body;

    const allowedFields = 
    ['company_name', 'job_title', 'status', 'priority', 'application_date', 'job_link', 'notes']

    const queryParts = [];
    const queryValues = [];

    for ( const field in updatedFields) {
        if (allowedFields.includes(field)) {
            queryParts.push(`${field} = ?`);
            queryValues.push(updatedFields[field]);
        } else {
            console.warn(`Ignoring unknown field in update request body: ${field}`);
        }
    }

    if (queryParts.length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update (e.g., task, is_completed).' });
    }

    queryValues.push(id, userId);

    const sql = `
        UPDATE jobs 
        SET ${queryParts.join(', ')}
        WHERE id = ? AND user_id = ?
    `

    try {

        const [ result ] = await pool.query(sql, queryValues);
        if (result.affectedRows === 0) {
            res.status(404).json({message:`Application with ${id} not found.` })
        }

        const [ updatedJobRows ] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?', [id]
        )
        res.json(updatedJobRows[0])

    } catch (err) {
        console.error(`Error updating application with id ${id}:`, err);
        res.status(500).json({
            message: `Error updating applciation with id ${id}`,
            error: err.message
        });
    }
}

exports.deleteJob = async ( req, res ) => {

    const { id } = req.params;
    const userId = req.user.id;

    try {
        
        const [ result ] = await pool.query(
            'DELETE FROM jobs WHERE id = ? AND user_id = ?' , 
            [id, userId]
        )
        
        if (result.affectedRows === 0) {
            return res.status(404).json({message:` Application with id:${id} not found.`});
        }

        res.json({ message: `Job deleted successfully.` });

    } catch (err) {
        console.error(`Error deleting application with id ${id}:`, err);
        res.status(500).json({
            message: `Error deleting applciation with id ${id}`,
            error: err.message
        });
    }
}