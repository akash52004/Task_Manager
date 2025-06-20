import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to Task Manager</h1>
                <p>Organize your tasks efficiently and boost your productivity</p>
                {isAuthenticated ? (
                    <Link to="/dashboard" className="btn btn-primary">
                        Go to Dashboard
                    </Link>
                ) : (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Register
                        </Link>
                    </div>
                )}
            </div>

            <div className="card">
                <h2>Features</h2>
                <ul>
                    <li>Create and manage your tasks</li>
                    <li>Mark tasks as complete or incomplete</li>
                    <li>Edit and delete tasks</li>
                    <li>Secure user authentication</li>
                    <li>Responsive design</li>
                </ul>
            </div>
        </div>
    );
};

export default Landing;