import { Box, Button, Grid, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
import MyTextField from '../../components/TextField';
import FolderItem from '../../components/FolderItem';
import SimplyImage from '../../components/SimplyImage';
import { GalleryDataProvider, iFolderData, iSimplyFolder } from '../../data/GalleryDataProvider';
import { createImage } from '../../components/Utils';
import Loader from '../../components/Loader';
import CustomModal, { iCustomModal } from '../../components/CustomModal';
import { useParams } from 'react-router-dom';
import { ImageDataProvider, iReceivedImage } from '../../data/ImageDataProvider';
import SelectBasic from '../../components/SelectBasic';

const Folder = () => {

	const [jwtToken, setJwtToken] = useState('');
    const { parentId, folderId } = useParams();
	
	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
        console.log(parentId, folderId);
		if (token) {
			getFolder(token, folderId ?? '');
			getTagList(token);
			setJwtToken(localStorage.getItem('jwtToken') ?? '');
		} else {
			setModal({
				isModal: true,
				action: 'error',
				actionText: '',
				exitText: 'Go to login page',
				exitLink: '/',
				redirect: true,
			});
		}
	}, []);

	const [folder, setFolder] = React.useState<iFolderData>({
		folderName: '',
		parentFolderId: 'empty',
		folders: [],
		images: [],
	});

	// filtering

	const [filterMethod, setFilterMethod] = React.useState<iSimplyFolder>({folderName: 'All', id: '1'});
	const [tagList, setTagList] = React.useState<iSimplyFolder[]>([]);
	const [filterTag, setFilterTag] = React.useState<iSimplyFolder>({folderName: '', id: ''});
	const [filterText, setFilterText] = React.useState('');

	const filter = () => {
		if (filterMethod.id === '1') {

			getFolder(jwtToken, folderId ?? '');
		} else if (filterMethod.id === '2') {

			getByName();
		} else if (filterMethod.id === '3') {

			getByDate(true);
		} else if (filterMethod.id === '4') {

			getByDate(false);
		} else if (filterMethod.id === '5') {

			getByTag();
		}
	}

	useEffect(() => {
		setFilterTag({folderName: '', id: ''});
	}, [filterMethod]);

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

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

	const getTagList = (jwtToken: string) => {
		ImageDataProvider.getTagFolder(jwtToken)
		.then((response) => {
			if (typeof response === typeof tagList) {
				setTagList(response as iSimplyFolder[]);
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

	const getByTag = () => {
		setLoader(true);
		ImageDataProvider.getByTag(jwtToken, folderId ?? '', filterTag.id)
		.then((response) => {
			if (typeof response === typeof folder.images) {
				setFolder(prevState => ({
					...prevState,
					images: response as iReceivedImage[],
				}));
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

	const getByName = () => {
		setLoader(true);
		ImageDataProvider.getByText(jwtToken, folderId ?? '', filterText)
		.then((response) => {
			if (typeof response === typeof folder.images) {
				setFolder(prevState => ({
					...prevState,
					images: response as iReceivedImage[],
				}));
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

	const getByDate = (isLatest: boolean) => {
		setLoader(true);
		ImageDataProvider.getByDate(jwtToken, folderId ?? '', isLatest)
		.then((response) => {
			if (typeof response === typeof folder.images) {
				setFolder(prevState => ({
					...prevState,
					images: response as iReceivedImage[],
				}));
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

	const onShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		navigator.clipboard.writeText("http://localhost:3000/share/" + folderId);
		setAnchorEl(event.currentTarget);
	}

	const onRaportClick = () => {
		window.location.replace("/raport/" + folderId);
	}

	const handleClose = () => {
		setAnchorEl(null);
	  };

	const renderFolders = folder.folders.map((nestedFolder) => (
		<Grid key={'folder' + nestedFolder.id} item xs={12} sm={6} md={4}>
			<FolderItem
				name={nestedFolder.folderName}
				id={nestedFolder.id}
				parentFolderId={folderId ?? ''}
				jwtToken={jwtToken}
				onDelete={onDeleteFolderClick}
			/>
		</Grid>
	));

	const renderImages = folder.images.map((image , index) => (
		<Grid key={'image' + image.id} item xs={12} sm={6} md={4}>
			<SimplyImage			
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
						<Button fullWidth variant="contained" onClick={onShareClick} sx={{height: '56px', backgroundColor: '#0aa1dd'}}>
							{'Share'}
						</Button>
						<Popover
							id={'popup'}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
							}}
						>
							<Typography sx={{ p: 2 }}>{'Copied link to the clipboard'}</Typography>
						</Popover>
					</Grid>
					<Grid item xs={3}>
						<Button fullWidth onClick={onRaportClick} variant="contained" sx={{height: '56px'}}>
							{'Raport'}
						</Button>
					</Grid>
					<Grid item xs={3}>
						<SelectBasic
							folders={[
								{folderName: 'All', id: '1'},
								{folderName: 'Text', id: '2'},
								{folderName: 'From the latest', id: '3'},
								{folderName: 'From the oldest', id: '4'},
								{folderName: 'Selected tag', id: '5'}
							]}
							onFolderChange={setFilterMethod}
						/>
					</Grid>
					{filterMethod.id === '2' &&
						<Grid item xs={6}>
							<MyTextField
								id={'text'} 
								label={'Text'} 
								fullwidth={true}
								value={filterText}
								onChange={setFilterText}
							/>
						</Grid>
					}
					{filterMethod.id === '5' &&
						<Grid item xs={6}>
							<SelectBasic
								folders={tagList}
								onFolderChange={setFilterTag}
								label={'Tag'}
							/>
						</Grid>
					}
					<Grid item xs={filterMethod.id === '5' || filterMethod.id === '2' ? 3 : 9}>
						<Button fullWidth disabled={(filterMethod.id === '2' && filterText === '') || (filterMethod.id === '5' && filterTag.id === '')} onClick={filter} variant="contained" sx={{height: '56px'}}>
							{'Filter'}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<hr style={{ color: '#5cabe1' }} />
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