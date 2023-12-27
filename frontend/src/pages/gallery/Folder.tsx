import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
import MyTextField from '../../components/TextField';
import FolderItem from '../../components/FolderItem';
import SimplyImage from '../../components/SimplyImage';
import { GalleryDataProvider, iFolderData } from '../../data/GalleryDataProvider';
import { createImage } from '../../components/Utils';
import Loader from '../../components/Loader';
import CustomModal, { iCustomModal } from '../../components/CustomModal';
import { useParams } from 'react-router-dom';

const Folder = () => {

	const [jwtToken, setJwtToken] = useState('');
    const { parentId, folderId } = useParams();
	
	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
        console.log(parentId, folderId);
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

	const onAddFolderClick = () => {
		return GalleryDataProvider.addFolder(jwtToken, newFolder, folderId)
		.then(status => {
			if (status === 200) {
				setModal({
					isModal: true,
					action: 'add',
					actionText: 'New folder added succesfully!',
					exitText: 'Close',
					exitLink: '',
					redirect: false,
				});
				getFolder(jwtToken, folderId ?? '');
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
			console.log(status);
		});
	}

	const onDeleteFolderClick = (jwtToken: string, id: string) => {
		return GalleryDataProvider.deleteFolder(jwtToken, id)
		.then(status => {
			if (status === 200) {
				getFolder(jwtToken, folderId ?? '');
				setModal({
					isModal: true,
					action: 'delete',
					actionText: 'Folder deleted succesfully!',
					exitText: 'Close',
					exitLink: '',
					redirect: false,
				});
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
		});
	}

	const renderFolders = folder.folders.map((nestedFolder) => (
		<Grid item xs={12} sm={6} md={4}>
			<FolderItem
				key={nestedFolder.id}
				name={nestedFolder.folderName}
				id={nestedFolder.id}
				parentFolderId={folderId ?? ''}
				jwtToken={jwtToken}
				onDelete={onDeleteFolderClick}
			/>
		</Grid>
	));

	const renderImages = folder.images.map((image , index) => (
		<Grid item xs={12} sm={6} md={4}>
			<SimplyImage
				key={image.id}
				title={image.title}
				id={(image.id)}
				folderId={image.folderId}
				image={createImage(image.image)}
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
							{folder.folderName}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<MyTextField
							id={'newFolder'} 
							label={'Add folder'} 
							fullwidth={true}
							value={newFolder}
							onChange={setNewFolder}
						/>
					</Grid>
					<Grid item xs={3}>
						<Button fullWidth onClick={onAddFolderClick} variant="contained" sx={{height: '56px', backgroundColor: '#00b4d8'}}>
							{'Add'}
						</Button>
					</Grid>
					<Grid item xs={3}>
						<Button fullWidth variant="contained" sx={{height: '56px', backgroundColor: '#0aa1dd'}}>
							{'Share'}
						</Button>
					</Grid>
					<Grid item xs={3}>
						<Button fullWidth variant="contained" sx={{height: '56px'}}>
							{'Raport'}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<hr style={{ color: '#5cabe1' }} />
					</Grid>
					{renderFolders}
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

export default Folder;