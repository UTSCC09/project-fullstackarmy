import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DataSources } from "./components/DataSources";
import { Credits } from "./components/Credits";
import { InfoTab } from "./components/tabs/InfoTab";
import { StatusTab } from "./components/tabs/StatusTab";
import { RatesTab } from "./components/tabs/RatesTab";
import { DistributionTab } from "./components/tabs/DistributionTab";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* <Route path= "/" element={<><Header /></>}></Route> */}
          <Route path= "/" element={<><Header /> <InfoTab /> </>}></Route>
          <Route path= "/vaccination-status" element={<><Header /> <StatusTab /> </>}></Route>
          <Route path= "/vaccination-rates" element={<><Header /> <RatesTab /> </>}></Route>
          <Route path= "/vaccination-distribution" element={<><Header /> <DistributionTab /> </>}></Route>
          <Route path= "/datasources" element={<><Header /><DataSources/></>}></Route>
          <Route path= "/credits" element={<><Header /><Credits/></>}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;