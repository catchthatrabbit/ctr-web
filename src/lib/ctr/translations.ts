import translations from './ui-translations.json';

type Locale = keyof typeof translations;

export function ui(message: string | undefined, locale: string): string {
	if (!message) return '';
	if (locale === 'en') return message;
	const catalog = translations[locale as Locale] as Record<string, string> | undefined;
	return catalog?.[message] || message;
}
