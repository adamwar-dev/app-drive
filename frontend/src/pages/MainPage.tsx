import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Tile from '../components/Tile';

const MainPage = () => {

	const [jwtToken, setJwtToken] = useState('');

	useEffect(() => {
		setJwtToken(localStorage.getItem('jwtToken') ?? '');
	}, []);

	return (
		<React.Fragment>
			<Navbar  />
			{jwtToken &&
				<Box sx={{ flexGrow: 1, width: '75%', mx: 'auto', mt: '100px' }}>
					<Grid container spacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={12} sm={12} md={6}>
							<Tile text={'Add Picture'} linkTo={'/addPicture'} />
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<Tile text={'Gallery'} linkTo={'/gallery'} />
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<Tile text={'Profile'} linkTo={'/profile'} />
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<Tile text={'Logout'} linkTo={'/'} />
						</Grid>
					</Grid>
				</Box>
			}
			{!jwtToken &&
			 	<Loader/>
			}
			<div style={{ margin: '100px' }} />
		</React.Fragment>
	);
};

export default MainPage;