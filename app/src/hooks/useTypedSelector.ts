import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@services/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
