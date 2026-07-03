import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { type YoutubeControls, YoutubeFrame } from "react-youtube-light";
import Button from "../Button/Button";
import clsx from "clsx";
import styles from "./ModalTrailer.module.scss";
import IconPlay from "../../assets/icon-play.svg?react";
import IconPause from "../../assets/icon-pause.svg?react";

const CLOSE_DURATION = 220;

type Props = {
    isOpen: boolean;
    onClose: () => void;
    trailerYouTubeId: string;
    title?: string;
};

const ModalTrailer = ({ isOpen, onClose, trailerYouTubeId, title }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const playerRef = useRef<YoutubeControls>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocus = useRef<HTMLElement | null>(null);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, CLOSE_DURATION);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
            previousFocus.current = document.activeElement as HTMLElement;

            const timer = setTimeout(() => {
                const closeBtn = modalRef.current?.querySelector(
                    '[aria-label="Закрыть"]'
                ) as HTMLElement;
                if (closeBtn) closeBtn.focus();
                else modalRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        } else {
            if (previousFocus.current) {
                previousFocus.current.focus();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
                return;
            }

            if (e.key !== 'Tab') return;

            const focusableElements = modalRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement>;

            if (!focusableElements?.length) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]); 

    useEffect(() => {
        if (!isOpen) setIsPlaying(false);
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;

    return createPortal(
        <div
            ref={modalRef}
            className={clsx(styles['modal-trailer'], { [styles['modal-trailer--closing']]: isClosing })}
            onClick={isClosing ? undefined : handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={title ? `Трейлер фильма ${title}` : 'Трейлер'}
            tabIndex={-1} 
        >
            <div className={styles['modal-trailer__wrap']} onClick={e => e.stopPropagation()}>
                <Button
                    variant="modal"
                    className={styles['modal-trailer__close']}
                    onClick={handleClose}
                    aria-label="Закрыть"
                >
                    <></>
                </Button>
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
                    <div className={clsx(styles['modal-trailer__title'], { [styles['modal-trailer__title--hidden']]: isPlaying })}>
                        {title}
                    </div>
                )}
                <button
                    className={styles['modal-trailer__play-btn']}
                    onClick={() => isPlaying ? playerRef.current?.pause() : playerRef.current?.play()}
                    aria-label={isPlaying ? 'Приостановить' : 'Воспроизвести'}
                >
                    {isPlaying
                        ? <IconPause className={styles['modal-trailer__icon']} />
                        : <IconPlay className={styles['modal-trailer__icon']} />
                    }
                </button>
            </div>
        </div>,
        document.body
    );
};

export default ModalTrailer;