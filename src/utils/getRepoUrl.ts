import type { Config } from '@docusaurus/types';

/**
 * Returns the URL of the repository based on the Docusaurus configuration
 */
export const getRepoUrl = (config: Config, project?: string): string | null => {
  const { organizationName, projectName } = config;
  if (!organizationName) {
    return null;
  }
  if (!project) {
    project = projectName;
  }
  return `https://github.com/${organizationName}/${project}`;
};
