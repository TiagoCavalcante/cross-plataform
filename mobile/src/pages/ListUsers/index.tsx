import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, TextInput } from 'react-native';
import api from '../../api';
import globalStyles from '../Home/styles';
import styles from './styles';
import { ColorSchemeName, useColorScheme } from 'react-native-appearance';

export default function ListUsers() {
	const colorScheme: ColorSchemeName = useColorScheme();
	const autoThemeColor: string = (colorScheme == 'light') ? '#FFF' : '#000';
	const autoThemeInverseColor: string = (colorScheme == 'light') ? '#000' : '#FFF';

	const [users, setUsers] = useState<Array<any>>([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);

	const loadUsers = async (): Promise<void> => {
		if (loading)
			return;
		if (total > 0 && users.length === total)
			return;

		setLoading(true);

		const response = await api.get(`users?page=${page}`);

		setUsers([...users, ...response.data]);
		setTotal(response.headers['x-total-count']);
		setPage(page + 1);

		setLoading(false);
	};

	const handleClick = async (id: number): Promise<void> => {
		await api.delete(`user/${id}`);

		setUsers(users.filter((value) => value.id !== id));
	};

	useEffect(() => {
		loadUsers();
	}, []);

	const userList = () => {
		if (users.length !== 0) {
			return (
				<FlatList showsVerticalScrollIndicator={false} data={users} keyExtractor={item => item.id.toString()} renderItem={({ item }) =>
					<View style={globalStyles.container}>
						<Text style={[globalStyles.bigText, { color: '#F00' }]}>ID: <Text style={{ color: autoThemeInverseColor }}>{item.id}</Text></Text>

						<TouchableOpacity style={styles.button} onPress={() => handleClick(item.id)}>
							<Feather name='trash-2' size={24} color='#F00' />
						</TouchableOpacity>

						<Text style={[globalStyles.bigText, { color: '#F00' }]}>User name:</Text>
						<Text style={globalStyles.bigText}>{item.name}</Text>

						<Text style={[globalStyles.bigText, { color: '#F00' }]}>Email:</Text>
						<Text style={globalStyles.bigText}>{item.email}</Text>

						<Text style={[globalStyles.bigText, { color: '#F00' }]}>Phone number:</Text>
						<Text style={globalStyles.bigText}>{item.number}</Text>
					</View>
				} onEndReached={loadUsers} onEndReachedThreshold={0.3} />
			);
		}
		else {
			return (
				<Text style={[globalStyles.bigText, { color: autoThemeInverseColor }]}>
					Loading the users
				</Text>
			);
		}
	};

	return (
		<View style={[globalStyles.container, { backgroundColor: autoThemeColor }]}>
			{userList()}
		</View>
	);
}