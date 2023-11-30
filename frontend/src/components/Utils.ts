export const NO_IMAGE = "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";

// Regex
export const regexEmpty = /^[^\s]+(\s+[^\s]+)*$/;
export const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
export const regexPassword = /^[a-zA-Z0-9]{6,}$/;


// Convertions

export function arrayBufferToBase64( buffer: ArrayBuffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa( binary );
}

export function base64ToArrayBuffer(base64: string) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

// Create Image from string
export const createImage = (image: string) => {
	const blob = new Blob([new Uint8Array(base64ToArrayBuffer(image ?? ''))]) as BlobPart;
	const blobPart: BlobPart[] = [];
	blobPart.push(blob);
	const fileImg: File = new File(blobPart , 'image.png');
	return URL.createObjectURL(fileImg);
}

// Create file from string
export const createFile = (image: string) => {
	const blob = new Blob([new Uint8Array(base64ToArrayBuffer(image ?? ''))]) as BlobPart;
	const blobPart: BlobPart[] = [];
	blobPart.push(blob);
	const fileImg: File = new File(blobPart , 'image.png');
	return fileImg;
}

export const getDateFromISO = (dateIso: Date | null) => {
	if (dateIso === null) {
		return '';
	}
	const date = new Date(dateIso);
	return date.toLocaleDateString();	
}
