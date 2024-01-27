"use client";

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import './module.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === 'zari' && password === 'zari123') {
            router.push('/products');
        } else {
            console.log('Credenciales incorrectas');
        }
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className='title-login'>Iniciar sesión</h1>
                <label htmlFor="username">Usuario</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                />

                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;
