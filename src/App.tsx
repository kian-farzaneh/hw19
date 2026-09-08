import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherPage from "./pages/weatherPage/weatherPage";


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/signin_page" element={<SigninPage />} />
          <Route path="/signup_page" element={<SignupPage />} /> */}
          <Route path="/" element={<WeatherPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
