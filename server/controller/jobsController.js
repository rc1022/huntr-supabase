const supabase = require('../src/supabaseClient');

exports.getAllJobs = async (req, res) => {
    const { priority, sort, status } = req.query;
    const userId = req.user.id;

    let query = supabase.from('jobs').select('*').eq('user_id', userId);
    if (priority && priority !== 'all') {
        query = query.eq('priority', priority);
    }

    if (status && status !== 'all'){
        query.eq('status', status)
    }
    if (sort === 'priority_asc') {
        query = query.order('priority', { ascending: true });
    } else if (sort === 'priority_desc') {
        query = query.order('priority', { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
        console.error('Error fetching the data', error);
        return res.status(500).json({ message: 'Error fetching the data', error: error.message });
    }
    res.json(data);
};

exports.addJob = async (req, res) => {
    const newFields = req.body;
    const userId = req.user.id;
    const allowedFields = ['company_name', 'job_title', 'application_date', 'job_link', 'notes'];
    const insertData = { user_id: userId };
    for (const field of allowedFields) {
        if (newFields[field] !== undefined) {
            insertData[field] = newFields[field];
        }
    }
    const { data, error } = await supabase.from('jobs').insert([insertData]).select('*');
    if (error) {
        console.error('Error adding the data', error);
        return res.status(500).json({ message: 'Error adding the data', error: error.message });
    }
    res.status(201).json(data && data[0] ? data[0] : data);
};

exports.updateJob = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedFields = req.body;
    const allowedFields = ['company_name', 'job_title', 'status', 'priority', 'application_date', 'job_link', 'notes'];
    const updateData = {};
    for (const field of allowedFields) {
        if (updatedFields[field] !== undefined) {
            updateData[field] = updatedFields[field];
        }
    }
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update.' });
    }
    const { data, error } = await supabase
        .from('jobs')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', userId)
        .select('*');
    if (error) {
        console.error(`Error updating application with id ${id}:`, error);
        return res.status(500).json({
            message: `Error updating application with id ${id}`,
            error: error.message
        });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ message: `Application with id ${id} not found.` });
    }
    res.json(data[0]);
};

exports.deleteJob = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
    if (error) {
        console.error(`Error deleting application with id ${id}:`, error);
        return res.status(500).json({
            message: `Error deleting application with id ${id}`,
            error: error.message
        });
    }
    res.json({ message: `Job deleted successfully.` });
};