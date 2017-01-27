import { SHOW_RESULTS, HIDE_RESULTS, OPEN_MENU, CLOSE_MENU } from "~/searchbar/actions/SearchBarActionTypes";

const defaultState = {
    showingMenu: false,
    showingResults: false,
};

export const searchBar = (state = defaultState, action) => {
	switch (action.type) {
		case SHOW_RESULTS:
			return Object.assign({}, state, {
				showingResults: true
			});

		case HIDE_RESULTS:
			return Object.assign({}, state, {
				showingResults: false
			});

		case OPEN_MENU:
			return Object.assign({}, state, {
				showingMenu: true
			});

		case CLOSE_MENU:
			return Object.assign({}, state, {
				showingMenu: false
			});

		default:
			return state;
	}
};