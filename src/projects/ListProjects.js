import React, {useState, useEffect} from 'react';
import {getProjects, deleteProject} from '../api/strapi';
import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_STRAPI_URL);
//const socket = openSocket(process.env.REACT_APP_STRAPI_URL_LOCAL);
//socket.on('hello', (res) => console.log(res));
//socket.on('project_list', (res) => console.log(res));


const ListProjects = () => {
	
	const [loading, setLoading] = useState(true);
	const projectData = [];
	const [projects, setProjects] = useState(projectData);

	const [project, setProject] = useState({});
	socket.on('project_list', (res) => setProjects([...projects, res]));

	async function fetchProjects() {
		 let pro = await getProjects();
		 console.log(pro)
		 return pro;
	 }

	useEffect(() => {
	 if(projects.length === 0){
	 	 fetchProjects().then(response => setProjects(response));
	 	 setLoading(false);
	 }
	 
	}, []
	);

	

	return(
		<div class="container">
			{ loading ? (
				<p><center>Loading projects...</center></p>	
			) : (
				<ProjectList projects={projects}/>	
			)}
			
		</div>
	);
}


const ProjectList = params => {

	const truncate = (string, length) => {
		if (string >= length){
			var shortString = string.substring(0,length)
			return shortString + "...";
		} else {
			return string
		}
	}

	const removeProject = (id, title) => {
		if (window.confirm("Do you really want to remove " + title + "?")){
			deleteProject(id);
		}
	}
	
	const list = Object.keys(params.projects).map(key =>{
			if (key !== "prototype"){
			 return <div class="flex-small card" key={key}>
			 			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg" />
			 			<div class="body">
			 			<strong>{params.projects[key]["Title"]}</strong><br />
			 			{truncate(params.projects[key]["Description"], 85)}<br />
			 			<a href={params.projects[key]["Link"]}>Link to project</a> <br/>
			 			{params.projects[key]["Date"]}
			 			<button onClick={() => {removeProject( params.projects[key]["id"], params.projects[key]["Title"])}}>X</button>
			 			</div>
			 		</div>
			}});


	return(
		<div class="flex-row" >{list}</div>
		);
}

export default ListProjects;