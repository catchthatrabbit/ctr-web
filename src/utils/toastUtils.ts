import { toast } from 'react-toastify';
import CustomCloseButton from '../components/Molecules/CopyButton/CustomCloseButton';

// Function to generate toast styles dynamically
const getToastStyles = (mobile: boolean) => ({
  background: '#363636',
  top: mobile ? '6rem' : undefined,
  maxWidth: mobile ? '95%' : '100%',
  margin: mobile ? '0 auto' : undefined,
  marginTop: mobile ? '0.6rem' : undefined,
  borderRadius: mobile ? '8px' : undefined,
});

// Success Toast
export const showSuccessToast = (
  message: string,
  mobile: boolean,
  options = {}
) => {
  return toast.success(message, {
    closeButton: CustomCloseButton,
    theme: 'dark',
    style: getToastStyles(mobile),
    ...options,
  });
};

// Error Toast
export const showErrorToast = (
  message: string,
  mobile: boolean,
  options = {}
) => {
  return toast.error(message, {
    closeButton: CustomCloseButton,
    theme: 'dark',
    style: {
      ...getToastStyles(mobile),
      top: mobile ? '6.6rem' : undefined,
    },
    ...options,
  });
};
