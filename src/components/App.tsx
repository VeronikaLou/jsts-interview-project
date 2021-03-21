import React, { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { FindUser } from './pages/FindUser';
import { IRepository, Repositories } from './pages/Repositories';
import { getUserReposAndOrganisations } from '../utils/github-api';
import { IOrganization, Organizations } from './pages/Organizations';
import { Header } from './Header';
import { createPathForPage } from '../utils/routes';
import { Page } from '../enums/Page';

export const App = () => {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      const fetchUserData = async () => {
        const fetchedData = await getUserReposAndOrganisations(username);
        if (fetchedData) {
          setOrganizations(fetchedData.orgs);
          setRepositories(fetchedData.repos);
        }
      };
      fetchUserData();
    } else {
      initialRender.current = false;
    }
  }, [username]);

  return (
    <div className="App">
      <Router>
        <Header areDataRetrieved={areDataRetrieved} username={username} />
        <Switch>
          <Route exact path={createPathForPage(Page.Repositories)}>
            {username
              ? <Repositories repositories={repositories} />
              : <Redirect to={createPathForPage(Page.FindUser)} />}
          </Route>
          <Route exact path={createPathForPage(Page.Organizations)}>
            {username
              ? <Organizations organizations={organizations} />
              : <Redirect to={createPathForPage(Page.FindUser)} />}
          </Route>
          <Route exact path={createPathForPage(Page.FindUser)}>
            <FindUser setUsername={setUsername} />
          </Route>
          <Route path="*">
            <Redirect to={createPathForPage(Page.FindUser)} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
