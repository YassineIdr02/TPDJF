import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import App from './App.tsx'
import store from './app/api/store.ts';
import { getEtudiantAsync, getPromotionAsync } from './features/EtudiantSlice.ts';

store.dispatch(getEtudiantAsync())
store.dispatch(getPromotionAsync())

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
