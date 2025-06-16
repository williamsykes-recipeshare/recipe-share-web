import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        card : true;
    }
}

const MuiPaperCard : MuiCssStyle = {
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 0,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    paddingLeft: 18,
    paddingTop: 14,
    paddingBottom: 10,
    paddingRight: 7,
};

export default MuiPaperCard;