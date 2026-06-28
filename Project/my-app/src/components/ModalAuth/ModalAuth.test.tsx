import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ModalAuth from './ModalAuth'
import { NotificationProvider } from '../../context/NotificationContext'

vi.mock('../../assets/icon-mail.svg?react', () => ({ default: () => null }))
vi.mock('../../assets/icon-user.svg?react', () => ({ default: () => null }))
vi.mock('../../assets/icon-password.svg?react', () => ({ default: () => null }))
vi.mock('../../assets/icon-marusya-white.svg', () => ({ default: 'logo.svg' }))

vi.mock('../../hooks/useAuth')
import { useAuth } from '../../hooks/useAuth'

const mockLogin = vi.fn()
const mockRegister = vi.fn()

const defaultProps = { isOpen: true, onClose: vi.fn() }

const renderModal = (props = defaultProps) => render(
    <NotificationProvider>
        <ModalAuth {...props} />
    </NotificationProvider>
)

const submitForm = () => {
    const form = document.querySelector('form')!
    fireEvent.submit(form)
}

describe('ModalAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useAuth).mockReturnValue({
            user: null,
            login: mockLogin,
            register: mockRegister,
            logout: vi.fn(),
            toggleFavorite: vi.fn(),
        })
    })

    it('не рендерит ничего когда isOpen=false', () => {
        renderModal({ ...defaultProps, isOpen: false })
        expect(screen.queryByPlaceholderText('Электронная почта')).not.toBeInTheDocument()
    })

    it('рендерит форму входа по умолчанию', () => {
        renderModal()
        expect(screen.getByPlaceholderText('Электронная почта')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument()
        expect(screen.queryByPlaceholderText('Имя')).not.toBeInTheDocument()
    })

    it('нажатие Escape вызывает onClose после анимации закрытия', () => {
        vi.useFakeTimers()
        const onClose = vi.fn()
        renderModal({ ...defaultProps, onClose })
        fireEvent.keyDown(document, { key: 'Escape' })
        vi.runAllTimers()
        expect(onClose).toHaveBeenCalledOnce()
        vi.useRealTimers()
    })

    it('клик по бэкдропу вызывает onClose после анимации закрытия', () => {
        vi.useFakeTimers()
        const onClose = vi.fn()
        renderModal({ ...defaultProps, onClose })
        // Modal рендерится через Portal в document.body, ищем оверлей
        const backdrop = document.body.querySelector('[class]') as HTMLElement
        fireEvent.click(backdrop)
        vi.runAllTimers()
        expect(onClose).toHaveBeenCalledOnce()
        vi.useRealTimers()
    })

    it('пустой email блокирует отправку формы — login не вызывается', async () => {
        renderModal()
        fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'pass123' } })
        await act(async () => { submitForm() })
        expect(mockLogin).not.toHaveBeenCalled()
    })

    it('пустой пароль блокирует отправку формы — login не вызывается', async () => {
        renderModal()
        fireEvent.change(screen.getByPlaceholderText('Электронная почта'), { target: { value: 'test@test.com' } })
        await act(async () => { submitForm() })
        expect(mockLogin).not.toHaveBeenCalled()
    })

    it('пустой email подсвечивает обёртку классом error', async () => {
        renderModal()
        fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'pass123' } })
        await act(async () => { submitForm() })
        const emailInput = screen.getByPlaceholderText('Электронная почта')
        expect(emailInput.parentElement?.className).toContain('error')
    })

    it('ввод в поле после ошибки убирает error с этого поля', async () => {
        renderModal()
        await act(async () => { submitForm() })
        const emailInput = screen.getByPlaceholderText('Электронная почта')
        fireEvent.change(emailInput, { target: { value: 'a@a.com' } })
        expect(emailInput.parentElement?.className).not.toContain('error')
    })

    it('успешный вход вызывает onClose', async () => {
        const onClose = vi.fn()
        mockLogin.mockResolvedValue(undefined)
        renderModal({ ...defaultProps, onClose })

        fireEvent.change(screen.getByPlaceholderText('Электронная почта'), { target: { value: 'test@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'pass123' } })
        await act(async () => { submitForm() })

        expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'pass123')
        expect(onClose).toHaveBeenCalledOnce()
    })

    it('ошибка API показывает нотификацию с сообщением об ошибке', async () => {
        mockLogin.mockRejectedValue(new Error())
        renderModal()

        fireEvent.change(screen.getByPlaceholderText('Электронная почта'), { target: { value: 'bad@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'wrong' } })
        await act(async () => { submitForm() })

        await waitFor(() => {
            expect(screen.getByText('Неверный email или пароль')).toBeInTheDocument()
        })
    })

    it('переключение на вкладку Регистрация показывает поля Имя и Фамилия', () => {
        renderModal()
        fireEvent.click(screen.getByText('Регистрация'))
        expect(screen.getByPlaceholderText('Имя')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Фамилия')).toBeInTheDocument()
    })

    it('переключение вкладки сбрасывает ошибки', async () => {
        renderModal()
        await act(async () => { submitForm() })
        fireEvent.click(screen.getByText('Регистрация'))
        fireEvent.click(screen.getByText('У меня есть пароль'))
        const emailInput = screen.getByPlaceholderText('Электронная почта')
        expect(emailInput.parentElement?.className).not.toContain('error')
    })

    it('пустое поле Имя в форме регистрации блокирует отправку', async () => {
        renderModal()
        fireEvent.click(screen.getByText('Регистрация'))

        fireEvent.change(screen.getByPlaceholderText('Электронная почта'), { target: { value: 'test@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'pass123' } })
        fireEvent.change(screen.getByPlaceholderText('Фамилия'), { target: { value: 'Иванов' } })

        await act(async () => { submitForm() })
        expect(mockRegister).not.toHaveBeenCalled()
    })

    it('успешная регистрация показывает экран успеха', async () => {
        mockRegister.mockResolvedValue(undefined)
        renderModal()
        fireEvent.click(screen.getByText('Регистрация'))

        fireEvent.change(screen.getByPlaceholderText('Имя'), { target: { value: 'Иван' } })
        fireEvent.change(screen.getByPlaceholderText('Фамилия'), { target: { value: 'Иванов' } })
        fireEvent.change(screen.getByPlaceholderText('Электронная почта'), { target: { value: 'ivan@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'pass123' } })
        await act(async () => { submitForm() })

        expect(mockRegister).toHaveBeenCalledWith('Иван', 'Иванов', 'ivan@test.com', 'pass123')
        await waitFor(() => {
            expect(screen.getByText('Регистрация завершена')).toBeInTheDocument()
        })
    })
})
