import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../../components/Navbar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import Loader from '../../components/Loader';
import { AuthenticationDataProvider } from '../../data/AuthenticationDataProvider';

const Privacy = () => {
	const [jwtToken, setJwtToken] = React.useState('');
	const [loader, setLoader] = React.useState(true);

	const [email, changeEmail] = React.useState('');
	const [allowResetPassword, setAllowResetPassword] = React.useState(true);
	const [passwordMessage, setPasswordMessage] = React.useState(false);

	React.useEffect(() => {
		setLoader(true);
		const token = localStorage.getItem('jwtToken') ?? '';
		setJwtToken(token);
		if (token) {
			AuthenticationDataProvider.getProfileInfo(token)
			.then(data => {
				changeEmail(data.email);
				setAllowResetPassword(data.externalType == 'no');
			})
			setLoader(false);
		}
	}, []);

	const resetPassword = () => {
		AuthenticationDataProvider.resetPasswordRequest(email)
		.then(() => {
			setPasswordMessage(true);
		});
	}

	const logout = () => {
		localStorage.removeItem('jwtToken');
		window.location.replace('/');
	}

	return loader ? (
		<React.Fragment>
			<Navbar />
			<Loader />
		</React.Fragment>
		) : (
		<React.Fragment>
			<Navbar  />
			<Box sx={{ flexGrow: 1, width: '80%', mx: 'auto' }}>
				<Grid container spacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems='center' textAlign={'center'}>
					<Grid item xs={12}>
						<AccountCircleRoundedIcon sx={{fontSize: '150px', color: '#1976d2', mt: '50px'}}/>
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h5" sx={{color: '#1976d2'}}>
							{'User\'s privacy'}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<hr style={{ color: '#5cabe1' }} />
					</Grid>
					<Grid item xs={12} textAlign='center'>
						<FormControl variant="outlined" sx={{width: '330px'}}>
							<InputLabel>Email</InputLabel>
							<OutlinedInput
								disabled
								id="outlined-adornment-email"
								value={email}
								endAdornment={
								<InputAdornment position="end">
									<IconButton edge="end">
										<AlternateEmailRoundedIcon />
									</IconButton>
								</InputAdornment>
								}
								label="Email"
							/>
						</FormControl>
					</Grid>
					{allowResetPassword &&
						<Grid item xs={12}>
							<Button onClick={resetPassword} variant="contained" sx={{height: '56px', width: '330px', backgroundColor: '#00b4d8'}}>
								{'Reset Password'}
							</Button>
						</Grid>
					}
					{passwordMessage &&
						<Grid item xs={12}>
							<Typography fontSize={'16px'} component="h1" variant="h5" sx={{color: '#27db17', mt: '20px'}}>
								{'Check your email. Reset Password mail has been send.'}
							<br/>
							</Typography>
						</Grid>
                	}
					<Grid item xs={12}>
						<Button onClick={logout} variant="contained" sx={{height: '56px', width: '330px'}}>
							{'Logout'}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
};

export default Privacy;
