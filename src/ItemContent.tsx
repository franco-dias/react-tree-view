import { ContentProps } from './types';

export function ItemContent({ option, onView, onEdit, onDelete, path }: ContentProps) {
	const { options, name } = option;

	const commonActions = (
		<>
			<button 
				onClick={(ev) => {
					ev.stopPropagation();
					onEdit(path);
				}}
			>
        Edit
			</button>
			<button
				onClick={(ev) => {
					ev.stopPropagation();
					onDelete(path);
				}}
			>
        Delete
			</button>
		</>
	);

	if(options.length) {
		return <div>{name} {commonActions}</div>;
	}

	return (
		<div>
			{name}
			<button 
				onClick={(ev) => {
					ev.stopPropagation();
					onView(path);
				}}
			>
        View
			</button>
			{commonActions}
		</div>
	);
}
