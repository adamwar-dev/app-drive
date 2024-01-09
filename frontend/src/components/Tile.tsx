import { Card, CardContent, Link, Typography } from '@mui/material';
import React from 'react';

interface iTile {
	linkTo: string;
	text: string;
}

const Tile = (props: iTile) => {
	const { text, linkTo } = props;

	return (
		<React.Fragment>
			<Card sx={{ height: 240, mx: '40px' }} elevation={2}>
				<Link href={linkTo} underline={'none'}>
					<CardContent sx={{ height: 240 }}>
						<Typography align="center" sx={{ fontSize: 24, mt: '82px', color: '#1976d2' }}>
							{text}
						</Typography>
					</CardContent>
				</Link>
			</Card>
		</React.Fragment>
	);
};

export default Tile;