import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Tile from '../../components/Tile';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Loader from '../../components/Loader';


const Profile = () => {

	const [jwtToken, setJwtToken] = useState('');

	const [loader, setLoader] = React.useState(true);
	
	useEffect(() => {
		setLoader(true);
		const token = localStorage.getItem('jwtToken') ?? '';
		setJwtToken(token);
		if (token) {
			setLoader(false);
		}
	}, []);

	return loader ? (
		<React.Fragment>
			<Navbar />
			<Loader />
		</React.Fragment>
		) : (
		<React.Fragment>
			<Navbar  />
			<Box sx={{ flexGrow: 1, width: '90%', mx: 'auto' }}>
				<Grid container spacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems='center' textAlign={'center'}>
					<Grid item xs={12}>
						<AccountCircleRoundedIcon sx={{fontSize: '150px', color: '#1976d2', mt: '50px'}}/>
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h5" sx={{color: '#1976d2'}}>
							{'User\'s profile'}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<hr style={{ marginLeft: '30px', marginRight: '30px', color: '#5cabe1' }} />
					</Grid>
					<Grid item xs={12} md={6}>
						<Tile text={'Tags'} linkTo={'/profile/tags'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<Tile text={'Privacy'} linkTo={'/profile/privacy'} />
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
};

export default Profile;