import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Alert } from '@mui/material';

const style = {
position: 'absolute' as 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 400,
bgcolor: 'background.paper',
border: '2px solid #000',
boxShadow: 24,
p: 4,
};

type action = 'add' | 'edit' | 'delete' | 'error';

export interface iCustomModal {
	isModal: boolean;
	action: action;
	actionText: string;
	exitText: string;
	exitLink: string;
	redirect: boolean;
}

interface iCustomModalFunction extends iCustomModal {
	changeModal: React.Dispatch<React.SetStateAction<iCustomModal>>
}

export default function CustomModal(props: iCustomModalFunction) {
	const {
		isModal,
		action,
		actionText,
		exitText,
		exitLink,
		redirect,
		changeModal,
	} = props;

	const onClose = () => {
		if (redirect) {
			window.location.replace(exitLink);
		} else {
			changeModal(prevState => ({
				...prevState,
				isModal: false,
			}));
		}
	}

	return (
		<React.Fragment>
			<Modal
				open={isModal}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{action === 'error' &&
						<Alert severity="error">
							{'An error occured'}
						</Alert>
					}
					{action !== 'error' &&
						<Alert severity="success">
							{actionText}
						</Alert>
					}
					<Button 
						onClick={onClose}
						fullWidth
						sx={{color: '#002f34', mt:'10px', border:'1px solid #002f34', ':hover': {color: '#fff', backgroundColor: '#002f34'}}}
					>
						{exitText}
					</Button>
				</Box>
			</Modal>
		</React.Fragment>
	);
}