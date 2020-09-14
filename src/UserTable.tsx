import React, { useEffect } from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {StyledTableCell, StyledTableRow} from "./TableStyles";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";

interface User {
  avatar_url: string;
  id: string;
  login: string;
}

interface UserTableProps {
  getUsers: (since?: number | null, itemsPerPage?: number | null) => void;
  users: User[]
}

const UserTable: React.FC<UserTableProps> = (props: UserTableProps) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Avatar</StyledTableCell>
            <StyledTableCell>Github Username</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user: User) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell>
                <Link to={`${user.login}/`}>
                  <img
                    src={user.avatar_url}
                    className="avatar"
                  />
                </Link>
              </StyledTableCell>
              <StyledTableCell>
                <Link to={`${user.login}/`}>
                  {user.login}
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
