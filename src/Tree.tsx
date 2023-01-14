import { useCallback, useState } from 'react';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import data from './assets/data.json';
import { Option } from './types';
import { deleteFromPath } from './utils/deleteFromPath';
import { ItemContent } from './ItemContent';
import { getNodeTree } from './utils/getNodeTree';
import { getItemFromPath } from './utils/getItemFromPath';
import { updateOnPath } from './utils/updateOnPath';

export default function Tree() {
	const [tree, setTree] = useState<Option[]>(data.options);

	const onDelete = useCallback((path: string) => {
		setTree(prev => deleteFromPath(prev, path));
	}, []);

	const onEdit = useCallback((path: string) => {
		const itemToEdit = getItemFromPath(tree, path);
		// simulates editing
		const editedItem: Option = {
			name: 'This is edited',
			options: itemToEdit.options
		};
  
		setTree(prev => updateOnPath(prev, path, editedItem));
	}, [tree]);

	const onView = useCallback((path: string) => {
		const itemToView = getItemFromPath(tree, path);
		console.log('view', itemToView);
	}, [tree]);

	const getContent = useCallback((option: Option, path: string) => {
		return (
			<ItemContent
				option={option}
				onDelete={onDelete}
				onEdit={onEdit}
				onView={onView}
				path={path}
			/>
		);
	}, [onDelete, onEdit, onView]);

	return (
		<TreeView
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
		>
			{getNodeTree(tree, getContent)}
		</TreeView>
	);
}