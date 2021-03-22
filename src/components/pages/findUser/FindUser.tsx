import React, { FC, useContext } from 'react';
import {
  CircularProgress, Typography,
} from '@material-ui/core';
import '../../../styles/FindUser.css';
import { DataState } from '../../../enums/DataState';
import { UsernameInput } from './UsernameInput';
import { AppContext } from '../../../context/AppContext';

export const FindUser: FC = () => {
  const { dataState } = useContext(AppContext);

  return (
    <div className="find-user">
      <Typography variant="body1">
        Fill in the name of the user whose repositories and organizations you want to see.
      </Typography>
      <img
        alt="Github logo"
        className="find-user__github-image"
        src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png"
      />
      {dataState === DataState.Loading ? <CircularProgress color="secondary" /> : <UsernameInput />}
    </div>
  );
};
