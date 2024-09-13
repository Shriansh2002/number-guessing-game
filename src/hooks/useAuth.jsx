import { useState, useEffect } from "react";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem("token");
		window.location.href = "/login";
	};

	return { isAuthenticated, handleLogin, handleLogout };
};

export default useAuth;
