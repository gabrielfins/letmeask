import { ReactNode } from 'react';
import styles from './styles.module.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({content, author, children, isAnswered = false, isHighlighted = false}: QuestionProps) {
    return (
        <div className={`${styles['question']} ${isAnswered ? 'answered' : ''} ${isHighlighted && !isAnswered ? 'highlighted' : ''}`}>
            <p>{ content }</p>
            <footer>
                <div className={styles['user-info']}>
                    <img src={ author.avatar } alt={ author.name } />
                    <span>{ author.name }</span>
                </div>
                <div className={styles['question-controls']}>{ children }</div>
            </footer>
        </div>
    );
}
