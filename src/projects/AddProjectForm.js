import React,{useState} from 'react';
import {postProject} from '../api/strapi';

const AddProjectForm = props => {

	const initProject = {title: "", link: "",description: "", img_link: ""};
	const [project, setProject] = useState(initProject);

	const handleChange = e => {
		const {name, value} = e.target
		setProject({...project , [name]: value});
	}

	function handleSubmit (e) {
		e.preventDefault();
		postProject(project)
		setProject(initProject);
	}

return(
	<div class="container">
	<form onSubmit={e => {
		handleSubmit(e);
	}}>
		<div class="flex-row" >
			<div class="flex-small">
				<label>Title</label>
				<input type="text" name="title" onChange={handleChange} value={project.title} required/>
				<label>Link</label>
				<input type="text" name="link" onChange={handleChange} value={project.link} />
				<label>Image link</label>
				<input type="text" name="img_link" onChange={handleChange} value={project.img_link} />
			</div>
			<div class="flex-small">
				<label>Description</label>
				<textarea class="description" name="description" onChange={handleChange} value={project.description} ></textarea>
			
				<button type="submit" class="float-right">Create</button>
			
		</div>

		</div>
	</form>
	</div>
	);
}

export default AddProjectForm;