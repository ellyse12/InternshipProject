import {Link} from 'react-router-dom'
import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
//styles
import './Navbar.css'
import Sekerbank from '../assets/Şekerbank.svg'


export default function Navbar() {
  const {logout, isPending} = useLogout()
  const {user} = useAuthContext()
  return (
    <div className="navbar">
        <ul>
            <li className="logo">
              <img src={Sekerbank} alt="sekerbank logo" /> 
              <span>Proje Takip Sistemi</span>  
            </li> 
           {!user && (
            <>
            <li> <Link to="/login">Giriş</Link></li>
            <li><Link to="/signup">Kayıt ol</Link></li>
            </>
            )}

            {user &&(
            <li>
               {!isPending && <button className="btn" onClick={logout}>Çıkış yap</button>}
               {isPending && <button className="btn" disabled>Çıkılıyor...</button>}
            </li>
            )}
        </ul>
    </div>
  )
}
