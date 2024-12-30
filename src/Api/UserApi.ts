import { Api } from './Api';
import { IUserInfoData } from '@/types';

export interface IUserDetails {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  balance?: number;
}

export interface IUserBalance {
  user_id: number;
}

export class UserApi extends Api {
  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }

  addUser(user: IUserInfoData): Promise<IUserInfoData> {
    return this.post('/user/add_user', user);
  }

  getUserById(id: number): Promise<{ user: IUserDetails }> {
    return this.get(`/user/${id}`);
  }

  getUserBalance(userId: number): Promise<IUserBalance> {
    return this.get(`/user/${userId}/balance`);
  }

  earnDaily(userId: number): Promise<IUserBalance> {
    return this.post(`/user/${userId}/earn_daily`, {});
  }
}

export const userApi = new UserApi('http://127.0.0.1:8000', {
  headers: {
    'Content-Type': 'application/json',
  },
});
