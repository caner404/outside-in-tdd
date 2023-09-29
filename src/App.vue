<script setup lang="ts">
import RestaurantScreen from "./components/RestaurantScreen.vue";
</script>

<template>
  <v-app>
    <VAppBar color="primary">
      <VToolbarTitle>Opinion Ate</VToolbarTitle>
    </VAppBar>
    <VMain>
      <VContainer :fluid="true">
        <RestaurantScreen />
      </VContainer>
    </VMain>
  </v-app>
</template>

<style scoped></style>
