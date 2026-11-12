import type { Extra } from '../types';
import { PRODUCT_EXTRA } from './product';
import { PRODUCT_EXTRA_2 } from './product-2';
import { PRODUCT_EXTRA_3 } from './product-3';
import { LANGUAGES_EXTRA } from './languages';
import { LANGUAGES_EXTRA_2 } from './languages-2';
import { LANGUAGES_EXTRA_3 } from './languages-3';
import { SALONS_EXTRA } from './salons';
import { SALONS_EXTRA_2 } from './salons-2';
import { SALONS_EXTRA_3 } from './salons-3';
import { HEALTH_EXTRA } from './health';
import { HEALTH_EXTRA_2 } from './health-2';
import { HEALTH_EXTRA_3 } from './health-3';
import { FOOD_EXTRA } from './food';
import { SERVICES_EXTRA } from './services';
import { SERVICES_EXTRA_2 } from './services-2';
import { SERVICES_EXTRA_3 } from './services-3';
import { CITIES_EXTRA } from './cities';
import { CITIES_EXTRA_2 } from './cities-2';
import { GUIDES_EXTRA } from './guides';
import { GUIDES_EXTRA_2 } from './guides-2';
import { COMPARE_EXTRA } from './compare';
import { GUIDES_EXTRA_3 } from './guides-3';
import { COMPARE_EXTRA_2 } from './compare-2';
import { GUIDES_EXTRA_4 } from './guides-4';
import { COMPARE_EXTRA_3 } from './compare-3';
import { CITIES_EXTRA_3 } from './cities-3';
import { FOOD_EXTRA_2 } from './food-2';
import { TOPUP_1 } from './topup-1';
import { TOPUP_2 } from './topup-2';
import { TOPUP_3 } from './topup-3';
import { TOPUP_4 } from './topup-4';
import { TOPUP_5 } from './topup-5';
import { TOPUP_6 } from './topup-6';
import { TOPUP_7 } from './topup-7';

const SOURCES: Record<string, Extra>[] = [PRODUCT_EXTRA, PRODUCT_EXTRA_2, PRODUCT_EXTRA_3, LANGUAGES_EXTRA, LANGUAGES_EXTRA_2, LANGUAGES_EXTRA_3, SALONS_EXTRA, SALONS_EXTRA_2, SALONS_EXTRA_3, HEALTH_EXTRA, HEALTH_EXTRA_2, HEALTH_EXTRA_3, FOOD_EXTRA, SERVICES_EXTRA, SERVICES_EXTRA_2, SERVICES_EXTRA_3, CITIES_EXTRA, CITIES_EXTRA_2, GUIDES_EXTRA, GUIDES_EXTRA_2, COMPARE_EXTRA, GUIDES_EXTRA_3, COMPARE_EXTRA_2, GUIDES_EXTRA_4, COMPARE_EXTRA_3, CITIES_EXTRA_3, FOOD_EXTRA_2, TOPUP_1, TOPUP_2, TOPUP_3, TOPUP_4, TOPUP_5, TOPUP_6, TOPUP_7];

/** Extra sections per article slug, appended after the article's own (see withExtra in ../index.ts).
 * Several sources may add to the same article; their sections are kept in source order. */
export const EXTRA: Record<string, Extra> = {};
for (const source of SOURCES) {
  for (const [slug, extra] of Object.entries(source)) {
    const into = (EXTRA[slug] ??= { sections: [], faqs: [] });
    into.sections!.push(...(extra.sections ?? []));
    into.faqs!.push(...(extra.faqs ?? []));
  }
}
