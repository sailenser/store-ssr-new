/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface Window {
  appServerData: {
    ssr: any;
    apiCache: any;
    store: any;
  };
}
