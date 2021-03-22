import React, { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { FindUser } from './pages/findUser/FindUser';
import { IRepository, Repositories } from './pages/Repositories';
import { getUserReposAndOrganisations } from '../utils/github-api';
import { IOrganization, Organizations } from './pages/Organizations';
import { Header } from './Header';
import { Page } from '../enums/Page';
import { DataState } from '../enums/DataState';
import { AppContext } from '../context/AppContext';

export const App = () => {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [dataState, setDataState] = useState<DataState>(DataState.Initial);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      setDataState(DataState.Loading);
      const fetchUserData = async () => {
        const fetchedData = await getUserReposAndOrganisations(username, setDataState);
        if (fetchedData) {
          setOrganizations(fetchedData.orgs);
          setRepositories(fetchedData.repos);
          setDataState(DataState.RetrievedSuccessfully);
        }
      };
      fetchUserData();
    } else {
      initialRender.current = false;
    }
  }, [username]);

  return (
    <AppContext.Provider value={{ dataState, username, setUsername }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path={Page.Repositories}>
            {username
              ? <Repositories repositories={repositories} />
              : <Redirect to={Page.FindUser} />}
          </Route>
          <Route exact path={Page.Organizations}>
            {username
              ? <Organizations organizations={organizations} />
              : <Redirect to={Page.FindUser} />}
          </Route>
          <Route exact path={Page.FindUser}>
            <FindUser />
          </Route>
          <Route path="*">
            <Redirect to={Page.FindUser} />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};
