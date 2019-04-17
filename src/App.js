import React, {useState} from 'react';
import ListProjects from './projects/ListProjects';
import AddProjectForm from './projects/AddProjectForm';
import EditProjectForm from './projects/EditProjectForm';
import './App.css';

const App = () => {

    const [edit, setEdit] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const handleEdit = project => {
      setEdit(true);
      setCurrentProject(project);
    }

    return (
      <div class="App">
        <div class="container">
          <div class="flex-row">
            <div class="flex-small"><h1>React with strapi</h1></div>
          </div>
        </div>
        { edit ? (
           <EditProjectForm currentProject={currentProject} setEdit={setEdit} />
        ) : (
           <AddProjectForm />
        )}
        <ListProjects handleEdit={handleEdit} />
      </div>
    );
}

export default App;
