import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "~/reducers/Reducers";

const configureStore = initialState => (
	createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunkMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)
);

const store = configureStore();
export default store;

export const dispatch = store.dispatch;