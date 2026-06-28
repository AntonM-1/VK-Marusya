import type { NotificationItem } from '../../context/NotificationContext'
import clsx from 'clsx'
import styles from './Notification.module.scss'

type Props = {
    notifications: NotificationItem[]
    onDismiss: (id: number) => void
}

const Notification = ({ notifications, onDismiss }: Props) => {
    if (!notifications.length) return null

    return (
        <div className={styles.list} role="alert" aria-live="assertive">
            {notifications.map(n => (
                <div
                    key={n.id}
                    className={clsx(styles.item, { [styles['item--dismissing']]: n.dismissing })}
                >
                    <span className={styles.icon} aria-hidden="true">!</span>
                    <p className={styles.message}>{n.message}</p>
                    <button
                        className={styles.close}
                        onClick={() => onDismiss(n.id)}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Notification
