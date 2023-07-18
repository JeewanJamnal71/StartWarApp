import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import starWarDataSlice from "./slices/starwarDataSlice";
import starWarHomeSlice from "./slices/starWarHomeSlice";

const rootReducer = combineReducers({
    starwarReducer: starWarDataSlice.reducer,
    starWarHomeReducer: starWarHomeSlice.reducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializableCheck middleware for now
  }),
});


export const persistor = persistStore(store); 