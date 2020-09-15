import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from './TableStyles';
import './User.css';

interface User {
    avatar_url: string;
    followers: number;
    following: number;
    id: number;
    login: string;
    name: string;
}

const initialUserState = {
    avatar_url: '',
    followers: 0,
    following: 0,
    id: 0,
    login: '',
    name: '',
};

const useStyles = makeStyles({
    root: {
        margin: '20px 40px 10px 40px',
    },
});

const User = () => {
    const [user, setUser] = useState<User>(initialUserState);
    const classes = useStyles();

    useEffect(() => {
        let { pathname } = window.location;
        pathname = pathname.slice(0, -1);

        fetch(`https://api.github.com/users${pathname}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((err) => {
                throw new Error(err);
            });
    }, []);

    return (
        <div className={classes.root}>
            <div className="avatar-container">
                <img src={user.avatar_url} className="user-page-avatar" />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Detail</StyledTableCell>
                            <StyledTableCell>Value</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell>Github User ID</StyledTableCell>
                            <StyledTableCell>{user.id}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Login</StyledTableCell>
                            <StyledTableCell>{user.login}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>{user.name}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Followers</StyledTableCell>
                            <StyledTableCell>{user.followers}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Following</StyledTableCell>
                            <StyledTableCell>{user.following}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to={'/'}>
                <div className="back-button-cls">
                    <Button variant="contained" color="primary">
                        Back
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default User;
