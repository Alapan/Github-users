import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';
//import ItemsPerPageSelector from './ItemsPerPageSelector';
//import { HigherPaginatedGrid } from './PaginatedGrid';
import { UserTable } from './UserTable';
import {Link} from "react-router-dom";

// Application state, stored in Redux store
interface State {
    currentPage: number;
    itemsPerPage: number;
}

interface AppProps {
    currentPage: number;
    itemsPerPage: number;
}

const mapStateToProps = (state: State) => {
    return {
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage,
    };
};

const App = (props: AppProps) => {
    // Component state
    //const [numberOfPages, setNumberOfPages] = useState(0);
    const [users, setUsers] = useState([]);

    // Calculate total number of pages needed for PaginatedGrid component
    /*
    const getUsersCount = (perPage: number): void => {
        fetch(`https://api.github.com/search/users?q=type%3Auser`)
            .then((countResult) => {
                countResult
                    .json()
                    .then((data) => {
                        setNumberOfPages(Math.ceil(data.total_count / perPage));
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

     */

    const getUsers = (
        pageIndex?: number | null,
        pageSize?: number | null
    ): void => {
        pageIndex = pageIndex ? pageIndex : 1;
        pageSize = pageSize ? pageSize : 30;
        console.log('PAGE SIZE: ', pageIndex);
        //getUsersCount(pageSize);
        fetch(
            `https://api.github.com/users?since=${pageIndex}&per_page=${pageSize}`
        )
            .then((response) => response.json())
            .then((data) => {
              setUsers(data)})
            .catch((err) => {
                throw new Error(err);
            });
    };

    const columns = [
        {
            Header: "Name",
            columns: [
                {
                    Header: "Avatar",
                    accessor: "avatar_url",
                    Cell: props =>
                        <Link to={`${props.row.original.login}/`}>
                            <img src={props.row.original.avatar_url} className="avatar" />
                        </Link>
                },
                {
                    Header: "Login",
                    accessor: "login",
                    Cell: props =>
                        <Link to={`${props.row.original.login}/`}>
                            {props.row.original.login}
                        </Link>
                }
            ]
        }
    ];

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="App">
            <UserTable fetchData={getUsers} columns={columns} data={users} />
        </div>
    );
};

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as HigherOrderApp };
