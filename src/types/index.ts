export interface IUserInfoData {
  id: number;
  first_name: string | '';
  last_name?: string | '';
  username?: string | '';
}

export interface IUserBalance {
  user_id: number;
  balance: number;
}
