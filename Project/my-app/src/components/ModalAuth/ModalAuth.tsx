import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/NotificationContext";
import { createPortal } from "react-dom";
import styles from "./ModalAuth.module.scss";
import Logo from "../../assets/icon-marusya-white.svg";
import IconMail from "../../assets/icon-mail.svg?react";
import IconUser from "../../assets/icon-user.svg?react";
import IconPassword from "../../assets/icon-password.svg?react";
import clsx from "clsx";
import Button from "../Button/Button";

const CLOSE_DURATION = 220;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAuth = ({ isOpen, onClose }: Props) => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { login, register } = useAuth();
  const { showError } = useNotification();

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
          '[aria-label="Закрыть окно"]'
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
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key !== "Tab") return;

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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]); 

  const handleTabChange = (newTab: "login" | "register") => {
    setTab(newTab);
    setFieldErrors({});
  };

  const clearFieldError = (field: string) =>
    setFieldErrors((prev) => ({ ...prev, [field]: false }));

  const validateFields = (): boolean => {
    const errors: Record<string, boolean> = {};
    if (tab === "register") {
      if (!name.trim()) errors.name = true;
      if (!surname.trim()) errors.surname = true;
    }
    if (!email.trim()) errors.email = true;
    if (!password.trim()) errors.password = true;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;
    try {
      if (tab === "login") {
        await login(email, password);
        handleClose(); 
      } else {
        await register(name, surname, email, password);
        setIsRegistered(true);
      }
    } catch {
      showError(tab === "login" ? "Неверный email или пароль" : "Ошибка при регистрации");
    }
  };

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      ref={modalRef}
      className={clsx(styles["modal-auth"], { [styles["modal-auth--closing"]]: isClosing })}
      onClick={isClosing ? undefined : handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={tab === "login" ? "Вход в аккаунт" : "Регистрация"}
      tabIndex={-1}
    >
      <div className={styles["modal-auth__card"]} onClick={(e) => e.stopPropagation()}>
        <Button
          variant="modal"
          className={styles["modal-auth__close"]}
          onClick={handleClose}
          aria-label="Закрыть окно"
        >
          <></>
        </Button>

        <img src={Logo} alt="" width="132" height="30" className={styles["modal-auth__logo"]} />

        {isRegistered ? (
          <div className={styles["modal-auth__success"]}>
            <p className={styles["modal-auth__success-title"]}>Регистрация завершена</p>
            <p className={styles["modal-auth__success-subtitle"]}>
              Используйте вашу электронную почту для входа
            </p>
            <button
              type="button"
              className={styles["modal-auth__btn"]}
              onClick={() => {
                setIsRegistered(false);
                setTab("login");
              }}
            >
              Войти
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className={styles["modal-auth__form"]}>
              {tab === "register" && (
                <p className={styles["modal-auth__title"]}>Регистрация</p>
              )}
              <div className={styles["modal-auth__fields"]}>
                {tab === "register" && (
                  <>
                    <div
                      className={clsx(styles["modal-auth__input"], {
                        [styles["modal-auth__input--error"]]: fieldErrors.name,
                      })}
                    >
                      <IconUser className={styles["modal-auth__icon"]} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          clearFieldError("name");
                        }}
                        placeholder="Имя"
                        className={styles["modal-auth__field"]}
                      />
                    </div>
                    <div
                      className={clsx(styles["modal-auth__input"], {
                        [styles["modal-auth__input--error"]]: fieldErrors.surname,
                      })}
                    >
                      <IconUser className={styles["modal-auth__icon"]} />
                      <input
                        type="text"
                        value={surname}
                        onChange={(e) => {
                          setSurname(e.target.value);
                          clearFieldError("surname");
                        }}
                        placeholder="Фамилия"
                        className={styles["modal-auth__field"]}
                      />
                    </div>
                  </>
                )}
                <div
                  className={clsx(styles["modal-auth__input"], {
                    [styles["modal-auth__input--error"]]: fieldErrors.email,
                  })}
                >
                  <IconMail className={styles["modal-auth__icon"]} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError("email");
                    }}
                    placeholder="Электронная почта"
                    className={styles["modal-auth__field"]}
                  />
                </div>
                <div
                  className={clsx(styles["modal-auth__input"], {
                    [styles["modal-auth__input--error"]]: fieldErrors.password,
                  })}
                >
                  <IconPassword className={styles["modal-auth__icon"]} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearFieldError("password");
                    }}
                    placeholder="Пароль"
                    className={styles["modal-auth__field"]}
                  />
                </div>
              </div>

              <button type="submit" className={styles["modal-auth__btn"]}>
                {tab === "login" ? "Войти" : "Создать аккаунт"}
              </button>
            </form>

            <div className={styles["modal-auth__tabs"]}>
              {tab === "login" ? (
                <button
                  onClick={() => handleTabChange("register")}
                  className={styles["modal-auth__tab"]}
                >
                  Регистрация
                </button>
              ) : (
                <button
                  onClick={() => handleTabChange("login")}
                  className={styles["modal-auth__tab"]}
                >
                  У меня есть пароль
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalAuth;