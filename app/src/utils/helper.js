import {View} from "react-native"
import {StartIcon} from "react-native-heroicons/solid"

 const getRating = rating => {
  const ratingStar = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      ratingStar.push(<StartIcon size="20" color='#ffa41c' />);
    } else {
      ratingStar.push(<StartIcon size='20' color='#0000004b'/>);
    }
  }
  if (rating % 1 !== 0) {
    ratingStar[Math.floor(rating)] = <StartIcon size='20' color='#0000004b' />;
  }
  return <View style={{display:'flex',flexDirection:'row'}}>{ratingStar}</View> ;
};

export default getRating()


