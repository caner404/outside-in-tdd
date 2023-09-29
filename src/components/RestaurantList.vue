<script setup lang="ts">
import { useRestaurantStore } from "@/stores/restaurant";
import { onMounted } from "vue";

const restaurantStore = useRestaurantStore();
onMounted(async () => {
  await restaurantStore.load();
});
</script>
<template>
  <div>
    <VAlert
      v-if="restaurantStore.loadError"
      type="error"
      title="Error Restaurant List"
      text="Something went wrong! We could not find any restaurants"
      data-test="errorMessage"
    />

    <VListItem
      v-for="restaurant in restaurantStore.restaurants"
      :key="restaurant.id"
      data-test="restaurant"
    >
      <VListItemTitle>
        {{ restaurant.name }}
      </VListItemTitle>
    </VListItem>
    <div>
      <v-progress-circular
        indeterminate
        v-if="restaurantStore.loading"
        model-value="20"
        data-test="loading"
      ></v-progress-circular>
    </div>
  </div>
</template>
<style scoped></style>
