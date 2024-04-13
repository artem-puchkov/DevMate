let defaultAvatarBytes: Uint8Array | null = null;

async function getImageBytes(): Promise<Uint8Array> {
    if (defaultAvatarBytes) {
        return defaultAvatarBytes;
    }

    const imageUrl = "../../../pictures/avatar150x150.png";

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', imageUrl, true);

        xhr.responseType = 'arraybuffer';

        xhr.send();

        xhr.onload = function () {
            if (xhr.status === 200) {
                defaultAvatarBytes = new Uint8Array(xhr.response);
                resolve(defaultAvatarBytes);
            } else {
                reject(new Error('Failed to fetch image'));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Failed to fetch image'));
        };
    });
}

export async function getAvatarBytesArray(): Promise<Array<number>> {
    const byteArray = await getImageBytes() as Uint8Array;
    const avatarByteArray: Array<number> = Array.from(byteArray);

    return avatarByteArray;
}
