import { Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { createImage, getDateFromISO, NO_IMAGE } from '../../components/Utils';
import TagImage from '../../components/TagImage';
import { ImageDataProvider, iReceivedImage } from '../../data/ImageDataProvider';
import Loader from '../../components/Loader';
import CustomModal, { iCustomModal } from '../../components/CustomModal';
import { useParams } from 'react-router-dom';

const Photo = () => {

	const [jwtToken, setJwtToken] = useState('');

    const { folderId, id } = useParams();

	const [image, setImage] = useState<iReceivedImage>({
		title: '',
		description: '',
		folderId: '',
		tags: [],
		date: null,
		image: '',
		id: '',
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
		const token = localStorage.getItem('jwtToken');
		if (token) {
			getImage(token);
			setJwtToken(localStorage.getItem('jwtToken') ?? '');
		}
	}, []);

	const getImage = (jwtToken: string) => {
		setLoader(true);
		ImageDataProvider.getImage(jwtToken, id ?? '', folderId ?? '')
		.then((response) => {
			if (typeof response === typeof image) {
				setImage(response as iReceivedImage);
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

	const deleteImage = () => {
		setLoader(true);
		ImageDataProvider.deleteImage(jwtToken, id ?? '')
		.then((status) => {
			if (status === 200) {
				setModal({
					isModal: true,
					action: 'delete',
					actionText: 'Image deleted succesfully!',
					exitText: 'Go to Gallery',
					exitLink: '/gallery',
					redirect: true,
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
		})
		setLoader(false);
	}

	const deleteImageTag = (jwtToken: string, id: string) => {
		ImageDataProvider.deleteImageTag(jwtToken, id)
		.then(response => {
			if (response === 200) {
				getImage(jwtToken);
				setModal({
					isModal: true,
					action: 'delete',
					actionText: 'Image tag deleted succesfully!',
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
		})
	}

	function downloadUrl() {
		Object.assign(document.createElement('a'), { href: createImage(image.image), download: image.title }).click();
	}
 
	const renderTags = image.tags.map((tag, index) => (
		<Grid item xs={6} sm={4} md={3}>
			<TagImage key={index} name={tag.name} id={tag.id} onTagDelete={() => deleteImageTag(jwtToken, tag.id)}/>
		</Grid>
	));

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
					<Grid item xs={10}>
						<Card sx={{ maxWidth: '100%', mx: 'auto', mt: '50px' }}>
							<CardHeader
								title={image.title}
								subheader={getDateFromISO(image.date)}
							/>
							<CardMedia
								component="img"
								height="400" 
								image={image.image ? createImage(image.image) : NO_IMAGE}
								alt="no image"	
							/>
							<CardContent>
								<Typography sx={{mb: '30px'}}>
									{image.description}
								</Typography>
								<Grid container spacing={1} columnSpacing={{ xs: 1 }} alignItems='center' textAlign={'center'}>
									{renderTags}
								</Grid>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={2}>
						<Button fullWidth onClick={downloadUrl} variant="contained" sx={{height: '56px', mb: '30px'}}>
							{'Save'}
						</Button>
						<Button fullWidth href={'/gallery/folder/' + folderId + '/image/' + id + '/edit'} variant="contained" sx={{height: '56px', mb: '30px'}}>
							{'Edit'}
						</Button>
						<Button fullWidth onClick={deleteImage} variant="contained" sx={{height: '56px'}}>
							{'Delete'}
						</Button>
					</Grid>
					<Grid item xs={4}>
						
					</Grid>
					<Grid item xs={4}>

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

export default Photo;
