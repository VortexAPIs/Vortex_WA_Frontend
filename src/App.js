import {BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import './App.css';
import Index from './Website/Components/Main/index';
import PrivacyPolicy from './Website/Components/Privacy/PrivacyPolicy'
import TermsOfService from './Website/Components/Terms/Terms'
import Signup from './Authentication/Signup/Signup';
import Login from './Authentication/Login/Login';
import ForgetPass from './Authentication/ForgetPassword/ForgetPass';
import ResetPass from './Authentication/ResetPassword/ResetPass';
import Dashboard from './Dashboard/Main/Main';
import Layout from './Dashboard/Layout'
import CreateAnnouncement from './Dashboard/Announcement/CreateAnnouncement';
import CreateBroadcast from './Dashboard/Broadcast/CreateBroadcast';
import ApiDocs from './Dashboard/Documentation/ApiDocs';
import MessageLogs from './Dashboard/Logs/logs';
import FileToBase64 from './Dashboard/Tools/FileToBase64';
import WhatsappNumber from './Dashboard/Tools/WhatsappNumber';
import Subscription from './Dashboard/Billing/Subscription';
import CreateTicket from './Dashboard/Tickets/createTicket';
import ViewTickets from './Dashboard/Tickets/viewTickets';
import TicketDetails from './Dashboard/Tickets/TicketDetails';
import ViewAnnouncement from './Dashboard/Announcement/ViewAnnouncements';
import AnnouncementDetails from './Dashboard/Announcement/AnnouncementDetails';
import ViewBroadcast from './Dashboard/Broadcast/ViewBroadcast';
import BroadcastDetails from './Dashboard/Broadcast/BroadcastDetails';
import Profile from './Dashboard/Profile/Profile';
import CompanyDetails from './Dashboard/Profile/CompanyDetails';
// import MouseTrackingBackground from './Website/MouseTrackingBackground';
import loader from './Website/Assets/Vortex_Loader.gif';
import Gsheet from './Dashboard/Integration/Gsheet';

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loader} height={79} width={219} alt='Vortex Loader' />
    </div>
  );
};

const LoaderWrapper = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    // Trigger the loader when the route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set a delay to simulate loading time, adjust as needed.

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      {/* Your routes go here */}
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<TermsOfService />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<ForgetPass />} />
        <Route path='/reset-password/:token' element={<ResetPass />} />
        <Route path='/dashboard' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='createAnnouncement' element={<CreateAnnouncement />} />
          <Route path='viewannouncements' element={<ViewAnnouncement />} />
          <Route path='announcement' element={<AnnouncementDetails />} />
          <Route path='createBroadcast' element={<CreateBroadcast />} />
          <Route path='viewbroadcast' element={<ViewBroadcast />} />
          <Route path='broadcast' element={<BroadcastDetails />} />
          <Route path='apiDocs' element={<ApiDocs />} />
          <Route path='logs' element={<MessageLogs />} />
          <Route path='base64' element={<FileToBase64 />} />
          <Route path='check-whatsapp-number' element={<WhatsappNumber />} />
          <Route path='subscribe' element={<Subscription />} />
          <Route path='createTicket' element={<CreateTicket />} />
          <Route path='viewTickets' element={<ViewTickets />} />
          <Route path='ticket' element={<TicketDetails />} />
          <Route path='profile' element={<Profile />} />
          <Route path='companydetails' element={<CompanyDetails />} />
          <Route path='gSheet' element={<Gsheet />} />
        </Route>
      </Routes>
    </>
  );
};
const App = () => {
  return (
    <Router>
      <LoaderWrapper />
    </Router>
  );
};

export default App;