import { Api } from "./Api";
import { 
  IUserInfoData,
  IBuildingData, 
  IBuildingBlock, 
  IBuyBuildingResponse,
  IUserBalanceResponse, 
} from "@/types";
import { mockInitData } from "@/utils/mockData/mockData";

export class UserApi extends Api {
  constructor(baseUrl: string, initData: string, options?: RequestInit) {
    const token = JSON.stringify(initData);

    const headers = {
      ...options?.headers,
      'Authorization': `Bearer ${token}`,
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

  getUserBalance(userId: number): Promise<{ balance: number }> {
    return this.request(`/user/${userId}/balance`, 'GET');
  }

  earnDaily(): Promise<IUserBalanceResponse> {
    return this.request(`/user/earn_daily`, 'POST', {});
  }
}

const initData = mockInitData;
console.log(initData);
export const userApi = new UserApi('http://localhost:8000', initData, {
  headers: {
    'Content-Type': 'application/json',
  },
});