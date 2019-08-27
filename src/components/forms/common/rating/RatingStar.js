import React from 'react';
import StarRatings from 'react-star-ratings';

const RatingStar = props => {
  return (
    <div>
      <StarRatings {...props} />
    </div>
  );
};

export default RatingStar;
