export const convertWorkerName = (
  str: string,
): { href: string | null; caption: string } => {
  if (!str) return {} as { href: string; caption: string };

  const regex = /^_([a-z0-9]+)([A-Z][^\s]*)([A-Z][^\s]*)(?:-([a-zA-Z0-9]+))?$/;
  const match = str.match(regex);

  if (match) {
    const [, username, domainPart, tldPart, workerPart] = match;

    const domain = domainPart.toLowerCase();
    const tld = tldPart.replace(/[A-Z]/g, (letter) => "." + letter.toLowerCase());

    const href = `https://${domain}${tld}/@${username}`;
    const caption = workerPart
      ? `@${username}@${domain}${tld} ${workerPart}`
      : `@${username}@${domain}${tld}`;

    return {
      href,
      caption,
    };
  } else {
    return {
      href: null,
      caption: str,
    };
  }
};
