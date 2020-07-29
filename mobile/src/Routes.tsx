import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateUser from './pages/CreateUser';
import Home from './pages/Home';
import ListUsers from './pages/ListUsers';
import UpdateUser from './pages/UpdateUser';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='CreateUser' component={CreateUser} />
			<Stack.Screen name='ListUsers' component={ListUsers} />
			<Stack.Screen name='UpdateUser' component={UpdateUser} />
		</Stack.Navigator>
	);
}

export type StackList = {
	Home: undefined;
	CreateUser: undefined;
	ListUsers: undefined;
	UpdateUser: undefined;
};