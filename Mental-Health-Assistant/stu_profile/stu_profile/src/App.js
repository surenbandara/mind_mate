import './App.css';
import './style/dashboardstyle.css';
import Navbar from './component/Nav_Bar';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router ,Route ,Routes} from 'react-router-dom';
import Session from './component/Session';
import Community from './component/Community';
import { useState, useEffect ,setState } from 'react';


function App() {
  const [content_, setContent] = useState(0);
  //const [component, setComponent] = useState(Dashboard);
  const [component, setComponent] = useState(<Dashboard></Dashboard>);

  const handlechage = (index) =>{
    console.log("_________________________________")
    console.log(index)
    setContent(index);
  }

  useEffect(() => {
    console.log("COOontent")
    console.log(content_)
    switch (content_) {
      case 0:
        setComponent(<Dashboard></Dashboard>);
        break;
      case 1:
        setComponent(<Session></Session>);
        break;
      case 2:
        setComponent(<Community></Community>);
        break;
      default:
        setComponent(<Dashboard></Dashboard>);
    }
  }, [content_]);

  return (
    <>
      <Navbar setContent={handlechage}></Navbar>
      <Router>
        <Routes>
          <Route path="/account" element={component} />

        </Routes>
      </Router>
    </>
  );
}

export default App;

