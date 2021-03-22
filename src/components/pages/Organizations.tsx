import React, { FC } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { getStyles } from '../../utils/decorators';

export interface IOrganization {
    readonly id: number,
    readonly login: string,
    readonly description?: string | null,
}

export interface IOrganizationsProps {
    readonly organizations: IOrganization[];
}

export const Organizations: FC<IOrganizationsProps> = ({ organizations }) => {
  const { tableHeaderCell } = getStyles();

  return (
    organizations.length === 0
      ? <Alert severity="info">It seems the user is not a member of any organization.</Alert>
      : (
        <TableContainer component={Paper}>
          <Table aria-label="organizations table">
            <TableHead>
              <TableRow>
                <TableCell className={tableHeaderCell} align="left">Name</TableCell>
                <TableCell className={tableHeaderCell} align="center">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.map((organization) => (
                <TableRow key={organization.id}>
                  <TableCell component="th" scope="row">{organization.login}</TableCell>
                  <TableCell component="th" align="left">{organization.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ));
};

Organizations.propTypes = {
  organizations: PropTypes.arrayOf<IOrganization>(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      login: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
