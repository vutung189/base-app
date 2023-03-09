import classNames from 'classnames';
import i18next from 'i18next';
import { useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import viFlag from "assets/images/language/vi.webp";
import esFlag from "assets/images/language/es.jpg";

// get the languages
const Languages = [
  {
    name: 'English',
    flag: esFlag,
    key: "es",
  },
  {
    name: 'Vietnamese',
    flag: viFlag,
    key: "vi",
  },

];

const LanguageDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /*
   * toggle language-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language)
  }

  const languageChoose = useMemo(() => {    
    return Languages.find(item => item.key === (i18next.languages?.[0])) || Languages[0];
  }, [i18next.languages])

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-languages"
        as="a"
        onClick={toggleDropdown}
        className={classNames('nav-link waves-effect waves-light', {
          show: dropdownOpen,
        })}
      >
        <img src={languageChoose.flag} alt={languageChoose.name} height="16" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
        <div onClick={toggleDropdown}>
          {(Languages || []).map((lang, i) => {
            return (
              <div className="dropdown-item notify-item" key={i + '-lang'} onClick={() => changeLanguage(lang.key)}>
                <img src={lang.flag} alt={lang.name} className="me-1" height="12" />{' '}
                <span className="align-middle">{lang.name}</span>
              </div>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
