import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { thunk } from 'redux-thunk';
import { commentsReducer } from './commentReducer';

// Define the RootState type based on your rootReducer
const rootReducer = combineReducers({
    comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState

// Persist config for the RootState
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key: 'root',
    storage,
    whitelist: ['comments'], // Keep only 'comments' reducer persisted
};

// Persist the reducer
const persistedReducer = persistReducer(persistConfig as any, rootReducer as any);

// Create the store with the persisted reducer and thunk middleware
export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// Persistor for the store
export const persistor = persistStore(store as any);