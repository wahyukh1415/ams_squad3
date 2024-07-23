import { defineStore } from "pinia";

export const usePriceStore = defineStore('price', () => {
    function formatPrice(value) {
        if (typeof value !== "number") {
          return value;
        }
        return value.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
    }

    return { formatPrice }
})