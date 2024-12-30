import { Api } from "./Api";
import { IUserInfoData, IUserDetails } from "@/types";

export class UserApi extends Api {
  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }

  addUser(user: IUserInfoData): Promise<IUserInfoData> {
    return this.request('/user/add_user', 'POST', {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    });
  }
  
  getUserById(id: number): Promise<{ user: IUserDetails }> {
    return this.request(`/user/${id}`, 'GET');
  }
}

export const userApi = new UserApi('http://localhost:8000', {
  headers: {
    'Content-Type': 'application/json',
  },
});