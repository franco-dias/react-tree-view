import { TreeItem } from '@mui/lab';
import { Option } from '../types';

export function getNodeTree(options: Option[], getContent: (option: Option, path: string) => React.ReactNode, path = '', namePath = '') {
	return options.map(({ name, options: childOptions }, index) => {
		const uniqueId = path ? `${path}.options.${index}` : `${index}`;
		const nodeId = `${namePath}.${name}`;

		const content = getContent({ name, options: childOptions }, uniqueId);

		if(options.length){
			return (
				<TreeItem nodeId={nodeId} label={content} key={uniqueId}>
					{getNodeTree(childOptions, getContent, uniqueId, nodeId)}
				</TreeItem>
			);
		}
		return (
			<TreeItem nodeId={uniqueId} label={content} key={uniqueId}/>
		);
	});
}
