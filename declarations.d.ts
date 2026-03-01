/// <reference types="vite/client" />
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
declare module "*.gif";

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // add all your VITE_ variables here
  readonly VITE_APP_NAME?: string; // optional variable example
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
  }
}
