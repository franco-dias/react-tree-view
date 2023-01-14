import _get from 'lodash/get';
import { Option } from '../types';

export function getItemFromPath(tree: Option[], path: string) {
	return _get(tree, path);
}