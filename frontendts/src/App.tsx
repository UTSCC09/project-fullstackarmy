import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from "./components/Header"
import CurrentVaccStatus from "./components/tabs/CurrentVaxStatus";
import VaccRateForecast from "./components/tabs/VaccRateForecast";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* TODO: Change to appropriate paths */}
          <Route path='/'
                  element={<CurrentVaccStatus />} />
          <Route path='/vaccRateForecast' 
                  element={<VaccRateForecast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;