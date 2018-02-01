declare namespace Elerium {
	type availableLanguages = "eng" | "rus";

	namespace BigPicture {

		interface item {
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
	
		interface block {
			[index: number]: item;
		}
	
		interface catalog {
			[index: number]: block
		}
	
		interface catalogList {
			[key: string]: item
		}

	}
	
}
