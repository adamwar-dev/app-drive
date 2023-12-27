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
import { Checkbox } from '@mui/material';
import { regexEmail, regexEmpty, regexPassword } from '../../components/Utils';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import { Copyrights } from '../../components/Copyrights';



const theme = createTheme();

const SignUp = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [terms, setTerms] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [status, setStatus] = React.useState(false);

	const [firstNameError, setFistNameError] = React.useState(true);
	const [emailError, setEmailError] = React.useState(true);
	const [passwordError, setPasswordError] = React.useState(true);

	const [loader, setLoader] = React.useState(false);
	
	// validation
	useEffect(() => {
		setFistNameError(!regexEmpty.test(firstName));
	}, [firstName]);

	useEffect(() => {
		setEmailError(!regexEmail.test(email));
	}, [email]);

	useEffect(() => {
		setPasswordError(!regexPassword.test(password));
	}, [password]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setLoader(true);
		event.preventDefault();
		return AuthenticationDataProvider.signUp(firstName, email, password , confirmPassword, terms)
		.then(res => {
			console.log(res);
			if (res === 200) {
				setStatus(true);
				setLoader(false);
			} else {
				setError(true);
				setLoader(false);
			}
		});
	};
	
	const onTermsClick = () => {
		setTerms(!terms);
	}

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
					{'Sign Up'}
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<Grid container>
					<Grid item xs={8} mx={'auto'}>
						<TextField
							margin="normal"
							required
							fullWidth
							error={firstNameError}
							name="firstName"
							label="First name"
							type="text"
							id="firstName"
							autoComplete="firstName"
							onChange={event => setFirstName(event.target.value)}
						/>
					</Grid>
					<Grid item xs={8} mx={'auto'}>
						<TextField
							margin="normal"
							required
							fullWidth
							error={emailError}
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={event => setEmail(event.target.value)}
						/>
					</Grid>
					<Grid item xs={8} mx={'auto'}>
						<TextField
							margin="normal"
							required
							fullWidth
							error={passwordError}
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={event => setPassword(event.target.value)}
						/>
					</Grid>
					<Grid item xs={8} mx={'auto'}>
						<TextField
							margin="normal"
							required
							fullWidth
							error={password !== confirmPassword}
							name="confirm-password"
							label="Confirm Password"
							type="password"
							id="confirm-password"
							autoComplete="confirm-password"
							onChange={event => setConfirmPassword(event.target.value)}
						/>
					</Grid>
					<Grid item xs={8} mx={'auto'}>
						<Typography textAlign={'center'}>
						{'Accept terms'}
							<Checkbox onClick={onTermsClick} />
						</Typography>
					</Grid>
					<Grid item xs={8} mx={'auto'}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={firstNameError || emailError || passwordError || confirmPassword !== password || !terms}
							sx={{ mt: 3, mb: 2 }}
						>
							{'Sign in'}
						</Button>
					</Grid>
					<Grid item xs={8} mx={'auto'}>
						<Link href="/signIn" variant="body2">
							{"Do You have an account? Sign In"}
						</Link>
					</Grid>
					{loader &&
						<Loader/>
					}
					{error &&
						<Grid item xs={8} mx={'auto'}>
							<Typography  fontSize={'16px'} component="h1" variant="h5" sx={{color: '#ff5252', mt: '20px'}}>
							{'An error occurs :('}
							<br/>
							{'Try again later.'}
							</Typography>
						</Grid>
					}
					{status &&
						<Grid item xs={8} mx={'auto'}>
							<Typography fontSize={'16px'} component="h1" variant="h5" sx={{color: '#27db17', mt: '20px'}}>
								{'Check your email and verify account!'}
							</Typography>
						</Grid>
					}
					</Grid>
					<Copyrights sx={{ mt: 5 }} />
				</Box>
			</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
	);
}

export default SignUp;