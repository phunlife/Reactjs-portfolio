import React, {useState} from 'react';
import ListProjects from './projects/ListProjects';
import AddProjectForm from './projects/AddProjectForm';
import EditProjectForm from './projects/EditProjectForm';
import LoginForm from './admin/LoginForm'; 
import './App.css';

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [edit, setEdit] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const handleEdit = project => {
      setEdit(true);
      setCurrentProject(project);
    }

    let projectForm;
    if (edit){
      projectForm = <EditProjectForm currentProject={currentProject} setEdit={setEdit} />;
    }else{
      projectForm = <AddProjectForm />
    }

    return (
      <div class="App">
        <div class="container space">
          <div class="flex-row">
            <div class="flex-small header-title"><h1>React with strapi</h1></div>
          </div>
        </div>
        { loggedIn &&
          projectForm
        }
        <ListProjects handleEdit={handleEdit} loggedIn={loggedIn}/>
    <div class="container footer">
        <div class="flex-row">
          <div class="flex-small"><LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></div>
        </div>
    </div>
    </div>
    );
}

export default App;
