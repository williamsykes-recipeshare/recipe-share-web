import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        'transparent' : true;
    }
}

const MuiAppBarTransparent : MuiCssStyle = {
    backgroundColor: 'transparent',

    padding: '20px 0px 20px 0px',
};

export default MuiAppBarTransparent;