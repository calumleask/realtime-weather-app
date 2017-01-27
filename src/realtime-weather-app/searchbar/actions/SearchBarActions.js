import { SHOW_RESULTS, HIDE_RESULTS, OPEN_MENU, CLOSE_MENU } from "~/searchbar/actions/SearchBarActionTypes";

export const showResults = () => ({
	type: SHOW_RESULTS
});

export const hideResults = () => ({
	type: HIDE_RESULTS
});

export const openMenu = () => ({
	type: OPEN_MENU
});

export const closeMenu = () => ({
	type: CLOSE_MENU
});