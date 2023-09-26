import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import './Announce.css'
const Announcements = () => {
  const [usersWithBirthdays, setUsersWithBirthdays] = useState([]);

  useEffect(() => {
    const fetchUsersWithBirthdays = async () => {
      const currentMonth = new Date().getMonth() + 1;

      try {
        const usersSnapshot = await projectFirestore.collection('users').get();

        const users = usersSnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });

        const usersThisMonth = users.filter(user => {
          const userBirthdayMonth = new Date(user.birthday).getMonth() + 1;
          return userBirthdayMonth === currentMonth;
        });

        setUsersWithBirthdays(usersThisMonth);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsersWithBirthdays();
  }, []);

  return (
    <div>
      <h2>Duyurular</h2>
      <ul>
        {usersWithBirthdays.map(user => (
          <li key={user.id}>{user.displayName} doğum günü yaklaşıyor! {user.birthday}</li>        
        ))}
      </ul>
    </div>
  );
}

export default Announcements;
