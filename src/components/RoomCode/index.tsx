import copyImg from '../../assets/images/copy.svg';
import styles from './room-code.module.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button className={styles['room-code']} onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={ copyImg } alt="Copiar room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    );
}