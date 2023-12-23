import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MyTextField from '../../components/TextField';
import TagItem from '../../components/TagItem';
import { iTag, ImageDataProvider } from '../../data/ImageDataProvider';
import { regexEmpty } from '../../components/Utils';
import Loader from '../../components/Loader';
import CustomModal, { iCustomModal } from '../../components/CustomModal';

const Tags = () => {
	const [jwtToken, setJwtToken] = useState('');

	const [tags, changeTags] = React.useState<iTag[]>([]);
	const [newTag, setNewTag] = React.useState('');
	
	const [emptyNewTag, seEmptyNewTag] = React.useState(true);

	const [loader, setLoader] = React.useState(true);
	const [modal, setModal] = React.useState<iCustomModal>({
		isModal: false,
		action: 'error',
		actionText: '',
		exitText: '',
		exitLink: '',
		redirect: false,
	});

	// ComponentDidMount

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		if (token) {
			getTags(token);
			setJwtToken(localStorage.getItem('jwtToken') ?? '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// validation
	useEffect(() => {
		seEmptyNewTag(!regexEmpty.test(newTag));
	}, [newTag]);


	// Methods
	const getTags = (jwtToken: string) => {
		setLoader(true);
		ImageDataProvider.getTag(jwtToken)
		.then((response) => {
			if (typeof response === typeof tags) {
				changeTags(response as iTag[]);
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

	const onAddTagClick = () => {
		return ImageDataProvider.addTag(jwtToken, newTag)
		.then(status => {
			if (status === 200) {
				getTags(jwtToken);
				setModal({
					isModal: true,
					action: 'add',
					actionText: 'New tag created succesfully!',
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
			console.log(status);
		});
	}

	const onDeleteTagClick = (jwtToken: string, id: string) => {
		return ImageDataProvider.deleteTag(jwtToken, id)
		.then(status => {
			if (status === 200) {
				getTags(jwtToken);
				setModal({
					isModal: true,
					action: 'delete',
					actionText: 'Tag deleted succesfully!',
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

	// Prerender
	const renderTags = tags.map(tag => (
		<TagItem
			jwtToken={jwtToken}
			name={tag.name}
			id={tag.id}
			onDelete={onDeleteTagClick}
		/>
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
						<AccountCircleRoundedIcon sx={{fontSize: '150px', color: '#1976d2', mt: '50px'}}/>
					</Grid>
					<Grid item xs={12}>
						<Typography component="h1" variant="h5" sx={{color: '#1976d2'}}>
							{'User\'s tags'}
						</Typography>
					</Grid>
					<Grid item xs={9}>
						<MyTextField 
							id={'newTag'} 
							label={'Add tag'}
							fullwidth={true}
							value={newTag}
							onChange={setNewTag}
						/>
					</Grid>
					<Grid item xs={3}>
						<Button fullWidth disabled={emptyNewTag} onClick={onAddTagClick} variant="contained" sx={{height: '56px'}}>
							{'Add'}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<hr style={{ color: '#5cabe1' }} />
					</Grid>
					{renderTags}
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

export default Tags;