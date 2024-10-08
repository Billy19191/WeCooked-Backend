import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  constructor(@Inject('TEST_SERVICE') private readonly client: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: any): Observable<any> {
    this.users.push(createUserRequest);
    return this.client.emit('create user!!', createUserRequest);
  }

  getUsers(): Observable<any> {
    return this.client.send({ cmd: 'get users' }, {});
  }
}
