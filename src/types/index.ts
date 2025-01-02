export interface IUserInfoData {
  id: number;
  first_name: string | '';
  last_name: string | '';
  username: string | '';
}

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

export interface IUserBalance {
  user_id: number;
  balance: number;
}
