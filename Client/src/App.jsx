import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/login/LoginPage';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'

export default function App() {
  return (
    <>
   	<BrowserRouter>
      <Routes>
      	<Route path="/" element={<Navbar />}>
      		<Route index element={<Home />} />
      		<Route path="dashboard" element={<Dashboard />} />
			<Route path="login" element={<LoginPage />} />
		</Route>
      </Routes>
    </BrowserRouter>
 	<Footer/>
    </>
  );
}
