import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../models/redux';

export const useAppSelector : TypedUseSelectorHook<RootState> = useReduxSelector;