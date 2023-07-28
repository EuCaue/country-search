import React from 'react';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import styles from './style.module.css';

const Header: React.FC = () => {
  const [isLightMode, setIsLightMode] = React.useState<boolean>(
    JSON.parse(window.localStorage.getItem('theme') ?? 'false')
  );

  const updateBodyClass = (lightMode: boolean): void => {
    document.body.classList.toggle('light', lightMode);
  };

  const toggleTheme = (): void => {
    setIsLightMode((prevMode) => {
      const newMode = !prevMode;
      updateBodyClass(newMode);
      window.localStorage.setItem('theme', JSON.stringify(newMode));
      return newMode;
    });
  };

  React.useEffect(() => {
    updateBodyClass(isLightMode);
  }, [isLightMode]);

  return (
    <header className={styles.header}>
      <span className={styles.text}>Where in the world?</span>

      <button
        className={styles.button}
        type="button"
        aria-label="Switch Between Dark and Light Mode"
        title="Toggle Light and Dark Mode"
        onClick={toggleTheme}
      >
        {isLightMode ? (
          <>
            <IconSunFilled size={20} />
            Light Mode
          </>
        ) : (
          <>
            <IconMoonFilled size={22} />
            Dark Mode
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
