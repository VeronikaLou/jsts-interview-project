import React, { FC, useState } from 'react';
import {
  CircularProgress, IconButton, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../../styles/FindUser.css';
import PropTypes from 'prop-types';
import { DataState } from '../../enums/DataState';
import { getUsernameInputHelperText, useStylesReddit } from '../../utils/usernameInputDecorators';

interface IUsernameInputProps {
    readonly setUsername: (username: string) => void;
    readonly dataState: DataState;
    readonly username: string;
}

export const FindUser: FC<IUsernameInputProps> = ({
  setUsername, dataState, username,
}) => {
  const [usernameInputValue, setUsernameInputValue] = useState(username);
  const propagateUsernameChanges = () => {
    setUsername(usernameInputValue);
  };

  const styles = useStylesReddit(username, dataState);

  const input = (
    <TextField
      id="outlined-username-input"
      value={usernameInputValue}
      placeholder="Github username"
      variant="outlined"
      helperText={getUsernameInputHelperText(username, dataState)}
      onKeyPress={(event) => event.key === 'Enter' && propagateUsernameChanges()}
      onChange={(event) => {
        setUsernameInputValue(event.target.value);
      }}
      InputProps={{
        classes: {
          root: styles.root,
          focused: styles.focused,
          notchedOutline: styles.notchedOutline,
        },
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
      {dataState === DataState.Loading ? <CircularProgress /> : input}
    </div>
  );
};

FindUser.propTypes = {
  setUsername: PropTypes.func.isRequired,
  // @ts-ignore
  dataState: PropTypes.oneOf(Object.values(DataState)).isRequired,
  username: PropTypes.string.isRequired,
};
