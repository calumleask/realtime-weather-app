import React from "react";
import { Provider } from "react-redux";

import store from "~/stores/Store";

import App from "~/containers/App.jsx";

export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<App/>
			</Provider>
		);
	}
}