import _set from 'lodash/fp/set';
import { Option } from '../types';

export function updateOnPath(tree: Option[], path: string, newItem: Option) {
	return _set(path, newItem, tree);
}