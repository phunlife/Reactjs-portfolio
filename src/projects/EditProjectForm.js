import React, { useState, useEffect } from "react";
import { editProject } from "../api/strapi";

const EditProjectForm = props => {
  const [project, setProject] = useState(props.currentProject);

  const handleChange = e => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(project);
    editProject(project);
    props.setEdit(false);
  }

  useEffect(() => {
    setProject(props.currentProject);
  }, [props]);

  return (
    <div className="container">
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="flex-row">
          <div className="flex-small">
            <label>Title</label>
            <input
              type="text"
              name="Title"
              onChange={handleChange}
              value={project.Title}
            />
            <label>Link</label>
            <input
              type="text"
              name="Link"
              onChange={handleChange}
              value={project.Link}
            />
            <label>Git link</label>
            <input
              type="text"
              name="git_link"
              onChange={handleChange}
              value={project.git_link}
            />
          </div>
          <div className="flex-small">
            <label>Image link</label>
            <input
              type="text"
              name="img_link"
              onChange={handleChange}
              value={project.img_link}
            />
            <label>Description</label>
            <textarea
              className="description"
              name="Description"
              onChange={handleChange}
              value={project.Description}
            ></textarea>

            <button type="submit" className="float-right">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
