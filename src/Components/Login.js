import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username && password) {
            onLogin(username, password);
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <div className='login-page'>
            <div className='login-form'>
                <div className="log-heading">
                    <h2>Login</h2>
                </div>
                    <div className="field">
                        <label className='form-label'>
                            Username:
                        </label>
                        <input className='form-input'
                            type="text"
                            value={username}
                            placeholder='Enter the Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className='form-label'>
                            Password:
                        </label>
                        <input className='form-input'
                            type="password"
                            value={password}
                            placeholder='Enter the Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="btn">
                        <button className='login-btn' onClick={handleLogin}>Login</button>
                    </div>
            </div>
        </div>
    );
};

export default Login;
