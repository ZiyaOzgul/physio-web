import { tr } from "./tr";
import { en } from "./en";
import type { Language, TranslationDictionary } from "./types";

export * from "./types";

export const dictionaries: Record<Language, TranslationDictionary> = {
  tr,
  en,
};

export const getDictionary = (lang: Language): TranslationDictionary => {
  return dictionaries[lang] || dictionaries.tr;
};
