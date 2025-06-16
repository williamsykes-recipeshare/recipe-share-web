import { styled } from '@mui/material';
import { MaterialDesignContent } from 'notistack';
import theme from '../../../theme/material';

const SuccessSnackbarMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
        backgroundColor: theme.palette.success.main,
    },
}));

export default SuccessSnackbarMaterialDesignContent;