import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './ExportToExcel.css';
import Excel from '../assets/excel.svg';
import firebase from 'firebase/app';
import 'firebase/firestore';


const ExportToExcel = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectCollection = await firebase.firestore().collection('projects').get();
      const projectData = projectCollection.docs.map(doc => doc.data());
      setProjects(projectData);
    };

    fetchData();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(projects);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `projects.xlsx`);
  };

  return (
    <button className="export-button" onClick={exportToExcel}>
      <img src={Excel} alt="add project icon" />
      Excel'e aktar
    </button>
  );
};

export default ExportToExcel;
