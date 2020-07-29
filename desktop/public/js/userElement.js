const userElement = (user) => `
	<li id="user_${user.id}" style="margin: 20px">
		<p style="color: #F00">
			ID: <span style="color: var(--autoThemeInverseColor)">${user.id}</span>

			<button style="marginLeft: 10; color: #F00" onclick="deleteUser(${user.id})">
				Delete
			</button>
		</p>

		<p style="color: #F00">
			User name: <span style="color: var(--autoThemeInverseColor)">${user.name}</span>
		</p>

		<p style="color: #F00">
			Email: <span style="color: var(--autoThemeInverseColor)">${user.email}</span>
		</p>

		<p style="color: #F00">
			Phone number: <span style="color: var(--autoThemeInverseColor)">${user.number}</span>
		</p>
	</li>
`;