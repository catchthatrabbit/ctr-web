export const convertWorkerName = (
  str: string,
): { href: string; caption: string } => {
  if (str === null) return {} as { href: string; caption: string };

  const regex = /^_([a-z0-9]+)-(\d{1,5})([A-Z][^\s]*)([A-Z][^\s]*)$/;

  const hrefReplacement = "@$1";

  const captionReplacement = "@$1@$3.$4 $2";

  const hrefFormatted = str.replace(regex, hrefReplacement);

  const captionFormatted = str.replace(regex, captionReplacement);

  return {
    href: hrefFormatted,
    caption: captionFormatted,
  };
};
