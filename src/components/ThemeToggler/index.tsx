import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './styles.module.scss';

export function ThemeToggler() {
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('@letmeask-app/darkTheme') === 'true') {
            setDarkTheme(true);
            document.body.classList.add('dark');
        } else {
            setDarkTheme(false);
            document.body.classList.remove('dark');
        }
    }, []);

    function handleSetDarkThemeClick() {
        setDarkTheme(!darkTheme);
        localStorage.setItem('@letmeask-app/darkTheme', `${!darkTheme}`);
        if (!darkTheme) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }

    return (
        <button className={styles['theme-toggler']} aria-label="Mudar tema do site" onClick={handleSetDarkThemeClick}>
            {!darkTheme ? <FiSun className={styles['theme-toggler-icon']} /> : <FiMoon className={styles['theme-toggler-icon']} /> }
        </button>
    );
}