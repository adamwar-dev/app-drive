import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';

interface iTagImage {
	name: string;
	id: string;
	onTagDelete: () => void;
}

const TagImage = (props: iTagImage) => {
	const [color, setColor] = React.useState("#000");

	const colorArray = ['#0aa1dd', '#00b4d8', '#5cabe1',' #1976d2', '#039193', '#08b1b6']
	const randomElement = colorArray[Math.floor(Math.random() * colorArray.length)];

	React.useEffect(() => {
		setColor(randomElement);
	 }, []);

	const {
		name,
		id,
		onTagDelete,
	} = props;

	return (
		<React.Fragment>
			<Card elevation={2} sx={{backgroundColor: color}}>
				<CardContent sx={{p: '10px !important'}}>
					<Grid container spacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={9}> 
							<Typography sx={{ fontSize: 14, color: '#fff' }} style={{wordWrap: 'break-word'}}>
								{name}
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<IconButton onClick={onTagDelete} aria-label="delete" size="small" sx={{':hover': {backgroundColor: '#ff5252'}}}>
								<DeleteIcon sx={{color: '#fff', fontSize: '14px'}}/>
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</React.Fragment>
	);
};

export default TagImage;
