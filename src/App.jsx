import Signup from './components/Signup';
import LoadScreen from './components/loading';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Budgetexpense from './components/budgetexpense';
import Upi from './components/upi';

function DashboardWraper() {
  const {userId} = useParams();
  return <Dashboard userId={userId} />
}

function BudgetWraper() {
  const {userId} = useParams();
  return <Budgetexpense userId={userId} />
}

function UpiWraper() {
  const {userId} = useParams();
  return <Upi userId={userId} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:userId/dashboard" element={<DashboardWraper />} />
        <Route path="/:userId/budgetexpense" element={<BudgetWraper />} />
        <Route path="/:userId/upidemo" element={<UpiWraper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
