// UI language (en / pt) — separate from Bible translation version
const I18N_STORAGE_KEY = 'biblia-rsvp-ui-lang';

const translations = {
    en: {
        metaDescription: 'Bible RSVP — Rapid Serial Visual Presentation reading. KJV, WEB, ASV, Almeida and more.',
        pageTitle: 'Bible RSVP • Focused Scripture Reading',
        appName: 'Bible RSVP',
        tagline: 'Speed Reading • Focus on the Word',
        installApp: 'Install App',
        selectChapter: 'Select Chapter',
        bibleVersion: 'Bible Version',
        book: 'Book',
        chapter: 'Chapter',
        loadChapter: 'Load Chapter',
        loadingChapter: 'Loading...',
        englishTranslations: 'English (Public Domain)',
        portugueseTranslations: 'Portuguese (Public Domain)',
        versionKjv: 'King James Version (KJV)',
        versionWeb: 'World English Bible (WEB)',
        versionAsv: 'American Standard Version (ASV)',
        versionBbe: 'Bible in Basic English (BBE)',
        versionDarby: 'Darby Bible',
        versionAlmeida: 'João Ferreira de Almeida',
        oldTestament: 'Old Testament',
        newTestament: 'New Testament',
        rsvpSettings: 'Speed Reading (RSVP) Settings',
        speedWpm: 'Speed (WPM)',
        wordsPerMinute: 'Words per minute',
        chunkSize: 'Chunk Size',
        chunk1: '1 word',
        chunk2: '2 words',
        chunk3: '3 words',
        fontSize: 'Font Size',
        punctuationPause: 'Pause longer at punctuation (. , ; ! ?)',
        startReading: '▶ Start Speed Reading',
        historyTitle: '📖 Reading History & Streak',
        streakDays: 'consecutive days 🔥',
        clearHistory: 'Clear History',
        advertising: 'Advertising',
        adSupport: 'Support the project • Google Ads',
        adPlaceholder: 'Space for Google AdSense (Auto Ads or Display)',
        verse: 'Verse',
        pause: '⏸ Pause',
        resume: '▶ Resume',
        exit: '✕ Exit',
        prevVerse: '← Previous Verse',
        nextVerse: 'Next Verse →',
        prevChapter: '← Prev. Chapter',
        nextChapter: 'Next Chapter →',
        restart: '↻ Restart',
        words: 'words',
        verses: 'verses',
        verseSingular: 'verse',
        previewStats: '{words} words • {verses} {verseLabel}',
        historyEmpty: 'No readings yet. Start by loading a chapter!',
        clearHistoryConfirm: 'Clear all reading history?',
        loadChapterFirst: 'Please load a chapter first.',
        loadChapterError: 'Failed to load chapter. Check your connection.',
        chapterComplete: 'Chapter complete! 🙌',
        youRead: 'You read',
        approxMinutes: 'Approx. {minutes} minutes',
        readAnotherConfirm: 'Well done! Read another chapter?',
        continueToNext: 'Continue to the next chapter?',
        toastYes: 'Yes',
        toastNo: 'No',
        lastChapterBible: 'You reached the last chapter of the Bible!',
        firstChapterBible: 'You are on the first chapter of the Bible.',
        switchLangEn: 'English',
        switchLangPt: 'Português'
    },
    pt: {
        metaDescription: 'Bíblia RSVP — Leitura rápida da Palavra com RSVP. KJV, WEB, ASV, Almeida e mais.',
        pageTitle: 'Bíblia RSVP • Leitura Rápida da Palavra',
        appName: 'Bíblia RSVP',
        tagline: 'Leitura Rápida • Foco na Palavra',
        installApp: 'Instalar App',
        selectChapter: 'Selecione o Capítulo',
        bibleVersion: 'Versão da Bíblia',
        book: 'Livro',
        chapter: 'Capítulo',
        loadChapter: 'Carregar Capítulo',
        loadingChapter: 'Carregando...',
        englishTranslations: 'Inglês (Domínio Público)',
        portugueseTranslations: 'Português (Domínio Público)',
        versionKjv: 'King James Version (KJV)',
        versionWeb: 'World English Bible (WEB)',
        versionAsv: 'American Standard Version (ASV)',
        versionBbe: 'Bible in Basic English (BBE)',
        versionDarby: 'Darby Bible',
        versionAlmeida: 'João Ferreira de Almeida',
        oldTestament: 'Antigo Testamento',
        newTestament: 'Novo Testamento',
        rsvpSettings: 'Configurações de Leitura Rápida (RSVP)',
        speedWpm: 'Velocidade (WPM)',
        wordsPerMinute: 'Palavras por minuto',
        chunkSize: 'Tamanho do Chunk',
        chunk1: '1 palavra',
        chunk2: '2 palavras',
        chunk3: '3 palavras',
        fontSize: 'Tamanho da Fonte',
        punctuationPause: 'Pausar mais em pontuação (. , ; ! ?)',
        startReading: '▶ Iniciar Leitura Rápida',
        historyTitle: '📖 Histórico de Leitura & Streak',
        streakDays: 'dias seguidos 🔥',
        clearHistory: 'Limpar Histórico',
        advertising: 'Publicidade',
        adSupport: 'Suporte o projeto • Anúncios Google',
        adPlaceholder: 'Espaço para Google AdSense (Auto Ads ou Display)',
        verse: 'Verso',
        pause: '⏸ Pausar',
        resume: '▶ Continuar',
        exit: '✕ Sair',
        prevVerse: '← Verso Anterior',
        nextVerse: 'Próximo Verso →',
        prevChapter: '← Cap. Anterior',
        nextChapter: 'Próximo Cap. →',
        restart: '↻ Reiniciar',
        words: 'palavras',
        verses: 'versículos',
        verseSingular: 'versículo',
        previewStats: '{words} palavras • {verses} {verseLabel}',
        historyEmpty: 'Nenhuma leitura ainda. Comece lendo um capítulo!',
        clearHistoryConfirm: 'Limpar todo o histórico de leitura?',
        loadChapterFirst: 'Por favor, carregue um capítulo primeiro.',
        loadChapterError: 'Erro ao carregar o capítulo. Verifique sua conexão.',
        chapterComplete: 'Capítulo concluído! 🙌',
        youRead: 'Você leu',
        approxMinutes: 'Aprox. {minutes} minutos',
        readAnotherConfirm: 'Parabéns! Deseja ler outro capítulo?',
        continueToNext: 'Continuar para o próximo capítulo?',
        toastYes: 'Sim',
        toastNo: 'Não',
        lastChapterBible: 'Você chegou ao último capítulo da Bíblia!',
        firstChapterBible: 'Você está no primeiro capítulo da Bíblia.',
        switchLangEn: 'English',
        switchLangPt: 'Português'
    }
};

let currentLang = 'en';

function detectSystemLang() {
    const langs = navigator.languages?.length
        ? navigator.languages
        : [navigator.language || 'en'];
    for (const lang of langs) {
        if (String(lang).toLowerCase().startsWith('pt')) return 'pt';
    }
    return 'en';
}

function t(key, vars = {}) {
    let str = translations[currentLang]?.[key] ?? translations.en[key] ?? key;
    for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return str;
}

function applyTranslations() {
    document.documentElement.lang = currentLang === 'pt' ? 'pt' : 'en';
    document.title = t('pageTitle');

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('metaDescription'));

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const attr = el.getAttribute('data-i18n-attr');
        const value = t(key);
        if (attr) el.setAttribute(attr, value);
        else el.textContent = value;
    });
}

function updateLangSwitcherUI() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const active = btn.dataset.lang === currentLang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

function setLang(lang) {
    if (lang !== 'en' && lang !== 'pt') return;
    currentLang = lang;
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    applyTranslations();
    updateLangSwitcherUI();
    window.dispatchEvent(new CustomEvent('uilangchange', { detail: { lang } }));
}

function initI18n() {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    currentLang = saved === 'en' || saved === 'pt' ? saved : detectSystemLang();
    applyTranslations();
    updateLangSwitcherUI();

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
}

window.I18n = {
    init: initI18n,
    setLang,
    t,
    getLang: () => currentLang
};