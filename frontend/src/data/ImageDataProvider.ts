import axios from 'axios';
import { iSimplyFolder } from './GalleryDataProvider';

axios.defaults.withCredentials = true;

export interface iTag {
	name: string;
	id: string;
}

export interface iReceivedTag extends iTag {
	categoryId: string;
	name: string;
}

export interface iImage {
	jwtToken: string;
	title: string;
	description: string;
	folderId: string;
	tagsId: string[];
	date: Date | null;
	images: string[];
}

export interface iEditImage {
	jwtToken: string;
	id: string;
	title: string;
	description: string;
	folderId: string;
	tagsId: string[];
	date: Date | null;
}

export interface iReceivedImage {
	title: string;
	description: string;
	folderId: string;
	tags: iReceivedTag[];
	date: Date | null;
	image: string;
	id: string;
}

export class ImageDataProvider {

	/*
	 * Images
	 */

	public static addImage(image: iImage) {
		let data = 0;
		return axios.post(`http://localhost:4000/api/image/AddImages`, {
			UserToken: image.jwtToken,
			Title: image.title,
			Description: image.description,
			FolderId: image.folderId,
			Images: image.images,
			Date: image.date,
			Categories: image.tagsId,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			data = res.status;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}

	public static getImage(token: string, id: string, folderId: string) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/image/GetImage`, {
			UserToken: token,
			Id: id,
			FolderId: folderId,
		}, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			const data = res.data;
			const image: iReceivedImage = {
				title: data.imageTitle,
				description: data.imageDescription,
				folderId: data.folderId,
				tags: [],
				date: data.imageDateOfCreate,
				image: data.imageData,
				id: data.id,
			}
			const tags: iReceivedTag[] = [];
			data.imageCategories.forEach((element: { categoryName: string; id: any; categoryId: any; }) => {
				const tag: iReceivedTag = {
					name: element.categoryName,
					id: element.id,
					categoryId: element.categoryId,
				}
				tags.push(tag);
			});
			image.tags = tags;
			console.log(image);
			return image;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

	public static editImage(image: iEditImage) {
		let data = 0;
		return axios.post(`http://localhost:4000/api/image/EditImage`, {
			UserToken: image.jwtToken,
			Id: image.id,
			Title: image.title !== '' ? image.title : null,
			Description: image.description !== '' ? image.description : null,
			FolderId: image.folderId !== '' ? image.folderId : null,
			Date: image.date,
			Categories: image.tagsId,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			data = res.status;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}

	public static deleteImage(token: string, id: string) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/image/DeleteImage`, {
			UserToken: token,
			Id: id,
		}, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res.status);
			status = res.status;
			return status;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

	public static getByTag(token: string, folderId: string, tagId: string ) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/image/GetByCategory`, {
			UserToken: token,
			FolderId: folderId,
			CategoryId: tagId
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			const data = res.data;
			const images: iReceivedImage[] = [];
			data.forEach((item: {
				folderId: any;
				id: any;
				imageData: any;
				imageDateOfCreate: any;
				imageDescription: any;
				imageTitle: any;
			}) => {
				const image: iReceivedImage = {
					folderId: item.folderId,
					id: item.id,
					image: item.imageData,
					date: item.imageDateOfCreate,
					description: item.imageDescription,
					title: item.imageTitle,
					tags: [],
				}
				images.push(image);
			});
			console.log(images);
			return images;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

	public static getByDate(token: string, folderId: string, isLatest: boolean ) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/image/GetByDate`, {
			UserToken: token,
			FolderId: folderId,
			IsLastest: isLatest
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			const data = res.data;
			const images: iReceivedImage[] = [];
			data.forEach((item: {
				folderId: any;
				id: any;
				imageData: any;
				imageDateOfCreate: any;
				imageDescription: any;
				imageTitle: any;
			}) => {
				const image: iReceivedImage = {
					folderId: item.folderId,
					id: item.id,
					image: item.imageData,
					date: item.imageDateOfCreate,
					description: item.imageDescription,
					title: item.imageTitle,
					tags: [],
				}
				images.push(image);
			});
			console.log(images);
			return images;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

	public static getByText(token: string, folderId: string, text: string ) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/image/GetByText`, {
			UserToken: token,
			FolderId: folderId,
			Text: text
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			const data = res.data;
			const images: iReceivedImage[] = [];
			data.forEach((item: {
				folderId: any;
				id: any;
				imageData: any;
				imageDateOfCreate: any;
				imageDescription: any;
				imageTitle: any;
			}) => {
				const image: iReceivedImage = {
					folderId: item.folderId,
					id: item.id,
					image: item.imageData,
					date: item.imageDateOfCreate,
					description: item.imageDescription,
					title: item.imageTitle,
					tags: [],
				}
				images.push(image);
			});
			console.log(images);
			return images;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

	/*
	 * Tags
	 */

	public static addTag(token: string, tag: string ) {
		let data = 0;
		return axios.post(`http://localhost:4000/api/category/AddTag`, {
			UserToken: token,
			CategoryName: tag,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			console.log(res.data);
			data = res.status;
			return data;
		}).catch(er => {
			console.log(er);
			return data;
		});
	}

	public static getTag(token: string ) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/category/GetTags`, {
			UserToken: token,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			const data = res.data;
			const tags: iTag[] = [];
			data.forEach((item: { categoryName: any; id: any; }) => {
				const tag: iTag = {
					name: item.categoryName,
					id: item.id
				}
				tags.push(tag);
			});
			return tags;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

	public static deleteTag(token: string, id: string ) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/category/DeleteTag`, {
			Id: id,
			UserToken: token,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			status = res.status;
			return status;
		}).catch(error => {
			console.log(error);
			status = error.status;
			return status;
		});
	}

	public static getTagFolder(token: string ) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/category/GetTags`, {
			UserToken: token,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			const data = res.data;
			const tags: iSimplyFolder[] = [];
			data.forEach((item: { categoryName: any; id: any; }) => {
				const tag: iSimplyFolder = {
					folderName: item.categoryName,
					id: item.id
				}
				tags.push(tag);
			});
			return tags;
		}).catch(er => {
			console.log(er);
			return status;
		});
	}

	public static deleteImageTag(token: string, id: string ) {
		let status = 0;
		return axios.post(`http://localhost:4000/api/category/DeleteImageTag`, {
			Id: id,
			UserToken: token,
		}, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		}).then(res => {
			console.log(res);
			status = res.status;
			return status;
		}).catch(error => {
			console.log(error);
			status = error.status;
			return status;
		});
	}
}
