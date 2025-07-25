import axios from 'axios';
import { useEffect, useState } from 'react';
import './Subjects.css';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [classFilter, setClassFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  useEffect(() => {
    axios.get('/fake-subjects.json')
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const classes = [...new Set(subjects.map(sub => sub.class))];
  const subjectOptions = [...new Set(subjects.map(sub => sub.name))];

  const isSeniorClass = classFilter === '11' || classFilter === '12';

  const handleFilter = () => {
    return subjects.filter(sub => {
      if (classFilter && sub.class !== classFilter) return false;
      if (subjectFilter && sub.name !== subjectFilter) return false;

      // Remove subjects based on branch selection
      if (isSeniorClass) {
        if (branchFilter === 'PCM' && sub.name === 'Biology') return false;
        if (branchFilter === 'PCB' && sub.name === 'Mathematics') return false;
        if (branchFilter === 'PCMB' && sub.name === 'Computer Science') return false;
      }

      return true;
    });
  };

  return (
    <div className="subjects-container">
      <h2>Subjects</h2>
      <div className="filter-bar">
        {/* Class Selector */}
        <select onChange={(e) => {
          setClassFilter(e.target.value);
          setBranchFilter('');
          setSubjectFilter('');
        }} value={classFilter}>
          <option value="">Class</option>
          {classes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Subject Selector */}
        <select onChange={(e) => setSubjectFilter(e.target.value)} value={subjectFilter}>
          <option value="">Subject</option>
          {subjectOptions.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>

        {/* Branch Selector (only for Class 11/12) */}
        {isSeniorClass && (
          <select onChange={(e) => setBranchFilter(e.target.value)} value={branchFilter}>
            <option value="">Branch</option>
            <option value="PCM">PCM</option>
            <option value="PCB">PCB</option>
            <option value="PCMB">PCMB</option>
          </select>
        )}
      </div>

      <div className="subject-cards">
        {handleFilter().map(sub => (
          <div className="subject-card" key={`${sub.class}-${sub.name}`}>
            <h3>{sub.name}</h3>
            <ul>
              {sub.resources?.map((res, index) => (
                <li key={index}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    {res.type}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
