import * as server from '../entries/pages/requisition/_id_/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/requisition/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/requisition/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.BMz-_918.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3hjmsP.js","_app/immutable/chunks/DvkHFTiD.js","_app/immutable/chunks/DqyTZu-Q.js","_app/immutable/chunks/kJaQhxva.js","_app/immutable/chunks/XG95yxdz.js","_app/immutable/chunks/BAnWHYzw.js","_app/immutable/chunks/maGQv20_.js","_app/immutable/chunks/hyV0Bv3U.js","_app/immutable/chunks/CX4bFslJ.js","_app/immutable/chunks/B724axDh.js","_app/immutable/chunks/CcHaSuRL.js","_app/immutable/chunks/CvIpSzuz.js"];
export const stylesheets = [];
export const fonts = [];
