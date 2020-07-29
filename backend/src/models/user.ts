export interface IUser {
	id: number;
	name: String;
	email: String;
	number: number;
}

export default class User {
	private users: Array<IUser> = [];
	private index: number = 0;

	public getUsers(): Array<IUser> {
		return this.users;
	}

	public getUser(id: number): IUser | undefined {
		return this.users.find((user: IUser) => user.id == id);
	}

	public addUser(name: String, email: String, number: number): number {
		this.users.push({
			id: this.index,
			name,
			email,
			number
		});

		return this.index++;
	}

	public updateUser(id: number, name: String | undefined, email: String | undefined, number: number | undefined): void {
		if (name) {
			this.users[id].name = name;
		}
		if (email) {
			this.users[id].email = email;
		}
		if (number) {
			this.users[id].number = number;
		}
	}

	public deleteUser(id: number): void {
		this.users = this.users.filter((user: IUser) => user.id !== id);
	}
}