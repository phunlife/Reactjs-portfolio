
import axios from 'axios';

// Request API.
let token = null;

export async function getToken(user) {
	return axios.post(process.env.REACT_APP_STRAPI_URL + '/auth/local', {
	      identifier: user.mail,//process.env.REACT_APP_STRAPI_MAIL,
	      password: user.password//process.env.REACT_APP_STRAPI_PASSWORD
	  })
	  .then(response => token = response.data.jwt)
	  .catch(error => console.log('Wrong Email or password', error));
}


export const getProjects = () => {
		return axios.get(process.env.REACT_APP_STRAPI_URL + '/projects')
		  .then(response => response.data )
		  .catch(error => console.log('An error occurred:', error))
	}

export async function postProject (project) {
		if(token === null){
			return console.log("No token!");
		}
		return axios({
			  method: 'post',
			  url: process.env.REACT_APP_STRAPI_URL + '/content-manager/explorer/projects',
			  headers: {
		      	Authorization: `Bearer ${token}`
		      },
			  data: {
			    Title: project.title,
			    Description: project.description,
			    Link: project.link,
			    Img_link: project.img_link
			  }
		})
		  .then(response => console.log("Project posted") )
		  .catch(error => console.log('An error occurred:', error))
	}

export async function editProject (project) {
		if(token === null){
			return console.log("No token!");
		}
		return axios({
			  method: 'put',
			  url: process.env.REACT_APP_STRAPI_URL + '/content-manager/explorer/projects/' + project.id,
			  headers: {
		      	Authorization: `Bearer ${token}`
		      },
			  data: {
			    Title: project.Title,
			    Description: project.Description,
			    Link: project.Link,
			    Img_link: project.Img_link
			  }
		})
		  .then(response => console.log("Project edited") )
		  .catch(error => console.log('An error occurred:', error))
	}

export async function deleteProject (id) {
	if(token === null){
			return console.log("No token!");
		}
		return axios({
			  method: 'delete',
			  url: process.env.REACT_APP_STRAPI_URL + '/content-manager/explorer/projects/' + id,
			  headers: {
		      	Authorization: `Bearer ${token}`
		      }
		})
		  .then(response => console.log(response) )
		  .catch(error => console.log('An error occurred:', error))
}