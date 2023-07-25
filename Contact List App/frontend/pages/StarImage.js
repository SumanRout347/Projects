import React from 'react';

import {View, Image} from 'react-native';

const StarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../assets/star.png')}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </View>
  );
};

export default StarImage;
