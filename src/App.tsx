import React, { useEffect, useState } from 'react';
import './App.css'
import PaginatedGrid from './PaginatedGrid';
import ItemsPerPageSelector from './ItemsPerPageSelector';
import UserTable from "./UserTable";
import { connect } from 'react-redux';

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
  }
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [users, setUsers] = useState([]);

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

  const getUsers = (since?: number | null, itemsPerPage?: number | null): void => {
    since = since ? since : 1;
    itemsPerPage = itemsPerPage ? itemsPerPage : 30;
    getUsersCount(itemsPerPage);
    fetch(`https://api.github.com/users?since=${since}&per_page=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }

  useEffect(() => {
    getUsers(props.currentPage);
  }, []);

  return (
    <div className="App">
      <ItemsPerPageSelector
        getUsers={getUsers}
        total={parseInt(numberOfPages.toString(), 10)}
      />
      <PaginatedGrid
        getUsers={getUsers}
        total={parseInt(numberOfPages.toString(), 10)}
      />
      <UserTable
        getUsers={getUsers}
        users={users}
      />
    </div>
  );
}

export default connect(mapStateToProps)(App);
