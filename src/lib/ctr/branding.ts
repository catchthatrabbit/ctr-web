import { pools, regions } from './config.js';

export const sloganPrimary = 'Mining pool for Core Blockchain';
export const sloganSecondary = 'A mining pool in the lotusland of Ores';
export const poolSince = 'Pool since 2022';
export const poolNames = regions.map((code) => pools[code].name).join(', ');
