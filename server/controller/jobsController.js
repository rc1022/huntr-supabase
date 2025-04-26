const pool = require('../src/db');

exports.getAllJobs = async ( req, res ) => {
    try {
        const [ rows ] = await pool.query(
            'SELECT * FROM jobs'
        )

        res.json(rows);

        console.log(rows);

    } catch (err) {
        console.error('Erorr fetcing the data', err);
        res.status(500).json({message:'Error fetching the data', err: err.message});
    }
}

exports.getJob = async ( req, res ) => {
    const { id } = req.params;

    try {
        
        const [ row ] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?', [id]
        )
        res.json(row);


    } catch (err) {
        console.error('Erorr fetcing the data', err);
        res.status(500).json({message:'Error fetching the data', err: err.message})
    }
}

exports.addJob = async ( req, res ) => {

    const newFields = req.body;
    
    const allowedFields = ['company_name','job_title','application_date','job_link','notes']
    const queryParts = [];
    const queryValues = [];

    for (const field in newFields) {
        if (allowedFields.includes(field)) {
            queryParts.push(field);
            queryValues.push(newFields[field]);
        };
    }

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

    const updatedFields = req.body;

    const allowedFields = 
    ['user_id', 'company_name', 'job_title', 'status', 'priority', 'application_date', 'job_link', 'notes']

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

    const sql = `
        UPDATE jobs 
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `
    queryValues.push(id);

    try {

        const [ result ] = await pool.query(sql, queryValues);
        
        if (result.affectedRows === 0) {
            res.status(404).json({message:`Application with ${id} not found.` })
        }

        const [ updatedJobRows ] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?', [id]
        )

        if (updatedJobRows.length === 0) {
            throw new Error(`Failed to retrieve the updated todo with id ${id}.`);
       }

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

    if (!id) return res.status(400).json({message:'id is requied.'})

    try {
        
        const [ result ] = await pool.query(
            'DELETE FROM jobs WHERE id = ?' , [id]
        )
        
        if (result.affectedRows === 0) {
            return res.status(404).json({message:` Application with id:${id} not found.`});
        }

        res.json({ message: `Todo with id ${id} deleted successfully.` });

    } catch (err) {
        console.error(`Error deleting application with id ${id}:`, err);
        res.status(500).json({
            message: `Error deleting applciation with id ${id}`,
            error: err.message
        });
    }
}