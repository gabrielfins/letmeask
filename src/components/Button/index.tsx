import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    underlined?: boolean;
    outlined?: boolean;
};

export function Button({ outlined = false, underlined = false, ...props }: ButtonProps) {
    return (
        <button className={`${styles['button']} ${outlined && 'outlined'} ${underlined && 'underlined'}`}  {...props} />
    );
}
