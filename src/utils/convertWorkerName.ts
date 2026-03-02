/**
 * Converts a worker name string into a formatted href, caption (display name), and optional fediverse handle
 * @param str - The worker name string to convert (format: _username_domain_tld-workerPart)
 * @returns {Object} An object containing href (URL), caption (display name only, e.g. "Pontus"), and fediverseHandle (e.g. "@user@domain") when fediverse
 */
export const convertWorkerName = (
  str: string
): { href: string | null; caption: string; fediverseHandle?: string } => {
  if (!str) return {} as { href: string; caption: string };

  // Split the string by hyphen to separate worker part
  const parts = str.split('-');
  const namePart = parts[0];
  const workerPart = parts.length > 1 ? parts[1] : null;

  // Split the name part by underscores
  const segments = namePart.split('_');

  // First segment should be empty (since the string starts with _)
  if (segments[0] !== '') {
    return {
      href: null,
      caption: str,
    };
  }

  // Second segment is the username (must be lowercase)
  const username = segments[1].toLowerCase();

  // Remaining segments form the domain (with dots instead of underscores)
  if (segments.length < 3) {
    return {
      href: null,
      caption: str,
    };
  }

  // Join the domain segments with dots and convert to lowercase
  const domain = segments.slice(2).join('.').toLowerCase();

  // Construct the href with proper format
  const href = `https://${domain}/@${username}${workerPart ? `#${workerPart}` : ''}`;

  // Caption: worker name (e.g. "Pontus") when defined; otherwise fediverse username only (e.g. "@catchthatrabbit")
  const caption = workerPart ?? `@${username}`;

  // Fediverse handle for link text (e.g. "@catchthatrabbit@coretalk.space")
  const fediverseHandle = `@${username}@${domain}`;

  return {
    href,
    caption,
    fediverseHandle,
  };
};

/**
 * Constructs a worker name string from component parts
 * @param username - The username part (will be converted to lowercase)
 * @param domain - The domain parts as an array (will be converted to lowercase)
 * @param workerPart - Optional worker identifier
 * @returns {string} Formatted worker name string (_username_domain_tld-workerPart)
 */
export const constructWorkerName = (
  username: string,
  domain: string[],
  workerPart?: string
): string => {
  if (!domain || domain.length === 0) {
    return '';
  }

  // Convert username to lowercase and ensure it only contains valid characters
  const sanitizedUsername = username
    ? username.toLowerCase().replace(/[^a-z0-9_]/g, '')
    : '';

  // Convert domain parts to lowercase and replace dots with underscores
  const sanitizedDomain = domain.map((part) =>
    part.toLowerCase().replace(/\./g, '_')
  );

  // Construct the base name with underscore prefix and domain parts
  // If sanitizedUsername is empty, use double underscore to maintain format
  const baseName = sanitizedUsername
    ? `_${sanitizedUsername}_${sanitizedDomain.join('_')}`
    : `__${sanitizedDomain.join('_')}`;

  // Add worker part if provided
  return workerPart ? `${baseName}-${workerPart}` : baseName;
};
