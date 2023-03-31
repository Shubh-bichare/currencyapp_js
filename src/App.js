
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import React from 'react';
import Home from './Component/Home';
import Coins from './Component/Coins';
import Exchanges from './Component/Exchanges';
import CoinsDetails from './Component/CoinsDetails';
import Header from './Component/Header';
import Footer from './Component/Footer';

const App = () => {
  return (
       <Router>
        <Header/>
     <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/coins' element={<Coins/>} />
    <Route path='/exchanges' element={<Exchanges/>} />
    <Route path='/coin/:id' element={<CoinsDetails/>} />
     </Routes>
     <Footer />
       </Router>    
  )
}

export default App