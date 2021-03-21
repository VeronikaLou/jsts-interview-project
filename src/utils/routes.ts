import { Page } from '../enums/Page';

const REPOSITORIES_PATH = '/repositories';
const ORGANIZATIONS_PATH = '/organizations';
const FIND_USER_PATH = '/find_user';

export const createPathForPage = (page: Page): string => {
  switch (page) {
    case Page.Repositories: {
      return REPOSITORIES_PATH;
    }

    case Page.Organizations: {
      return ORGANIZATIONS_PATH;
    }

    case Page.FindUser:
    default: {
      return FIND_USER_PATH;
    }
  }
};

export const isPathMatchingAnyPage = (path: string): boolean => [
  REPOSITORIES_PATH,
  ORGANIZATIONS_PATH,
  FIND_USER_PATH,
].includes(path);
