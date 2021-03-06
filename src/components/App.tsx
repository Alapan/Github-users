import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';
import ItemsPerPageSelector from './ItemsPerPageSelector';
import { HigherPaginatedGrid } from './PaginatedGrid';
import { UserTable } from './UserTable';

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
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [users, setUsers] = useState([]);

    // Calculate total number of pages needed for PaginatedGrid component
    const getPagesCount = (perPage: number): void => {
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

    const getUsers = (
        since?: number | null,
        itemsPerPage?: number | null
    ): void => {
        since = since ? since : 1;
        itemsPerPage = itemsPerPage ? itemsPerPage : 30;
        if (itemsPerPage) {
            getPagesCount(itemsPerPage);
        }
        fetch(
            `https://api.github.com/users?since=${since}&per_page=${itemsPerPage}`
        )
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((err) => {
                throw new Error(err);
            });
    };

    useEffect(() => {
        getPagesCount(30);
        getUsers(props.currentPage);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="App">
            <ItemsPerPageSelector
                getUsers={getUsers}
                total={parseInt(numberOfPages.toString(), 10)}
            />
            <HigherPaginatedGrid
                getUsers={getUsers}
                total={parseInt(numberOfPages.toString(), 10)}
            />
            <UserTable getUsers={getUsers} users={users} />
        </div>
    );
};

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as HigherOrderApp };
