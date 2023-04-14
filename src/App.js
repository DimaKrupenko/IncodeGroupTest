import { useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import TaskСolumns from './components/TaskСolumns/TaskСolumns';
import { API } from './services/api';
import Notiflix from 'notiflix';

function App() {
  const [repository, setRepository] = useState('');
  const [repoData, setRepoData] = useState('');

  const handleRepoSubmit = async repoUrl => {
    try {
      API.resetQuery();
      API.setQuery(repoUrl);
      const material = await API.addMaterial();
      setRepoData(material);
      setRepository(repoUrl);
      clearAllTasks();
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure('Oops, invalid input');
    }
  };

  const clearAllTasks = () => {
    const lists = document.querySelectorAll('li');
    for (var i = 0; i < lists.length; i++) {
      lists[i].innerHTML = '';
    }
  };

  return (
    <div className="App">
      <Form onRepoSubmit={handleRepoSubmit} />
      <TaskСolumns repoData={repoData} repoUrl={repository} />
    </div>
  );
}

export default App;
