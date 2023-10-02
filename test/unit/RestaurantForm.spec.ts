import RestaurantForm from "@/components/RestaurantForm.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import { useRestaurantStore } from "@/stores/restaurant";

const vuetify = createVuetify({
  components,
  directives,
});

describe("RestaurantForm", () => {
  let wrapper: any;
  const restaurantName = "Sushi Place";
  let restaurantStore: any;

  beforeEach(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    wrapper = mount(RestaurantForm, {
      global: {
        plugins: [createTestingPinia(), vuetify],
      },
      attachTo: div,
    });
    restaurantStore = useRestaurantStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("when input is filled in", () => {
    it("should dispatch a create action", async () => {
      wrapper.find("[data-test='new-restaurant-name'] input").setValue(restaurantName);
      await wrapper.find("[data-test='new-restaurant-add-button']").trigger("click");

      expect(restaurantStore.create).toHaveBeenCalledWith(restaurantName);
    });

    it("clears the input ", async () => {
      wrapper.find("[data-test='new-restaurant-name'] input").setValue(restaurantName);
      await wrapper.find("[data-test='new-restaurant-add-button']").trigger("click");

      const inputValue = wrapper.find("[data-test='new-restaurant-name'] input").element as HTMLInputElement;
      expect(inputValue.value).toEqual("");
    });
  });
});
