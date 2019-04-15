
import axios from 'axios';

// Request API.
let token = null;

export const getToken = () => {
	return axios.post('https://safe-spire-41819.herokuapp.com/auth/local', {
	      identifier: process.env.REACT_APP_STRAPI_MAIL,
	      password: process.env.REACT_APP_STRAPI_PASSWORD
	  })
	  .then(response => response.data.jwt)
	  .catch(error => console.log('An error occurred:', error));
}


export const getProjects = () => {
		return axios.get('https://safe-spire-41819.herokuapp.com/projects')
		  .then(response => response.data )
		  .catch(error => console.log('An error occurred:', error))
	}

export async function postProject (project) {
		if(token === null){
			token = await getToken();
			console.log(token)
		}
		return axios({
			  method: 'post',
			  url: 'https://safe-spire-41819.herokuapp.com/content-manager/explorer/projects',
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
		  .then(response => console.log(response) )
		  .catch(error => console.log('An error occurred:', error))
	}

export async function deleteProject (id) {
	console.log("IDIDIDID: " + id)
	if(token === null){
			token = await getToken();
			console.log(token)
		}
		return axios({
			  method: 'delete',
			  url: 'https://safe-spire-41819.herokuapp.com/content-manager/explorer/projects/' + id,
			  headers: {
		      	Authorization: `Bearer ${token}`
		      }
		})
		  .then(response => console.log(response) )
		  .catch(error => console.log('An error occurred:', error))
}