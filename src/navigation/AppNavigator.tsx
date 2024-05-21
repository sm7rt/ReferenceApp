import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './NavigatorTypes';
import HomeScreen from '../screens/HomeScreen';
import TopicScreen from '../screens/TopicScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Topic" component={TopicScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
