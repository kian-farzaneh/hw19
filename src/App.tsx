import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import SigninPage from "./pages/signinPage/signinPage";
import SignupPage from "./pages/singupPage/signupPage";
import WeatherPage from "./pages/weather/weather";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin_page" element={<SigninPage />} />
          <Route path="/signup_page" element={<SignupPage />} />
          <Route path="/weather_page" element={<WeatherPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
