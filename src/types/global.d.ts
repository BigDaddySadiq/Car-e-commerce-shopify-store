declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_META_PIXEL_ID: string;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'shopify-context': any;
    'shopify-cart': any;
  }
}

interface Window {
  fbq: any;
  _fbq: any;
}
