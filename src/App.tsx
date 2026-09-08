import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherPage from "./pages/weatherPage/weatherPage";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WeatherPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
