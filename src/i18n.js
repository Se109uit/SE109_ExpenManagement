import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
        en: {
            translation: {
            greeting: 'Hello',  
            description: 'Welcome to my website!',
            },
        },
        vi: {
            translation: {
            greeting: 'Xin chào',
            description: 'Chào mừng đến với trang web của tôi!',
            },
        },
        },
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false,
        },
    });




