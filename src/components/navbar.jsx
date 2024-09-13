import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
	const { handleLogout } = useAuth();

	return (
		<header className='bg-indigo-700 text-white py-4'>
			<nav className='container mx-auto flex justify-between items-center'>
				<Link to='/'>
					<h1 className='text-2xl font-bold select-none cursor-pointer'>
						Number Guessing Game
					</h1>
				</Link>
				<div className='space-x-4'>
					<Link to='/game' className='hover:underline'>
						Game
					</Link>
					<Link to='/leaderboard' className='hover:underline'>
						Leaderboard
					</Link>
					<Link to='/past-scores' className='hover:underline'>
						Past Scores
					</Link>
					<button onClick={handleLogout} className='hover:underline'>
						Logout
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
