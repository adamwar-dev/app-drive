import React from 'react';
import './App.css';
import SignUp from './pages/auth/SignUp';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import MainPage from './pages/MainPage';

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path={'/'} element={<SignIn/>} />
				<Route path={'/signIn'} element={<SignIn/>} />
				<Route path={'/signUp'} element={<SignUp/>} />
				<Route path={'/mainPage'} element={<MainPage/>} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
