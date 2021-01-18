import Users from '../../src/model/user';

describe('Unit: can list the users', () => {
	it('should return "[]"', () => {
		let users: Users = new Users();

		expect(users.getUsers(0, 1)).toStrictEqual([]);
	});
});

describe('Unit: can create new users', () => {
	it('should retun the created users', () => {
		let users: Users = new Users();

		for (let i = 0; i <= 2; i++) {
			expect(users.addUser('Foo Bar', 'foobar@email.com', 999999999)).toBe(i);
		}

		expect(users.getUsers(0, 3)).toStrictEqual([
			{ id: 0, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
			{ id: 1, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
			{ id: 2, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 }
		]);
	});
});

describe('Unit: can get a user', () => {
	it('should retun the proprieties of a user', () => {
		let users: Users = new Users();

		for (let i = 0; i <= 2; i++) {
			users.addUser('Foo Bar', 'foobar@email.com', 999999999);
		}

		expect(users.getUser(0)).toStrictEqual({ id: 0, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 });
	});
});

describe('Unit: can update a user', () => {
	it('should return the edited users', () => {
		let users: Users = new Users();

		users.addUser('Foo Bar', 'foobar@email.com', 999999999);
		users.updateUser(0, 'Foo', 'foo@email.com', 999999999);
		users.updateUser(0, undefined, undefined, undefined);

		expect(users.getUsers(0, 1)).toStrictEqual([
			{ id: 0, name: 'Foo', email: 'foo@email.com', number: 999999999 }
		]);
	});
});

describe('Unit: can delete a user', () => {
	it('should return "[]"', () => {
		let users: Users = new Users();

		users.addUser('Foo Bar', 'foobar@email.com', 999999999);
		users.deleteUser(0);

		expect(users.getUsers(0, 1)).toStrictEqual([]);
	});
});