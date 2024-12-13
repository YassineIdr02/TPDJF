import './App.css'
import { Routes, Route, BrowserRouter as Router, } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import { Home } from './layouts/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<StudentHome />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
