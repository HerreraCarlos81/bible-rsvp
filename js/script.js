// ==================== CONFIG ====================
const BIBLE_API = 'https://bible-api.com/';

// Books data (66 books) - same as before for brevity, abbreviated here but full in real file
const books = [
    { slug: 'genesis', name: 'Genesis', ptName: 'Gênesis', chapters: 50, testament: 'OT' },
    { slug: 'exodus', name: 'Exodus', ptName: 'Êxodo', chapters: 40, testament: 'OT' },
    { slug: 'leviticus', name: 'Leviticus', ptName: 'Levítico', chapters: 27, testament: 'OT' },
    { slug: 'numbers', name: 'Numbers', ptName: 'Números', chapters: 36, testament: 'OT' },
    { slug: 'deuteronomy', name: 'Deuteronomy', ptName: 'Deuteronômio', chapters: 34, testament: 'OT' },
    { slug: 'joshua', name: 'Joshua', ptName: 'Josué', chapters: 24, testament: 'OT' },
    { slug: 'judges', name: 'Judges', ptName: 'Juízes', chapters: 21, testament: 'OT' },
    { slug: 'ruth', name: 'Ruth', ptName: 'Rute', chapters: 4, testament: 'OT' },
    { slug: '1samuel', name: '1 Samuel', ptName: '1 Samuel', chapters: 31, testament: 'OT' },
    { slug: '2samuel', name: '2 Samuel', ptName: '2 Samuel', chapters: 24, testament: 'OT' },
    { slug: '1kings', name: '1 Kings', ptName: '1 Reis', chapters: 22, testament: 'OT' },
    { slug: '2kings', name: '2 Kings', ptName: '2 Reis', chapters: 25, testament: 'OT' },
    { slug: '1chronicles', name: '1 Chronicles', ptName: '1 Crônicas', chapters: 29, testament: 'OT' },
    { slug: '2chronicles', name: '2 Chronicles', ptName: '2 Crônicas', chapters: 36, testament: 'OT' },
    { slug: 'ezra', name: 'Ezra', ptName: 'Esdras', chapters: 10, testament: 'OT' },
    { slug: 'nehemiah', name: 'Nehemiah', ptName: 'Neemias', chapters: 13, testament: 'OT' },
    { slug: 'esther', name: 'Esther', ptName: 'Ester', chapters: 10, testament: 'OT' },
    { slug: 'job', name: 'Job', ptName: 'Jó', chapters: 42, testament: 'OT' },
    { slug: 'psalms', name: 'Psalms', ptName: 'Salmos', chapters: 150, testament: 'OT' },
    { slug: 'proverbs', name: 'Proverbs', ptName: 'Provérbios', chapters: 31, testament: 'OT' },
    { slug: 'ecclesiastes', name: 'Ecclesiastes', ptName: 'Eclesiastes', chapters: 12, testament: 'OT' },
    { slug: 'songofsongs', name: 'Song of Solomon', ptName: 'Cânticos', chapters: 8, testament: 'OT' },
    { slug: 'isaiah', name: 'Isaiah', ptName: 'Isaías', chapters: 66, testament: 'OT' },
    { slug: 'jeremiah', name: 'Jeremiah', ptName: 'Jeremias', chapters: 52, testament: 'OT' },
    { slug: 'lamentations', name: 'Lamentations', ptName: 'Lamentações', chapters: 5, testament: 'OT' },
    { slug: 'ezekiel', name: 'Ezekiel', ptName: 'Ezequiel', chapters: 48, testament: 'OT' },
    { slug: 'daniel', name: 'Daniel', ptName: 'Daniel', chapters: 12, testament: 'OT' },
    { slug: 'hosea', name: 'Hosea', ptName: 'Oséias', chapters: 14, testament: 'OT' },
    { slug: 'joel', name: 'Joel', ptName: 'Joel', chapters: 3, testament: 'OT' },
    { slug: 'amos', name: 'Amos', ptName: 'Amós', chapters: 9, testament: 'OT' },
    { slug: 'obadiah', name: 'Obadiah', ptName: 'Obadias', chapters: 1, testament: 'OT' },
    { slug: 'jonah', name: 'Jonah', ptName: 'Jonas', chapters: 4, testament: 'OT' },
    { slug: 'micah', name: 'Micah', ptName: 'Miquéias', chapters: 7, testament: 'OT' },
    { slug: 'nahum', name: 'Nahum', ptName: 'Naum', chapters: 3, testament: 'OT' },
    { slug: 'habakkuk', name: 'Habakkuk', ptName: 'Habacuque', chapters: 3, testament: 'OT' },
    { slug: 'zephaniah', name: 'Zephaniah', ptName: 'Sofonias', chapters: 3, testament: 'OT' },
    { slug: 'haggai', name: 'Haggai', ptName: 'Ageu', chapters: 2, testament: 'OT' },
    { slug: 'zechariah', name: 'Zechariah', ptName: 'Zacarias', chapters: 14, testament: 'OT' },
    { slug: 'malachi', name: 'Malachi', ptName: 'Malaquias', chapters: 4, testament: 'OT' },
    { slug: 'matthew', name: 'Matthew', ptName: 'Mateus', chapters: 28, testament: 'NT' },
    { slug: 'mark', name: 'Mark', ptName: 'Marcos', chapters: 16, testament: 'NT' },
    { slug: 'luke', name: 'Luke', ptName: 'Lucas', chapters: 24, testament: 'NT' },
    { slug: 'john', name: 'John', ptName: 'João', chapters: 21, testament: 'NT' },
    { slug: 'acts', name: 'Acts', ptName: 'Atos', chapters: 28, testament: 'NT' },
    { slug: 'romans', name: 'Romans', ptName: 'Romanos', chapters: 16, testament: 'NT' },
    { slug: '1corinthians', name: '1 Corinthians', ptName: '1 Coríntios', chapters: 16, testament: 'NT' },
    { slug: '2corinthians', name: '2 Corinthians', ptName: '2 Coríntios', chapters: 13, testament: 'NT' },
    { slug: 'galatians', name: 'Galatians', ptName: 'Gálatas', chapters: 6, testament: 'NT' },
    { slug: 'ephesians', name: 'Ephesians', ptName: 'Efésios', chapters: 6, testament: 'NT' },
    { slug: 'philippians', name: 'Philippians', ptName: 'Filipenses', chapters: 4, testament: 'NT' },
    { slug: 'colossians', name: 'Colossians', ptName: 'Colossenses', chapters: 4, testament: 'NT' },
    { slug: '1thessalonians', name: '1 Thessalonians', ptName: '1 Tessalonicenses', chapters: 5, testament: 'NT' },
    { slug: '2thessalonians', name: '2 Thessalonians', ptName: '2 Tessalonicenses', chapters: 3, testament: 'NT' },
    { slug: '1timothy', name: '1 Timothy', ptName: '1 Timóteo', chapters: 6, testament: 'NT' },
    { slug: '2timothy', name: '2 Timothy', ptName: '2 Timóteo', chapters: 4, testament: 'NT' },
    { slug: 'titus', name: 'Titus', ptName: 'Tito', chapters: 3, testament: 'NT' },
    { slug: 'philemon', name: 'Philemon', ptName: 'Filemom', chapters: 1, testament: 'NT' },
    { slug: 'hebrews', name: 'Hebrews', ptName: 'Hebreus', chapters: 13, testament: 'NT' },
    { slug: 'james', name: 'James', ptName: 'Tiago', chapters: 5, testament: 'NT' },
    { slug: '1peter', name: '1 Peter', ptName: '1 Pedro', chapters: 5, testament: 'NT' },
    { slug: '2peter', name: '2 Peter', ptName: '2 Pedro', chapters: 3, testament: 'NT' },
    { slug: '1john', name: '1 John', ptName: '1 João', chapters: 5, testament: 'NT' },
    { slug: '2john', name: '2 John', ptName: '2 João', chapters: 1, testament: 'NT' },
    { slug: '3john', name: '3 John', ptName: '3 João', chapters: 1, testament: 'NT' },
    { slug: 'jude', name: 'Jude', ptName: 'Judas', chapters: 1, testament: 'NT' },
    { slug: 'revelation', name: 'Revelation', ptName: 'Apocalipse', chapters: 22, testament: 'NT' }
];

// State
let currentWords = [];
let currentIndex = 0;
let isPlaying = false;
let timer = null;
let wpm = 350;
let chunkSize = 1;
let punctuationPause = true;
let currentReference = '';
let verses = []; // Array of {num, text, startWordIndex, endWordIndex}

// DOM Elements
const versionSelect = document.getElementById('version');
const bookSelect = document.getElementById('book');
const chapterSelect = document.getElementById('chapter');
const loadBtn = document.getElementById('load-btn');
const previewCard = document.getElementById('preview-card');
const previewReference = document.getElementById('preview-reference');
const previewText = document.getElementById('preview-text');
const previewStats = document.getElementById('preview-stats');
const settingsCard = document.getElementById('settings-card');
const startBtn = document.getElementById('start-btn');
const historyCard = document.getElementById('history-card');

const wpmSlider = document.getElementById('wpm-slider');
const wpmValue = document.getElementById('wpm-value');
const fontSlider = document.getElementById('font-slider');
const fontValue = document.getElementById('font-value');
const punctuationCheckbox = document.getElementById('punctuation-pause');

const rsvpModal = document.getElementById('rsvp-modal');
const rsvpWord = document.getElementById('rsvp-word');
const pauseBtn = document.getElementById('pause-btn');
const closeRsvp = document.getElementById('close-rsvp');
const adContainer = document.getElementById('ad-container');

// ==================== PWA SUPPORT ====================
let deferredPrompt;

function initPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('SW registration failed'));
    }

    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installBtn = document.getElementById('install-btn');
        installBtn.classList.remove('hidden');
        
        installBtn.addEventListener('click', async () => {
            installBtn.classList.add('hidden');
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
        });
    });

    // Hide install button after installed
    window.addEventListener('appinstalled', () => {
        document.getElementById('install-btn').classList.add('hidden');
    });
}

// ==================== READING HISTORY & STREAK ====================
function getHistory() {
    return JSON.parse(localStorage.getItem('biblia-rsvp-history') || '[]');
}

function saveHistory(newEntry) {
    let history = getHistory();
    // Avoid duplicates for same reference today
    const today = new Date().toISOString().split('T')[0];
    history = history.filter(h => !(h.reference === newEntry.reference && h.date.startsWith(today)));
    
    history.unshift(newEntry);
    if (history.length > 20) history = history.slice(0, 20); // Keep last 20
    
    localStorage.setItem('biblia-rsvp-history', JSON.stringify(history));
    renderHistory();
    updateStreak();
}

function updateStreak() {
    const history = getHistory();
    if (history.length === 0) {
        document.getElementById('streak-count').textContent = '0';
        return;
    }

    let streak = 1;
    let currentDate = new Date(history[0].date);
    
    for (let i = 1; i < history.length; i++) {
        const prevDate = new Date(history[i].date);
        const diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            streak++;
            currentDate = prevDate;
        } else if (diffDays > 1) {
            break;
        }
    }
    
    document.getElementById('streak-count').textContent = streak;
}

function renderHistory() {
    const container = document.getElementById('history-list');
    const history = getHistory();
    container.innerHTML = '';
    
    if (history.length === 0) {
        container.innerHTML = '<p style="opacity:0.7; font-size:0.9rem;">Nenhuma leitura ainda. Comece lendo um capítulo!</p>';
        return;
    }
    
    history.slice(0, 5).forEach(entry => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div>
                <strong>${entry.reference}</strong><br>
                <span class="date">${new Date(entry.date).toLocaleDateString('pt-BR')}</span>
            </div>
            <div style="text-align:right; font-size:0.8rem;">
                ${entry.wordsRead} palavras<br>
                <span style="color:#22c55e;">${Math.round(entry.wordsRead / 350)} min</span>
            </div>
        `;
        container.appendChild(div);
    });
}

function clearHistory() {
    if (confirm('Limpar todo o histórico de leitura?')) {
        localStorage.removeItem('biblia-rsvp-history');
        renderHistory();
        updateStreak();
    }
}

// ==================== VERSE PARSING & NAVIGATION ====================
function parseVerses(rawText) {
    verses = [];
    const verseRegex = /(\d+)\s+([^\d]+)/g;
    let match;
    let lastEnd = 0;
    let wordIndex = 0;
    
    // Clean text for words
    const cleanText = rawText.replace(/\d+\s/g, ' ').replace(/\s+/g, ' ').trim();
    const allWords = cleanText.split(/\s+/).filter(Boolean);
    
    while ((match = verseRegex.exec(rawText)) !== null) {
        const verseNum = parseInt(match[1]);
        const verseText = match[2].trim();
        
        // Count words in this verse
        const verseWords = verseText.split(/\s+/).filter(Boolean);
        const startIdx = wordIndex;
        const endIdx = wordIndex + verseWords.length;
        
        verses.push({
            num: verseNum,
            text: verseText,
            startWordIndex: startIdx,
            endWordIndex: endIdx
        });
        
        wordIndex = endIdx;
    }
    
    // If no verses parsed (fallback), create one big verse
    if (verses.length === 0) {
        verses.push({
            num: 1,
            text: cleanText,
            startWordIndex: 0,
            endWordIndex: allWords.length
        });
    }
}

function getCurrentVerse() {
    if (!verses.length) return 1;
    
    for (let i = 0; i < verses.length; i++) {
        if (currentIndex >= verses[i].startWordIndex && currentIndex < verses[i].endWordIndex) {
            return verses[i].num;
        }
    }
    return verses[verses.length - 1].num;
}

function jumpToVerse(verseNum) {
    const targetVerse = verses.find(v => v.num === verseNum);
    if (!targetVerse) return;
    
    currentIndex = targetVerse.startWordIndex;
    
    if (isPlaying) {
        clearTimeout(timer);
        showNextWord();
    } else {
        // Show the word at new position
        const endIdx = Math.min(currentIndex + chunkSize, currentWords.length);
        const chunkText = currentWords.slice(currentIndex, endIdx).join(' ');
        rsvpWord.textContent = chunkText;
        updateRSVPUI();
    }
}

function updateRSVPUI() {
    const progress = Math.round((currentIndex / currentWords.length) * 100);
    document.getElementById('rsvp-progress').textContent = `${progress}%`;
    document.getElementById('rsvp-wpm').textContent = `${wpm} WPM`;
    
    const currentVerseNum = getCurrentVerse();
    document.getElementById('rsvp-verse').textContent = `Verso ${currentVerseNum}`;
}

// ==================== INITIALIZATION ====================
function init() {
    populateBooks();
    
    // Event listeners
    bookSelect.addEventListener('change', updateChapterOptions);
    loadBtn.addEventListener('click', loadChapter);
    startBtn.addEventListener('click', startRSVP);
    
    // Settings
    wpmSlider.addEventListener('input', () => {
        wpm = parseInt(wpmSlider.value);
        wpmValue.textContent = wpm;
    });
    
    fontSlider.addEventListener('input', () => {
        const size = parseFloat(fontSlider.value);
        fontValue.textContent = size + 'rem';
        if (rsvpWord) rsvpWord.style.fontSize = size + 'rem';
    });
    
    punctuationCheckbox.addEventListener('change', () => {
        punctuationPause = punctuationCheckbox.checked;
    });
    
    // Chunk buttons
    document.querySelectorAll('.chunk-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chunk-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            chunkSize = parseInt(btn.dataset.chunk);
        });
    });
    
    // Sample button
    document.getElementById('sample-btn').addEventListener('click', loadSample);
    
    // History
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Load saved settings
    loadSavedSettings();
    
    // Default selection
    bookSelect.value = 'john';
    updateChapterOptions();
    chapterSelect.value = '3';
    
    // Init features
    initPWA();
    renderHistory();
    updateStreak();
    
    // Show ad container by default
    adContainer.style.display = 'block';
}

// Populate book dropdown (same as before)
function populateBooks() {
    bookSelect.innerHTML = '';
    const otOptgroup = document.createElement('optgroup');
    otOptgroup.label = 'Antigo Testamento';
    const ntOptgroup = document.createElement('optgroup');
    ntOptgroup.label = 'Novo Testamento';
    
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.slug;
        option.textContent = `${book.name} (${book.ptName})`;
        if (book.testament === 'OT') otOptgroup.appendChild(option);
        else ntOptgroup.appendChild(option);
    });
    
    bookSelect.appendChild(otOptgroup);
    bookSelect.appendChild(ntOptgroup);
}

function updateChapterOptions() {
    const selectedBook = books.find(b => b.slug === bookSelect.value);
    if (!selectedBook) return;
    
    chapterSelect.innerHTML = '';
    for (let i = 1; i <= selectedBook.chapters; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        chapterSelect.appendChild(opt);
    }
}

// Load chapter from bible-api.com (refactored for reuse)
async function loadChapterData(bookSlug, chapterNum) {
    const version = versionSelect.value;
    const book = books.find(b => b.slug === bookSlug);
    if (!book) return false;

    const apiBook = book.name.replace(/\s+/g, '+');
    const url = `${BIBLE_API}${apiBook}+${chapterNum}?translation=${version}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Falha ao carregar capítulo');

        const data = await res.json();

        currentReference = data.reference;
        const rawText = data.text || '';

        // Clean text for RSVP
        const cleanText = rawText.replace(/\d+\s/g, ' ').replace(/\s+/g, ' ').trim();
        currentWords = cleanText.split(/\s+/).filter(w => w.length > 0);

        // Parse verses for navigation
        parseVerses(rawText);

        // Update main UI
        previewReference.textContent = currentReference;
        previewText.innerHTML = rawText.replace(/(\d+)\s/g, '<sup>$1</sup> ');
        previewStats.textContent = `${currentWords.length} palavras • ${verses.length} versículos`;

        previewCard.classList.remove('hidden');
        settingsCard.classList.remove('hidden');

        // Update selectors to reflect current chapter
        bookSelect.value = bookSlug;
        updateChapterOptions();
        chapterSelect.value = chapterNum;

        // Save to history
        saveHistory({
            reference: currentReference,
            date: new Date().toISOString(),
            wordsRead: currentWords.length
        });

        saveSettings();
        return true;

    } catch (err) {
        alert('Erro ao carregar o capítulo. Verifique sua conexão.\n' + err.message);
        console.error(err);
        return false;
    }
}

// Original load button handler
async function loadChapter() {
    const bookSlug = bookSelect.value;
    const chapter = parseInt(chapterSelect.value);
    loadBtn.disabled = true;
    loadBtn.textContent = 'Carregando...';

    await loadChapterData(bookSlug, chapter);

    loadBtn.disabled = false;
    loadBtn.textContent = 'Carregar Capítulo';
}

// Sample data
function loadSample() {
    const sampleText = "16 For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.";
    
    currentReference = "John 3:16 (Sample)";
    const cleanText = sampleText.replace(/\d+\s/g, ' ').trim();
    currentWords = cleanText.split(/\s+/).filter(Boolean);
    
    parseVerses(sampleText);
    
    previewReference.textContent = currentReference;
    previewText.innerHTML = sampleText;
    previewStats.textContent = `${currentWords.length} palavras • 1 versículo`;
    
    previewCard.classList.remove('hidden');
    settingsCard.classList.remove('hidden');
    
    versionSelect.value = 'kjv';
    
    saveHistory({
        reference: currentReference,
        date: new Date().toISOString(),
        wordsRead: currentWords.length
    });
}

// Start RSVP
function startRSVP() {
    if (!currentWords.length) {
        alert('Por favor, carregue um capítulo primeiro.');
        return;
    }
    
    currentIndex = 0;
    isPlaying = true;
    
    rsvpModal.classList.remove('hidden');
    adContainer.style.display = 'none'; // Hide ads while reading
    
    rsvpWord.style.fontSize = fontSlider.value + 'rem';
    
    document.getElementById('rsvp-book-chapter').textContent = currentReference;
    document.getElementById('current-wpm').textContent = wpm + ' WPM';
    document.getElementById('current-chunk').textContent = chunkSize;
    
    pauseBtn.textContent = '⏸ Pausar';
    
    updateRSVPUI();
    showNextWord();
}

// Core RSVP loop
function showNextWord() {
    if (!isPlaying) return;
    
    if (currentIndex >= currentWords.length) {
        finishReading();
        return;
    }
    
    const endIdx = Math.min(currentIndex + chunkSize, currentWords.length);
    const chunkText = currentWords.slice(currentIndex, endIdx).join(' ');
    
    rsvpWord.textContent = chunkText;
    updateRSVPUI();
    
    currentIndex = endIdx;
    
    let delay = (60000 / wpm) * chunkSize;
    
    if (punctuationPause && /[.,;:!?]$/.test(chunkText)) {
        delay *= 1.7;
    }
    
    timer = setTimeout(showNextWord, delay);
}

function togglePause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        pauseBtn.textContent = '⏸ Pausar';
        showNextWord();
    } else {
        pauseBtn.textContent = '▶ Continuar';
        clearTimeout(timer);
    }
}

function finishReading() {
    isPlaying = false;
    clearTimeout(timer);
    
    rsvpWord.innerHTML = `
        <div style="text-align:center">
            <div style="font-size:1.8rem; margin-bottom:1rem; color:#d4af37">Capítulo concluído! 🙌</div>
            <div>Você leu <strong>${currentWords.length}</strong> palavras</div>
            <div style="margin-top:1.5rem; font-size:0.95rem; opacity:0.8">
                Aprox. ${(currentWords.length / wpm).toFixed(1)} minutos
            </div>
        </div>
    `;
    
    // Update history with actual read time if needed
    setTimeout(() => {
        if (confirm('Parabéns! Deseja ler outro capítulo?')) {
            closeRSVP();
            // Could auto open next chapter logic here
        } else {
            closeRSVP();
        }
    }, 2500);
}

function closeRSVP() {
    isPlaying = false;
    clearTimeout(timer);
    rsvpModal.classList.add('hidden');
    rsvpWord.textContent = '';
    adContainer.style.display = 'block'; // Show ads again
}

// ==================== CHAPTER NAVIGATION ====================
async function goToNextChapter() {
    if (!currentReference) return;

    const currentBook = books.find(b => currentReference.startsWith(b.name) || currentReference.startsWith(b.ptName));
    if (!currentBook) return;

    let currentChapterNum = parseInt(chapterSelect.value) || 1;
    let nextChapter = currentChapterNum + 1;

    if (nextChapter > currentBook.chapters) {
        // Go to next book (simple version - can be improved later)
        const currentBookIndex = books.findIndex(b => b.slug === currentBook.slug);
        if (currentBookIndex < books.length - 1) {
            const nextBook = books[currentBookIndex + 1];
            nextChapter = 1;
            const success = await loadChapterData(nextBook.slug, nextChapter);
            if (success && isPlaying) {
                // Restart reading automatically
                setTimeout(() => {
                    currentIndex = 0;
                    showNextWord();
                }, 300);
            }
            return;
        } else {
            alert("Você chegou ao último capítulo da Bíblia!");
            return;
        }
    }

    const success = await loadChapterData(currentBook.slug, nextChapter);
    if (success && isPlaying) {
        setTimeout(() => {
            currentIndex = 0;
            showNextWord();
        }, 300);
    }
}

async function goToPreviousChapter() {
    if (!currentReference) return;

    const currentBook = books.find(b => currentReference.startsWith(b.name) || currentReference.startsWith(b.ptName));
    if (!currentBook) return;

    let currentChapterNum = parseInt(chapterSelect.value) || 1;
    let prevChapter = currentChapterNum - 1;

    if (prevChapter < 1) {
        // Go to previous book
        const currentBookIndex = books.findIndex(b => b.slug === currentBook.slug);
        if (currentBookIndex > 0) {
            const prevBook = books[currentBookIndex - 1];
            prevChapter = prevBook.chapters;
            const success = await loadChapterData(prevBook.slug, prevChapter);
            if (success && isPlaying) {
                setTimeout(() => {
                    currentIndex = 0;
                    showNextWord();
                }, 300);
            }
            return;
        } else {
            alert("Você está no primeiro capítulo da Bíblia!");
            return;
        }
    }

    const success = await loadChapterData(currentBook.slug, prevChapter);
    if (success && isPlaying) {
        setTimeout(() => {
            currentIndex = 0;
            showNextWord();
        }, 300);
    }
}

// Verse navigation
function setupVerseNavigation() {
    document.getElementById('prev-verse-btn').addEventListener('click', () => {
        if (!verses.length) return;
        const currentVerseNum = getCurrentVerse();
        const prevVerse = verses.find(v => v.num === currentVerseNum - 1) || verses[0];
        jumpToVerse(prevVerse.num);
    });
    
    document.getElementById('next-verse-btn').addEventListener('click', () => {
        if (!verses.length) return;
        const currentVerseNum = getCurrentVerse();
        const nextVerse = verses.find(v => v.num === currentVerseNum + 1) || verses[verses.length-1];
        jumpToVerse(nextVerse.num);
    });
}

// Control buttons
function setupRSVPControls() {
    pauseBtn.addEventListener('click', togglePause);
    closeRsvp.addEventListener('click', closeRSVP);
    
    document.getElementById('restart-btn').addEventListener('click', () => {
        currentIndex = 0;
        isPlaying = true;
        pauseBtn.textContent = '⏸ Pausar';
        showNextWord();
    });
    
    document.getElementById('speed-up').addEventListener('click', () => {
        wpm = Math.min(wpm + 50, 1200);
        wpmSlider.value = wpm;
        wpmValue.textContent = wpm;
        document.getElementById('current-wpm').textContent = wpm + ' WPM';
    });
    
    document.getElementById('speed-down').addEventListener('click', () => {
        wpm = Math.max(wpm - 50, 100);
        wpmSlider.value = wpm;
        wpmValue.textContent = wpm;
        document.getElementById('current-wpm').textContent = wpm + ' WPM';
    });
    
    document.getElementById('chunk-up').addEventListener('click', () => {
        chunkSize = Math.min(chunkSize + 1, 5);
        document.getElementById('current-chunk').textContent = chunkSize;
    });
    
    document.getElementById('chunk-down').addEventListener('click', () => {
        chunkSize = Math.max(chunkSize - 1, 1);
        document.getElementById('current-chunk').textContent = chunkSize;
    });

    // Chapter navigation buttons
    const prevChapterBtn = document.getElementById('prev-chapter-btn');
    const nextChapterBtn = document.getElementById('next-chapter-btn');

    if (prevChapterBtn) {
        prevChapterBtn.addEventListener('click', () => {
            if (isPlaying) clearTimeout(timer);
            goToPreviousChapter();
        });
    }

    if (nextChapterBtn) {
        nextChapterBtn.addEventListener('click', () => {
            if (isPlaying) clearTimeout(timer);
            goToNextChapter();
        });
    }
}

// Keyboard support
function handleKeyboard(e) {
    if (rsvpModal.classList.contains('hidden')) return;
    
    if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        togglePause();
    }
    if (e.key.toLowerCase() === 'r') {
        currentIndex = 0;
        isPlaying = true;
        showNextWord();
    }
    if (e.key === 'Escape') {
        closeRSVP();
    }
    if (e.key === 'ArrowLeft') {
        const currentVerseNum = getCurrentVerse();
        const prev = verses.find(v => v.num === currentVerseNum - 1);
        if (prev) jumpToVerse(prev.num);
    }
    if (e.key === 'ArrowRight') {
        const currentVerseNum = getCurrentVerse();
        const next = verses.find(v => v.num === currentVerseNum + 1);
        if (next) jumpToVerse(next.num);
    }
    // Chapter navigation with Page keys
    if (e.key === 'PageUp') {
        e.preventDefault();
        if (isPlaying) clearTimeout(timer);
        goToPreviousChapter();
    }
    if (e.key === 'PageDown') {
        e.preventDefault();
        if (isPlaying) clearTimeout(timer);
        goToNextChapter();
    }
}

// Persistence
function saveSettings() {
    const settings = {
        version: versionSelect.value,
        book: bookSelect.value,
        chapter: chapterSelect.value,
        wpm: wpm,
        chunkSize: chunkSize
    };
    localStorage.setItem('biblia-rsvp-settings', JSON.stringify(settings));
}

function loadSavedSettings() {
    const saved = localStorage.getItem('biblia-rsvp-settings');
    if (!saved) return;
    
    try {
        const s = JSON.parse(saved);
        if (s.version) versionSelect.value = s.version;
        if (s.book) bookSelect.value = s.book;
        if (s.chapter) {
            setTimeout(() => {
                updateChapterOptions();
                chapterSelect.value = s.chapter;
            }, 50);
        }
        if (s.wpm) {
            wpm = s.wpm;
            wpmSlider.value = wpm;
            wpmValue.textContent = wpm;
        }
    } catch (e) {}
}

// Initialize everything
init();
setupRSVPControls();
setupVerseNavigation();

// Expose for debugging
window.BibliaRSVP = { currentWords, startRSVP, getCurrentVerse };
