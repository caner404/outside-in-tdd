import { createRestaurant, fetchRestaurants, type Restaurant } from "@/services/RestaurantService";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRestaurantStore = defineStore("restaurant", () => {
  const records = ref([] as Restaurant[]);
  const loading = ref(false);
  const loadError = ref(false);

  const restaurants = computed(() => records.value);

  async function load() {
    loading.value = true;
    loadError.value = false;
    try {
      const newRecords = await fetchRestaurants();
      console.log(newRecords);
      records.value = newRecords;
    } catch (error) {
      console.error(error);
      loadError.value = true;
    }
    loading.value = false;
  }
  async function create(newRestaurantName: string) {
    try {
      const newRecord = await createRestaurant(newRestaurantName);
      records.value.push(newRecord);
    } catch (error) {
      console.error(error);
    }
  }

  return { restaurants, load, loading, loadError, create };
});
