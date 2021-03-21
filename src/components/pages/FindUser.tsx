import React, { FC, useState } from 'react';
import {
  IconButton, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../../styles/FindUser.css';

export const FindUser: FC = () => {
  const [usernameInputValue, setUsernameInputValue] = useState('');

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
      <TextField
        className="find-user__search"
        id="outlined-username-input"
        value={usernameInputValue}
        placeholder="Github username"
        variant="outlined"
        onChange={(event) => {
          setUsernameInputValue(event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
