import React, { useEffect, useState } from 'react';
import api from '../../api';
import './styles.scss';

type Props = {
	data: Array<{
		id: number,
		name: string,
		email: string,
		number: number
	}>;
	setData: Function;
}

export default function ListUsers(props: Props) {
	const colorScheme: string = window.localStorage.getItem('colorScheme') as string;
	const autoThemeColor: string = (colorScheme === 'light') ? '#FFF' : '#000';
	const autoThemeInverseColor: string = (colorScheme === 'light') ? '#000' : '#FFF';

	const [haveFinished, setHaveFinished] = useState(false);
	const [page, setPage] = useState(1);

	const handleClick = async (id: number): Promise<void> => {
		await api.delete(`user/${id}`);

		props.setData(props.data.filter((value) => value.id !== id));
	};

	useEffect(() => {
		if (!haveFinished) {
			api.get(`users?page=${page}`).then((response) => {
				if (response.data.length !== 5)
					setHaveFinished(true);
				else
					setPage(page + 1);
				
				props.setData([...props.data, ...response.data]);
			});
		}
	}, [page, props, haveFinished]);

	const userList = () => {
		if (props.data.length !== 0) {
			return (
				<ul style={{ display: 'block' }}>
					{props.data.map((item) => (
						<li key={item.id} style={{ marginBottom: 40 }}>
							<p className='bigText' style={{ color: '#F00' }}>
								ID: <span style={{ color: autoThemeInverseColor }}>{item.id}</span>

								<button className='button bigText' style={{ marginLeft: 10, color: '#F00' }} onClick={() => handleClick(item.id)}>
									Delete
								</button>
							</p>

							<p className='bigText' style={{ color: '#F00' }}>
								User name: <span style={{ color: autoThemeInverseColor }}>{item.name}</span>
							</p>

							<p className='bigText' style={{ color: '#F00' }}>
								Email: <span style={{ color: autoThemeInverseColor }}>{item.email}</span>
							</p>

							<p className='bigText' style={{ color: '#F00' }}>
								Phone number: <span style={{ color: autoThemeInverseColor }}>{item.number}</span>
							</p>
						</li>
					))}
				</ul>
			);
		}
		else {
			return (
				<div>
					<p className='bigText' style={{ color: autoThemeInverseColor }}>
						Loading the users
					</p>
				</div>
			);
		}
	};

	return (
		<div style={{ backgroundColor: autoThemeColor }}>
			{userList()}
		</div>
	);
}