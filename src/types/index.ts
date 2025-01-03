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

export interface IBuildingBlock {
  name: string;
  income: number;
  cost: number;
}

export interface IBuildingData {
  name: string;
  income: number;
  cost: number;
  building_id: number;
  id: number;
  image: string;
}

export interface IBuyBuildingResponse {
  user_id: number;
  balance: number;
  income: number;
}

export interface ICityAdd {
  id?: number;
  image?: string;
  name: string;
  income: number;
  cost: number;
}

export interface IUserBalance {
  user_id: number;
}

export interface IUserBalanceResponse {
  user_id: number;
  balance: number;
  income: number;
}

export interface IUserBalance {
  user_id: number;
  balance: number;
}

export interface IBuilding {
  id: number;
  image: string;
  name: string;
  income: number;
  cost: number;
  isPurchased: boolean; 
}
