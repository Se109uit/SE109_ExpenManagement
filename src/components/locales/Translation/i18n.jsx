import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import translationEN from '../en/translation'
import translationVI from '../vi/translation';
import React from 'react';
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: translationEN
    },
    vi: {   
        translation: translationVI
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;


