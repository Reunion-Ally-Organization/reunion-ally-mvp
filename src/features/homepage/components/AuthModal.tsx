import { useEffect, useRef, useState } from 'react'

export type AuthView = 'login' | 'signup'

interface AuthModalProps {
  initialView: AuthView
  onClose: () => void
}

export function AuthModal({ initialView, onClose }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const backdropRef = useRef<HTMLDivElement>(null)
  const firstRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [view])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function switchTo(next: AuthView) {
    setView(next)
    setErrors({})
    setName('')
    setEmail('')
    setPassword('')
    setAgreed(false)
  }

  function validate() {
    const e: Record<string, string> = {}
    if (view === 'signup' && !name.trim()) e.name = 'Full name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (view === 'signup' && password.length < 8) e.password = 'At least 8 characters'
    if (view === 'signup' && !agreed) e.agreed = 'You must agree to the terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    alert(view === 'login' ? 'Logged in!' : 'Account created!')
    onClose()
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose()
  }

  return (
    <div className="auth-backdrop" ref={backdropRef} onClick={handleBackdrop} role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="auth-modal">
        <button className="auth-modal__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="auth-modal__body">
          <h2 id="auth-title" className="auth-modal__title">
            {view === 'login' ? 'Welcome Back!' : 'Welcome!'}
          </h2>

          <p className="auth-modal__switch">
            {view === 'login' ? (
              <>Don't have an account?{' '}
                <button className="auth-modal__switch-btn" onClick={() => switchTo('signup')}>Sign Up</button>
              </>
            ) : (
              <>Have an account?{' '}
                <button className="auth-modal__switch-btn" onClick={() => switchTo('login')}>Log In</button>
              </>
            )}
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {view === 'signup' && (
              <div className="auth-form__field">
                <label htmlFor="auth-name">Full Name</label>
                <input
                  ref={firstRef}
                  id="auth-name"
                  type="text"
                  value={name}
                  autoComplete="name"
                  onChange={e => setName(e.target.value)}
                  className={errors.name ? 'input--error' : ''}
                />
                {errors.name && <span className="auth-form__error">{errors.name}</span>}
              </div>
            )}

            <div className="auth-form__field">
              <label htmlFor="auth-email">Email</label>
              <input
                ref={view === 'login' ? firstRef : undefined}
                id="auth-email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
                className={errors.email ? 'input--error' : ''}
              />
              {errors.email && <span className="auth-form__error">{errors.email}</span>}
            </div>

            <div className="auth-form__field">
              <label htmlFor="auth-password">{view === 'signup' ? 'Create Password' : 'Password'}</label>
              <input
                id="auth-password"
                type="password"
                value={password}
                autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                onChange={e => setPassword(e.target.value)}
                className={errors.password ? 'input--error' : ''}
              />
              {errors.password && <span className="auth-form__error">{errors.password}</span>}
            </div>

            {view === 'signup' && (
              <div className="auth-form__agree">
                <label className={`auth-form__agree-label${errors.agreed ? ' agree--error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                  />
                  <span>I agree to the <a href="/" className="auth-form__terms-link">terms</a></span>
                </label>
                {errors.agreed && <span className="auth-form__error">{errors.agreed}</span>}
              </div>
            )}

            <button type="submit" className="auth-form__submit">
              {view === 'login' ? 'Log In' : 'Sign Up'}
            </button>

            <a href="/" className="auth-form__forgot">Forgot password</a>

            <div className="auth-form__divider">
              <span />
              <p>Or</p>
              <span />
            </div>

            <div className="auth-form__socials">
              <button type="button" className="auth-social-btn" aria-label="Continue with Google">
                <GoogleIcon />
              </button>
              <button type="button" className="auth-social-btn" aria-label="Continue with Apple">
                <AppleIcon />
              </button>
              <button type="button" className="auth-social-btn auth-social-btn--facebook" aria-label="Continue with Facebook">
                <FacebookIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.33.07 2.24.73 3.01.73.8 0 2.28-.9 3.84-.77 1.54.12 2.69.78 3.42 1.97-3.13 1.87-2.62 5.97.51 7.14-.6 1.33-1.38 2.64-2.78 3.81zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}
