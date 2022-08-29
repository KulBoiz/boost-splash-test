declare module "*.svg" {
  import * as React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const API_ENDPOINT: string;
  export const DOMAIN: string;
  export const VERSION: number;
  export const PLAY_STORE: string;
  export const APP_STORE: string;
  export const INSURANCE_HANDBOOK: string;
}
