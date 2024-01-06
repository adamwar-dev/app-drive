import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import MyTextField from '../../components/TextField';
import SelectBasic from '../../components/SelectBasic';
import SelectTags from '../../components/SelectTags';
import BasicDatePicker from '../../components/DatePicker';
import { GalleryDataProvider, iSimplyFolder } from '../../data/GalleryDataProvider';
import { iEditImage, ImageDataProvider, iTag } from '../../data/ImageDataProvider';
import CustomModal, { iCustomModal } from '../../components/CustomModal';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';


const EditPhoto = () => {
	
	const [jwtToken, setJwtToken] = useState('');

    const { id, folderId } = useParams();

	// form data
	const [tagList, setTagList] = React.useState<iTag[]>([]);
	const [folderList, setFolderList] = React.useState<iSimplyFolder[]>([]);

	// image data
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [folder, setFolder] = React.useState<iSimplyFolder>({folderName: '', id: ''});
	const [tags, setTags] = React.useState<string[]>([]);
	const [date, setDate] = React.useState<Date | null>(null);

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
		const token = localStorage.getItem('jwtToken');
		if (token) {
			setJwtToken(localStorage.getItem('jwtToken') ?? '');
			getTagList(token);
			getFolderList(token);
			setLoader(false);
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

	const getTagList = (jwtToken: string) => {
		ImageDataProvider.getTag(jwtToken)
		.then((response) => {
			if (typeof response === typeof tagList) {
				setTagList(response as iTag[]);
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

	const getFolderList = (jwtToken: string) => {
		GalleryDataProvider.getFoldersList(jwtToken)
		.then((response) => {
			if (typeof response === typeof folderList) {
				setFolderList(response as iSimplyFolder[]);
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

	const onSaveClick = () => {
		setLoader(true);
		const imageData: iEditImage = {
			jwtToken: jwtToken,
			id: id ?? '',
			title: title,
			description: description,
			folderId: folder.id,
			tagsId: tags,
			date: date,
		}

		return ImageDataProvider.editImage(imageData)
		.then(status => {
			if (status === 200) {
				setModal({
					isModal: true,
					action: 'edit',
					actionText: 'Image edited succesfully!',
					exitText: 'Go to Gallery',
					exitLink: '/gallery',
					redirect: true,
				});
			} else {
				setModal({
					isModal: true,
					action: 'error',
					actionText: '',
					exitText: 'Go to main page',
					exitLink: '/mainPage',
					redirect: true,
				});
			}
			setLoader(false);
		});
	}

	return loader ? (
		<React.Fragment>
			<Navbar />
			<Loader />
		</React.Fragment>
		) : (
		<React.Fragment>
			<Navbar/>
			<Box sx={{ flexGrow: 1, width: '90%', mx: 'auto' }}>
				<Grid container spacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems='center' textAlign={'center'}>
					<Grid item xs={12}>
						<Card sx={{ maxWidth: '100%', mx: 'auto', mt: '50px' }}>
							<CardContent>
								<Grid container spacing={1} columnSpacing={{ xs: 1 }} alignItems='center' textAlign={'center'}>
									<Grid item xs={12} sm={6} md={6}>
										<MyTextField value={title} label={'New Title'} onChange={setTitle} fullwidth/>
									</Grid>
									<Grid item xs={12} sm={6} md={6}>
										<SelectBasic
											folders={folderList}
											onFolderChange={setFolder}
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={6}>
										<MyTextField 
											id={'description'} 
											label={'New Description'} 
											fullwidth={true} 
											multiline={true} 
											maxRows={3}
											value={description}
											onChange={setDescription}
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={6}>
										<SelectTags
											tags={tagList}
											onTagsChange={setTags}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} textAlign="center">
									<BasicDatePicker
											onDateChange={setDate}
										/>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth disabled={title === '' && description === '' && date === null && tags.length === 0 && folder.id === ''} onClick={onSaveClick} variant="contained" sx={{height: '56px', mb: '30px'}}>
							{'Save'}
						</Button>
					</Grid>
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
		</React.Fragment>
	);
}

export default EditPhoto;
