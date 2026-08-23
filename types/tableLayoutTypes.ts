export type Header = {
  label: string;
  align?: string;
  width?: string;
  onClick?: () => void;
  headerIcon?: React.ReactNode;
};

export interface TableWrapperProps {
  dataLength: number;
  loader: boolean;
  HeaderArray: Header[];
  children?: React.ReactNode;
  action?: boolean;
}
