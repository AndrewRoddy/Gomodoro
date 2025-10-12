
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Gomodoro/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Gomodoro"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 442, hash: '52a22009b0baa195670779bee095bf3bd432b850e6100691fa08d9d4ee9386ba', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 955, hash: '4cd25d58cc4ce9c6edad9e7f449b5ca553d0e83b4b279e9d6d3c3980b6c71793', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8400, hash: '393c42b759c59954a2cbfe6c9e1ab575e0befc9f0fce1a2227a55bdf771a00c7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
