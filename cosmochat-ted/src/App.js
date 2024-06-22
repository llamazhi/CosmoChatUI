import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Activity from './pages/Activity';
import MessagePanel from './pages/MessagePanel';
import CIcon from '@coreui/icons-react';
import { cilBarChart, cilHome } from '@coreui/icons';
import Nav from 'react-bootstrap/Nav';
import ChatSession from './pages/ChatSession';

function App() {
  return (
    <Router>
      <Nav as="ul">
        <Nav.Item as="li">
          <Nav.Link href='/activity'><CIcon icon={cilBarChart} width={20} height={20} /></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href='/'><CIcon icon={cilHome} width={20} height={20} /></Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path='/' element={<MessagePanel />}/>
        <Route path='/activity' element={<Activity />} />
        <Route path='/chat' element={<ChatSession />}/>
      </Routes>
    </Router>
  );
}

export default App;
