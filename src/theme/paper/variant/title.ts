import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        title : true;
    }
}

const MuiPaperTitle : MuiCssStyle = {
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 0,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    paddingLeft: 14,
    paddingBottom: 11,
    paddingRight: 14,
};

export default MuiPaperTitle;