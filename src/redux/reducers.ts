import { UPDATE_CURRENT_PAGE, UPDATE_ITEMS_PER_PAGE } from './constants';

interface State {
    currentPage: number;
    itemsPerPage: number;
}

interface Action {
    type: string;
    value: number;
}

const initialState = {
    currentPage: 1,
    itemsPerPage: 30,
};

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.value,
            };

        case UPDATE_ITEMS_PER_PAGE:
            return {
                ...state,
                itemsPerPage: action.value,
            };
        default:
            return state;
    }
};

export default reducer;
