import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface iBasicDatePicker {
	onDateChange: React.Dispatch<React.SetStateAction<Date | null>>
}

const BasicDatePicker = (props: iBasicDatePicker) => {
	const {
		onDateChange,
	} = props;

	const [value, setValue] = React.useState<Date | null>(null);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
		<DatePicker
			label="Date"
			value={value}
			onChange={newValue => {
				setValue(newValue);
				onDateChange(newValue);
				console.log(newValue);
			}}
		/>
		</LocalizationProvider>
	);
};

export default BasicDatePicker;
