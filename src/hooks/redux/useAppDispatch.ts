import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../models/redux';

export const useAppDispatch : () => AppDispatch = () => useDispatch<AppDispatch>();