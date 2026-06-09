import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const change = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };
  return (
    <label className="sr-only">
      Language
      <select className="input ml-2 w-28" value={i18n.language} onChange={(e) => change(e.target.value)} aria-label="Select language">
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="gu">ગુજરાતી</option>
      </select>
    </label>
  );
}
