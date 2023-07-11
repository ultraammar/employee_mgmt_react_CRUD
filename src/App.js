
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpListing from './EmpListing';
import Navbar from './Navbar';
import EmpEdit from './EmpEdit';
import EmpDetails from './EmpDetails';
import EmpCreate from './EmpCreate';
import { useState } from 'react';


function App() {
  const [useCards, setUseCards] = useState(localStorage.getItem('useCards') === 'true' ? true : false);

  const handleChange = (event) => {
    const value = event.target.checked;
    setUseCards(value);
    localStorage.setItem('useCards', value);
  }


  return (
    <div className="App">
      <div className=' '>
        <BrowserRouter>
          <Navbar handleChange={handleChange}/>
          <Routes>
            <Route path="/" element={<EmpListing useCards={useCards}/>} />
            <Route path="/employees/create" element={<EmpCreate />} />
            <Route path="/employees/:id/edit" element={<EmpEdit />} />
            <Route path="/employees/:id" element={<EmpDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
      
      
    </div>
  );
}

export default App;
