import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MyTextField from '../../components/TextField';
import { AuthenticationDataProvider } from '../../data/AuthenticationDataProvider';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {
    const { token } = useParams();

    const [password, setPassword] = useState('');
    const [status, setStatus] = React.useState(0);
	

    const resetPassword = () => {
		return AuthenticationDataProvider.resetPassword(token ?? '', password)
        .then(setStatus);
	}

	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1, width: '90%', mx: 'auto' }}>
				<Grid container spacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems='center' textAlign={'center'}>
					<Grid item xs={12}>
						<AccountCircleRoundedIcon sx={{fontSize: '150px', color: '#1976d2', mt: '50px'}}/>
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h5" sx={{color: '#1976d2'}}>
							{'Reset Password'}
						</Typography>
					</Grid>
                    <Grid item xs={12}>
                        <MyTextField 
                            id={'password'} 
                            label={'new password'} 
                            fullwidth={true}
                            value={password}
                            onChange={setPassword}
                        />
				    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={resetPassword} disabled={password.length < 7} sx={{height: '56px', width: '330px', backgroundColor: '#00b4d8'}}>
                            {'Reset Password'}
                        </Button>
                    </Grid>
				</Grid>
                {status !== 0 && status !== 200 &&
                    <Grid item xs={12}>
                        <Typography fontSize={'16px'} component="h1" variant="h5" sx={{textAlign: 'center', color: '#ff5252', mt: '20px'}}>
                            {'Error occurs :('}
                        <br/>
                            {'Try again later.'}
                        </Typography>
                    </Grid>
                }
                {status === 200 &&
                    <Grid item xs={12}>
                        <Typography fontSize={'16px'} component="h1" variant="h5" sx={{textAlign: 'center', color: '#27db17', mt: '20px'}}>
                            {'Password changed successfully!'}
                        <br/>
                        </Typography>
                    </Grid>
                }
			</Box>
		</React.Fragment>
	);
};

export default ResetPassword;