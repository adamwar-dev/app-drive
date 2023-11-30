import * as React from 'react';
import { jwtDecode } from 'jwt-decode';
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
import Loader from '../../components/Loader';
import { regexEmail } from '../../components/Utils';
import { Copyrights } from '../../components/Copyrights';

const theme = createTheme();

const SignIn = () => {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState(false);

	const [loader, setLoader] = React.useState(false);

    const [emailError, setEmailError] = React.useState(true);

	/** Google Stuff */
	const handleCallbackResponse = (response: any) => {
		const userObject = jwtDecode(response.credential)
		console.log(userObject);
	}

	React.useEffect(() => {
		if (window.google) {

			window.google.accounts.id.initialize({
				client_id: '703898790113-ed9lr919acsohojpfc3j6qu2po4refv1.apps.googleusercontent.com',
				callback: handleCallbackResponse
			});
	
			window.google.accounts.id.renderButton(
				document.getElementById('signInDiv'),
				{ theme: 'filled_blue', size: 'large' }
			);
		}
	}, []);

    React.useEffect(() => {
		setEmailError(!regexEmail.test(email));
	}, [email]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setLoader(true);
		event.preventDefault();
		return AuthenticationDataProvider.signIn(email, password)
		.then(jwtToken => {
			console.log(jwtToken);
			if (jwtToken) {
				window.location.replace("/mainPage");
				localStorage.setItem('jwtToken', jwtToken);
			} else {
				setLoader(false);
				setError(true);
			}
		});
	};

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
					{'Sign In'}
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={event => setEmail(event.target.value)}
                        error={emailError}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
                        error={password.length === 0}
						onChange={event => setPassword(event.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
                        disabled={emailError || password.length === 0}
					>
						{'Sign in'}
					</Button>
					<div id='signInDiv' style={{width: '240px', margin: '10px auto'}}></div>
					<Grid container>
						<Grid item xs={8}>
							<Link href="/signUp" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
						<Grid item xs={8}>
							<Link href="#" variant="body2">
								{'Forgot password?'}
							</Link>
						</Grid>				
					</Grid>
					{loader &&
					<Loader mt={'100px'} size={100}/>
					}
					{error &&
						<Typography fontSize={'16px'} component="h1" variant="h5" sx={{color: '#ff5252', mt: '20px'}}>
						{'Error occurs :('}
						<br/>
						{'Try again later.'}
						</Typography>
					}
					<Copyrights sx={{ mt: 5 }} />
				</Box>
			</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
	);
}

export default SignIn;
