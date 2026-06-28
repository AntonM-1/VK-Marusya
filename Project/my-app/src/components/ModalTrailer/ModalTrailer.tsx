import { createPortal } from "react-dom"
import { useEffect, useRef, useState } from "react"
import { type YoutubeControls, YoutubeFrame } from "react-youtube-light"
import Button from "../Button/Button"
import clsx from "clsx"
import styles from "./ModalTrailer.module.scss"
import IconPlay from "../../assets/icon-play.svg?react"
import IconPause from "../../assets/icon-pause.svg?react"

const CLOSE_DURATION = 220

type Props = {
    isOpen: boolean
    onClose: () => void
    trailerYouTubeId: string
    title?: string
}

const ModalTrailer = ({ isOpen, onClose, trailerYouTubeId, title }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const playerRef = useRef<YoutubeControls>(null)

    useEffect(() => {
        if (isOpen) setIsClosing(false)
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        }
        if (isOpen) document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) setIsPlaying(false)
    }, [isOpen])

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsClosing(false)
            onClose()
        }, CLOSE_DURATION)
    }

    if (!isOpen && !isClosing) return null

    return createPortal(
        <div
            className={clsx(styles['modal-trailer'], { [styles['modal-trailer--closing']]: isClosing })}
            onClick={isClosing ? undefined : handleClose}
        >
            <div className={styles['modal-trailer__wrap']} onClick={e => e.stopPropagation()}>
                <Button variant="modal" className={styles['modal-trailer__close']} onClick={handleClose}><></></Button>
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
                    {isPlaying
                        ? <IconPause className={styles['modal-trailer__icon']} />
                        : <IconPlay className={styles['modal-trailer__icon']} />
                    }
                </button>
            </div>
        </div>,
        document.body
    )
}

export default ModalTrailer
