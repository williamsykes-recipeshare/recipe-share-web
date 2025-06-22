import { createTheme, responsiveFontSizes } from '@mui/material';
import themeVariables from './themeVariables';
import MuiFormHelperTextError from './formHelperText/error';
import { MuiPaper } from './paper';
import { MuiAppBar } from './appbar';
import { MuiAvatar } from './avatar';
import { MuiTypography } from './typography';
import { MuiButton } from './button';
import { MuiTextField } from './textField';

const materialTheme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'Arial',
        ].join(','),
    },
    palette: themeVariables.colors.material,
    components: {
        MuiAvatar,
        MuiPaper,
        MuiAppBar,
        MuiTypography,
        MuiButton,
        MuiTextField,
        MuiFormHelperText: {
            variants: [{
                props: {
                    error: true,
                },
                style: MuiFormHelperTextError,
            }],
        },
    },
});

const theme = responsiveFontSizes(materialTheme);

export default theme;
