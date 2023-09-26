import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import Sidebar from '../../components/Sidebar';


export default function Dashboard() {
  const { documents, error } = useCollection('projects');

  return (
    <div className="dashboard">
      <h2 className="page-title">Anasayfa</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}