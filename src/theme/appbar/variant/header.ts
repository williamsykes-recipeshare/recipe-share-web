import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        'header' : true;
    }
}

const MuiAppBarHeader : MuiCssStyle = {
    fontWeight: 700,
    fontSize: 12,
    height: 34,
    minHeight: 34,
    padding: '0px 12px',
    '&&& .MuiToolbar-root': {
        height: 34,
        minHeight: 34,
        padding: '0px 12px',
    },
};

export default MuiAppBarHeader;