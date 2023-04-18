import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Counter } from './features/counter/counter';
import {ggSignIn,fbSignIn} from './features/firebase/firebase'



const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => ggSignIn()}>{t('english')}</Button>{' '}
      <Button variant="secondary" onClick={() => fbSignIn()}>{t('vietnamese')}</Button>
    </div>
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Counter className = "pb-4"></Counter>
      <LanguageSwitcher />
      <h1>{t('greeting')}</h1>
      <p>{t('description')}</p>
    </Container>
  );
};

export default App;
