import React from 'react';
import {getToken} from './api/strapi';
import ListProjects from './projects/ListProjects'

getToken();

const App = () => {

    return (
      <div class="App">
        <div class="container">
          <div class="flex-row">
            <div class="flex-small"><h1>React with strapi portfolio</h1></div>
          </div>
        </div>
        <ListProjects />
      </div>
    );
}

export default App;
