import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BYnM75VC.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3hjmsP.js","_app/immutable/chunks/DvkHFTiD.js","_app/immutable/chunks/maGQv20_.js","_app/immutable/chunks/DqyTZu-Q.js","_app/immutable/chunks/kJaQhxva.js","_app/immutable/chunks/CtKQbUfn.js","_app/immutable/chunks/hyV0Bv3U.js","_app/immutable/chunks/BsFLgPlN.js","_app/immutable/chunks/Cr5pEr3O.js","_app/immutable/chunks/BlYGXibV.js"];
export const stylesheets = [];
export const fonts = [];
