/**
 * Formats an address string into IBAN-like format with spaces every 4 characters
 * @param address - The address string to format
 * @returns {string} The formatted address with spaces every 4 characters in uppercase
 */
export const generateIBan = (address: string): string => {
  if (!address) return '';
  const iban = address.match(/.{1,4}/g);
  return iban.join(' ').toUpperCase();
};
