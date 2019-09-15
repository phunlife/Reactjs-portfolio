import React, { useState } from "react";
import ListProjects from "./projects/ListProjects";
import AddProjectForm from "./projects/AddProjectForm";
import EditProjectForm from "./projects/EditProjectForm";
import LoginForm from "./admin/LoginForm";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const handleEdit = project => {
    setEdit(true);
    setCurrentProject(project);
  };

  let projectForm;
  if (edit) {
    projectForm = (
      <EditProjectForm currentProject={currentProject} setEdit={setEdit} />
    );
  } else {
    projectForm = <AddProjectForm />;
  }

  return (
    <div className="App">
      <div className="container space">
        <div className="flex-row">
          <div className="flex-small header-title">
            <h1>React with strapi</h1>
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-small">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      {loggedIn && projectForm}
      <ListProjects handleEdit={handleEdit} loggedIn={loggedIn} />
      <div className="container footer">
        <div className="flex-row">
          <div className="flex-small">
            <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
