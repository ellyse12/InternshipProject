import './Create.css'

import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFirestore} from '../../hooks/useFirestore'
import {useHistory} from 'react-router-dom'
const categories = [
  {value:'kurumici',label:'Kurum Ici'},
  {value:'kurumdisi',label:'Kurum Disi'}
]


export default function Create() {
  const history = useHistory()
  const{addDocument,response} = useFirestore('projects')
  const {documents} = useCollection('users')
  const [users, setUsers] = useState([])
  const {user} = useAuthContext()
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [type,setType] = useState('')
  const [formError,setFormError] = useState(null)

  useEffect(()=>{
    if(documents){
      const options = documents.map(user => {
        return {value:user,label:user.displayName}
      })
    setUsers(options)
    }
  },[documents])
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    if(!category){
      setFormError('Please select a project category')
      return
    }
    if(assignedUsers.length<1){
      setFormError('Please assign at least 1 user')
      return
    }
   
    const createdBy = {
      displayName:user.displayName,
      photoURL:user.photoURL,
      id:user.uid
    }
    
    const assignedUsersList = assignedUsers.map((u)=>{
      return {
        displayName: u.value.displayName,
        photoURL:u.value.photoURL,
        id:u.value.id
      }
    })

    const project = {
      name,
      details,
      category:category.value,
      startDate: timestamp.fromDate(new Date(startDate)),
      dueDate: timestamp.fromDate(new Date(dueDate)),
      createdBy:createdBy,
      assignedUsersList

    }
  
    await addDocument(project)
    if(!response.error){
history.push('/')
    }
  }
  return (
    <div className="create-form">
      <h2 className="page-title">Yeni proje oluştur</h2>
      <form onSubmit={handleSubmit}>
      <label>
        <span>Proje adı:</span>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Proje detayları:</span>
        <textarea
          required
          type="text"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        ></textarea>
      </label>
      <label>
        <span>Başlangıç tarihi:</span>
        <input
          required
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </label>
      <label>
        <span>Bitiş tarihi:</span>
        <input
          required
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
      </label>
      <label>
        <span>Proje kategorisi:</span>
        <Select 
        onChange={(option)=>setCategory(option)}
        options={categories}/>
      </label>
      <label>
        <span>Görevlendirme:</span>
        <Select
        onChange={(option)=>setAssignedUsers(option)}
        options={users}
        isMulti
        />
      </label>


      <button className="btn">Proje oluştur</button>

      {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
