import { useCallback, useMemo, useState } from 'react';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import _get from 'lodash/get';
import _set from 'lodash/fp/set';

import data from './assets/data.json';

interface Option {
  name: string;
  options: Option[];
}

interface ContentProps {
  option: Option;
  onView: (path: string) => void;
  onEdit: (path: string) => void;
  onDelete: (path: string) => void;
  path: string;
}

function normalize(str: string) {
  return str.replaceAll(/\/-/g, '').replaceAll(' ', '-').toLowerCase();
}

function Content({ option, onView, onEdit, onDelete, path }: ContentProps) {
  const { options, name } = option;

  const commonActions = (
    <>
      <button 
        onClick={(ev) => {
          ev.stopPropagation();
          onEdit(path)
        }}
      >
        Edit
      </button>
      <button
        onClick={(ev) => {
          ev.stopPropagation();
          onDelete(path)
        }}
      >
        Delete
      </button>
    </>
  )

  if(options.length) {
    return <div>{name} {commonActions}</div>
  }

  return (
    <div>
      {name}
      <button 
        onClick={(ev) => {
          ev.stopPropagation();
          onView(path)
        }}
      >
        View
      </button>
      {commonActions}
    </div>
  )
}

function getNodeTree(options: Option[], getContent: (option: Option, path: string) => React.ReactNode, path = '') {
  return options.map(({ name, options: childOptions }, index) => {
    const uniqueId = useMemo(() => path ? `${path}.options.${index}` : `${index}`, [path, name]);

    const content = useMemo(() => getContent({ name, options: childOptions }, uniqueId), [name, childOptions]);

    if(options.length){

      return (
        <TreeItem nodeId={uniqueId} label={content} key={uniqueId}>
          {getNodeTree(childOptions, getContent, uniqueId)}
        </TreeItem>
      )
    }
    return (
      <TreeItem nodeId={uniqueId} label={content} key={uniqueId}/>
    );
  })
}


export default function Tree() {
  const [options, setOptions] = useState<Option[]>(data.options);

  const onDelete = useCallback((path: string) => {
    // getItemFromPath(options, path);
  }, [options]);

  const onEdit = useCallback((path: string) => {
    const itemToEdit = _get(options, path);
    // simulates editing
    const editedItem: Option = {
      name: 'This is edited',
      options: []
    }

    setOptions(prev => {
      const newState = _set(path, editedItem, prev);
      return newState;
    });
  }, [options]);

  const onView = useCallback((path: string) => {
    console.log(options);
    console.log('view', _get(options, path));
  }, [options]);

  const getContent = useCallback((option: Option, path: string) => {
    return (
      <Content
        option={option}
        onDelete={onDelete}
        onEdit={onEdit}
        onView={onView}
        path={path}
      />
    );
  }, [onDelete, onEdit, onView])

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {getNodeTree(options, getContent)}
    </TreeView>
  );
}