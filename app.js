const STORAGE_KEY = 'japango-progress-v1';
const THEME_KEY = 'japango-theme';

// SVG Icons for clean, crisp UI rendering
const ICONS = {
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  learn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`,
  practice: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`,
  dictionary: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>`,
  travel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
  translate: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>`,
  speaker: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`
};

const kana = [
  ['あ', 'a', 'අ', 'ah'], ['い', 'i', 'ඉ', 'ee'], ['う', 'u', 'උ', 'oo'], ['え', 'e', 'එ', 'eh'], ['お', 'o', 'ඔ', 'oh'],
  ['か', 'ka', 'ක', 'kah'], ['き', 'ki', 'කි', 'kee'], ['く', 'ku', 'කු', 'koo'], ['け', 'ke', 'කෙ', 'keh'], ['こ', 'ko', 'කො', 'koh'],
  ['さ', 'sa', 'ස', 'sah'], ['し', 'shi', 'ශි', 'shee'], ['す', 'su', 'සු', 'soo'], ['せ', 'se', 'සෙ', 'seh'], ['そ', 'so', 'සො', 'soh'],
  ['た', 'ta', 'ත', 'tah'], ['ち', 'chi', 'චි', 'chee'], ['つ', 'tsu', 'ත්සු', 'tsoo'], ['て', 'te', 'තෙ', 'teh'], ['と', 'to', 'තො', 'toh'],
  ['な', 'na', 'න', 'nah'], ['に', 'ni', 'නි', 'nee'], ['ぬ', 'nu', 'නු', 'noo'], ['ね', 'ne', 'නෙ', 'neh'], ['の', 'no', 'නො', 'noh'],
  ['は', 'ha', 'හ', 'hah'], ['ひ', 'hi', 'හි', 'hee'], ['ふ', 'fu', 'ෆු', 'foo'], ['へ', 'he', 'හෙ', 'heh'], ['ほ', 'ho', 'හො', 'hoh'],
  ['ま', 'ma', 'ම', 'mah'], ['み', 'mi', 'මි', 'mee'], ['む', 'mu', 'මු', 'moo'], ['め', 'me', 'මෙ', 'meh'], ['も', 'mo', 'මො', 'moh'],
  ['や', 'ya', 'ය', 'yah'], ['ゆ', 'yu', 'යු', 'yoo'], ['よ', 'yo', 'යො', 'yoh'],
  ['ら', 'ra', 'ර', 'rah'], ['り', 'ri', 'රි', 'ree'], ['る', 'ru', 'රු', 'roo'], ['れ', 're', 'රෙ', 'reh'], ['ろ', 'ro', 'රො', 'roh'],
  ['わ', 'wa', 'ව', 'wah'], ['を', 'wo', 'ඔ (particle)', 'oh (particle)'], ['ん', 'n', 'න්', 'n']
].map(([char, romaji, sinhala, english]) => ({ char, romaji, sinhala, english }));

const kanaSets = {
  voiced: [
    ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
    ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
    ['だ', 'da'], ['ぢ', 'ji (rare)'], ['づ', 'zu (rare)'], ['で', 'de'], ['ど', 'do'],
    ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
    ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']
  ],
  contracted: [
    ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'], ['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho'],
    ['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho'], ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo'],
    ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'], ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo'],
    ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo'], ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo'],
    ['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo'], ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'],
    ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']
  ],
  small: [
    ['ぁ', 'small a'], ['ぃ', 'small i'], ['ぅ', 'small u'], ['ぇ', 'small e'], ['ぉ', 'small o'],
    ['ゃ', 'small ya'], ['ゅ', 'small yu'], ['ょ', 'small yo'], ['っ', 'small tsu'], ['ゎ', 'small wa']
  ],
  foreign: [
    ['ふぁ', 'fa'], ['ふぃ', 'fi'], ['ふぇ', 'fe'], ['ふぉ', 'fo'],
    ['うぃ', 'wi'], ['うぇ', 'we'], ['うぉ', 'wo'],
    ['てぃ', 'ti'], ['とゥ', 'tu'], ['でぃ', 'di'], ['どぅ', 'du'],
    ['ちぇ', 'che'], ['しぇ', 'she'], ['じぇ', 'je'],
    ['つぁ', 'tsa'], ['つぃ', 'tsi'], ['つぇ', 'tse'], ['つぉ', 'tso'],
    ['ゔぁ', 'va'], ['ゔぃ', 'vi'], ['ゔ', 'vu'], ['ゔぇ', 've'], ['ゔぉ', 'vo'],
    ['くぁ', 'kwa'], ['くぃ', 'kwi'], ['くぇ', 'kwe'], ['くぉ', 'kwo']
  ],
  marks: [
    ['゛', 'dakuten: voices k/s/t/h rows'], ['゜', 'handakuten: changes h to p'],
    ['か → が', 'ka → ga'], ['さ → ざ', 'sa → za'], ['た → だ', 'ta → da'], ['は → ば', 'ha → ba'], ['は → ぱ', 'ha → pa']
  ]
};

function toKatakana(text) {
  return [...text].map((character) => {
    const code = character.codePointAt(0);
    return code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : character;
  }).join('');
}

const words = [
  { jp: 'こんにちは', reading: 'こんにちは', romaji: 'konnichiwa', si: 'ආයුබෝවන් / සුබ දවසක්', en: 'Hello / good afternoon', topic: 'Greetings' },
  { jp: 'ありがとう', reading: 'ありがとう', romaji: 'arigatou', si: 'ස්තුතියි', en: 'Thank you', topic: 'Greetings' },
  { jp: 'すみません', reading: 'すみません', romaji: 'sumimasen', si: 'සමාවෙන්න / Excuse me', en: 'Excuse me / I am sorry', topic: 'Greetings' },
  { jp: '水', reading: 'みず', romaji: 'mizu', si: 'වතුර', en: 'Water', topic: 'Food' },
  { jp: '駅', reading: 'えき', romaji: 'eki', si: 'දුම්රිය ස්ථානය', en: 'Train station', topic: 'Transport' },
  { jp: '電車', reading: 'でんしゃ', romaji: 'densha', si: 'දුම්රිය', en: 'Train', topic: 'Transport' },
  { jp: 'トイレ', reading: 'といれ', romaji: 'toire', si: 'වැසිකිළිය', en: 'Restroom', topic: 'Travel' },
  { jp: '病院', reading: 'びょういん', romaji: 'byouin', si: 'රෝහල', en: 'Hospital', topic: 'Health' },
  { jp: 'いくら', reading: 'いくら', romaji: 'ikura', si: 'කීයද?', en: 'How much?', topic: 'Shopping' },
  { jp: 'お願いします', reading: 'おねがいします', romaji: 'onegaishimasu', si: 'කරුණාකර', en: 'Please', topic: 'Greetings' }
];

const phrases = [
  { jp: 'すみません。', kana: 'すみません。', romaji: 'Sumimasen.', si: 'සමාවෙන්න.', en: 'Excuse me.', category: 'Getting around', note: 'A polite way to get someone’s attention.' },
  { jp: '駅はどこですか。', kana: 'えきはどこですか。', romaji: 'Eki wa doko desu ka?', si: 'දුම්රිය ස්ථානය කොහෙද?', en: 'Where is the train station?', category: 'Getting around', note: 'は marks the topic; ですか makes this a polite question.' },
  { jp: 'これをください。', kana: 'これをください。', romaji: 'Kore o kudasai.', si: 'මේක දෙන්න, කරුණාකර.', en: 'This one, please.', category: 'Shopping', note: 'Point to the item when you say これ (this).' },
  { jp: 'お水をお願いします。', kana: 'おみずをおねがいします。', romaji: 'Omizu o onegaishimasu.', si: 'වතුර ටිකක්, කරුණාකර.', en: 'Water, please.', category: 'Restaurant', note: 'A polite request you can use at a restaurant.' },
  { jp: '英語のメニューはありますか。', kana: 'えいごのメニューはありますか。', romaji: 'Eigo no menyuu wa arimasu ka?', si: 'ඉංග්‍රීසි මෙනුවක් තිබෙනවාද?', en: 'Do you have an English menu?', category: 'Restaurant', note: 'の links 英語 (English) and メニュー (menu).' },
  { jp: 'アレルギーがあります。', kana: 'あれるぎーがあります。', romaji: 'Arerugii ga arimasu.', si: 'මට ආහාර අසාත්මිකතාවක් තිබෙනවා.', en: 'I have an allergy.', category: 'Restaurant', note: 'Show a written allergy card too; this phrase alone may not explain which ingredient.' },
  { jp: '予約しています。', kana: 'よやくしています。', romaji: 'Yoyaku shite imasu.', si: 'මම වෙන් කරගෙන තිබෙනවා.', en: 'I have a reservation.', category: 'Accommodation', note: 'You can add your name after this phrase.' },
  { jp: '病院に行きたいです。', kana: 'びょういんにいきたいです。', romaji: 'Byouin ni ikitai desu.', si: 'මට රෝහලට යන්න ඕන.', en: 'I want to go to a hospital.', category: 'Health', note: 'For urgent danger, contact local emergency services or ask nearby staff for help.' },
  { jp: '助けてください。', kana: 'たすけてください。', romaji: 'Tasukete kudasai.', si: 'කරුණාකර මට උදව් කරන්න.', en: 'Please help me.', category: 'Emergency', note: 'This phrase asks for help; it is not a substitute for verified local emergency guidance.' },
  { jp: 'いくらですか。', kana: 'いくらですか。', romaji: 'Ikura desu ka?', si: 'කීයද?', en: 'How much is it?', category: 'Shopping', note: 'A useful polite question while shopping.' }
];

const navItems = [
  { id: 'home', icon: ICONS.home, en: 'Home', si: 'මුල් පිටුව' },
  { id: 'learn', icon: ICONS.learn, en: 'Learn', si: 'ඉගෙනගන්න' },
  { id: 'practice', icon: ICONS.practice, en: 'Practice', si: 'පුහුණුව' },
  { id: 'dictionary', icon: ICONS.dictionary, en: 'Dictionary', si: 'ශබ්දකෝෂය' },
  { id: 'travel', icon: ICONS.travel, en: 'Travel', si: 'ගමන්' },
  { id: 'translate', icon: ICONS.translate, en: 'Translate', si: 'පරිවර්තනය' }
];

const copy = {
  en: {
    workspace: 'YOUR WORKSPACE', offlineReady: 'Lessons ready offline', learner: 'Learner', today: 'YOUR JAPANESE JOURNEY',
    hello: 'こんにちは', greeting: 'Small steps today make Japan feel closer.',
    continue: 'Continue learning', heroTitle: 'Your first 46 Hiragana', heroText: 'Start with the sounds that unlock Japanese reading.',
    dailyGoal: 'Today’s learning', session: 'Study session', sessionDone: 'Session complete for today', goalHint: 'Complete a lesson or quiz to record today’s activity.',
    progress: 'Your progress', lessons: 'Lessons completed', quizzes: 'Quizzes taken', bestScore: 'Best quiz score',
    categories: 'Pick up where you like', categoriesHint: 'A few useful places to begin.', kana: 'Hiragana', kanaSub: '46 basic characters', quiz: 'Quick practice', quizSub: '5 questions, instant feedback', words: 'Useful words', wordsSub: 'Everyday Japanese', phrases: 'Travel phrases', phrasesSub: 'Polite, practical expressions',
    learnTitle: 'Japanese kana chart', learnDesc: 'Explore the basic Hiragana and Katakana sounds and their common marks and combinations. Sinhala pronunciation guides are approximate, not exact Japanese equivalents.',
    hiragana: 'Hiragana', katakana: 'Katakana', basicKana: 'Basic 46', voicedKana: 'Dakuten / handakuten', combinedKana: 'Yōon combinations', smallKana: 'Small kana', foreignKana: 'Foreign sounds', kanaMarks: 'Sound marks', longVowel: 'Long-vowel mark', katakanaSmallNote: 'Katakana also uses ヵ and ヶ in some words and counters.',
    translateTitle: 'Say it in Japanese', translateDesc: 'Enter English or Sinhala text to get a Japanese translation, then play it with a Japanese voice available on your device.', translateSource: 'Text language', translateInput: 'Type a word or sentence', translateButton: 'Translate to Japanese', translating: 'Translating…', translationResult: 'Japanese translation', translationPrivacy: 'Translation uses a free online service. Your text is sent to that service; do not enter private or sensitive information. Machine translations can be inaccurate, so verify important phrases. Internet is required, and free service availability or daily limits may change.', translationError: 'Translation did not work. Check your internet connection and try a shorter phrase.', translatedSpeech: 'Hear Japanese',
    play: 'Listen', markDone: 'Mark lesson complete', pronunciation: 'Pronunciation note', pronounceHint: 'Japanese vowels are short and clear. Sinhala guides are approximations; listen to the audio when a Japanese device voice is available.',
    practiceTitle: 'Quick practice', practiceDesc: 'Choose the romaji for each Hiragana. Your score is saved on this device.', question: 'Choose the matching romaji', submit: 'Check answer', next: 'Next question', finish: 'See results', correct: 'That’s right!', incorrect: 'Not quite.', correctAnswer: 'Correct answer:', startQuiz: 'Start 5-question quiz', retry: 'Try another round', resultTitle: 'Practice complete', scoreLabel: 'correct answers',
    dictionaryTitle: 'Everyday dictionary', dictionaryDesc: 'A small starter set, organized by topic. More verified words can be added as lessons grow.', search: 'Search Japanese, romaji, or meaning', allTopics: 'All topics', noResults: 'No matching words. Try a different search or topic.',
    travelTitle: 'Japan travel phrases', travelDesc: 'Practical, polite expressions with kana, romaji, and Sinhala and English meanings.', categoriesFilter: 'All situations', noPhrases: 'No phrases in this situation yet.', situational: 'Situational note',
    settingsTitle: 'Language and settings', settingsDesc: 'Choose the language used for navigation and interface labels.', language: 'Interface language', english: 'English', sinhala: 'සිංහල', save: 'Save settings', cancel: 'Cancel', reset: 'Reset learning progress', resetAsk: 'Reset your local learning progress? This cannot be undone.', resetDone: 'Learning progress was reset on this device.', saved: 'Settings saved.',
    completed: 'Lesson marked complete.', alreadyCompleted: 'This lesson is already recorded as complete.', noVoice: 'A Japanese speech voice is not available in this browser.', speaking: 'Playing device text-to-speech. This is not a native-speaker recording.',
    offlineNote: 'Your lessons and saved progress stay on this device. Speech playback needs a Japanese voice provided by your browser or operating system.', emergencyNote: 'Emergency details vary by location. This starter guide does not provide official emergency numbers; ask local staff or consult verified official guidance.', emptyHistory: 'No quiz results yet. Take a quick practice round to start tracking your progress.'
  },
  si: {
    workspace: 'ඔබේ ඉගෙනුම් අවකාශය', offlineReady: 'පාඩම් offline භාවිතා කළ හැක', learner: 'ඉගෙනුම්කරු', today: 'ඔබේ ජපන් භාෂා ගමන',
    hello: 'こんにちは', greeting: 'අද කුඩා පියවරක්, ජපානය තව ළඟ කරයි.',
    continue: 'ඉගෙනීම දිගටම කරගෙන යන්න', heroTitle: 'ඔබේ පළමු හිරගනා අකුරු 46', heroText: 'ජපන් කියවීමට අවශ්‍ය මූලික ශබ්දවලින් පටන් ගන්න.',
    dailyGoal: 'අද ඉගෙනීම', session: 'ඉගෙනුම් වාරය', sessionDone: 'අද ඉගෙනුම් වාරය සම්පූර්ණයි', goalHint: 'අද ක්‍රියාකාරකම සටහන් කිරීමට පාඩමක් හෝ ප්‍රශ්නාවලියක් සම්පූර්ණ කරන්න.',
    progress: 'ඔබේ ප්‍රගතිය', lessons: 'සම්පූර්ණ කළ පාඩම්', quizzes: 'කළ ප්‍රශ්නාවලි', bestScore: 'හොඳම ලකුණු',
    categories: 'ඔබ කැමති තැනකින් පටන් ගන්න', categoriesHint: 'ආරම්භයට ප්‍රයෝජනවත් කොටස්.', kana: 'හිරගනා', kanaSub: 'මූලික අකුරු 46', quiz: 'කෙටි පුහුණුව', quizSub: 'ප්‍රශ්න 5ක්, ක්ෂණික ප්‍රතිචාර', words: 'ප්‍රයෝජනවත් වචන', wordsSub: 'දිනපතා භාවිතා වන ජපන්', phrases: 'ගමන් වාක්‍ය', phrasesSub: 'විනීත, ප්‍රායෝගික ප්‍රකාශ',
    learnTitle: 'ජපන් kana අක්ෂර වගුව', learnDesc: 'මූලික හිරගනා සහ කටකනා ශබ්ද, ඒවායේ පොදු ශබ්ද ලකුණු සහ සංයෝජන ඉගෙනගන්න. සිංහල උච්චාරණ මඟපෙන්වීම් ආසන්න අනුමාන පමණයි; ජපන් ශබ්දයට හරියටම සමාන නොවේ.',
    hiragana: 'හිරගනා', katakana: 'කටකනා', basicKana: 'මූලික 46', voicedKana: '゛ / ゜ ශබ්ද ලකුණු', combinedKana: 'yōon සංයුක්ත ශබ්ද', smallKana: 'කුඩා kana', foreignKana: 'විදේශීය ශබ්ද', kanaMarks: 'ශබ්ද ලකුණු', longVowel: 'දිගු ස්වර ලකුණ', katakanaSmallNote: 'කටකනාහි සමහර වචන හා ගණන් කිරීම්වල ヵ සහ ヶ ද භාවිතා වේ.',
    translateTitle: 'ජපන් භාෂාවෙන් කියන්න', translateDesc: 'English හෝ සිංහල වචනයක්/වාක්‍යයක් ඇතුළත් කර ජපන් පරිවර්තනය ලබාගෙන, ඔබේ උපකරණයේ ජපන් හඬක් තිබේ නම් අහන්න.', translateSource: 'ඇතුළත් කරන භාෂාව', translateInput: 'වචනයක් හෝ වාක්‍යයක් ලියන්න', translateButton: 'ජපන් භාෂාවට පරිවර්තනය කරන්න', translating: 'පරිවර්තනය කරමින්…', translationResult: 'ජපන් පරිවර්තනය', translationPrivacy: 'පරිවර්තනය සඳහා නොමිලේ online සේවාවක් භාවිතා කරයි. ඔබේ text එම සේවාවට යවනු ලැබේ; පුද්ගලික හෝ රහස් තොරතුරු ඇතුළත් නොකරන්න. Machine translation නිවැරදි නොවිය හැකි නිසා වැදගත් වාක්‍ය තහවුරු කරගන්න. Internet අවශ්‍ය අතර සේවා සීමා වෙනස් විය හැක.', translationError: 'පරිවර්තනය කළ නොහැකි විය. Internet සම්බන්ධතාව පරීක්ෂා කර කෙටි වාක්‍යයක් උත්සාහ කරන්න.', translatedSpeech: 'ජපන් හඬ අහන්න',
    play: 'අහන්න', markDone: 'පාඩම සම්පූර්ණ කළ බව සටහන් කරන්න', pronunciation: 'උච්චාරණ සටහන', pronounceHint: 'ජපන් ස්වර කෙටි සහ පැහැදිලියි. සිංහල උච්චාරණ මඟපෙන්වීම් ආසන්න අනුමාන පමණයි. ජපන් හඬක් තිබේ නම් audio අහන්න.',
    practiceTitle: 'කෙටි පුහුණුව', practiceDesc: 'එක් එක් හිරගනා අකුරට ගැළපෙන රෝමාජි තෝරන්න. ලකුණු මේ උපකරණයේ සුරැකේ.', question: 'ගැළපෙන රෝමාජි පිළිතුර තෝරන්න', submit: 'පිළිතුර පරීක්ෂා කරන්න', next: 'ඊළඟ ප්‍රශ්නය', finish: 'ප්‍රතිඵල බලන්න', correct: 'නිවැරදියි!', incorrect: 'එය නිවැරදි නැහැ.', correctAnswer: 'නිවැරදි පිළිතුර:', startQuiz: 'ප්‍රශ්න 5ක පුහුණුව අරඹන්න', retry: 'තවත් වටයක් කරන්න', resultTitle: 'පුහුණුව අවසන්', scoreLabel: 'නිවැරදි පිළිතුරු',
    dictionaryTitle: 'දිනපතා ශබ්දකෝෂය', dictionaryDesc: 'මාතෘකා අනුව පෙළගස්වූ ආරම්භක වචන එකතුවක්. පාඩම් වැඩිවන විට තහවුරු කළ තවත් වචන එකතු කළ හැක.', search: 'ජපන්, රෝමාජි හෝ අර්ථය සොයන්න', allTopics: 'සියලු මාතෘකා', noResults: 'ගැළපෙන වචන හමු වුණේ නැහැ. වෙනත් සෙවුමක් හෝ මාතෘකාවක් උත්සාහ කරන්න.',
    travelTitle: 'ජපාන ගමන් වාක්‍ය', travelDesc: 'කනා, රෝමාජි සහ සිංහල හා ඉංග්‍රීසි අර්ථ සමඟ ප්‍රායෝගික, විනීත ප්‍රකාශ.', categoriesFilter: 'සියලු අවස්ථා', noPhrases: 'මෙම අවස්ථාවට වාක්‍ය තවම නැහැ.', situational: 'අවස්ථා සටහන',
    settingsTitle: 'භාෂාව සහ සැකසුම්', settingsDesc: 'මෙනු සහ අතුරුමුහුණත සඳහා භාවිතා කරන භාෂාව තෝරන්න.', language: 'අතුරුමුහුණත් භාෂාව', english: 'English', sinhala: 'සිංහල', save: 'සැකසුම් සුරකින්න', cancel: 'අවලංගු කරන්න', reset: 'ඉගෙනුම් ප්‍රගතිය මකන්න', resetAsk: 'මේ උපකරණයේ සුරැකි ඉගෙනුම් ප්‍රගතිය මකන්නද? මෙය ආපසු හැරවිය නොහැක.', resetDone: 'මේ උපකරණයේ ඉගෙනුම් ප්‍රගතිය මකා ඇත.', saved: 'සැකසුම් සුරැකිණි.',
    completed: 'පාඩම සම්පූර්ණ කළ බව සටහන් කළා.', alreadyCompleted: 'මෙම පාඩම දැනටමත් සම්පූර්ණ කර ඇත.', noVoice: 'මෙම browser එකේ ජපන් හඬක් නොමැත.', speaking: 'උපකරණයේ text-to-speech ක්‍රියාත්මකයි. මෙය ස්වදේශීය කථිකයෙකුගේ පටිගත කිරීමක් නොවේ.',
    offlineNote: 'පාඩම් සහ සුරැකි ප්‍රගතිය මේ උපකරණයේම පවතී. කථන playback සඳහා browser හෝ මෙහෙයුම් පද්ධතියෙන් සපයන ජපන් හඬක් අවශ්‍යයි.', emergencyNote: 'හදිසි තොරතුරු ස්ථානය අනුව වෙනස් වේ. මෙම ආරම්භක මාර්ගෝපදේශයේ නිල හදිසි අංක නැත; එම ස්ථානයේ කාර්ය මණ්ඩලයෙන් විමසන්න හෝ තහවුරු කළ නිල තොරතුරු බලන්න.', emptyHistory: 'තවම ප්‍රශ්නාවලි ප්‍රතිඵල නැහැ. ප්‍රගතිය සටහන් කිරීමට කෙටි පුහුණුවක් කරන්න.'
  }
};

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { language: saved.language === 'si' ? 'si' : 'en', completed: Array.isArray(saved.completed) ? saved.completed : [], quizResults: Array.isArray(saved.quizResults) ? saved.quizResults : [], activityDates: Array.isArray(saved.activityDates) ? saved.activityDates : [], favorites: Array.isArray(saved.favorites) ? saved.favorites : [] };
  } catch {
    return { language: 'en', completed: [], quizResults: [], activityDates: [], favorites: [] };
  }
}

// Theme Handling
let currentTheme = localStorage.getItem(THEME_KEY) || 'light';
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const themeLabel = document.querySelector('#sidebar-theme-label');
  if (themeLabel) {
    themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }
}
function toggleTheme() {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

let progress = readProgress();
let currentView = 'home';
let quiz = null;
let selectedLanguage = progress.language;
let toastTimer;
let alphabetScript = 'hiragana';
let alphabetSet = 'basic';
let translatedText = '';
let translationBusy = false;
let translationFailed = false;
let translationInput = '';
let translationLanguage = progress.language;
const content = document.querySelector('#app-content');

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    showToast('Progress could not be saved in this browser.');
  }
}

function t(key) { return copy[progress.language][key] || copy.en[key] || key; }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
function todayKey() { return new Date().toLocaleDateString('en-CA'); }
function recordActivity() {
  const date = todayKey();
  if (!progress.activityDates.includes(date)) progress.activityDates.push(date);
  saveProgress();
}
function todayLabel() {
  return new Intl.DateTimeFormat(progress.language === 'si' ? 'si-LK' : 'en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
}

function renderNavigation() {
  const markup = navItems.map((item) => `
    <button class="nav-item ${currentView === item.id ? 'active' : ''}" type="button" data-view="${item.id}" ${currentView === item.id ? 'aria-current="page"' : ''}>
      <span class="nav-symbol" aria-hidden="true">${item.icon}</span>
      <span>${progress.language === 'si' ? item.si : item.en}</span>
    </button>
  `).join('');
  
  const sideNav = document.querySelector('#side-nav');
  const mobileNav = document.querySelector('#mobile-nav');
  if (sideNav) sideNav.innerHTML = markup;
  if (mobileNav) mobileNav.innerHTML = markup;
  
  document.querySelectorAll('[data-i18n]').forEach((element) => { 
    element.textContent = t(element.dataset.i18n); 
  });
  
  const todayElem = document.querySelector('#today-label');
  if (todayElem) todayElem.textContent = todayLabel();
  
  const langLabel = document.querySelector('#language-label');
  if (langLabel) langLabel.textContent = progress.language === 'si' ? 'සිංහල' : 'English';
}

function titleBlock(title, description) {
  return `<div class="view-title"><h1>${title}</h1><p>${description}</p></div>`;
}

function renderHome() {
  const completedToday = progress.activityDates.includes(todayKey());
  const best = progress.quizResults.length ? Math.max(...progress.quizResults.map((item) => item.score)) : 0;
  return `
    <div class="welcome-row">
      <div>
        <div class="japanese-kicker"><span>🌸</span> ${t('hello')} · ${progress.language === 'si' ? 'ආයුබෝවන්' : 'Konnichiwa'}</div>
        <h1>${progress.language === 'si' ? 'සාදරයෙන් පිළිගනිමු!' : 'Welcome back!'}</h1>
        <p>${t('greeting')}</p>
      </div>
    </div>
    
    <section class="hero-panel">
      <div class="hero-copy">
        <p class="eyebrow">${progress.language === 'si' ? 'ආරම්භක මාර්ගය' : 'BEGINNER PATH'}</p>
        <h2>${t('heroTitle')}</h2>
        <p>${t('heroText')}</p>
        <button class="button-primary button-light" type="button" data-view="learn">
          <span>${t('continue')}</span> <span aria-hidden="true">→</span>
        </button>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="kana-orbit">
          <span>あ</span>
          <span>き</span>
          <span>の</span>
        </div>
      </div>
    </section>

    <div class="section-heading">
      <h2>${t('progress')}</h2>
      <p>${t('categoriesHint')}</p>
    </div>
    
    <section class="dashboard-grid">
      <article class="panel goal-panel">
        <div class="panel-title">
          <h3>${t('dailyGoal')}</h3>
          <span>${completedToday ? '1 / 1' : '0 / 1'}</span>
        </div>
        <div class="goal-content">
          <div class="goal-ring" data-value="${completedToday ? '✓' : '0'}" style="--progress:${completedToday ? '360deg' : '0deg'}"></div>
          <div class="goal-copy">
            <strong>${completedToday ? t('sessionDone') : t('session')}</strong>
            <p>${t('goalHint')}</p>
          </div>
        </div>
      </article>

      <article class="panel progress-panel">
        <div class="panel-title">
          <h3>${t('progress')}</h3>
          <span>${progress.activityDates.length} ${progress.language === 'si' ? 'දින' : 'study days'}</span>
        </div>
        <div class="stats-row">
          <div class="stat">
            <strong>${progress.completed.length}</strong>
            <span>${t('lessons')}</span>
          </div>
          <div class="stat">
            <strong>${progress.quizResults.length}</strong>
            <span>${t('quizzes')} · ${progress.language === 'si' ? 'හොඳම' : 'best'} ${best}/5</span>
          </div>
        </div>
      </article>
    </section>

    <div class="section-heading">
      <h2>${t('categories')}</h2>
      <p>${t('categoriesHint')}</p>
    </div>
    
    <section class="category-grid">
      <button class="category-card" data-view="learn">
        <span class="category-mark">あ</span>
        <strong>${t('kana')}</strong>
        <small>${t('kanaSub')}</small>
      </button>
      <button class="category-card" data-view="practice">
        <span class="category-mark">✓</span>
        <strong>${t('quiz')}</strong>
        <small>${t('quizSub')}</small>
      </button>
      <button class="category-card" data-view="dictionary">
        <span class="category-mark">語</span>
        <strong>${t('words')}</strong>
        <small>${t('wordsSub')}</small>
      </button>
      <button class="category-card" data-view="travel">
        <span class="category-mark">旅</span>
        <strong>${t('phrases')}</strong>
        <small>${t('phrasesSub')}</small>
      </button>
    </section>
  `;
}

function renderLearn() {
  const isHiragana = alphabetScript === 'hiragana';
  const base = alphabetSet === 'basic' ? kana.map((item) => [item.char, item.romaji]) : alphabetSet === 'marks' ? kanaSets.marks : kanaSets[alphabetSet];
  const cards = base.map(([char, romaji]) => {
    const displayedChar = isHiragana ? char : toKatakana(char);
    const basic = alphabetSet === 'basic' ? kana.find((item) => item.char === char) : null;
    return `
      <div class="kana-wrap">
        <article class="kana-card">
          <span class="kana-char" lang="ja">${displayedChar}</span>
          <span class="kana-romaji">${escapeHtml(romaji)}</span>
          ${basic ? `<span class="kana-sinhala" lang="si">${basic.sinhala}</span><span class="kana-eng">${basic.english}</span>` : ''}
        </article>
        <button class="card-speak" type="button" data-speak="${displayedChar}" aria-label="${t('play')} ${displayedChar}" title="${t('play')}">
          ${ICONS.speaker}
        </button>
      </div>
    `;
  }).join('');
  
  const scriptTabs = `
    <div class="segmented-control" role="group" aria-label="Kana script">
      <button type="button" data-script="hiragana" class="${isHiragana ? 'selected' : ''}">${t('hiragana')}</button>
      <button type="button" data-script="katakana" class="${!isHiragana ? 'selected' : ''}">${t('katakana')}</button>
    </div>
  `;
  
  const sets = [['basic', 'basicKana'], ['voiced', 'voicedKana'], ['contracted', 'combinedKana'], ['small', 'smallKana'], ['foreign', 'foreignKana'], ['marks', 'kanaMarks']].map(([id, label]) => `
    <button type="button" data-kana-set="${id}" class="${alphabetSet === id ? 'selected' : ''}">${t(label)}</button>
  `).join('');
  
  const specialSmallKana = !isHiragana && alphabetSet === 'small' ? `
    <article class="kana-card"><span class="kana-char" lang="ja">ヵ</span><span class="kana-romaji">small ka</span></article>
    <article class="kana-card"><span class="kana-char" lang="ja">ヶ</span><span class="kana-romaji">small ke</span></article>
  ` : '';
  
  const done = progress.completed.includes(`${alphabetScript}-${alphabetSet}`);
  const longMark = isHiragana ? '' : `
    <div class="long-vowel-note">
      <strong>ー · ${t('longVowel')}</strong>
      <span>コーヒー · koohii · ${progress.language === 'si' ? 'දිගු ස්වරය පෙන්වයි' : 'shows a long vowel'}</span>
      <button class="speak-button" type="button" data-speak="コーヒー" aria-label="${t('play')} コーヒー">
        ${ICONS.speaker}
      </button>
    </div>
  `;
  
  const extraNote = !isHiragana && alphabetSet === 'small' ? `<p class="kana-explanation">${t('katakanaSmallNote')}</p>` : '';
  
  return `
    ${titleBlock(`${t('learnTitle')} · ${t(alphabetScript)}`, t('learnDesc'))}
    <div class="alphabet-controls">
      ${scriptTabs}
      <div class="alphabet-set-tabs" role="group" aria-label="Kana group">${sets}</div>
    </div>
    <div class="lesson-intro">
      <p><strong>${t('pronunciation')}</strong><br>${t('pronounceHint')}</p>
      <button class="button-secondary" type="button" data-speak="${isHiragana ? 'あいうえお' : 'アイウエオ'}" aria-label="${t('play')}">
        ${ICONS.speaker} <span>${t('play')}</span>
      </button>
    </div>
    ${longMark}
    ${alphabetSet === 'marks' ? `<p class="kana-explanation">゛ is dakuten (voicing); ゜ is handakuten (h → p). These marks combine with kana, like か → が and は → ぱ.</p>` : ''}
    <section class="kana-grid" aria-label="${t(alphabetScript)} ${t(alphabetSet === 'basic' ? 'basicKana' : alphabetSet)}">
      ${cards}
      ${specialSmallKana}
    </section>
    ${extraNote}
    <div class="lesson-footer">
      <p><strong>${t('pronunciation')}</strong><br>${t('pronounceHint')}</p>
      <button class="button-primary" type="button" data-complete="${alphabetScript}-${alphabetSet}" ${done ? 'disabled' : ''}>
        ${done ? t('alreadyCompleted') : `✓ ${t('markDone')}`}
      </button>
    </div>
  `;
}

function renderTranslate() {
  const result = translatedText ? `
    <section class="translation-result">
      <div>
        <p class="eyebrow">${t('translationResult')}</p>
        <div id="translation-output" class="translation-output" lang="ja">${escapeHtml(translatedText)}</div>
      </div>
      <button class="button-primary" type="button" data-speak="${escapeHtml(translatedText)}">
        ${ICONS.speaker} <span>${t('translatedSpeech')}</span>
      </button>
    </section>
  ` : '';
  
  const error = translationFailed ? `<div class="feedback error">${t('translationError')}</div>` : '';
  
  return `
    ${titleBlock(t('translateTitle'), t('translateDesc'))}
    <section class="panel translator-panel">
      <label class="field-label" for="source-language">${t('translateSource')}</label>
      <select class="filter-select" id="source-language">
        <option value="en" ${translationLanguage === 'en' ? 'selected' : ''}>English</option>
        <option value="si" ${translationLanguage === 'si' ? 'selected' : ''}>සිංහල</option>
      </select>
      <label class="field-label" for="source-text">${t('translateInput')}</label>
      <textarea id="source-text" maxlength="500" rows="5" placeholder="${t('translateInput')}">${escapeHtml(translationInput)}</textarea>
      <div class="translator-submit">
        <span>${progress.language === 'si' ? 'English / සිංහල → 日本語' : 'English / Sinhala → Japanese'}</span>
        <button class="button-primary" type="button" data-translate ${translationBusy ? 'disabled' : ''}>
          ${translationBusy ? t('translating') : t('translateButton')}
        </button>
      </div>
      ${error}
      ${result}
      <div class="travel-note">${t('translationPrivacy')}</div>
    </section>
  `;
}

function buildQuestion(previous = []) {
  const pool = kana.filter((item) => !previous.includes(item.char));
  const target = pool[Math.floor(Math.random() * pool.length)] || kana[Math.floor(Math.random() * kana.length)];
  const distractors = kana.filter((item) => item.char !== target.char).sort(() => Math.random() - 0.5).slice(0, 3);
  return { target, options: [...distractors, target].sort(() => Math.random() - 0.5), answer: null };
}

function startQuiz() {
  quiz = { index: 0, score: 0, questions: [], answered: false };
  for (let index = 0; index < 5; index += 1) {
    const previous = quiz.questions.map((question) => question.target.char);
    quiz.questions.push(buildQuestion(previous));
  }
  render();
}

function renderPractice() {
  if (!quiz) {
    return `
      ${titleBlock(t('practiceTitle'), t('practiceDesc'))}
      <section class="panel quiz-panel">
        <div class="results">
          <div class="result-mark">あ</div>
          <h2>${t('quiz')}</h2>
          <p>${t('practiceDesc')}</p>
          <button class="button-primary" type="button" data-start-quiz>
            <span>${t('startQuiz')}</span> <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    `;
  }
  
  if (quiz.index >= quiz.questions.length) return renderResults();
  
  const question = quiz.questions[quiz.index];
  const options = question.options.map((option) => {
    const state = quiz.answered && option.romaji === question.target.romaji ? 'correct' : quiz.answered && option.romaji === question.answer ? 'incorrect' : '';
    return `
      <button class="answer-option ${state}" type="button" data-answer="${option.romaji}" ${quiz.answered ? 'disabled' : ''}>
        ${option.romaji}
      </button>
    `;
  }).join('');
  
  const feedback = quiz.answered ? `
    <div class="feedback ${question.answer === question.target.romaji ? 'success' : 'error'}">
      ${question.answer === question.target.romaji ? `✓ ${t('correct')}` : `✕ ${t('incorrect')} ${t('correctAnswer')} <strong>${question.target.romaji}</strong>`}
    </div>
  ` : '<div class="feedback"></div>';
  
  return `
    ${titleBlock(t('practiceTitle'), t('practiceDesc'))}
    <section class="panel quiz-panel">
      <div class="quiz-topline">
        <span>${progress.language === 'si' ? 'ප්‍රශ්නය' : 'Question'} ${quiz.index + 1} / 5</span>
        <span>${progress.language === 'si' ? 'ලකුණු' : 'Score'}: ${quiz.score}</span>
      </div>
      <div class="quiz-progress"><span style="width:${((quiz.index + (quiz.answered ? 1 : 0)) / 5) * 100}%"></span></div>
      <p class="question-kana" lang="ja">${question.target.char}</p>
      <p class="question-prompt">${t('question')}</p>
      <div class="answer-grid">${options}</div>
      ${feedback}
      <div class="quiz-actions">
        ${quiz.answered ? `<button class="button-primary" type="button" data-next>${quiz.index === 4 ? t('finish') : t('next')} →</button>` : ''}
      </div>
    </section>
  `;
}

function launchConfetti() {
  const canvas = document.querySelector('#confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const colors = ['#ff4760', '#ff7844', '#10b981', '#f59e0b', '#6366f1', '#38bdf8'];
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height * 0.4) - 20,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: Math.random() * 3 + 2,
    speedX: (Math.random() - 0.5) * 4,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 8
  }));
  
  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    frames++;
    if (frames < 140) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}

function renderResults() {
  if (quiz && quiz.score >= 4) launchConfetti();
  return `
    ${titleBlock(t('practiceTitle'), t('practiceDesc'))}
    <section class="panel quiz-panel">
      <div class="results">
        <div class="result-mark">🎉</div>
        <h2>${t('resultTitle')}</h2>
        <strong class="score">${quiz.score} / 5</strong>
        <p>${t('scoreLabel')}</p>
        <button class="button-primary" type="button" data-start-quiz>${t('retry')}</button>
      </div>
    </section>
  `;
}

function renderDictionary() {
  const topics = [...new Set(words.map((word) => word.topic))];
  return `
    ${titleBlock(t('dictionaryTitle'), t('dictionaryDesc'))}
    <div class="toolbar">
      <label class="search-field">
        <input id="word-search" type="search" placeholder="${t('search')}" aria-label="${t('search')}">
      </label>
      <select class="filter-select" id="word-filter" aria-label="${t('allTopics')}">
        <option value="all">${t('allTopics')}</option>
        ${topics.map((topic) => `<option value="${topic}">${topic}</option>`).join('')}
      </select>
    </div>
    <div class="list-stack" id="word-list"></div>
  `;
}

function renderWordList() {
  const search = (document.querySelector('#word-search')?.value || '').trim().toLowerCase();
  const topic = document.querySelector('#word-filter')?.value || 'all';
  const matches = words.filter((word) => (topic === 'all' || word.topic === topic) && [word.jp, word.reading, word.romaji, word.si, word.en, word.topic].some((value) => value.toLowerCase().includes(search)));
  const list = document.querySelector('#word-list');
  if (!list) return;
  list.innerHTML = matches.length ? matches.map((word) => `
    <article class="word-row">
      <div>
        <div class="word-jp" lang="ja">${word.jp}</div>
        <div class="word-reading" lang="ja">${word.reading}</div>
      </div>
      <div>
        <div class="word-romaji">${word.romaji}</div>
        <div class="word-meanings"><span lang="si">${word.si}</span> · ${word.en}</div>
      </div>
      <button class="speak-button" type="button" data-speak="${word.jp}" aria-label="${t('play')} ${word.jp}" title="${t('play')}">
        ${ICONS.speaker}
      </button>
    </article>
  `).join('') : `<div class="empty-state">${t('noResults')}</div>`;
}

function renderTravel() {
  const categories = [...new Set(phrases.map((phrase) => phrase.category))];
  return `
    ${titleBlock(t('travelTitle'), t('travelDesc'))}
    <div class="travel-note">${t('emergencyNote')}</div>
    <div class="toolbar">
      <label class="search-field">
        <input id="phrase-search" type="search" placeholder="${t('search')}" aria-label="${t('search')}">
      </label>
      <select class="filter-select" id="phrase-filter" aria-label="${t('categoriesFilter')}">
        <option value="all">${t('categoriesFilter')}</option>
        ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
      </select>
    </div>
    <div class="list-stack" id="phrase-list"></div>
  `;
}

function renderPhraseList() {
  const search = (document.querySelector('#phrase-search')?.value || '').trim().toLowerCase();
  const category = document.querySelector('#phrase-filter')?.value || 'all';
  const matches = phrases.filter((phrase) => (category === 'all' || phrase.category === category) && [phrase.jp, phrase.kana, phrase.romaji, phrase.si, phrase.en, phrase.category].some((value) => value.toLowerCase().includes(search)));
  const list = document.querySelector('#phrase-list');
  if (!list) return;
  list.innerHTML = matches.length ? matches.map((phrase) => `
    <article class="phrase-row">
      <div>
        <div class="phrase-jp" lang="ja">${phrase.jp}</div>
        <div class="word-reading" lang="ja">${phrase.kana}</div>
        <div class="phrase-meta">${phrase.category}</div>
      </div>
      <div>
        <div class="word-romaji">${phrase.romaji}</div>
        <div class="phrase-meanings">
          <span lang="si">${phrase.si}</span><br>${phrase.en}
          <div class="phrase-meta">${t('situational')}: ${phrase.note}</div>
        </div>
      </div>
      <button class="speak-button" type="button" data-speak="${phrase.jp}" aria-label="${t('play')} ${phrase.jp}" title="${t('play')}">
        ${ICONS.speaker}
      </button>
    </article>
  `).join('') : `<div class="empty-state">${t('noPhrases')}</div>`;
}

function renderProgress() {
  const best = progress.quizResults.length ? Math.max(...progress.quizResults.map((item) => item.score)) : 0;
  const history = progress.quizResults.length ? `
    <div class="list-stack">
      ${[...progress.quizResults].reverse().map((result) => `
        <article class="word-row">
          <div><strong>${escapeHtml(result.date)}</strong></div>
          <div class="word-meanings">${progress.language === 'si' ? 'ප්‍රතිඵලය' : 'Result'}: ${result.score} / 5</div>
        </article>
      `).join('')}
    </div>
  ` : `<div class="empty-state">${t('emptyHistory')}</div>`;
  
  return `
    ${titleBlock(t('progress'), t('offlineNote'))}
    <section class="progress-summary">
      <article class="progress-tile">
        <strong>${progress.completed.length}</strong>
        <span>${t('lessons')}</span>
      </article>
      <article class="progress-tile">
        <strong>${progress.quizResults.length}</strong>
        <span>${t('quizzes')}</span>
      </article>
      <article class="progress-tile">
        <strong>${best}/5</strong>
        <span>${t('bestScore')}</span>
      </article>
    </section>
    <div class="section-heading">
      <h2>${progress.language === 'si' ? 'ප්‍රශ්නාවලි ඉතිහාසය' : 'Quiz history'}</h2>
    </div>
    ${history}
    <div class="modal-actions" style="margin-top: 24px;">
      <button class="button-secondary" type="button" data-reset>${t('reset')}</button>
    </div>
  `;
}

function render() {
  renderNavigation();
  const renderers = { 
    home: renderHome, 
    learn: renderLearn, 
    practice: renderPractice, 
    dictionary: renderDictionary, 
    travel: renderTravel, 
    translate: renderTranslate, 
    progress: renderProgress 
  };
  content.innerHTML = (renderers[currentView] || renderHome)();
  if (currentView === 'dictionary') renderWordList();
  if (currentView === 'travel') renderPhraseList();
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function speak(text) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    showToast(t('noVoice'));
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  const japaneseVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('ja'));
  if (!japaneseVoice) {
    showToast(t('noVoice'));
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = japaneseVoice.lang;
  utterance.voice = japaneseVoice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  showToast(t('speaking'));
}

async function translateToJapanese() {
  const input = translationInput.trim();
  const language = translationLanguage;
  if (!input) {
    showToast(t('translateInput'));
    return;
  }
  translationBusy = true;
  translationFailed = false;
  render();
  try {
    const params = new URLSearchParams({ q: input, langpair: `${language}|ja` });
    const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`);
    if (!response.ok) throw new Error('Translation service returned an error.');
    const data = await response.json();
    const result = data.responseData?.translatedText?.trim();
    if (!result || data.responseStatus !== 200) throw new Error('No translation was returned.');
    translatedText = result;
  } catch {
    translatedText = '';
    translationFailed = true;
  } finally {
    translationBusy = false;
    render();
  }
}

function openSettings(isOnboarding = false) {
  selectedLanguage = progress.language;
  const root = document.querySelector('#modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" role="presentation">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">${isOnboarding ? 'JapanGo Japanese' : t('settingsTitle')}</h2>
        <p>${isOnboarding ? (progress.language === 'si' ? 'ඔබේ ඉගෙනුම් භාෂාව තෝරන්න.' : 'Choose the language for your learning space.') : t('settingsDesc')}</p>
        <strong>${t('language')}</strong>
        <div class="language-options">
          <button class="language-choice ${selectedLanguage === 'en' ? 'selected' : ''}" type="button" data-language="en">
            <strong>English</strong>
            <span>Interface language</span>
          </button>
          <button class="language-choice ${selectedLanguage === 'si' ? 'selected' : ''}" type="button" data-language="si">
            <strong>සිංහල</strong>
            <span>අතුරුමුහුණත් භාෂාව</span>
          </button>
        </div>
        <div class="modal-actions">
          ${isOnboarding ? '' : `<button class="button-secondary" type="button" data-close>${t('cancel')}</button>`}
          <button class="button-primary" type="button" data-save-language>
            ${isOnboarding ? (selectedLanguage === 'si' ? 'ඉදිරියට යන්න' : 'Get started') : t('save')}
          </button>
        </div>
      </section>
    </div>
  `;
}

// Global Event Delegation
document.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  
  if (target.dataset.view) {
    currentView = target.dataset.view;
    if (currentView !== 'practice') quiz = null;
    render();
    content.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  if (target.dataset.script) {
    alphabetScript = target.dataset.script;
    render();
  }
  
  if (target.dataset.kanaSet) {
    alphabetSet = target.dataset.kanaSet;
    render();
  }
  
  if (target.matches('#settings-button, #mobile-settings')) openSettings();
  if (target.matches('#theme-toggle, #sidebar-theme-toggle')) toggleTheme();
  
  if (target.dataset.language) {
    selectedLanguage = target.dataset.language;
    document.querySelectorAll('.language-choice').forEach((button) => button.classList.toggle('selected', button.dataset.language === selectedLanguage));
  }
  
  if (target.hasAttribute('data-save-language')) {
    progress.language = selectedLanguage;
    saveProgress();
    document.querySelector('#modal-root').innerHTML = '';
    render();
    showToast(t('saved'));
  }
  
  if (target.hasAttribute('data-close')) document.querySelector('#modal-root').innerHTML = '';
  
  if (target.hasAttribute('data-complete')) {
    const id = target.dataset.complete;
    if (!progress.completed.includes(id)) {
      progress.completed.push(id);
      recordActivity();
      render();
      showToast(t('completed'));
    }
  }
  
  if (target.hasAttribute('data-start-quiz')) startQuiz();
  
  if (target.hasAttribute('data-answer') && quiz && !quiz.answered) {
    const question = quiz.questions[quiz.index];
    question.answer = target.dataset.answer;
    quiz.answered = true;
    if (question.answer === question.target.romaji) quiz.score += 1;
    render();
  }
  
  if (target.hasAttribute('data-next') && quiz) {
    quiz.index += 1;
    quiz.answered = false;
    if (quiz.index >= 5) {
      progress.quizResults.push({ score: quiz.score, date: new Date().toISOString().slice(0, 10) });
      recordActivity();
    }
    render();
  }
  
  const speakTarget = target.closest('[data-speak]');
  if (speakTarget) speak(speakTarget.dataset.speak);
  
  if (target.hasAttribute('data-translate')) translateToJapanese();
  
  if (target.hasAttribute('data-reset')) {
    if (window.confirm(t('resetAsk'))) {
      const language = progress.language;
      progress = { language, completed: [], quizResults: [], activityDates: [], favorites: [] };
      saveProgress();
      render();
      showToast(t('resetDone'));
    }
  }
});

document.addEventListener('input', (event) => {
  if (event.target.matches('#word-search')) renderWordList();
  if (event.target.matches('#phrase-search')) renderPhraseList();
  if (event.target.matches('#source-text')) translationInput = event.target.value;
});

document.addEventListener('change', (event) => {
  if (event.target.matches('#word-filter')) renderWordList();
  if (event.target.matches('#phrase-filter')) renderPhraseList();
  if (event.target.matches('#source-language')) translationLanguage = event.target.value;
});

// Initialize Theme & App
applyTheme(currentTheme);
render();
if (!localStorage.getItem(STORAGE_KEY)) openSettings(true);