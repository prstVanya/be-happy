import { Api } from "./Api";
import { 
  IUserInfoData,
  IUserDetails, 
  IBuildingData, 
  IBuildingBlock, 
  IBuyBuildingResponse,
  IUserBalanceResponse, 
} from "@/types";

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

  buyBuilding(userId: number, buildingId: number): Promise<IBuyBuildingResponse> {
    const queryParams = new URLSearchParams({
      building_id: String(buildingId),
    }).toString();
  
    return this.request(`/user/${userId}/buy_building?${queryParams}`, 'POST');
  }

  getUserBuildings(userId: number): Promise<IBuildingData[]> {
    return this.request(`/user/${userId}/get_buildings`, 'GET');
  }

  getUserBalance(userId: number): Promise<{ balance: number }> {
    return this.request(`/user/${userId}/balance`, 'GET');
  }

  earnDaily(userId: number): Promise<IUserBalanceResponse> {
    return this.request(`/user/${userId}/earn_daily`, 'POST', {
      user_id: userId,
    });
  }
}

export const userApi = new UserApi('http://localhost:8000', {
  headers: {
    'Content-Type': 'application/json',
  },
});