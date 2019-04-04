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
	
	const list = Object.keys(params.projects).map(key =>{
			if (key !== "prototype"){
			 return <div class="flex-row" key={key}>
			 		<div class="container">
			 			<div class="flex-row">
			 			<div class="flex-small"><h3>{params.projects[key]["Title"]}</h3></div>
			 			</div>
			 			<div class="flex-row">
			 			<div class="flex-small">{params.projects[key]["Description"]}</div>
			 			</div>
			 			<div class="flex-row">
			 			<div class="flex-small">{params.projects[key]["Link"]}</div>
			 			<div class="flex-small">{params.projects[key]["Date"]}</div>
			 			</div>
			 		</div>
			 		</div>
			}});


	return(
		<div>{list}</div>
		);
}

export default ListProjects;