import {
  IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import React, { FC } from 'react';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

export interface IRepository {
    readonly id: number,
    readonly name: string,
    readonly description?: string | null,
    // eslint-disable-next-line camelcase
    readonly html_url: string,
}

export interface IRepositoriesProps {
    readonly repositories: IRepository[];
}

export const Repositories: FC<IRepositoriesProps> = ({ repositories }) => (
  repositories.length === 0
    ? <Alert severity="info">It seems there are no public repositories for the user.</Alert>
    : (
      <TableContainer component={Paper}>
        <Table aria-label="repositories table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Visit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell component="th" scope="row">{repo.name}</TableCell>
                <TableCell component="th" align="left">{repo.description}</TableCell>
                <TableCell component="th" align="center">
                  <IconButton aria-label="delete" href={repo.html_url} target="_blank">
                    <TelegramIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ));

Repositories.propTypes = {
  repositories: PropTypes.arrayOf<IRepository>(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      html_url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
