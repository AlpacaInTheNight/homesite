/**
 * Utils
 */

interface basicObject {
	[key: string]: any;
}

/**
 * Does very basic (one level deepth of simple types) comparison of two objects. Does not works with fields containing arrays or objects.
 * @param obj1 - first object
 * @param obj2 - second object
 */
export function compareBasic(obj1: any, obj2: any) {
	let isEqual: boolean = true;

	if(obj1 && !obj2 || !obj1 && obj2 ) {
		return false;
	}

	/**
	 * That's for arrays, but let it be here.
	 */
	if( (obj1 && obj2) && obj1.length != obj2.length) {
		return false;
	}

	if( (obj1 && obj2) && Object.keys(obj1).length != Object.keys(obj2).length) {
		return false;
	}
	
	for(let field in obj1) {
		if(obj1[field] != obj2[field]) {
			isEqual = false;
			break;
		}
	}

	return isEqual;
}
