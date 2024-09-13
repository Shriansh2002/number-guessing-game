import React, { Suspense, lazy } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PastScores from './components/PastScores.jsx';
import useAuth from './hooks/useAuth.jsx';

const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Game = lazy(() => import('./components/Game'));
const HighScores = lazy(() => import('./components/HighScores'));

const App = () => {
  const { isAuthenticated, handleLogin } = useAuth();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/game"
            element={isAuthenticated ? <Game /> : <Navigate to="/login" />}
          />
          <Route
            path="/leaderboard"
            element={isAuthenticated ? <HighScores /> : <Navigate to="/login" />}
          />
          <Route
            path="/past-scores"
            element={isAuthenticated ? <PastScores /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/game" : "/login"} />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;