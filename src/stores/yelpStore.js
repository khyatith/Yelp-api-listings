import Store from './Store';
import AppDispatcher from '../dispatcher/AppDispatcher';
import yelpConstants from '../constants/yelpConstants';

let _state;

const resetState = function() {
	_state = {
		totalPTs: '',
		totalPTsWithRatings: '',
		averagePTRating: '',
		totalReviews: '',
		businesses: [],
		currentLocation: '',
		message: ''
	};
};

resetState();

//set up error messages if any
const _errorToMessage = (err) => _state.message = err;

//get the data from the endpoint
const _getAllPTs = async(location) => {
	_state.currentLocation = location;
	_state.message = '';
	try {
		const data = await fetch(`/api/getAllPTs/${location}`, { method: 'get'});
		const json = await data.json();
		if (json.error) throw json.error.description;
		const { businesses, total } = json;
		_state.businesses = businesses;
		_state.totalPTs = total;
		const { totalReviews, ratingCount, averagePTRating } = _setAverageRatings(businesses);
		_state.totalReviews = totalReviews;
		_state.totalPTsWithRatings = ratingCount;
		_state.averagePTRating = averagePTRating.toFixed(2);
	} catch(err) {
		_errorToMessage(err);
	}
	yelpInstance.emitChange();
}

//calculate averages
const _setAverageRatings = (businesses) => {
	let ratingCount = 0;
	let totalRating = 0;
	let totalReviews = 0;
	businesses.map(business => {
		const { rating, review_count } = business;
		totalReviews += review_count;
		if (rating >= 1) {
			ratingCount++;
			totalRating += (review_count * rating);
		}
	});
	return { totalReviews, ratingCount, averagePTRating: totalRating / totalReviews };
}

class yelpStore extends Store {
    constructor() {
        super();
    }
    getState() {
        return _state;
    }
    resetState() {
        return resetState();
    }
}

let yelpInstance = new yelpStore();

yelpInstance.dispatchToken = AppDispatcher.register(function(action) {
    switch (action.actionType) {
    	case yelpConstants.GET_ALL_PT:
    		_getAllPTs(action.location);
    		break;
        case yelpConstants.RESET_STATE:
            resetState();
            break;
    }

    yelpInstance.emitChange();
});

export default yelpInstance;
