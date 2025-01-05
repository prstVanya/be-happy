export interface IUserInfoData {
  id: number,
  first_name: string;
  last_name: string;
  username: string;
  balance: number;
  income: number;
  level: number;
  referals: number;
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
  icon_url: string | '';
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
  level: number;
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
  level: number;
}

export interface IUserBalance {
  user_id: number;
  balance: number;
}

export interface IBuilding {
  id: number;
  icon_url: string;
  name: string;
  income: number;
  cost: number;
  isPurchased: boolean; 
}

export interface IReferalsData {
  user_id: number;
  fristname: string;
  referals: number;
}

export interface IReferalAddData {
  referer_id: number;
}