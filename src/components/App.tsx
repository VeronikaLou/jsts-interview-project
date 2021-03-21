import React, { useEffect, useRef, useState } from 'react';
import { FindUser } from './pages/FindUser';
import { IRepository, Repositories } from './pages/Repositories';
import { getUserReposAndOrganisations } from '../utils/github-api';

export const App = () => {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      const fetchUserData = async () => {
        const fetchedData = await getUserReposAndOrganisations(username);
        if (fetchedData) {
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
    </div>
  );
};
