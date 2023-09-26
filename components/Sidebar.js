import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import ExportToExcel from './ExportToExcel';
import { useAuthContext } from '../hooks/useAuthContext';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import Notify from '../assets/notify.svg'
import './Sidebar.css';
import { useCollection } from '../hooks/useCollection';

export default function Sidebar() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('projects'); // Fetch projects directly in Sidebar
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hoşgeldin, {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Ana sayfa</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>Yeni proje ekle</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/announcements">
                <img src={Notify} alt="notify icon"/>
                <span>Duyurular</span>
              </NavLink>
            </li>
            <li>      
              
              <ExportToExcel data={documents} filename="Projects" />
            </li>
            
            
          </ul>
        </nav>
      </div>
    </div>
  );
}
