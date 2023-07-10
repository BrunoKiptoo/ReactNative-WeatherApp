
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/landingpage';


function App() {
  return (
<Router>
      <div>
        <Routes>
       
          <Route path="/" element={<Landingpage />} />
         
        </Routes>
      </div>
    
     
    </Router>
  );
}

export default App;
