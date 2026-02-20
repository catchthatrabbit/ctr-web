declare module 'pdf417' {
  /**
   * Generates a PDF417 barcode and returns a data URL (e.g. image/png;base64,...).
   * @param data - String to encode (e.g. worker ID).
   * @param width - Optional width level (e.g. 2, 6).
   * @param height - Optional height level (e.g. 2, 6).
   */
  function generateBarcode(
    data: string,
    width?: number,
    height?: number
  ): string | null;

  export default generateBarcode;
}
