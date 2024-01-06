import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
import SimplyImage from '../components/SimplyImage';
import { GalleryDataProvider, iFolderData } from '../data/GalleryDataProvider';
import { createImage } from '../components/Utils';
import Loader from '../components/Loader';
import CustomModal, { iCustomModal } from '../components/CustomModal';
import { useParams } from 'react-router-dom';

const Share = () => {

	const [jwtToken, setJwtToken] = useState('');
    const { folderId } = useParams();

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		if (token) {
			getFolder(token, folderId ?? '');
			setJwtToken(localStorage.getItem('jwtToken') ?? '');
		}
	}, []);

	const [folder, setFolder] = React.useState<iFolderData>({
		folderName: '',
		parentFolderId: 'empty',
		folders: [],
		images: [],
	});
	const [newFolder, setNewFolder] = React.useState('');

	const [loader, setLoader] = React.useState(true);
	const [modal, setModal] = React.useState<iCustomModal>({
		isModal: false,
		action: 'error',
		actionText: '',
		exitText: '',
		exitLink: '',
		redirect: false,
	});

	const getFolder = (jwtToken: string, folderId: string) => {
		setLoader(true);
		GalleryDataProvider.getFolder(jwtToken, folderId)
		.then((response) => {
			if (typeof response === typeof folder) {
				setFolder(response as iFolderData);
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

	const renderImages = folder.images.map((image , index) => (
		<Grid item xs={12} sm={6} md={4}>
			<SimplyImage
				key={image.id}
				title={image.title}
				id={(image.id)}
				folderId={image.folderId}
				image={createImage(image.image)}
				share={true}
			/>
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
				<Grid container spacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems='center' textAlign={'center'}>
					<Grid item xs={12}>
						<FolderCopyTwoToneIcon sx={{fontSize: '150px', color: '#1976d2', mt: '50px'}}/>
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h5" sx={{color: '#1976d2'}}>
							{"Sharing: " + folder.folderName}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<hr style={{ color: '#5cabe1' }} />
					</Grid>
					{renderImages}
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

export default Share;