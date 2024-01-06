import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { GalleryDataProvider, iRaportData } from '../data/GalleryDataProvider';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CustomModal, { iCustomModal } from '../components/CustomModal';
import { useParams } from 'react-router-dom';

const Raport = () => {
    const { folderId } = useParams();

	const [jwtToken, setJwtToken] = useState('');
	const [raportData, setRaportData] = useState<iRaportData>({
		allCount: '0',
		categoriesStats: [],
	});

	const [loader, setLoader] = React.useState(true);
	const [modal, setModal] = React.useState<iCustomModal>({
		isModal: false,
		action: 'error',
		actionText: '',
		exitText: '',
		exitLink: '',
		redirect: false,
	});

	useEffect(() => {
		const token = localStorage.getItem('jwtToken') ?? '';
		if (token) {
			setJwtToken(token);
			GenerateRaport(token);
		} else {
			setLoader(false);
			setModal({
				isModal: true,
				action: 'error',
				actionText: '',
				exitText: 'Back to main page',
				exitLink: '/mainPage',
				redirect: true,
			});
		}
	}, []);

	const GenerateRaport = (token: string) => {
		return GalleryDataProvider.getRaportData(token, folderId ?? '')
		.then(response => {
			if (typeof response === typeof raportData) {
				console.log(response);
				setRaportData(response as iRaportData);
			} else {
				setModal({
					isModal: true,
					action: 'error',
					actionText: '',
					exitText: 'Back to main page',
					exitLink: '/mainPage',
					redirect: true,
				});
			}
			setLoader(false);
		});
	}

	const renderCategoriesStats = raportData.categoriesStats.map((stats, index) => (
		<Grid item xs={12}>
			<Typography component="h1" variant="h5" sx={{color: '#000'}} key={index}>
				{stats.name + ': ' + stats.count}
			</Typography>
		</Grid>
	));

	return loader ? (
		<React.Fragment>
			<Navbar />
			<Loader />
		</React.Fragment>
		) : (
		<React.Fragment>
			<Navbar  />
			<Box sx={{ flexGrow: 1, width: '80%', mx: 'auto' }}>
				<Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems='center' textAlign={'center'}>
					<Grid item xs={12}>
						<DescriptionTwoToneIcon sx={{fontSize: '150px', color: '#1976d2', mt: '50px'}}/>
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h3" sx={{color: '#1976d2'}}>
							{"Raport"}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h4" sx={{color: '#1976d2'}}>
							{"Images in folder: " + raportData.allCount}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<hr style={{ color: '#5cabe1' }} />
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h4" sx={{color: '#1976d2'}}>
							{"Images with category"}
						</Typography>
					</Grid>
					{renderCategoriesStats}
				</Grid>
			</Box>
			<CustomModal
				isModal={modal.isModal}
				action={modal.action}
				actionText={modal.actionText}
				exitText={modal.exitText}
				exitLink={modal.exitLink}
				changeModal={setModal}
				redirect={modal.redirect}
			/>
			<div style={{ margin: '100px' }} />
		</React.Fragment>
	);
};

export default Raport;