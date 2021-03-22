import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useState } from 'react';
import { getUsernameInputHelperText, useStylesReddit } from '../../../utils/usernameInputDecorators';
import { AppContext } from '../../../context/AppContext';

export const UsernameInput = () => {
  const { username, setUsername, dataState } = useContext(AppContext);
  const [usernameInputValue, setUsernameInputValue] = useState(username);
  const propagateUsernameChanges = () => {
    setUsername(usernameInputValue);
  };

  const styles = useStylesReddit(username, dataState);

  return (
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
};
