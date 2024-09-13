
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { getPastScores } from "../service/apiService";

const PastScores = () => {
	const [state, setState] = useState({
		pastScores: [],
		loading: true,
		error: "",
	});

	const fetchPastScores = useCallback(async () => {
		try {
			const data = await getPastScores();
			setState({
				pastScores: data || [],
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
		fetchPastScores();
	}, [fetchPastScores]);

	const { pastScores, loading, error } = state;

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
											Date
										</th>
										<th className='py-3 px-4 text-left text-sm font-semibold text-gray-700'>
											Score
										</th>
									</tr>
								</thead>
								<tbody>
									{pastScores.map((item, index) => (
										<tr key={index} className='border-b'>
											<td className='py-2 px-4 text-sm text-gray-800'>
												{new Date(
													item.date
												).toLocaleString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
													hour: "2-digit",
													minute: "2-digit",
													second: "2-digit",
													hour12: true,
												})}
											</td>
											<td className='py-2 px-4 text-sm text-gray-800'>
												{item.score}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default PastScores;
