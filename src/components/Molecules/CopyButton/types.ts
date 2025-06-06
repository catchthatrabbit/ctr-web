export interface ICopyButton {
  textToCopy?: string;
  onCopy?: () => void;
  value?: string;
  toastText?: string;
  styles?: React.CSSProperties;
  icon?: React.ReactNode;
  customStyles?: { [key: string]: string };
  context?: 'config' | 'wallet';
}
