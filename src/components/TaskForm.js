import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'incomplete',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status,
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        await onSubmit(formData);
        setLoading(false);

        if (!task) {
            setFormData({
                title: '',
                description: '',
                status: 'incomplete',
            });
        }
    };

    return (
        <div className="card" style={{ marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
            <h3>{task ? 'Edit Task' : 'Add New Task'}</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {task && (
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="incomplete">Incomplete</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (task ? 'Update Task' : 'Add Task')}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;