import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { BASE_URL } from '../main.jsx'

function Login() {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [mounted, setMounted] = useState(false)

	const endpoint = `${BASE_URL}/user/login`

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setErrorMessage('')
		setSuccessMessage('')

		if (!email.trim() || !password.trim()) {
			setErrorMessage('Email and password are required.')
			return
		}

		setIsSubmitting(true)

		try {
			const { data } = await axios.post(
				endpoint,
				{
					email: email.trim(),
					password,
					rememberMe
				},
				{
					withCredentials: true
				}
			)

			setSuccessMessage(data?.message || 'Login successful! Redirecting...')
			setPassword('')

			setTimeout(() => {
				navigate('/todo')
			}, 1500)
		} catch (error) {
			setErrorMessage(
				error?.response?.data?.message ||
					'Server is unreachable. Check API URL and try again.'
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-10">
			{/* Animated background blobs */}
			<div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-emerald-500/10 blur-[120px]" />
			<div className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-teal-500/10 blur-[120px]" />
			<div className="absolute left-[40%] top-[20%] h-[300px] w-[300px] animate-pulse rounded-full bg-cyan-500/5 blur-[100px]" />

			{/* Grid pattern overlay */}
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
					backgroundSize: '60px 60px'
				}}
			/>

			{/* Main card */}
			<div
				className={`relative w-full max-w-md transition-all duration-700 ${
					mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
				}`}
			>
				<div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl md:p-10">
					{/* Header */}
					<div className="text-center">
						<div className="group mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 transition-transform duration-300 hover:scale-105">
							<Sparkles
								size={28}
								className="text-white transition-transform duration-300 group-hover:rotate-12"
							/>
						</div>

						<h1 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent">
							Welcome Back
						</h1>
						<p className="mt-2 text-sm text-gray-500">
							Sign in to continue managing your tasks and stay productive.
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
						{/* Email */}
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-400"
							>
								Email Address
							</label>
							<div className="group relative">
								<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600 transition-colors group-focus-within:text-emerald-500">
									<Mail size={18} />
								</span>
								<input
									id="email"
									type="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									placeholder="you@example.com"
									autoComplete="email"
									className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-500/10"
									required
								/>
							</div>
						</div>

						{/* Password */}
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-400"
								>
									Password
								</label>
								<Link
									to="/forgot-password"
									className="text-xs font-medium text-emerald-500 transition-colors hover:text-emerald-400"
								>
									Forgot password?
								</Link>
							</div>

							<div className="group relative">
								<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600 transition-colors group-focus-within:text-emerald-500">
									<Lock size={18} />
								</span>
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter your password"
									autoComplete="current-password"
									className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 pl-11 pr-12 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-500/10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 transition-colors hover:text-gray-400"
								>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						{/* Remember me */}
						<div className="flex items-center gap-2">
							<input
								id="remember"
								type="checkbox"
								checked={rememberMe}
								onChange={(event) => setRememberMe(event.target.checked)}
								className="h-4 w-4 rounded border-gray-700 bg-transparent text-emerald-600 focus:ring-emerald-500/20 focus:ring-offset-0"
							/>
							<label
								htmlFor="remember"
								className="text-sm text-gray-500"
							>
								Remember me for 30 days
							</label>
						</div>

						{/* Submit button */}
						<button
							type="submit"
							disabled={isSubmitting}
							className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:shadow-xl hover:shadow-emerald-600/30 disabled:cursor-wait disabled:opacity-70"
						>
							<span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100" />
							{isSubmitting ? (
								<span className="relative flex items-center gap-2">
									<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
									Signing in...
								</span>
							) : (
								<span className="relative flex items-center gap-2">
									<LogIn size={18} />
									Sign In
								</span>
							)}
						</button>

						{/* Error message */}
						{errorMessage && (
							<div
								className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-in fade-in slide-in-from-top-2"
							>
								<AlertCircle size={18} className="mt-0.5 shrink-0" />
								<span>{errorMessage}</span>
							</div>
						)}

						{/* Success message */}
						{successMessage && (
							<div
								className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400 animate-in fade-in slide-in-from-top-2"
							>
								<CheckCircle2 size={18} className="mt-0.5 shrink-0" />
								<span>{successMessage}</span>
							</div>
						)}
					</form>

					{/* Divider */}
					<div className="mt-8 flex items-center gap-4">
						<div className="h-px flex-1 bg-white/[0.06]" />
						<span className="text-xs text-gray-600">OR</span>
						<div className="h-px flex-1 bg-white/[0.06]" />
					</div>

					{/* Social login buttons */}
					<div className="mt-6 grid grid-cols-2 gap-3">
						<button
							type="button"
							className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/[0.06] hover:text-white"
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Google
						</button>
						<button
							type="button"
							className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/[0.06] hover:text-white"
						>
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
							GitHub
						</button>
					</div>

					{/* Register link */}
					<p className="mt-8 text-center text-sm text-gray-500">
						Don&apos;t have an account?{' '}
						<Link
							to="/register"
							className="font-semibold text-emerald-500 transition-colors hover:text-emerald-400"
						>
							Create one
						</Link>
					</p>

					{/* API endpoint */}
					<div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
						<p className="break-all text-xs text-gray-600">
							<span className="font-medium text-gray-500">API:</span>{' '}
							{endpoint}
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Login