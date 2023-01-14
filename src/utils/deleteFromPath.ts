import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import _cloneDeep from 'lodash/cloneDeep';

import { Option } from '../types';

export function deleteFromPath(tree: Option[], path: string) {
	let cloned = _cloneDeep(tree);
	const paths = path.split('.');
	// gets parent from the element that will be deleted
	const parentPath = paths.slice(0, paths.length - 2).join('.');
	// gets path within parent from element that will be deleted
	const childPath = paths.slice(paths.length - 2).join('.');

	// deleting at level 0
	if(paths.length === 1) {
		const index = Number(path);
		cloned.splice(index, 1);
		return cloned;
	}

	/*
    deleting at deeper levels
    sets null in the element that will be deleted
    IMPORTANT: note that this _set function is not the base
    _set from lodash. This specific one does not mutate the array.
    That's why we use let on cloned variable
  */
	cloned = _set(`${parentPath}.${childPath}`, null, cloned);
	// gets parent object
	const parentObject = _get(cloned, parentPath);
	// change parent object's options to remove nullish values
	cloned = _set(parentPath, {
		...parentObject,
		options: parentObject.options.filter((option: Option | null) => option)
	}, cloned);
	return cloned;
}