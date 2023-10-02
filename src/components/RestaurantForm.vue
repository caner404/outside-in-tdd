<script setup lang="ts">
import { useRestaurantStore } from "@/stores/restaurant";
import { ref } from "vue";

const store = useRestaurantStore();
const newRestaurantName = ref("");
const validationError = ref(false);

async function handleSave() {
  if (!newRestaurantName.value) {
    validationError.value = true;
    return;
  }
  validationError.value = false;
  await store.create(newRestaurantName.value);
  newRestaurantName.value = "";
}
</script>
<template>
  <form @submit.prevent="handleSave">
    <v-alert type="error" v-if="validationError" data-test="new-restaurant-error">Name is required</v-alert>
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
