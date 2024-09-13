import debounce from "lodash.debounce";
import React, { useCallback } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import useGame from "../hooks/useGame";
import Navbar from "./navbar";

const Game = () => {
	const { width, height } = useWindowSize();
	const { guess, setGuess, message, score, isCorrect, handleGuess, tries } =
		useGame();

	const handleInputChange = useCallback(
		debounce((value) => setGuess(value), 5),
		[setGuess]
	);

	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar />
			<main className='container mx-auto p-6'>
				{isCorrect && <Confetti width={width} height={height} />}
				<div className='bg-white shadow-lg rounded-lg p-6 py-10 '>
					<p className='text-lg mb-4 text-center'>
						Guess a number between 1 and 100
					</p>
					<div className='flex justify-center mb-4'>
						<input
							type='number'
							value={guess}
							onChange={(e) => handleInputChange(e.target.value)}
							className='w-full max-w-sm border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500'
						/>
					</div>
					<button
						onClick={handleGuess}
						className='w-full max-w-sm mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
					>
						Guess
					</button>
					<p className='mt-2'>{message}</p>
					<p className='mt-2'>Current Score: {score}</p>
					<p className='mt-2'>Number of tries taken: {tries}</p>
				</div>
			</main>
		</div>
	);
};

export default Game;
