import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from '../authentication/SignIn';
import SignUp from '../authentication/SignUp';
import { ColorModeContext } from '../context/ColorModeProvider';
import { Credits } from '../Credits';
import { Footer } from '../Footer';
import { Header } from '../Header';
import TabNav from '../TabNav';
import DistributionTab from '../tabs/DistributionTab';
import { InfoTab } from '../tabs/InfoTab';
import RatesTab from '../tabs/RatesTab';
import StatusTab from '../tabs/StatusTab';

interface Props {}

const RouterComponent: React.FC<Props> = () => {
  const { darkMode } = React.useContext(ColorModeContext);

  return (
    <Router>
      <div
        className='app'
        style={{
          backgroundColor: darkMode ? '#303030' : 'white',
        }}
      >
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <div id='no-scroll'>
                <>
                  <TabNav selected='one' /> <InfoTab />
                </>
              </div>
            }
          ></Route>
          <Route
            path='/vaccination-status'
            element={
              <>
                <TabNav selected='two' /> <StatusTab />
              </>
            }
          ></Route>
          <Route
            path='/vaccination-rates'
            element={
              <>
                <TabNav selected='three' /> <RatesTab />
              </>
            }
          ></Route>
          <Route
            path='/vaccination-distribution'
            element={
              <>
                {' '}
                <TabNav selected='four' /> <DistributionTab />
              </>
            }
          ></Route>
          <Route path='/credits' element={<Credits />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default RouterComponent;
