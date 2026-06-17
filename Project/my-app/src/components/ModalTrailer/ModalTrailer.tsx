import { createPortal } from "react-dom"
import { useEffect, useRef, useState } from "react"
import { type YoutubeControls, YoutubeFrame } from "react-youtube-light"
import Button from "../Button/Button"
import clsx from "clsx"
import styles from "./ModalTrailer.module.scss"
import IconPlay from "../../assets/icon-play.svg"
import IconPause from "../../assets/icon-pause.svg"

type Props = {
    isOpen: boolean
    onClose: () => void
    trailerYouTubeId: string
    title?: string
}

const ModalTrailer = ({ isOpen, onClose, trailerYouTubeId, title }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const playerRef = useRef<YoutubeControls>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen) setIsPlaying(false)
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div className={styles['modal-trailer']} onClick={onClose}>
            <div className={styles['modal-trailer__wrap']} onClick={e => e.stopPropagation()}>
                <Button variant="modal" className={styles['modal-trailer__close']} onClick={onClose}><></></Button>
                <YoutubeFrame
                    ref={playerRef}
                    hideControls={true}
                    src={`https://www.youtube.com/watch?v=${trailerYouTubeId}`}
                    containerClassNames={styles['modal-trailer__video']}
                    options={{ autoplay: true, playsinline: true, rel: false, modestbranding: true }}
                    onVideoPlay={() => setIsPlaying(true)}
                    onVideoPause={() => setIsPlaying(false)}
                />
                <div
                    className={styles['modal-trailer__overlay']}
                    onClick={() => isPlaying ? playerRef.current?.pause() : playerRef.current?.play()}
                />
                {title && (
                    <div className={clsx(styles['modal-trailer__title'], { [styles['modal-trailer__title--hidden']]: isPlaying })}>{title}</div>
                )}
                <button
                    className={styles['modal-trailer__play-btn']}
                    onClick={() => isPlaying ? playerRef.current?.pause() : playerRef.current?.play()}
                >
                    <img src={isPlaying ? IconPause : IconPlay} className={styles['modal-trailer__icon']} />
                </button>
            </div>
        </div>,
        document.body
    )
}

export default ModalTrailer
