import { decode } from "./byteArrayDecoding";

export function getLinkOnAvatar(base64DecodedArray: string) {
    const blob = new Blob([decode(base64DecodedArray)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
}