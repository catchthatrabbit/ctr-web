export interface ICopyButton {
  textToCopy?: string;
  onCopy?: () => void;
  value?: string;
  toastText?: string;
  styles?: React.CSSProperties;
  icon?: React.ReactNode;
}
