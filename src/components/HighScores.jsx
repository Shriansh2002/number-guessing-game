import React, { useCallback, useEffect, useState } from "react";
import { getHighScores } from "../service/apiService";
import Navbar from "./navbar";

const HighScores = () => {
	const [state, setState] = useState({
		highScores: [],
		userHighScore: null,
		loading: true,
		error: "",
	});

	const fetchHighScores = useCallback(async () => {
		try {
			const data = await getHighScores();
			setState({
				highScores: data.topScores || [],
				userHighScore: data.highScore || null,
				loading: false,
				error: "",
			});
		} catch (err) {
			setState((prevState) => ({
				...prevState,
				loading: false,
				error: err.message,
			}));
		}
	}, []);

	useEffect(() => {
		fetchHighScores();
	}, [fetchHighScores]);

	const { highScores, userHighScore, loading, error } = state;

	if (loading)
		return (
			<div className='flex justify-center items-center'>
				<div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32'></div>
			</div>
		);
	if (error)
		return (
			<div
				className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
				role='alert'
			>
				{error}
			</div>
		);

	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar />
			<main className='container mx-auto p-6'>
				{loading && (
					<div className='flex justify-center items-center'>
						<div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32'></div>
					</div>
				)}
				{error && (
					<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
						{error}
					</div>
				)}
				{!loading && !error && (
					<div className='bg-white shadow-lg rounded-lg p-6'>
						<div className='overflow-x-auto'>
							<table className='min-w-full bg-white'>
								<thead>
									<tr className='border-b'>
										<th className='py-3 px-4 text-left text-sm font-semibold text-gray-700'>
											Username
										</th>
										<th className='py-3 px-4 text-left text-sm font-semibold text-gray-700'>
											Score
										</th>
									</tr>
								</thead>
								<tbody>
									{highScores.map((item, index) => (
										<tr key={index} className='border-b'>
											<td className='py-2 px-4 text-sm text-gray-800'>
												{item.username}
											</td>
											<td className='py-2 px-4 text-sm text-gray-800'>
												{item.score}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{userHighScore !== null && (
							<div className='mt-6 text-lg font-semibold text-center'>
								Your High Score: {userHighScore}
							</div>
						)}
					</div>
				)}
			</main>
		</div>
	);
};

export default HighScores;
