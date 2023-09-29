import RestaurantList from "@/components/RestaurantList.vue";
import { useRestaurantStore, type Restaurant } from "@/stores/restaurant";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require("resize-observer-polyfill");

describe("RestaurantList", () => {
  const mocks: Restaurant[] = [
    { id: 1, name: "Pasta Place " },
    { id: 2, name: "Salad Place " },
  ];
  let wrapper: any;
  let restaurant: any;

  const mountWithStore = (state: any = {}) => {
    const pinia = createTestingPinia({
      initialState: {
        restaurant: {
          ...state,
        },
      },
    });
    restaurant = useRestaurantStore();
    restaurant.restaurants = mocks;
    wrapper = mount(RestaurantList, {
      global: {
        plugins: [pinia, vuetify],
      },
    });
  };

  beforeEach(() => {
    mountWithStore();
  });

  it("loads restaurants on mount", () => {
    expect(restaurant.load).toHaveBeenCalledOnce();
  });
  it("displays the loading indicator while loading", () => {
    mountWithStore({ loading: true });
    const value = wrapper.find("[data-test='loading']");
    expect(value.exists()).toBe(true);
  });

  describe("when loading succeeds ", () => {
    beforeEach(() => {
      mountWithStore();
    });

    it("does not displays the loading indicator while loading", () => {
      const value = wrapper.find("[data-test='loading']");
      expect(value.exists()).toBe(false);
    });

    it("displays the restaurants", () => {
      const firstRestaurantName = findByTestId(wrapper, "restaurant", 0);
      expect(firstRestaurantName?.text()).toBe("Pasta Place");
      const secondRestaurantName = findByTestId(wrapper, "restaurant", 1);
      expect(secondRestaurantName?.text()).toBe("Salad Place");
    });
    it("does not display the error message", () => {
      mountWithStore({ loadError: false });
      expect(wrapper.find("[data-test='errorMessage']").exists()).toBe(false);
    });
  });

  describe("when loading fails", () => {
    beforeEach(() => {
      mountWithStore({ loadError: true });
    });
    it("displays the error message", () => {
      expect(wrapper.find("[data-test='errorMessage']").exists()).toBe(true);
    });
  });
});

function findByTestId(wrapper: any, testId: string, index: number) {
  return wrapper.findAll(`[data-test='${testId}']`).at(index);
}
