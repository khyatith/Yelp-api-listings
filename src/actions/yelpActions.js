import yelpConstants from '../constants/yelpConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const yelpActions = {
	getAllPTs(location) {
		AppDispatcher.dispatch({
			actionType: yelpConstants.GET_ALL_PT,
			location
		});
	},
	resetState() {
		AppDispatcher.dispatch({
			actionType: yelpConstants.RESET_STATE
		});
	}
}

export default yelpActions;