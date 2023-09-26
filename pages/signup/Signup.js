import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './Signup.css'
import Select from 'react-select'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [team, setTeam] = useState('')
  const [birthday, setBirthday] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)

  const { signup, isPending, error } = useSignup()

  const roleOptions = [
    { value: 'analist', label: 'Analist' },
    { value: 'takim_lideri', label: 'Takım Lideri' },
    { value: 'junior_developer', label: 'Junior Developer' },
    { value: 'dba', label: 'Database Administrator' },
    { value:'staj',label:'Stajyer'}
  ];

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, team, birthday, selectedRole, thumbnail)
  }
  

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]

    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file must be less than 100kb')
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Kayıt ol</h2>
      <label>
        <span>Email:</span>
        <input required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Şifre:</span>
        <input required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>İsim ve soyisim:</span>
        <input required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Bulunduğunuz ekip:</span>
        <input required
          type="text"
          onChange={(e) => setTeam(e.target.value)}
          value={team}
        />
      </label>
      <label>
        <span>Doğum Günü:</span>
        <input
          required
          type="date"
          onChange={(e) => setBirthday(e.target.value)}
          value={birthday}
        />
      </label>
      <label>
        <span>Rol:</span>
        <Select
          value={selectedRole}
          onChange={handleRoleChange}
          options={roleOptions}
          placeholder="Rolünüzü seçin"
        />
      </label>
      <label>
        <span>Kullanıcı fotoğrafı:</span>
        <input required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Kaydol</button>}
      {isPending && <button className="btn" disabled>Yükleniyor</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
