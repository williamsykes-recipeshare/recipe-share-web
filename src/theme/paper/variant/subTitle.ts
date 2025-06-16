import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        'sub-title' : true;
    }
}

const MuiPaperSubTitle : MuiCssStyle = {
    borderRadius: 0,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    paddingLeft: 14,
    paddingBottom: 11,
    paddingRight: 14,
};

export default MuiPaperSubTitle;