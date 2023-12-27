import { Link, Typography } from "@mui/material";

export function Copyrights(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				{'AW PC WW'}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}