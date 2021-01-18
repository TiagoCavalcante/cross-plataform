export interface IUser {
	id: number;
	name: string;
	email: string;
	number: number;
}

export default class Users {
	private users: Array<IUser> = [];
	private index: number = 0;

	public getLenght(): number {
		return this.users.length;
	}

	public getUsers(offset: number, limit: number): Array<IUser> {
		return this.users.slice(offset, limit);
	}

	public getUser(id: number): IUser | undefined {
		return this.users.find((user: IUser) => user.id == id);
	}

	public addUser(name: string, email: string, number: number): number {
		this.users.push({
			id: this.index,
			name,
			email,
			number
		});

		return this.index++;
	}

	public updateUser(id: number, name?: string, email?: string, number?: number
	): void {
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