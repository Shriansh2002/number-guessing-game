import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../service/apiService";
import FormInput from "./FormInput";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}

		try {
			await register(username, password);
			navigate("/login");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='p-8 bg-white shadow-xl rounded-xl max-w-md w-full'>
				<h2 className='text-xl font-semibold text-center mb-6'>
					Register to Number Guessing Game
				</h2>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
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
					<FormInput
						label='Confirm Password'
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						id='confirm-password'
					/>

					{error && (
						<div className='text-red-500 text-sm mt-2'>{error}</div>
					)}

					<button
						type='submit'
						className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Continue
					</button>
				</form>
				<div className='mt-4 text-center'>
					Already have an account?{" "}
					<a href='/login' className='text-blue-600 hover:underline'>
						Login
					</a>
				</div>
			</div>
		</div>
	);
};

export default Register;
