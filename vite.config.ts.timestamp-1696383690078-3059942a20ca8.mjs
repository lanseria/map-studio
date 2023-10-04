// vite.config.ts
import path from "node:path";
import { cwd } from "node:process";
import { loadEnv } from "file:///E:/code/map-studio/node_modules/.pnpm/vite@4.4.9_@types+node@20.8.2/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/code/map-studio/node_modules/.pnpm/@vitejs+plugin-vue@4.4.0_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///E:/code/map-studio/node_modules/.pnpm/vite-plugin-pages@0.31.0_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs";
import Components from "file:///E:/code/map-studio/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///E:/code/map-studio/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.1/node_modules/unplugin-auto-import/dist/vite.js";
import Unocss from "file:///E:/code/map-studio/node_modules/.pnpm/unocss@0.56.5_postcss@8.4.27_vite@4.4.9/node_modules/unocss/dist/vite.mjs";
import { ArcoResolver } from "file:///E:/code/map-studio/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "E:\\code\\map-studio";
var vite_config_default = ({ mode }) => {
  const root = cwd();
  const env = loadEnv(mode, root);
  return {
    server: {
      host: env.VITE_HOST,
      port: +env.VITE_PORT
    },
    resolve: {
      alias: {
        "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`,
        "vue": "vue/dist/vue.esm-bundler.js"
      }
    },
    build: {
      sourcemap: true
    },
    plugins: [
      vue(),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: ["**/components/*.vue"]
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        resolvers: [ArcoResolver()],
        imports: [
          "vue",
          "vue/macros",
          "vue-router",
          "@vueuse/core"
        ],
        dts: true,
        dirs: [
          "./src/composables"
        ],
        vueTemplate: true
      }),
      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss()
    ]
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXG1hcC1zdHVkaW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcbWFwLXN0dWRpb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9tYXAtc3R1ZGlvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBjd2QgfSBmcm9tICdub2RlOnByb2Nlc3MnXHJcbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCB7IEFyY29SZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgY29uc3Qgcm9vdCA9IGN3ZCgpXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KVxyXG4gIHJldHVybiB7XHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogZW52LlZJVEVfSE9TVCxcclxuICAgICAgcG9ydDogK2Vudi5WSVRFX1BPUlQsXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcclxuICAgICAgICAndnVlJzogJ3Z1ZS9kaXN0L3Z1ZS5lc20tYnVuZGxlci5qcycsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcblxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcclxuICAgICAgUGFnZXMoe1xyXG4gICAgICAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qLnZ1ZSddLFxyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1hdXRvLWltcG9ydFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICByZXNvbHZlcnM6IFtBcmNvUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAndnVlL21hY3JvcycsXHJcbiAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgICBkaXJzOiBbXHJcbiAgICAgICAgICAnLi9zcmMvY29tcG9zYWJsZXMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLWNvbXBvbmVudHNcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgZHRzOiB0cnVlLFxyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcclxuICAgICAgLy8gc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xyXG4gICAgICBVbm9jc3MoKSxcclxuICAgIF0sXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOE8sT0FBTyxVQUFVO0FBQy9QLFNBQVMsV0FBVztBQUVwQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFlBQVk7QUFDbkIsU0FBUyxvQkFBb0I7QUFUN0IsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUE2QjtBQUNsRCxRQUFNLE9BQU8sSUFBSTtBQUNqQixRQUFNLE1BQU0sUUFBUSxNQUFNLElBQUk7QUFDOUIsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sTUFBTSxJQUFJO0FBQUEsTUFDVixNQUFNLENBQUMsSUFBSTtBQUFBLElBQ2I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLE1BQU0sR0FBRyxLQUFLLFFBQVEsa0NBQVcsS0FBSyxDQUFDO0FBQUEsUUFDdkMsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBO0FBQUEsTUFHSixNQUFNO0FBQUEsUUFDSixTQUFTLENBQUMscUJBQXFCO0FBQUEsTUFDakMsQ0FBQztBQUFBO0FBQUEsTUFHRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsUUFDMUIsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsVUFDSjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGFBQWE7QUFBQSxNQUNmLENBQUM7QUFBQTtBQUFBLE1BR0QsV0FBVztBQUFBLFFBQ1QsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBO0FBQUE7QUFBQSxNQUlELE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
