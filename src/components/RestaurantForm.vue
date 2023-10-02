<script setup lang="ts">
import { useRestaurantStore } from "@/stores/restaurant";
import { ref } from "vue";

const store = useRestaurantStore();
function handleSave() {
  store.create(newRestaurantName.value);
}
const newRestaurantName = ref("");
</script>
<template>
  <form @submit.prevent="handleSave">
    <VTextField
      placeholder="Add Restaurant"
      type="input"
      variant="solo-filled"
      data-test="new-restaurant-name"
      v-model="newRestaurantName"
    />
    <VBtn type="submit" color="primary" data-test="new-restaurant-add-button"> Add </VBtn>
  </form>
</template>
