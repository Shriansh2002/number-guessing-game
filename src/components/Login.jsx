import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/apiService";
import FormInput from "./FormInput";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const data = await login(username, password);
			localStorage.setItem("token", data.token);
			onLogin();
			navigate("/game");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='p-8 bg-white shadow-xl rounded-xl max-w-md w-full'>
				<h2 className='text-xl font-semibold text-center mb-6'>
					Sign in to Number Guessing Game
				</h2>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<FormInput
						label='Username'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						id='username'
					/>
					<FormInput
						label='Password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id='password'
					/>
					{error && (
						<p className='text-red-500 text-sm text-center'>
							{error}
						</p>
					)}
					<button
						type='submit'
						className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Continue
					</button>
				</form>
				<div className='mt-4 text-center'>
					Don't have an account?{" "}
					<a
						href='/register'
						className='text-blue-600 hover:underline'
					>
						Register
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
