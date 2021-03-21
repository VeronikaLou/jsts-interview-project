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
  const [areDataRetrieved, setAreDataRetrieved] = useState(false);
  const [showError, setShowError] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      setAreDataRetrieved(false);
      setShowError(false);
      const fetchUserData = async () => {
        const fetchedData = await getUserReposAndOrganisations(username, setShowError);
        if (fetchedData) {
          setOrganizations(fetchedData.orgs);
          setRepositories(fetchedData.repos);
        }
        setAreDataRetrieved(true);
      };
      fetchUserData();
    } else {
      initialRender.current = false;
    }
  }, [username]);

  return (
    <div className="App">
      <Router>
        <Header areDataRetrieved={areDataRetrieved && !showError} username={username} />
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
            <FindUser setUsername={setUsername} showError={showError} />
          </Route>
          <Route path="*">
            <Redirect to={createPathForPage(Page.FindUser)} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
