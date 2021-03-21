import React, { FC, useState } from 'react';
import {
  CircularProgress,
  IconButton, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../../styles/FindUser.css';
import PropTypes from 'prop-types';

interface IUsernameInputProps {
    readonly setUsername: (username: string) => void;
    readonly showError: boolean;
    readonly showLoader: boolean;
}

export const FindUser: FC<IUsernameInputProps> = ({ setUsername, showError, showLoader }) => {
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const propagateUsernameChanges = () => {
    setUsername(usernameInputValue);
    setUsernameInputValue('');
  };

  const input = (
    <TextField
      className="find-user__search"
      id="outlined-username-input"
      value={usernameInputValue}
      placeholder="Github username"
      error={showError}
      helperText={showError && 'User doesn\'t exist.'}
      variant="outlined"
      onKeyPress={(event) => event.key === 'Enter' && propagateUsernameChanges()}
      onChange={(event) => {
        setUsernameInputValue(event.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={propagateUsernameChanges}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

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
      {showLoader ? <CircularProgress /> : input}
    </div>
  );
};

FindUser.propTypes = {
  setUsername: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired,
  showLoader: PropTypes.bool.isRequired,
};
