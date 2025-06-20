import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../utils/api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState('');

    const { user, logout } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskAPI.getTasks();
            setTasks(response.data);
        } catch (error) {
            setError('Failed to fetch tasks');
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const response = await taskAPI.createTask(taskData);
            setTasks([response.data, ...tasks]);
            setShowForm(false);
            setError('');
        } catch (error) {
            setError('Failed to create task');
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const response = await taskAPI.updateTask(editingTask._id, taskData);
            setTasks(tasks.map(task =>
                task._id === editingTask._id ? response.data : task
            ));
            setEditingTask(null);
            setShowForm(false);
            setError('');
        } catch (error) {
            setError('Failed to update task');
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskAPI.deleteTask(taskId);
                setTasks(tasks.filter(task => task._id !== taskId));
                setError('');
            } catch (error) {
                setError('Failed to delete task');
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            const newStatus = task.status === 'completed' ? 'incomplete' : 'completed';
            const response = await taskAPI.updateTask(task._id, { ...task, status: newStatus });
            setTasks(tasks.map(t => t._id === task._id ? response.data : t));
            setError('');
        } catch (error) {
            setError('Failed to update task status');
            console.error('Error updating task status:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-content">
                    <h1>Task Manager</h1>
                    <div className="navbar-actions">
                        <span>Welcome, {user?.email}</span>
                        <button onClick={logout} className="btn btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container">
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h2>My Tasks</h2>
                            <p>
                                {totalTasks} total tasks, {completedTasks} completed
                            </p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn btn-primary"
                            disabled={showForm}
                        >
                            Add New Task
                        </button>
                    </div>

                    {showForm && (
                        <TaskForm
                            task={editingTask}
                            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                            onCancel={handleCancelForm}
                        />
                    )}

                    <TaskList
                        tasks={tasks}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDeleteTask}
                        onToggleStatus={handleToggleStatus}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;