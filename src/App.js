
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/landingpage'
import Analytics from './components/Analytics';
import Map from './components/Map';


function App() {
  return (
<Router>
      <div>
        <Routes>
       
          <Route path="/" element={<Landingpage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/map" element={<Map />} />
         
        </Routes>
      </div>
    
     
    </Router>
  );
}

export default App;
