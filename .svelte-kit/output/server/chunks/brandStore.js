import { w as writable } from "./index.js";
const marcas = writable([]);
const loadingMarcas = writable(false);
const errorMarcas = writable(null);
export {
  errorMarcas as e,
  loadingMarcas as l,
  marcas as m
};
