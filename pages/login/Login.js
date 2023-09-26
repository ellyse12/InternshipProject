import './Login.css'
import { useState } from 'react'
import React from 'react'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login,error,isPending} = useLogin()
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email,password)

  }

 
  return (
    <div>
        <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Giriş yap</h2>
        <label>
          <span>Email:</span>
          <input required 
          type="email" 
          onChange={(e)=>setEmail(e.target.value)} 
          value={email}
          /> 
        </label>
        <label>
          <span>Şifre:</span>
          <input required 
          type="password" 
          onChange={(e)=>setPassword(e.target.value)} 
          value={password}
          /> 
        </label>      
        {!isPending &&<button className="btn">Giriş yap</button>}
        {isPending &&<button className="btn" disabled>Giriş yapılıyor...</button>}
        {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}
