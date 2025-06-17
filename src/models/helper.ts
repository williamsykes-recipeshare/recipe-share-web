import { CSSInterpolation, Interpolation, Theme } from '@mui/material';

export type MuiCssStyle = CSSInterpolation;
export type MuiStyleInterpolation = Interpolation<{ theme : Theme }>;
export type CustomMouseEvent<T = HTMLButtonElement | HTMLInputElement | HTMLLIElement> = React.MouseEvent<T>;