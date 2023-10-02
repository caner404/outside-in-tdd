<script setup lang="ts">
import RestaurantList from "./RestaurantList.vue";
import RestaurantForm from "./RestaurantForm.vue";
</script>
<template>
  <VCard>
    <VCardTitle>Restaurants</VCardTitle>
    <VCardText>
      <RestaurantList />
      <RestaurantForm />
    </VCardText>
  </VCard>
</template>
<style scoped></style>
