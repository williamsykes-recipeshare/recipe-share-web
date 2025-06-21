import React from 'react';
import { Chip as MuiChip, ChipProps, darken, styled } from '@mui/material';
import themeVariables from '../../../theme/themeVariables';

type CustomChipProps = ChipProps

const StyledChip = styled(MuiChip)(({
    backgroundColor: themeVariables.colors.material.primary.main,
    height: 25,
    color: themeVariables.colors.material.white.main,
    fontWeight: 'bold',
    borderRadius: '16px',
    '& .MuiChip-deleteIcon': {
        color: themeVariables.colors.material.white.main,
        '&:hover': {
            color: darken(themeVariables.colors.material.white.main, 0.2),
        },
    },
    margin: '5px',
}));

const CustomChip = (props : CustomChipProps) : React.ReactElement => {
    return <StyledChip {...props} />;
};

export default CustomChip;