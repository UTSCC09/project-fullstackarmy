import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from "./components/Header"
import CurrentVaccStatus from "./components/tabs/CurrentVaxStatus";
import Tab3 from "./components/tabs/Tab3";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* TODO: Change names of components. Also to appropriate paths */}
          <Route path='/' 
                  element={<CurrentVaccStatus />} />
          <Route path='/tab3' 
                  element={<Tab3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;