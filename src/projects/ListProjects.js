import React, {useState, useEffect} from 'react';
import {getProjects, deleteProject} from '../api/strapi';
import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_STRAPI_URL);
//const socket = openSocket(process.env.REACT_APP_STRAPI_URL_LOCAL);
//socket.on('hello', (res) => console.log(res));
//socket.on('project_list', (res) => console.log(res));


const ListProjects = params => {
	
	const [loading, setLoading] = useState(true);
	
	const [projects, setProjects] = useState([]);

	const [project, setProject] = useState({});
	
	socket.on('new_project', (res) => setProjects([...projects, res]));
	socket.on('removed_project', (res) => handleRemovedProject(res));
	socket.on('edited_project', (res) => updateProject(res));


	const handleRemovedProject = res => {
		let newProjects = projects.filter( p => res["id"] !== p.id );
		setProjects(newProjects);
	}

	async function fetchProjects() {
		 let pro = await getProjects();
		 console.log(pro)
		 return pro;
	 }

	 const removeProject = (e, id, title) => {
		e.preventDefault();
		if (window.confirm("Do you really want to remove " + title + "?")){
			deleteProject(id);
		}
	}

	const updateProject = res => {
		let newProjects = projects.map(p => p.id === res.id ? res : p);
		setProjects(newProjects); 
	}

	useEffect(() => {
	 if(projects.length === 0 && loading){
	 	 fetchProjects().then(response => {
			  setProjects(response);
			  setLoading(false);
			});
	 	 
	 }
	}, []
	);

	

	return(
		<div class="container">
			{ loading ? (
				<center>Loading projects...</center>	
			) : (
				<ProjectList projects={projects} removeProject={removeProject} handleEdit={params.handleEdit} loggedIn={params.loggedIn}/>	
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

	const list = Object.keys(params.projects).map(key =>{
			if (key !== "prototype"){
			 return <div class="flex-small card" key={key}>
			 			<img src={params.projects[key]["Img_link"]} />
			 			<div class="body">
			 			<strong>{params.projects[key]["Title"]}</strong><br />
			 			{truncate(params.projects[key]["Description"], 85)}<br />
			 			<a href={params.projects[key]["Link"]}>Link to project</a> <br/>
			 			{params.projects[key]["Date"]}
			 			{params.loggedIn &&
			 			<div class="panel" >
			 				<button onClick={e => params.removeProject(e, params.projects[key]["id"], params.projects[key]["Title"])}>X</button>
			 				<button onClick={() => params.handleEdit(params.projects[key]) }>Edit</button>
			 			</div>
			 			}
			 			</div>
			 		</div>
			}});


	return(
		<div class="flex-row" >{list}</div>
		);
}

export default ListProjects;