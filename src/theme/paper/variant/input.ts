import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        input : true;
    }
}

const MuiPaperInput : MuiCssStyle = {
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 0,
    borderTopLeftRadius: 23,
    borderBottomLeftRadius: 23,
};

export default MuiPaperInput;