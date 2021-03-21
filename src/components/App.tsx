import React, { useEffect, useRef, useState } from 'react';
import { FindUser } from './pages/FindUser';
import { IRepository, Repositories } from './pages/Repositories';
import { getUserReposAndOrganisations } from '../utils/github-api';
import { IOrganization, Organizations } from './pages/Organizations';

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
      <FindUser setUsername={setUsername} />
      <Repositories repositories={repositories} />
      <Organizations organizations={organizations} />
    </div>
  );
};
