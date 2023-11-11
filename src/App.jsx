import Signup from './components/Signup';
import LoadScreen from './components/loading';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function DashboardWraper() {
  const {userId} = useParams();
  return <Dashboard userId={userId} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:userId/dashboard" element={<DashboardWraper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
