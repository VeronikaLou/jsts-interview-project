import {
  createStyles, darken, lighten, makeStyles,
} from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';
import { DataState } from '../enums/DataState';

export const getUsernameInputHelperText = (username: string, dataState: DataState): string => {
  switch (dataState) {
    case DataState.Error: {
      return `User ${username} doesn't exist.`;
    }
    case DataState.RetrievedSuccessfully: {
      return `Data for ${username} was successfully loaded.`;
    }
    default: {
      return '';
    }
  }
};

export const getUsernameInputBorderColor = (username: string, dataState: DataState): string => {
  switch (dataState) {
    case DataState.Error: {
      return red[600];
    }
    case DataState.RetrievedSuccessfully: {
      return green[500];
    }
    default: {
      return grey[500];
    }
  }
};

export const getUsernameInputStyles = (
  username: string,
  dataState: DataState,
) => {
  const borderColor = getUsernameInputBorderColor(username, dataState);

  return makeStyles(() => createStyles({
    root: {
      '& $notchedOutline': {
        borderColor: lighten(borderColor, 0.3),
        borderWidth: '2px',
      },
      '&:hover $notchedOutline': {
        borderColor: darken(borderColor, 0.2),
      },
      '&$focused $notchedOutline': {
        borderColor: darken(borderColor, 0.2),
      },
    },
    focused: {},
    notchedOutline: {},
  }))();
};

export const getStyles = makeStyles({
  tableHeaderCell: {
    fontWeight: 700,
  },
  headerTab: {
    fontWeight: 'bold',
  },
  appBar: {
    flexDirection: 'row',
    marginBottom: '5px',
    justifyContent: 'space-between',
  },
}, { index: 1 });
