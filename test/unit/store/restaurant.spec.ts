// stores/counter.spec.ts
import { setActivePinia, createPinia } from "pinia";
import { beforeEach, it, expect, describe, vi, afterEach } from "vitest";
import { useRestaurantStore } from "@/stores/restaurant";
import axios from "axios";
import { createRestaurant, fetchRestaurants } from "@/services/RestaurantService";

vi.mock("axios");
vi.mock("@/services/RestaurantService");
describe("Restaurant Store", () => {
  const records = [
    { id: 1, name: "Pasta Place " },
    { id: 2, name: "Salad Place " },
  ];
  let restaurant: any;
  beforeEach(() => {
    setActivePinia(createPinia());
    restaurant = useRestaurantStore();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("initially", () => {
    it("does not have the loading flag set", () => {
      expect(restaurant.loading).toBe(false);
    });
  });

  describe("when loading succeeds", () => {
    beforeEach(async () => {
      vi.mocked(fetchRestaurants).mockResolvedValue(records);
      await restaurant.load();
    });

    it("stores the restaurants", () => {
      expect(restaurant.restaurants).toEqual(records);
    });
    it("clears the loading flag", () => {
      expect(restaurant.loading).toBe(false);
    });
    it("clears the loading flag", () => {
      expect(restaurant.loadError).toBe(false);
    });
  });

  describe("when loading fails", () => {
    beforeEach(async () => {
      vi.mocked(fetchRestaurants).mockRejectedValue(new Error());
      await restaurant.load();
    });

    it("sets the loadError flag", () => {
      expect(restaurant.loadError).toBe(true);
    });
  });

  describe("while loading", () => {
    beforeEach(() => {
      vi.mocked(axios.get).mockResolvedValue({
        data: records,
      });
      setActivePinia(createPinia());
      restaurant = useRestaurantStore();
      restaurant.loading = true;
    }),
      it("sets a loading flag", async () => {
        restaurant.load();
        expect(restaurant.loading).toBe(true);
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(restaurant.loading).toBe(false);
      });
    it("clears the loading flag", () => {
      restaurant.load();
      expect(restaurant.loadError).toBe(false);
    });
  });

  describe("create action", () => {
    const newRestaurantName = "Sushi Place";
    const existingRestaurant = { id: 1, name: "Pizza Place" };
    const responseRestaurant = { id: 2, name: newRestaurantName };

    beforeEach(() => {
      setActivePinia(createPinia());
      restaurant = useRestaurantStore();
    });

    it("saves the restaurant on the server", async () => {
      vi.mocked(createRestaurant).mockResolvedValue(responseRestaurant);
      await restaurant.create(newRestaurantName);

      expect(createRestaurant).toHaveBeenCalled();
    });
  });
});
