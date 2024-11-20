declare module 'qrcode' {
    export function toDataURL(text: string, options?: object): Promise<string>;
    export function toString(text: string, options?: object): Promise<string>;
  }