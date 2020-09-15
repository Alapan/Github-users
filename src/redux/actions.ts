import { UPDATE_CURRENT_PAGE, UPDATE_ITEMS_PER_PAGE } from './constants';

const updateCurrentPage = (value: number) => {
    return {
        type: UPDATE_CURRENT_PAGE,
        value,
    };
};

const updateItemsPerPage = (value: number) => {
    return {
        type: UPDATE_ITEMS_PER_PAGE,
        value,
    };
};

export { updateCurrentPage, updateItemsPerPage };
