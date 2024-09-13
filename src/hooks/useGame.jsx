import { useReducer } from "react";
import { updateScore } from "../service/apiService";

const initialState = {
	targetNumber: Math.floor(Math.random() * 100) + 1,
	guess: "",
	message: "",
	score: 0,
	isCorrect: false,
	tries: 0,
	distance: null,
};

const gameReducer = (state, action) => {
	switch (action.type) {
		case "SET_GUESS":
			return { ...state, guess: action.payload };
		case "SET_MESSAGE":
			return { ...state, message: action.payload };
		case "SET_SCORE":
			return { ...state, score: action.payload };
		case "RESET_GAME":
			return {
				...state,
				targetNumber: Math.floor(Math.random() * 100) + 1,
				guess: "",
				message: "Correct! You guessed it!",
				isCorrect: true,
				tries: 0,
				distance: null,
			};
		case "SET_IS_CORRECT":
			return { ...state, isCorrect: action.payload };
		case "INCREMENT_TRIES":
			return { ...state, tries: state.tries + 1 };
		case "SET_DISTANCE":
			return { ...state, distance: action.payload };
		default:
			return state;
	}
};

export const getDistanceMessage = (distance) => {
	if (distance === null) return "";
	if (distance <= 10) return "You are just a little far away!";
	if (distance <= 20) return "You are somewhat far away.";
	if (distance <= 30) return "You are quite far away.";
	return "You are much far away.";
};

const useGame = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);

	const handleGuess = async () => {
		const guessNum = parseInt(state.guess);
		if (isNaN(guessNum)) {
			dispatch({
				type: "SET_MESSAGE",
				payload: "Please enter a valid number",
			});
			return;
		}

		dispatch({ type: "INCREMENT_TRIES" });

		if (guessNum === state.targetNumber) {
			const baseScore = 200;
			const points = Math.max(
				10,
				Math.min(baseScore, baseScore - (state.tries - 1) * 50)
			);
			const newScore = state.score + points;
			dispatch({ type: "SET_SCORE", payload: newScore });
			dispatch({ type: "RESET_GAME" });

			try {
				await updateScore(newScore);
			} catch (error) {
				console.error("Failed to update score:", error);
			}
		} else {
			const distance = Math.abs(guessNum - state.targetNumber);
			dispatch({ type: "SET_DISTANCE", payload: distance });

			dispatch({
				type: "SET_MESSAGE",
				payload:
					guessNum < state.targetNumber
						? `Too low! ${getDistanceMessage(distance)} Try again.`
						: `Too high! ${getDistanceMessage(
								distance
						  )} Try again.`,
			});
			dispatch({ type: "SET_IS_CORRECT", payload: false });
		}

		dispatch({ type: "SET_GUESS", payload: "" });
	};

	return {
		guess: state.guess,
		setGuess: (value) => dispatch({ type: "SET_GUESS", payload: value }),
		message: state.message,
		score: state.score,
		isCorrect: state.isCorrect,
		tries: state.tries,
		distance: state.distance,
		handleGuess,
	};
};

export default useGame;
