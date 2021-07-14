import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'chemputer',
        password: 'chemputer123',
      },
      {
        userId: 2,
        username: 'lucus',
        password: 'mars',
      },
      {
        userId: 3,
        username: 'lucus',
        password: 'mars',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
