import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React, { ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updateCurrentPage } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    ul: {
        justifyContent: 'center',
    },
}));

interface State {
    currentPage: number;
    itemsPerPage: number;
}

const mapStateToProps = (state: State) => {
    return {
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateCurrentPage: (currentPage: number) =>
            dispatch(updateCurrentPage(currentPage)),
    };
};

const PaginatedGrid = ({
    currentPage,
    getUsers,
    itemsPerPage,
    total,
    updateCurrentPage
}) => {
    const classes = useStyles();

    useEffect(() => {
        updateCurrentPage(currentPage);
    }, [itemsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

    // When clicking on a new number, update global state's current page
    const onChange = (e: ChangeEvent<unknown>, value: number) => {
        getUsers(value, itemsPerPage);
        updateCurrentPage(value);
    };

    if (total === 0) {
        return null;
    }

    return (
        <Pagination
            count={total}
            onChange={onChange}
            size="large"
            classes={{ root: classes.root, ul: classes.ul }}
            page={currentPage}
        />
    );
};

const ConnectedPaginatedGrid = connect(mapStateToProps, mapDispatchToProps)(PaginatedGrid)

export { ConnectedPaginatedGrid as HigherPaginatedGrid };
