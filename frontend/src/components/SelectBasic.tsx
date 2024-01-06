import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { iSimplyFolder } from '../data/GalleryDataProvider';

interface iSelectBasic {
	folders: iSimplyFolder[];
	onFolderChange: React.Dispatch<React.SetStateAction<iSimplyFolder>>;
	label?:string;
}

const SelectBasic = (props: iSelectBasic) => {
	
	const {
		folders,
		onFolderChange,
		label,
	} = props;

	const [selectedFolder, setSelectedFolder] = React.useState<iSimplyFolder>({folderName: '', id: ''});

	const handleChange = (event: SelectChangeEvent) => {
		const folder: iSimplyFolder = {
			folderName: event.target.value,
			id: getFolderId(event.target.value),
		}
		console.log(folder.id);
		setSelectedFolder(folder);
		onFolderChange(folder);
	};

	const getFolderId = (folderName: string) => {
		let id = '';
		folders.forEach(f => {
			if (f.folderName === folderName) {
				id = f.id;
			}
		});
		return id;
	}

	const menuItems = folders.map(folder => (
		<MenuItem value={folder.folderName}>{folder.folderName}</MenuItem>
	));

	return (
		<Box sx={{ minWidth: 100 }}>
		<FormControl fullWidth>
			<InputLabel id="select-basic-label">{label ?? 'Folder'}</InputLabel>
			<Select labelId="select-basic-label" id="select-basic" value={selectedFolder.folderName} label="Folder" onChange={handleChange}>
				{menuItems}
			</Select>
		</FormControl>
		</Box>
	);
};

export default SelectBasic;
