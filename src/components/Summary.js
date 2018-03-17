import React from 'react';

//display summary
const Summary = ({
	averagePTRating,
    totalPTs,
    totalPTsWithRatings,
    totalReviews,
    location
 }) => {
	return (
		<div className="card">
			<h5 className="card-header">{ location } Statistics</h5>
			<div className="card-body" style={ cardStyle }>
		    	<p className="text-muted">Total Number of Physical Therapists: { totalPTs }</p>
		    	<p className="text-muted">Total Physical Therapists with ratings: { totalPTsWithRatings }</p>
		    	<p className="text-muted">Averag Ratings of all Physical Therapists: { averagePTRating }</p>
		    	<p className="text-muted">Total Reviews: { totalReviews }</p>
		  	</div>
		</div>
	)
}

const cardStyle={ margin: '20px' };

export default Summary;