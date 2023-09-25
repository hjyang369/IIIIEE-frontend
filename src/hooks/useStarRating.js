import { useState } from 'react';

const useStarRating = standard => {
  const [rate, setRate] = useState(0);

  const starArr = Array.from({ length: standard }, (v, i) => i + 1);

  const reactionStar = id => {
    setRate(id);
  };

  const totalRating = score => {
    let allStarRating = 0;
    let plusRating = 0;
    for (let i = 0; i < score?.length; i++) {
      allStarRating += Number(score[i].rating);
      plusRating = allStarRating / score.length;
    }
    return plusRating;
  };

  const makeZero = () => {
    setRate(0);
  };

  const makeGuestStar = rating => {
    return Array.from({ length: rating }, () => 0);
  };

  return { rate, starArr, makeGuestStar, reactionStar, totalRating, makeZero };
};

export default useStarRating;
