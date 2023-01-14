export interface Option {
  name: string;
  options: Option[];
}

export interface ContentProps {
  option: Option;
  onView: (path: string) => void;
  onEdit: (path: string) => void;
  onDelete: (path: string) => void;
  path: string;
}