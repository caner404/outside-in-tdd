import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const baseURL = "https://api.outsidein.dev/KSSSt61lGV18iX6qlzzVgILVksMuenlT";
export interface Restaurant {
  id: number;
  name: string;
}

export const useRestaurantStore = defineStore("restaurant", () => {
  const records = ref([] as Restaurant[]);
  const loading = ref(false);
  const loadError = ref(false);

  const restaurants = computed(() => records.value);

  async function fetchRestaurants() {
    const result = await axios.get(`${baseURL}/restaurants`);
    return result.data;
  }

  async function load() {
    loading.value = true;
    loadError.value = false;
    try {
      records.value = await fetchRestaurants();
    } catch (error) {
      console.error(error);
      loadError.value = true;
    }
    loading.value = false;
  }

  return { fetchRestaurants, restaurants, load, loading, loadError };
});
