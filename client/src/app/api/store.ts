import { configureStore } from '@reduxjs/toolkit';
import etudiantReducer from "../../features/EtudiantSlice"


export const store = configureStore({
    reducer: {
        etudiant: etudiantReducer,
        
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;