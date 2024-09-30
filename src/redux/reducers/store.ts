import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { commentsReducer } from './commentReducer';
import {thunk} from 'redux-thunk';
import { CommentsActionTypes } from '../types';

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['comments'],
};

const rootReducer = combineReducers({
    comments: commentsReducer,
});

const persistedReducer = persistReducer<RootState, CommentsActionTypes>(persistConfig, rootReducer as unknown as Reducer<RootState, CommentsActionTypes>);

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store as any);