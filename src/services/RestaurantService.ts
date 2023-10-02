import axios from "axios";

const baseURL = "https://api.outsidein.dev/KSSSt61lGV18iX6qlzzVgILVksMuenlT";
export interface Restaurant {
  id: number;
  name: string;
}
export async function fetchRestaurants() {
  const result = await axios.get(`${baseURL}/restaurants`);
  return result.data;
}
export async function createRestaurant(newRestaurantName: string) {
  const result = await axios.post(`${baseURL}/restaurants`, { name: newRestaurantName });
  return result.data;
}
