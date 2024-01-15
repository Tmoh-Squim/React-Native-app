import {StartIcon} from "react-native-heroicons/solid"
export const getRating = rating => {
  const ratingStar = [];
  const fullStar = <StartIcon size={10} color="#ffa41c" />;
  const halfStar = (
    <StartIcon size={10} color="#ffa41c" />
  );
  const emptyStar = <StartIcon size={10} color="#ffa41c" />;

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      ratingStar.push(fullStar);
    } else {
      ratingStar.push(emptyStar);
    }
  }
  if (rating % 1 !== 0) {
    ratingStar[Math.floor(rating)] = halfStar;
  }
  return ratingStar;
};


