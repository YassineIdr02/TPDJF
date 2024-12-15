import './App.css'
import { Routes, Route, HashRouter as Router, } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import { Home } from './layouts/Home';
import PromotionHome from './components/Promotions/PromotionHome';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<StudentHome />} />
            <Route path='/promotions' element={<PromotionHome />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
