import { useState } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import emptyQuestionsImg from '../../assets/images/empty-questions.svg';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { ThemeToggler } from '../../components/ThemeToggler';
import styles from '../../styles/room.module.scss';
import { database } from '../../services/firebase';
import ReactModal from 'react-modal';

type RoomParams = {
    id: string;
}

export default function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);
    const [isModalOpen, setModalOpen] = useState(false);
    ReactModal.setAppElement('#root');

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom() {
        if (window.confirm('Tem certeza que deseja encerrar a sala??')) {
            await database.ref(`rooms/${roomId}`).update({
                endendAt: new Date()
            });
            history.push('/');
        }
    }

    return (
        <div id={styles['page-room']}>
            <header>
                <div className={styles['content']}>
                    <NavLink exact to="/"><img src={ logoImg } alt="Letmeask" /></NavLink>
                    <div>
                        <RoomCode code={ roomId } />
                        <Button outlined onClick={handleEndRoom}>Encerrar Sala</Button>
                        <ThemeToggler />
                    </div>
                </div>
            </header>
            <main>
                <div className={styles['room-title']}>
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && 's'}</span> }
                </div>
                { questions.length === 0 ? (
                    <div className={styles['no-questions']}>
                        <img src={emptyQuestionsImg} alt="Sem perguntas" />
                        <h3>Nenhuma pergunta por aqui...</h3>
                        <span>Envie o código desta sala para seus amigos e comece a responder perguntas!</span>
                    </div> 
                ) : (
                    <div className={styles['question-list']}>
                        {questions.map(question => {
                            return (
                                <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted}>
                                    {!question.isAnswered && (
                                        <>
                                            <span>
                                                {question.likeCount > 0 ? (
                                                    <>
                                                        {question.likeCount}
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </>
                                                    ) : ('')}
                                            </span>
                                            <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                                <img src={ checkImg } alt="Marcar pergunta como respondida" />
                                            </button>
                                            <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                                                <img src={ answerImg } alt="Dar destaque à pergunta pergunta" />
                                            </button>
                                        </>
                                    )}
                                    <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                        <img src={ deleteImg } alt="Remover pergunta" />
                                    </button>
                                </Question>
                            );
                        })}
                    </div>
                )}
            </main>
            <ReactModal isOpen={isModalOpen}>
                
            </ReactModal>
        </div>
    );
}