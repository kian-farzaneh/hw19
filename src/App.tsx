import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import SigninPage from './pages/signinPage/signinPage';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/signin_page' element={<SigninPage />}/>
        </Routes>
      </Router>
    </>
    
  )
}

export default App
