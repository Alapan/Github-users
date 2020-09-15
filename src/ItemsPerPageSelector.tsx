import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updateCurrentPage, updateItemsPerPage } from './redux/actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '120px',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface ItemsPerPageSelectorProps {
    getUsers: (since?: number | null, perPage?: number | null) => void;
    itemsPerPage: number;
    total: number;
    updateCurrentPage: (currentPage: number) => void;
    updateItemsPerPage: (itemsPerPage: number) => void;
}

interface State {
    currentPage: number;
    itemsPerPage: number;
}

const mapStateToProps = (state: State) => {
    return {
        itemsPerPage: state.itemsPerPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateCurrentPage: (currentPage: number) =>
            dispatch(updateCurrentPage(currentPage)),
        updateItemsPerPage: (itemsPerPage: number) =>
            dispatch(updateItemsPerPage(itemsPerPage)),
    };
};

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = (
    props: ItemsPerPageSelectorProps
) => {
    // When selecting a new per-page option, update
    // both current page to 1, and items per page, in the global state
    const handleChange = (event) => {
        props.updateCurrentPage(1);
        props.updateItemsPerPage(event.target.value);
        props.getUsers(null, event.target.value);
    };

    const classes = useStyles();

    if (props.total === 0) {
        return null;
    }

    return (
        <div>
            <h4>Showing {props.itemsPerPage} items per page</h4>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                    Items per page
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={props.itemsPerPage}
                    onChange={handleChange}
                    label="Items per page"
                >
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={80}>80</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemsPerPageSelector);
