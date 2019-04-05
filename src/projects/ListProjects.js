import React, {useState, useEffect} from 'react';
import {getToken, getProjects} from '../api/strapi';


const ListProjects = () => {
	
	let loading = true;
	const projectData = [];
	const [projects, setProjects] = useState(projectData);

	async function fetchProjects() {
		 let token = await getToken();
		 let pro = await getProjects(token);
		 console.log(pro)
		 return pro;
	 }

	useEffect(() => {
	 if(projects.length === 0){
	 	 fetchProjects().then(response => setProjects(response));
	 }
	 
	}, []
	);

	

	return(
		<div class="container">
			<ProjectList projects={projects} />
			
		</div>
	);
}


const ProjectList = params => {

	const truncate = (string, length) => {
		var shortString = string.substring(0,length)
		return shortString + "...";
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
			 			</div>
			 		</div>
			}});


	return(
		<div class="flex-row" >{list}</div>
		);
}

export default ListProjects;