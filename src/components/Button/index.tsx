import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outlined?: boolean;
};

export function Button({ outlined = false, ...props }: ButtonProps) {
    return (
        <button className={`${styles['button']} ${outlined && 'outlined'}`} {...props} />
    );
}
