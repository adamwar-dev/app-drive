import * as React from 'react';
import TextField from '@mui/material/TextField';

interface iTextField {
	id?: string;
	label?: string;
	fullwidth?: boolean;
	multiline?: boolean;
	maxRows?: number;
	rows?: number;
	value : string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
}

const MyTextField = (props: iTextField) => {
	const { 
		id,
		label,
		fullwidth, 
		multiline, 
		maxRows, 
		rows,
		value,
		onChange,
	} = props;

	return (
		<React.Fragment>
			<TextField 
				id={id} 
				label={label}
				multiline={multiline}
				maxRows={maxRows}
				fullWidth={fullwidth}
				rows={rows} 
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</React.Fragment>
	);
};

export default MyTextField;