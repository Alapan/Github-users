import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React, {ChangeEvent, useEffect} from 'react';
import { connect } from 'react-redux';
import { updateCurrentPage } from './redux/actions';
import {Dispatch} from 'redux';

interface PaginatedGridProps {
  getUsers: (since?: number | null, itemsPerPage?: number | null) => void;
  itemsPerPage: number;
  total: number;
  currentPage: number;
  updateCurrentPage: (currentPage: number) => void
}

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
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateCurrentPage: (currentPage: number) => dispatch(updateCurrentPage(currentPage))
  }
}

const PaginatedGrid: React.FC<PaginatedGridProps> = (
  props: PaginatedGridProps
) => {
  const classes = useStyles();

  useEffect(() => {
    props.updateCurrentPage(props.currentPage);
  }, [props.itemsPerPage]);

  const onChange = (e: ChangeEvent<unknown>, value: number) => {
    props.getUsers(value, props.itemsPerPage);
    props.updateCurrentPage(value);
  };

  if (props.total === 0) {
    return null;
  }

  return (
    <Pagination
      count={props.total}
      onChange={onChange}
      size="large"
      classes={{ root: classes.root, ul: classes.ul }}
      page={props.currentPage}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedGrid);
