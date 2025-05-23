import { useContext, useEffect } from 'react';
import { MessageContext } from '@site/src/components/Providers/Message/MessageProvider';
import {
  toast,
  ToastOptions as ReactToastifyOptions,
  CloseButtonProps,
} from 'react-toastify';

interface ToastOptions extends ReactToastifyOptions {
  className?: string;
  bodyClassName?: string;
  progressClassName?: string;
  closeButton?:
    | boolean
    | ((props: CloseButtonProps) => React.ReactNode)
    | React.ReactElement<CloseButtonProps>;
  theme?: 'light' | 'dark' | 'colored';
}

const useMessage = (customToastOptions?: ToastOptions) => {
  const { message, setMessage } = useContext(MessageContext);

  useEffect(() => {
    if (message?.type && message?.text) {
      const defaultToastOptions: ToastOptions = {
        theme: 'dark',
      };
      const toastOptions = { ...defaultToastOptions, ...customToastOptions };

      switch (message.type) {
        case 'error':
          toast.error(message.text, toastOptions);
          break;
        case 'info':
          toast.info(message.text, toastOptions);
          break;
        case 'success':
          toast.success(message.text, toastOptions);
          break;
        case 'warn':
          toast.warn(message.text, toastOptions);
          break;
        case 'warning':
          toast.warning(message.text, toastOptions);
          break;
        default:
          toast(message.text, toastOptions);
          break;
      }

      setMessage(null);
    }
  }, [message, setMessage, customToastOptions]);

  return {
    message,
    setMessage,
  };
};

export { useMessage };
