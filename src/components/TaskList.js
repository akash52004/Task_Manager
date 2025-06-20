import React from 'react';

const TaskList = ({ tasks, loading, onEdit, onDelete, onToggleStatus }) => {
    if (loading) {
        return <div className="text-center">Loading tasks...</div>;
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center" style={{ padding: '40px' }}>
                <h3>No tasks yet</h3>
                <p>Create your first task to get started!</p>
            </div>
        );
    }

    return (
        <div>
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                                {task.title}
                            </h3>
                            <p style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                                {task.description}
                            </p>
                            <span className={`status-badge status-${task.status}`}>
                                {task.status}
                            </span>
                        </div>
                    </div>

                    <div className="task-actions" style={{ marginTop: '15px' }}>
                        <button
                            onClick={() => onToggleStatus(task)}
                            className={`btn ${task.status === 'completed' ? 'btn-secondary' : 'btn-success'}`}
                        >
                            Mark as {task.status === 'completed' ? 'Incomplete' : 'Complete'}
                        </button>
                        <button
                            onClick={() => onEdit(task)}
                            className="btn btn-primary"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>

                    <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                        {task.updatedAt !== task.createdAt && (
                            <span> • Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;