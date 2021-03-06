// Feel free to use something else than 'axios', for example 'ky'
import axios from 'axios';
import { IOrganization } from '../components/pages/Organizations';
import { IRepository } from '../components/pages/Repositories';
import { DataState } from '../enums/DataState';

// Documentation is at https://developer.github.com/v3/
const BASE_URL = 'https://api.github.com';

export const getUserReposAndOrganisations = async (
  username: string,
  setDataStatus: (status: DataState) => void,
): Promise<{orgs: IOrganization[], repos: IRepository[]} | undefined> => {
  try {
    const [orgs, repos] = await axios
      .all([
        axios.get(`${BASE_URL}/users/${username}/orgs`),
        axios.get(`${BASE_URL}/users/${username}/repos?per_page=250`),
      ]);

    return ({
      orgs: orgs.data,
      repos: repos.data,
    });
  } catch (e) {
    setDataStatus(DataState.Error);
  }

  return undefined;
};
