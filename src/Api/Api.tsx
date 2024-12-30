import { IUserInfoData, IUserDetails } from "@/types";

export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export type ApiPostMethods = 'GET' | 'PUT' | 'DELETE' | 'POST';

export class Api {
  readonly baseUrl: string;

  protected options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as object ?? {}),
      },
    };
  }

  protected handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.json() as Promise<T>;
    }
    return response.json().then((data) => {
      console.error('API Error:', data);
      return Promise.reject(data.error ?? response.statusText);
    });
  }

  get<T>(uri: string): Promise<T> {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method: 'GET',
    }).then((response) => this.handleResponse<T>(response));
  }

  put<T>(uri: string, data: object, method: ApiPostMethods = 'PUT'): Promise<T> {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method,
      body: JSON.stringify(data),
    }).then((response) => this.handleResponse<T>(response));
  }

  delete<T>(uri: string, data?: object, method: ApiPostMethods = 'DELETE'): Promise<T> {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method,
      body: data ? JSON.stringify(data) : undefined,
    }).then((response) => this.handleResponse<T>(response));
  }

  post<T>(uri: string, data: IUserInfoData, method: ApiPostMethods = 'POST'): Promise<T> {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method,
      body: JSON.stringify(data),
    }).then((response) => this.handleResponse<T>(response));
  }

  protected async request<T>(
    uri: string,
    method: ApiPostMethods,
    data?: object
  ): Promise<T> {
    const requestBody = data ? JSON.stringify(data) : undefined;
    
    console.log(`Requesting: ${this.baseUrl + uri}`);
    console.log('Method:', method);
    console.log('Request Body:', requestBody);
  
    const response = await fetch(this.baseUrl + uri, {
      ...this.options,
      method,
      body: requestBody,
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
  
    return this.handleResponse<T>(response);
  }
}

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