const fs = require('fs');
const path = require('path');

const locales = ['en', 'id', 'jp', 'ar'];
const localesDir = path.join(__dirname, '../locales');
const contentDir = path.join(__dirname, '../content');

// 1. Create locales directories and translation.json
if (!fs.existsSync(localesDir)) fs.mkdirSync(localesDir);

const defaultTranslations = {
  en: {
    "About": "About",
    "Experience": "Experience",
    "Work": "Work",
    "Contact": "Contact",
    "Resume": "Resume",
    "Featured Project": "Featured Project",
    "Learn More": "Learn More",
    "Some Things I’ve Built": "Some Things I’ve Built",
    "Where I’ve Worked": "Where I’ve Worked",
    "Get In Touch": "Get In Touch",
    "Say Hello": "Say Hello",
    "Language": "Language"
  },
  id: {
    "About": "Tentang",
    "Experience": "Pengalaman",
    "Work": "Karya",
    "Contact": "Kontak",
    "Resume": "Lanjutkan",
    "Featured Project": "Proyek Unggulan",
    "Learn More": "Pelajari Lebih Lanjut",
    "Some Things I’ve Built": "Beberapa Karya Saya",
    "Where I’ve Worked": "Pengalaman Kerja",
    "Get In Touch": "Hubungi Saya",
    "Say Hello": "Sapa Saya",
    "Language": "Bahasa"
  },
  jp: {
    "About": "概要",
    "Experience": "経験",
    "Work": "作品",
    "Contact": "連絡先",
    "Resume": "履歴書",
    "Featured Project": "注目のプロジェクト",
    "Learn More": "詳細を見る",
    "Some Things I’ve Built": "これまでに作ったもの",
    "Where I’ve Worked": "職歴",
    "Get In Touch": "連絡を取り合う",
    "Say Hello": "こんにちはと言う",
    "Language": "言語"
  },
  ar: {
    "About": "حول",
    "Experience": "خبرة",
    "Work": "أعمال",
    "Contact": "اتصال",
    "Resume": "سيرة ذاتية",
    "Featured Project": "مشروع مميز",
    "Learn More": "اعرف المزيد",
    "Some Things I’ve Built": "بعض الأشياء التي قمت ببنائها",
    "Where I’ve Worked": "أين عملت",
    "Get In Touch": "ابق على تواصل",
    "Say Hello": "قل مرحبا",
    "Language": "لغة"
  }
};

locales.forEach(lang => {
  const dir = path.join(localesDir, lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'translation.json'), JSON.stringify(defaultTranslations[lang], null, 2));
});

console.log('Locales initialized.');

// 2. Duplicate markdown files
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.md')) {
      // Check if it's already localized (e.g., .en.md)
      const isLocalized = locales.some(lang => file.endsWith(`.${lang}.md`));
      if (!isLocalized) {
        const basename = file.substring(0, file.length - 3); // Remove .md
        
        // Rename original to .en.md
        const enPath = path.join(dir, `${basename}.en.md`);
        fs.renameSync(fullPath, enPath);
        console.log(`Renamed: ${file} -> ${basename}.en.md`);

        const content = fs.readFileSync(enPath, 'utf8');

        // Copy for other locales
        locales.filter(l => l !== 'en').forEach(lang => {
          const langPath = path.join(dir, `${basename}.${lang}.md`);
          fs.writeFileSync(langPath, content);
          console.log(`Created: ${basename}.${lang}.md`);
        });
      }
    }
  });
}

processDirectory(contentDir);
console.log('Markdown files duplicated for i18n.');
