export type AvailableLanguages = "eng" | "rus";

export interface BigPictureItem {
	name?: string;
	nameRus?: string;
	english?: string;
	russian?: string;
	image?: string;
	open?: string;
	isBig?: boolean;
	details?: string;
	isText?: boolean;
}

export interface BigPictureBlock {
	[index: number]: BigPictureItem;
}

export interface BigPictureCatalog {
	[index: number]: BigPictureBlock
}

export interface CatalogList {
	[key: string]: BigPictureItem
}