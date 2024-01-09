import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface iLoader {
  mt?: string;
  size?: number;
}

export default function Loader(props: iLoader) {
  const {
    mt,
    size,
  } = props;
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress  size={size ?? 200} sx={{mt: mt ?? '300px', mx: 'auto', color: '#1976d2'}}/>
    </Box>
  );
}