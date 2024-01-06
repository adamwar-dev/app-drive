import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthenticationDataProvider } from '../../data/AuthenticationDataProvider';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="https://mui.com/">
			{'Tab Project'}
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
		</Typography>
	);
}

const theme = createTheme();

const Verify = () => {

    const { token } = useParams();

	const [success, setSuccess] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [loader, setLoader] = React.useState(true);

	useEffect(() => {
		AuthenticationDataProvider.verify(token ?? '')
		.then((status) => {
			setLoader(false);
			if (status === 200) {
				setSuccess(true);
			} else {
				setError(true);
			}
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
			item
			xs={false}
			sm={4}
			md={7}
			sx={{
				backgroundImage: 'url(https://source.unsplash.com/random)',
				backgroundRepeat: 'no-repeat',
				backgroundColor: (t) =>
				t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			{loader &&
				<Loader/>
			}
			{!loader &&
				<Box
					sx={{
					my: 8,
					mx: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{'Account Verification'}
					</Typography>
					<Box sx={{ mt: 1 }}>
						{success &&
							<Grid container>
								<Grid item xs={8}>
									<Link href="/signIn" variant="body2">
										{'Verification complete, now you can Sign In!'}
									</Link>
								</Grid>
							</Grid>
						}
						{error &&
							<Typography fontSize={'16px'} component="h1" variant="h5" sx={{color: '#ff5252', mt: '20px'}}>
							{'Error occurs :('}
							<br/>
							{'Try again later.'}
							</Typography>
						}
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			}
			</Grid>
		</Grid>
		</ThemeProvider>
	);
}

export default Verify;