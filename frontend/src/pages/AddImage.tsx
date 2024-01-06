import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomModal, { iCustomModal } from '../components/CustomModal';
import BasicDatePicker from '../components/DatePicker';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SaveButton from '../components/SaveButton';
import SelectBasic from '../components/SelectBasic';
import SelectTags from '../components/SelectTags';
import MyTextField from '../components/TextField';
import UploadImageButton from '../components/UploadImageButton';
import UploadImageCard from '../components/UploadImageCard';
import { arrayBufferToBase64, regexEmpty } from '../components/Utils';
import { GalleryDataProvider, iSimplyFolder } from '../data/GalleryDataProvider';
import { iImage, ImageDataProvider, iTag } from '../data/ImageDataProvider';

const AddImage = () => {
	const [jwtToken, setJwtToken] = useState('');

	// form data
	const [tagList, setTagList] = React.useState<iTag[]>([]);
	const [folderList, setFolderList] = React.useState<iSimplyFolder[]>([]);
	
	// image propeties 
	const [images, setImages] = React.useState<FileList>();
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [folder, setFolder] = React.useState<iSimplyFolder>({folderName: '', id: ''});
	const [tags, setTags] = React.useState<string[]>([]);
	const [date, setDate] = React.useState<Date | null>(null);

	// Errors
	const [titleError, setTitleError] = React.useState(true);
	const [folderError, setFolderError] = React.useState(true);

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
			getData(token);
			setJwtToken(token);
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

	// validation
	useEffect(() => {
		setTitleError(!regexEmpty.test(title));
	}, [title]);

	useEffect(() => {
		setFolderError(!regexEmpty.test(folder.id));
	}, [folder]);

	useEffect(() => {
		setTitleError(!regexEmpty.test(title));
	}, [title]);


	// Methods
	const getData = (token: string) => {
		setLoader(true);
		getTagList(token);
		getFolderList(token);
		setLoader(false);
	}

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

	const imageToArrayBuffer = async (files: FileList) => {
		const data: string[] = [];
		if(files) {
			for await (const file of files) {
				data.push(arrayBufferToBase64(await file.arrayBuffer())); 
			}
			return data;
		} else {
			return data;
		}
	}

	const onSaveClick = async () => {
		setLoader(true);

		const imageData: iImage = {
			jwtToken: jwtToken,
			title: title,
			description: description,
			images: [],
			folderId: folder.id,
			tagsId: tags,
			date: date,
		}

		if (images) {
			return imageToArrayBuffer(images)
			.then(newImages => {
				if (newImages) {
					imageData.images = newImages;
					console.log(imageData);
					return ImageDataProvider.addImage(imageData)
					.then(status => {
						if (status === 200) {
							setModal({
								isModal: true,
								action: 'add',
								actionText: 'New image added succesfully!',
								exitText: 'Go to Gallery',
								exitLink: '/gallery',
								redirect: true,
							});
							setLoader(false);
						} else {
							setModal({
								isModal: true,
								action: 'error',
								actionText: '',
								exitText: 'Back to main page',
								exitLink: '/mainPage',
								redirect: true,
							});
							setLoader(false);
						}
					});
				}
			});
		}
	}

	return loader ? (
		<React.Fragment>
			<Navbar />
			<Loader />
		</React.Fragment>
		) : (
		<React.Fragment>
			<Navbar  />
			<Box sx={{ flexGrow: 1, width: '90%', mx: 'auto', mt: '100px' }}>
				<Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={12} sm={6} md={6}>
					<MyTextField 
						id={'title'} 
						label={'Title'} 
						fullwidth={true}
						value={title}
						onChange={setTitle}
					/>
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
						label={'Description'} 
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
				<Grid item xs={12} sm={12} md={4} textAlign="center">
					<BasicDatePicker
						onDateChange={setDate}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} textAlign="center">
					<UploadImageButton multiple={true} handleImages={setImages} />
				</Grid>
				<Grid item xs={12} sm={12} md={4} textAlign="center">
					<SaveButton onClick={onSaveClick} disabled={images === undefined || titleError || folderError || date === null} />
				</Grid>
				</Grid>
			</Box>
			<hr style={{ margin: '30px', color: '#5cabe1' }} />
			<Box sx={{ flexGrow: 1, width: '90%', mx: 'auto', mt: '100px' }}>
				<Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{images && Array.from(images).map((image, index) => <UploadImageCard key={index} image={image} index={index} />)}
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
};

export default AddImage;