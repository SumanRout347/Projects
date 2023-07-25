import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {UserContext} from './context/UserContext';

import MyStack from './routes/MyStack';

function App() {
  const [favouriteUser, setFavouriteUser] = useState([]);
  return (
    <NavigationContainer>
      <UserContext.Provider value={{favouriteUser, setFavouriteUser}}>
        <MyStack />
      </UserContext.Provider>
    </NavigationContainer>
  );
}

export default App;
