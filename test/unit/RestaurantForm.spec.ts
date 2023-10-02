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

  describe("initially", () => {
    it("should not display a validation error", () => {
      expect(wrapper.find("[data-test='new-restaurant-error']").exists()).toBe(false);
    });
  });

  describe("when input is filled in", () => {
    beforeEach(async () => {
      wrapper.find("[data-test='new-restaurant-name'] input").setValue(restaurantName);
      await wrapper.find("[data-test='new-restaurant-add-button']").trigger("click");
    });
    it("should dispatch a create action", () => {
      expect(restaurantStore.create).toHaveBeenCalledWith(restaurantName);
    });

    it("clears the input ", () => {
      const inputValue = wrapper.find("[data-test='new-restaurant-name'] input").element as HTMLInputElement;
      expect(inputValue.value).toEqual("");
    });

    it("does not display a validation error", () => {
      expect(wrapper.find("[data-test='new-restaurant-error']").exists()).toBe(false);
    });
  });

  describe("when empty", () => {
    beforeEach(async () => {
      wrapper.find("[data-test='new-restaurant-name'] input").setValue("");
      await wrapper.find("[data-test='new-restaurant-add-button']").trigger("click");
    });
    it("should display a validation error", () => {
      expect(wrapper.find("[data-test='new-restaurant-error']").text()).toContain("Name is required");
    });
    it("does not dispatch the create action", () => {
      expect(restaurantStore.create).not.toHaveBeenCalled();
    });
  });

  describe("when correcting a validation error", () => {
    beforeEach(() => {
      wrapper.find("[data-test='new-restaurant-name'] input").setValue("");
      wrapper.find("[data-test='new-restaurant-add-button']").trigger("click");
      wrapper.find("[data-test='new-restaurant-name'] input").setValue(restaurantName);
      wrapper.find("[data-test='new-restaurant-add-button']").trigger("click");
    });

    it("clears the validation error", () => {
      expect(wrapper.find("[data-test='new-restaurant-error']").exists()).toBe(false);
    });
  });
});
