import {View, Text, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import AddContact from '../screens/addContact';
import ContactList from '../screens/contactList';
import Favourite from '../screens/favourite';
import UpdateContact from '../screens/updateContact';
import StarImage from '../pages/StarImage';

export default function MyStack() {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contact List"
        component={ContactList}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Add New Contact"
        component={AddContact}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Favourite Contact"
        component={Favourite}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Update Contact"
        component={UpdateContact}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
