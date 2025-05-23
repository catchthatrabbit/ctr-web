import { products } from '@site/src/constants/products';

export function isSupportedProvider(provider: string | undefined): boolean {
  const supportedTypes = ['shopify'];
  return supportedTypes.includes(provider || '');
}

export function getVariantId(productId: string, provider: string | undefined): string | undefined {
    if (provider === 'shopify') {
        const product = products.find(p => p.id === productId);
        return product?.variantId;
    }
    return undefined;
}

export function getFormAction(shopUrl: string, provider: string | undefined): string | undefined {
    if (provider === 'shopify') {
        return `${shopUrl.replace(/\/$/, '')}/cart/add`;
    }
    return undefined;
}
