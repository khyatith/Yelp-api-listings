import React from 'react';

const TherapistDetails = ({ businesses }) => {
	//sort by descending order of ratings and display the results
	const sortedBusinesses = businesses.sort(function(a,b) {return (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0);});
	return(
		<div className="container">
			{
				sortedBusinesses.map((business, i) => {
					const { name, image_url, rating, review_count, location } = business;
					return (
						<div className="card" key={ i }>
							<h5 className="card-header">{ name }</h5>
						    <div className="card-container" style={ cardStyle }>
						    	<div className="row">
						    		<div className="col-md-6">
							    		<img className="card-img-left" src={ image_url } alt={ name } style={ imageStyle } />
							    	</div>
							    	<div className="col-md-6">
							     		<p className="text-muted">{ location.display_address.join(',') }</p>
							    		<p className="text-muted">Rating: { rating }</p>
							     		<p className="text-muted">Total Reviews: { review_count }</p>
							     	</div>
						     	</div>
						    </div>
						 </div>
					);
				})
			}
		</div>
	);
}

const imageStyle = { width: '300px', height: '300px'};
const cardStyle = { margin: '20px' };

export default TherapistDetails;