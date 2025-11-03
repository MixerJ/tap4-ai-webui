/**
 * 为所有语言文件添加 Consent 翻译
 * 运行: node scripts/add-consent-translations.js
 */

const fs = require('fs');
const path = require('path');

// 翻译内容（需要人工翻译的部分）
const translations = {
  tw: {
    title: '我們重視您的隱私',
    description:
      '我們和我們的合作夥伴使用 Cookie 和類似技術來提供、保護和改進我們的服務，以及個性化內容和廣告。點擊"接受全部"即表示您同意我們使用這些技術。',
    learnMore: '了解更多',
    acceptAll: '接受全部',
    rejectAll: '拒絕全部',
    customize: '自定義',
    privacySettings: '隱私設置',
    functional: {
      title: '必需的Cookie',
      description: '這些Cookie對於網站的基本功能是必需的，無法禁用。',
    },
    analytics: {
      title: '分析Cookie',
      description: '幫助我們了解網站的使用情況，以改進用戶體驗。',
    },
    advertising: {
      title: '廣告Cookie',
      description: '用於向您展示更相關的個性化廣告內容。',
    },
    alwaysActive: '始終啟用',
    savePreferences: '保存設置',
    back: '返回',
    policyText: '了解更多信息，請查看我們的',
    privacyPolicy: '隱私政策',
  },
  de: {
    title: 'Wir schätzen Ihre Privatsphäre',
    description:
      'Wir und unsere Partner verwenden Cookies und ähnliche Technologien, um unsere Dienste bereitzustellen, zu schützen und zu verbessern sowie Inhalte und Anzeigen zu personalisieren. Klicken Sie auf "Alle akzeptieren", um der Verwendung dieser Technologien zuzustimmen.',
    learnMore: 'Mehr erfahren',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    customize: 'Anpassen',
    privacySettings: 'Datenschutzeinstellungen',
    functional: {
      title: 'Notwendige Cookies',
      description:
        'Diese Cookies sind für die grundlegenden Funktionen der Website unerlässlich und können nicht deaktiviert werden.',
    },
    analytics: {
      title: 'Analyse-Cookies',
      description: 'Helfen Sie uns zu verstehen, wie die Website genutzt wird, um die Benutzererfahrung zu verbessern.',
    },
    advertising: {
      title: 'Werbe-Cookies',
      description: 'Werden verwendet, um Ihnen relevantere personalisierte Werbeinhalte anzuzeigen.',
    },
    alwaysActive: 'Immer aktiv',
    savePreferences: 'Einstellungen speichern',
    back: 'Zurück',
    policyText: 'Weitere Informationen finden Sie in unserer',
    privacyPolicy: 'Datenschutzerklärung',
  },
  es: {
    title: 'Valoramos su privacidad',
    description:
      'Nosotros y nuestros socios utilizamos cookies y tecnologías similares para proporcionar, proteger y mejorar nuestros servicios, así como para personalizar contenido y anuncios. Haga clic en "Aceptar todo" para consentir el uso de estas tecnologías.',
    learnMore: 'Más información',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    customize: 'Personalizar',
    privacySettings: 'Configuración de privacidad',
    functional: {
      title: 'Cookies necesarias',
      description: 'Estas cookies son esenciales para las funciones básicas del sitio web y no se pueden desactivar.',
    },
    analytics: {
      title: 'Cookies analíticas',
      description: 'Nos ayudan a comprender cómo se utiliza el sitio web para mejorar la experiencia del usuario.',
    },
    advertising: {
      title: 'Cookies publicitarias',
      description: 'Se utilizan para mostrarle contenido publicitario personalizado más relevante.',
    },
    alwaysActive: 'Siempre activo',
    savePreferences: 'Guardar preferencias',
    back: 'Volver',
    policyText: 'Para más información, consulte nuestra',
    privacyPolicy: 'Política de privacidad',
  },
  fr: {
    title: 'Nous respectons votre vie privée',
    description:
      'Nous et nos partenaires utilisons des cookies et des technologies similaires pour fournir, protéger et améliorer nos services, ainsi que pour personnaliser le contenu et les publicités. Cliquez sur "Tout accepter" pour consentir à l\'utilisation de ces technologies.',
    learnMore: 'En savoir plus',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    customize: 'Personnaliser',
    privacySettings: 'Paramètres de confidentialité',
    functional: {
      title: 'Cookies nécessaires',
      description:
        'Ces cookies sont essentiels pour les fonctions de base du site web et ne peuvent pas être désactivés.',
    },
    analytics: {
      title: 'Cookies analytiques',
      description: "Nous aident à comprendre comment le site web est utilisé pour améliorer l'expérience utilisateur.",
    },
    advertising: {
      title: 'Cookies publicitaires',
      description: 'Utilisés pour vous montrer du contenu publicitaire personnalisé plus pertinent.',
    },
    alwaysActive: 'Toujours actif',
    savePreferences: 'Enregistrer les préférences',
    back: 'Retour',
    policyText: "Pour plus d'informations, veuillez consulter notre",
    privacyPolicy: 'Politique de confidentialité',
  },
  jp: {
    title: 'プライバシーを尊重します',
    description:
      '当社およびパートナーは、サービスの提供、保護、改善、およびコンテンツと広告のパーソナライズのために、Cookieおよび類似の技術を使用しています。「すべて受け入れる」をクリックすると、これらの技術の使用に同意したことになります。',
    learnMore: '詳細を見る',
    acceptAll: 'すべて受け入れる',
    rejectAll: 'すべて拒否',
    customize: 'カスタマイズ',
    privacySettings: 'プライバシー設定',
    functional: {
      title: '必須Cookie',
      description: 'これらのCookieは、ウェブサイトの基本機能に不可欠であり、無効にすることはできません。',
    },
    analytics: {
      title: '分析Cookie',
      description: 'ユーザーエクスペリエンスを向上させるために、ウェブサイトの使用状況を理解するのに役立ちます。',
    },
    advertising: {
      title: '広告Cookie',
      description: 'より関連性の高いパーソナライズされた広告コンテンツを表示するために使用されます。',
    },
    alwaysActive: '常に有効',
    savePreferences: '設定を保存',
    back: '戻る',
    policyText: '詳細については、',
    privacyPolicy: 'プライバシーポリシー',
  },
  pt: {
    title: 'Valorizamos sua privacidade',
    description:
      'Nós e nossos parceiros usamos cookies e tecnologias semelhantes para fornecer, proteger e melhorar nossos serviços, bem como para personalizar conteúdo e anúncios. Clique em "Aceitar tudo" para consentir com o uso dessas tecnologias.',
    learnMore: 'Saiba mais',
    acceptAll: 'Aceitar tudo',
    rejectAll: 'Rejeitar tudo',
    customize: 'Personalizar',
    privacySettings: 'Configurações de privacidade',
    functional: {
      title: 'Cookies necessários',
      description: 'Esses cookies são essenciais para as funções básicas do site e não podem ser desativados.',
    },
    analytics: {
      title: 'Cookies analíticos',
      description: 'Ajudam-nos a entender como o site é usado para melhorar a experiência do usuário.',
    },
    advertising: {
      title: 'Cookies de publicidade',
      description: 'Usados para mostrar conteúdo publicitário personalizado mais relevante.',
    },
    alwaysActive: 'Sempre ativo',
    savePreferences: 'Salvar preferências',
    back: 'Voltar',
    policyText: 'Para mais informações, consulte nossa',
    privacyPolicy: 'Política de Privacidade',
  },
  ru: {
    title: 'Мы ценим вашу конфиденциальность',
    description:
      'Мы и наши партнеры используем файлы cookie и аналогичные технологии для предоставления, защиты и улучшения наших услуг, а также для персонализации контента и рекламы. Нажмите "Принять все", чтобы дать согласие на использование этих технологий.',
    learnMore: 'Подробнее',
    acceptAll: 'Принять все',
    rejectAll: 'Отклонить все',
    customize: 'Настроить',
    privacySettings: 'Настройки конфиденциальности',
    functional: {
      title: 'Необходимые файлы cookie',
      description: 'Эти файлы cookie необходимы для основных функций веб-сайта и не могут быть отключены.',
    },
    analytics: {
      title: 'Аналитические файлы cookie',
      description: 'Помогают нам понять, как используется веб-сайт, чтобы улучшить пользовательский опыт.',
    },
    advertising: {
      title: 'Рекламные файлы cookie',
      description: 'Используются для показа более релевантного персонализированного рекламного контента.',
    },
    alwaysActive: 'Всегда активно',
    savePreferences: 'Сохранить настройки',
    back: 'Назад',
    policyText: 'Для получения дополнительной информации ознакомьтесь с нашей',
    privacyPolicy: 'Политикой конфиденциальности',
  },
};

// 需要更新的语言列表
const languagesToUpdate = ['tw', 'de', 'es', 'fr', 'jp', 'pt', 'ru'];

// 消息文件路径
const messagesDir = path.join(__dirname, '..', 'messages');

// 为每个语言添加翻译
languagesToUpdate.forEach((lang) => {
  const filePath = path.join(messagesDir, `${lang}.json`);

  try {
    // 读取文件
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // 检查是否已经有Consent部分
    if (data.Consent) {
      console.log(`✓ ${lang}.json already has Consent section, skipping...`);
      return;
    }

    // 在Blog之前插入Consent
    const entries = Object.entries(data);
    const blogIndex = entries.findIndex(([key]) => key === 'Blog');

    if (blogIndex === -1) {
      console.log(`✗ ${lang}.json does not have Blog section, skipping...`);
      return;
    }

    const newData = {};
    entries.forEach(([key, value], index) => {
      if (index === blogIndex) {
        // 在Blog之前插入Consent
        newData.Consent = translations[lang];
      }
      newData[key] = value;
    });

    // 写回文件（格式化）
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2) + '\n', 'utf8');
    console.log(`✓ Updated ${lang}.json`);
  } catch (error) {
    console.error(`✗ Error updating ${lang}.json:`, error.message);
  }
});

console.log('\nDone! All language files have been updated.');
