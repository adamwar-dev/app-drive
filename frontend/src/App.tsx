import React from 'react';
import './App.css';
import SignUp from './pages/auth/SignUp';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import MainPage from './pages/MainPage';
import Profile from './pages/profile/Profile';
import Tags from './pages/profile/Tags';
import Privacy from './pages/profile/Privacy';
import Verify from './pages/auth/Verify';
import Gallery from './pages/gallery/Gallery';
import Folder from './pages/gallery/Folder';
import Photo from './pages/gallery/Photo';
import EditPhoto from './pages/gallery/EditPhoto';
import AddImage from './pages/AddImage';
import Raport from './pages/Raport';

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path={'/'} element={<SignIn/>} />
				<Route path={'/signIn'} element={<SignIn/>} />
				<Route path={'/signUp'} element={<SignUp/>} />
				<Route path={'/verify/:token'} element={<Verify/>}/>
				<Route path={'/mainPage'} element={<MainPage/>} />
				<Route path={'/profile'} element={<Profile/>} />
				<Route path={'/profile/tags'} element={<Tags/>} />
				<Route path={'/profile/privacy'} element={<Privacy/>} />
				<Route path={'/addPicture'} element={<AddImage/>} />
				<Route path={'/gallery'} element={<Gallery/>} />
				<Route path={'/gallery/:parentId/folder/:folderId'} element={<Folder/>} />
				<Route path={'/gallery/folder/:folderId/image/:id'} element={<Photo/>} />
				<Route path={'/gallery/folder/:folderId/image/:id/edit'} element={<EditPhoto/>} />
				<Route path={'/raport/:folderId'} element={<Raport/>} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
