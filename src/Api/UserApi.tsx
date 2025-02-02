import { Api } from "./Api";
import { 
  IUserInfoData,
  IBuildingData, 
  IBuildingBlock, 
  IBuyBuildingResponse,
  IUserBalanceResponse,
  IReferalsData, 
} from "@/types";
import WebApp from "@twa-dev/sdk";

export class UserApi extends Api {
  constructor(baseUrl: string, initData: string, options?: RequestInit) {
    const headers = {
      ...options?.headers,
      'Authorization': `Bearer ${initData}`,
    };
    super(baseUrl, { ...options, headers });
  }

  addUser(): Promise<IUserInfoData> {
    return this.request('/user/add_user', 'POST', {});
  }
  
  getUserById(): Promise<{ user: IUserInfoData }> {
    return this.request(`/user/`, 'GET');
  }

  addBuilding(building: IBuildingBlock): Promise<IBuildingBlock> {
    return this.request('/city/building/add', 'POST', {
      name: building.name,
      income: building.income,
      cost: building.cost,
      icon_url: building.icon_url,
    });
  }

  getAllBuildings(): Promise<IBuildingData[]> {
    return this.request('/city/building/get_all', 'GET');
  }

  buyBuilding(buildingId: number): Promise<IBuyBuildingResponse> {
    const queryParams = new URLSearchParams({
      building_id: String(buildingId),
    }).toString();
  
    return this.request(`/user/buy_building?${queryParams}`, 'POST');
  }

  getUserBuildings(): Promise<IBuildingData[]> {
    return this.request(`/user/get_buildings`, 'GET');
  }

  getUserBalance(): Promise<IUserBalanceResponse> {
    return this.request(`/user/balance`, 'GET');
  }

  earnDaily(): Promise<IUserBalanceResponse> {
    return this.request(`/user/earn_daily`, 'POST', {});
  }

  earnCard(): Promise<IUserBalanceResponse> {
    return this.request('/user/earn_card', 'POST', {});
  }

  getReferals(): Promise<IReferalsData> {
    return this.request('/user/get_referals', 'GET');
  }

  addReferal(referalId: number): Promise<IUserInfoData> {
    return this.request(`/user/add_referal/${referalId}`, 'POST', {});
  }
}

const initData = WebApp.initData;
export const userApi = new UserApi('http://localhost:8000', initData, {
  headers: {
    'Content-Type': 'application/json',
  },
});