import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Header } from "./components/Header";
import {TabNav} from "./components/TabNav";
import { Footer } from "./components/Footer";
import { DataSources } from "./components/DataSources";
import { Credits } from "./components/Credits";
import { InfoTab } from "./components/tabs/InfoTab";
import { StatusTab } from "./components/tabs/StatusTab";
import { RatesTab } from "./components/tabs/RatesTab";
import { DistributionTab } from "./components/tabs/DistributionTab";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components:{
    MuiButton:{
      styleOverrides: {
        root: {
          color:'#00acea'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#00acea',
    },
  },
  typography: {
    button:{
      textTransform: 'none',
    }, 
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            {/* <Route path= "/" element={<><Header /></>}></Route> */}
            <Route path= "/" element={<><TabNav selected="one"/> <InfoTab /></>}></Route>
            <Route path= "/vaccination-status" element={<><TabNav selected="two"/> <StatusTab /></>}></Route>
            <Route path= "/vaccination-rates" element={<><TabNav selected="three" /> <RatesTab /></>}></Route>
            <Route path= "/vaccination-distribution" element={<> <TabNav selected="four" /> <DistributionTab /></>}></Route>
            <Route path= "/datasources" element={<DataSources/>}></Route>
            <Route path= "/credits" element={<Credits/>}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;