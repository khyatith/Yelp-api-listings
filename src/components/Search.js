import React from 'react';
//import Action and Store
import yelpActions from '../actions/yelpActions';
import yelpStore from '../stores/yelpStore';
//child components
import Summary from './Summary.js';
import TherapistDetails from './TherapistDetails.js';

class Search extends React.Component {

	constructor() {
        super();
        this.state = yelpStore.getState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        yelpStore.addChangeListener(this._onChange);
    }

	_onChange() {
        this.setState(yelpStore.getState());
    }

    componentWillUnmount() {
        yelpStore.removeChangeListener(this._onChange);
    }

    _getAllPTs = () => {
    	yelpActions.getAllPTs(this.refs.locationInput.value);
    }

    render() {
        const { businesses, averagePTRating, totalPTs, totalPTsWithRatings, totalReviews, currentLocation, message } = this.state; 
        return (
        	<div>
                <div className="row">
    	            <div className="col-md-8" style={ colStyle }>
    	            	<form className="navbar-form navbar-left" role="search">
    						<div className="form-group">
    							<input type="text" className="form-control" placeholder="Search by address, neighborhood, city, state or zip, optional country" ref="locationInput"/>
    						</div>
    					</form>
    	            </div>
    	            <div className="col-md-4" style={ colStyle }>
                		<button type="submit" className="btn btn-success" onClick={ this._getAllPTs }>Submit</button>
                	</div>
                </div>
                {
                    message ? <div className="alert alert-danger col-md" style={ colStyle }>
                        <strong>{ message }</strong>
                    </div>
                    :
                    ''
                }
                <div className="row" style={ colStyle }>
                {
                    businesses.length !== 0 && <Summary
                        averagePTRating={ averagePTRating }
                        totalPTs={ totalPTs }
                        totalPTsWithRatings={ totalPTsWithRatings }
                        totalReviews={ totalReviews }
                        location={ currentLocation }
                    />
                }
                </div>
                <div className="row" style={ colStyle }>
                {
                    businesses.length !== 0 && <TherapistDetails
                        businesses={ businesses }
                    />
                }
                </div>
            </div>
        );
    }
}

const colStyle={ margin: '20px 0 20px 0' };

export default Search;
