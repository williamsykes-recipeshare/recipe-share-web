import { MuiCssStyle } from '../../../models/helper';

const MuiTextFieldStandard : MuiCssStyle = {
    '& .MuiInput-root': {
        color: 'white',
        '&:before': {
            borderBottom: '2px solid white',
        },
        '&:after': {
            borderBottom: '2px solid white',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid white',
        },
    },

    '& .MuiInput-input': {
        color: 'white',
    },

    '& .MuiInputAdornment-root': {
        color: 'white',
    },

    '& .MuiInputLabel-root': {
        color: 'white',

        '&.Mui-focused': {
            color: 'white',
        },
    },

    '& .MuiSvgIcon-root': {
        color: 'white',
    },

    '& .MuiInput-root.Mui-focused:after': {
        borderBottom: '2px solid white',
    },
};

export default MuiTextFieldStandard;
