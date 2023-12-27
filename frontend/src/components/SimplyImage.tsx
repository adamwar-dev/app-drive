import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { NO_IMAGE } from './Utils';

interface iSimplyImage {
	image ?: string;
	id: string;
	title: string;
	folderId: string;
}

const SimplyImage = (props: iSimplyImage) => {
	const { image, id, title, folderId } = props;

	return (
		<Card sx={{ maxWidth: 345, mx: 'auto' }}>
			<Link href={'/gallery/folder/' + folderId + '/image/' + id} underline={'none'}>
				<CardMedia
					component="img"
					height="140"
					image={image ?? NO_IMAGE}
					alt="Image"
				/>
			</Link>
			<CardContent>
				<Typography align='center' sx={{ fontSize: 20 }} noWrap>
					{title}
				</Typography>
			</CardContent>
	  </Card>
	);
};

export default SimplyImage; 