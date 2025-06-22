import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        page : true;
    }
}

const MuiPaperPage : MuiCssStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    paddingTop: 14,
    overflowX: 'auto',
    overflowY: 'auto',
};

export default MuiPaperPage;