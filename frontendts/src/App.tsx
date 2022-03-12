import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from "./components/Header"
import Tab2 from "./components/tabs/Tab2";
import Tab3 from "./components/tabs/Tab3";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* TODO: Change names of components. Also to appropriate paths */}
          <Route path='/tab2' 
                  element={<Tab2 />} />
          <Route path='/' 
                  element={<Tab3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;