import { styled } from '@mui/material';
import { MaterialDesignContent } from 'notistack';
import theme from '../../../theme/material';

const WarningSnackbarMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-warning': {
        backgroundColor: theme.palette.warning.main,
    },
}));

export default WarningSnackbarMaterialDesignContent;