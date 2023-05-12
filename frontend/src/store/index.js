import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer  from './userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer,FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist";

// combineReducers로 reducer들을 합친다.
const rootReducer = combineReducers({
    user:userReducer,
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        serializableCheck: {
            ignoredActions:[FLUSH, REHYDRATE,PAUSE,PERSIST, PURGE,REGISTER]
        }
    })
})

export const persistor = persistStore(store)