import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.Bh6z6O3L.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3hjmsP.js","_app/immutable/chunks/DvkHFTiD.js","_app/immutable/chunks/hyV0Bv3U.js","_app/immutable/chunks/CcHaSuRL.js","_app/immutable/chunks/CvIpSzuz.js","_app/immutable/chunks/maGQv20_.js","_app/immutable/chunks/DqyTZu-Q.js","_app/immutable/chunks/6BEYVafy.js","_app/immutable/chunks/Cr5pEr3O.js"];
export const stylesheets = ["_app/immutable/assets/0.4fKR2fYP.css"];
export const fonts = [];
