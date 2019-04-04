
import axios from 'axios';

// Request API.

export const getToken = () => {
	return axios.post('https://safe-spire-41819.herokuapp.com/auth/local', {
	      identifier: process.env.REACT_APP_STRAPI_MAIL,
	      password: process.env.REACT_APP_STRAPI_PASSWORD
	  })
	  .then(response => response.data.jwt)
	  .catch(error => console.log('An error occurred:', error));
}


export const getProjects = (token) => {
		return axios.get('https://safe-spire-41819.herokuapp.com/projects', {
		    headers: {
		      Authorization: `Bearer ${token}`
		    }
		  })
		  .then(response => response.data )
		  .catch(error => console.log('An error occurred:', error))
	}
