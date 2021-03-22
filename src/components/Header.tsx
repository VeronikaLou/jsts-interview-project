import {
  AppBar, Tab, Tabs, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import React, { FC } from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { createPathForPage, isPathMatchingAnyPage } from '../utils/routes';
import { Page } from '../enums/Page';
import '../styles/Header.css';
import { DataState } from '../enums/DataState';

interface IHeaderProps {
    readonly username: string,
    readonly dataState: DataState,
}

export const Header: FC<IHeaderProps> = ({ username, dataState }) => {
  const organisationsPath = createPathForPage(Page.Organizations);
  const repositoriesPath = createPathForPage(Page.Repositories);
  const findUserPath = createPathForPage(Page.FindUser);

  return (
    <AppBar
      style={{
        flexDirection: 'row',
        marginBottom: '5px',
        justifyContent: 'space-between',
      }}
      position="static"
      color="default"
    >
      <Route
        path="/"
        render={(history) => (
          <Tabs
            aria-label="tabs"
            indicatorColor="primary"
            textColor="primary"
            value={isPathMatchingAnyPage(history.location.pathname)
              ? history.location.pathname
              : false}
          >
            <Tab
              label="Find user"
              component={Link}
              to={findUserPath}
              value={findUserPath}
            />
            <Tab
              label="Repositories"
              component={Link}
              to={repositoriesPath}
              value={repositoriesPath}
              disabled={dataState !== DataState.RetrievedSuccessfully}
            />
            <Tab
              label="Organizations"
              component={Link}
              to={organisationsPath}
              value={organisationsPath}
              disabled={dataState !== DataState.RetrievedSuccessfully}
            />
          </Tabs>
        )}
      />
      {username && dataState === DataState.RetrievedSuccessfully && (
      <div className="header__user MuiTab-textColorPrimary">
        <Typography>{username}</Typography>
        <AccountCircleRoundedIcon className="header__user-icon" />
      </div>
      )}
    </AppBar>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  // @ts-ignore
  dataState: PropTypes.oneOf(Object.values(DataState)).isRequired,
};
