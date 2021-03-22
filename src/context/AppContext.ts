import { createContext } from 'react';
import { DataState } from '../enums/DataState';

interface IAppContext {
    readonly dataState: DataState,
    readonly username: string,
    readonly setUsername: (username: string) => void,
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
