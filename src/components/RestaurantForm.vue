<script setup lang="ts">
import { useRestaurantStore } from "@/stores/restaurant";
import { ref } from "vue";

const store = useRestaurantStore();
const newRestaurantName = ref("");

async function handleSave() {
  await store.create(newRestaurantName.value);
  newRestaurantName.value = "";
}
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
