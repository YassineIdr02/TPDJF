import './App.css'
import { Routes, Route, BrowserRouter as Router, } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import StudentHome from './components/StudentHome';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />} >
            <Route index element={<StudentHome />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
