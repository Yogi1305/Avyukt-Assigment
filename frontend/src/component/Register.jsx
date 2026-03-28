import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	Mail,
	Lock,
	Eye,
	EyeOff,
	CheckCircle2,
	AlertCircle,
	CheckSquare,
	ArrowRight,
	Loader2,
	User,
} from 'lucide-react'
import { BASE_URL } from '../main.jsx'

export default function Register() {
	const navigate = useNavigate()

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [agreedToTerms, setAgreedToTerms] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [mounted, setMounted] = useState(false)

	const endpoint = `${BASE_URL}/user/register`

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setErrorMessage('')
		setSuccessMessage('')

		if (!fullName.trim() || !email.trim() || !password.trim()) {
			setErrorMessage('All fields are required.')
			return
		}

		if (password !== confirmPassword) {
			setErrorMessage('Passwords do not match.')
			return
		}

		if (password.length < 6) {
			setErrorMessage('Password must be at least 6 characters.')
			return
		}

		if (!agreedToTerms) {
			setErrorMessage('Please agree to the Terms of Service to continue.')
			return
		}

		setIsSubmitting(true)
		try {
			const { data } = await axios.post(
				endpoint,
				{
					fullName: fullName.trim(),
					email: email.trim(),
					password,
				},
				{ withCredentials: true }
			)
			setSuccessMessage(data?.message || 'Account created! Redirecting…')
			setTimeout(() => navigate('/login'), 1500)
		} catch (err) {
			setErrorMessage(
				err?.response?.data?.message ||
					'Server unreachable. Check your API URL and try again.'
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	/* password strength */
	const getStrength = (pw) => {
		if (!pw) return { score: 0, label: '', color: '' }
		let score = 0
		if (pw.length >= 6) score++
		if (pw.length >= 10) score++
		if (/[A-Z]/.test(pw)) score++
		if (/[0-9]/.test(pw)) score++
		if (/[^A-Za-z0-9]/.test(pw)) score++
		if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' }
		if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' }
		return { score, label: 'Strong', color: 'bg-green-500' }
	}

	const strength = getStrength(password)

	return (
		<main className="min-h-screen bg-white flex">

			{/* ── Left decorative panel ── */}
			<div className="hidden lg:flex lg:w-5/12 bg-blue-600 flex-col justify-between p-12 relative overflow-hidden">

				{/* background circles */}
				<div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-500 opacity-40" />
				<div className="absolute bottom-10 -right-16 w-80 h-80 rounded-full bg-blue-700 opacity-40" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500 opacity-20" />

				{/* logo */}
				<div className="relative flex items-center gap-3">
					<div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
						<CheckSquare size={22} className="text-blue-600" />
					</div>
					<span className="text-white text-xl font-bold tracking-tight">
						TodoApp
					</span>
				</div>

				{/* center copy */}
				<div className="relative">
					<h2 className="text-4xl font-bold text-white leading-snug">
						Start organizing
						<br />
						your life today.
					</h2>
					<p className="mt-4 text-blue-100 text-sm leading-relaxed max-w-xs">
						Create your free account and take control of your tasks, goals, and
						daily routine in minutes.
					</p>

					{/* steps */}
					<div className="mt-10 space-y-4">
						{[
							{ step: '01', title: 'Create your account', desc: 'Sign up free in under a minute.' },
							{ step: '02', title: 'Add your tasks', desc: 'Capture everything on your mind.' },
							{ step: '03', title: 'Stay on track', desc: 'Check off tasks and build momentum.' },
						].map((item) => (
							<div key={item.step} className="flex items-start gap-4">
								<span className="text-xs font-bold text-blue-300 mt-0.5 w-6 shrink-0">
									{item.step}
								</span>
								<div>
									<p className="text-sm font-semibold text-white">{item.title}</p>
									<p className="text-xs text-blue-200 mt-0.5">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* bottom card */}
				<div className="relative bg-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm">
					<div className="flex items-center gap-2 mb-3">
						{/* avatar stack */}
						{['MK', 'JL', 'SR', 'AJ'].map((initials, i) => (
							<div
								key={initials}
								style={{ zIndex: i }}
								className="w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 text-[10px] font-bold -ml-2 first:ml-0"
							>
								{initials}
							</div>
						))}
						<span className="text-xs text-blue-100 ml-1">+10k users</span>
					</div>
					<p className="text-sm text-blue-50 font-medium">
						Join thousands already using TodoApp to get more done every day.
					</p>
				</div>
			</div>

			{/* ── Right form panel ── */}
			<div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
				<div
					className={`w-full max-w-md transition-all duration-500 ${
						mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
					}`}
				>

					{/* mobile logo */}
					<div className="flex lg:hidden items-center gap-2 mb-8">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<CheckSquare size={16} className="text-white" />
						</div>
						<span className="text-blue-600 font-bold text-lg">TodoApp</span>
					</div>

					{/* card */}
					<div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">

						{/* heading */}
						<div className="mb-8">
							<h1 className="text-2xl font-bold text-gray-900">
								Create your account
							</h1>
							<p className="mt-1.5 text-sm text-gray-500">
								Already have an account?{' '}
								<Link
									to="/login"
									className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
								>
									Sign in
								</Link>
							</p>
						</div>

						{/* social */}
						<div className="grid grid-cols-2 gap-3 mb-6">
							<button
								type="button"
								className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
							>
								<svg className="w-4 h-4" viewBox="0 0 24 24">
									<path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
									<path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
									<path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
									<path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
								</svg>
								Google
							</button>
							<button
								type="button"
								className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
							>
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
								GitHub
							</button>
						</div>

						{/* divider */}
						<div className="flex items-center gap-3 mb-6">
							<div className="flex-1 h-px bg-gray-100" />
							<span className="text-xs text-gray-400">or register with email</span>
							<div className="flex-1 h-px bg-gray-100" />
						</div>

						{/* form */}
						<form onSubmit={handleSubmit} noValidate className="space-y-5">

							{/* full name */}
							<div>
								<label
									htmlFor="fullName"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Full Name
								</label>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
										<User size={16} />
									</span>
									<input
										id="fullName"
										type="text"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
										placeholder="John Doe"
										autoComplete="name"
										required
										className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl outline-none placeholder-gray-400 transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300"
									/>
								</div>
							</div>

							{/* email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Email Address
								</label>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
										<Mail size={16} />
									</span>
									<input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="you@example.com"
										autoComplete="email"
										required
										className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl outline-none placeholder-gray-400 transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300"
									/>
								</div>
							</div>

							{/* password */}
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Password
								</label>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
										<Lock size={16} />
									</span>
									<input
										id="password"
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Min. 6 characters"
										autoComplete="new-password"
										required
										className="w-full pl-10 pr-11 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl outline-none placeholder-gray-400 transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300"
									/>
									<button
										type="button"
										onClick={() => setShowPassword((p) => !p)}
										className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 transition-colors"
									>
										{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>

								{/* strength bar */}
								{password && (
									<div className="mt-2.5 space-y-1.5">
										<div className="flex gap-1">
											{[1, 2, 3, 4, 5].map((i) => (
												<div
													key={i}
													className={`h-1 flex-1 rounded-full transition-all duration-300 ${
														i <= strength.score
															? strength.color
															: 'bg-gray-100'
													}`}
												/>
											))}
										</div>
										<p className="text-xs text-gray-500">
											Strength:{' '}
											<span
												className={`font-semibold ${
													strength.label === 'Strong'
														? 'text-green-600'
														: strength.label === 'Fair'
														? 'text-yellow-600'
														: 'text-red-500'
												}`}
											>
												{strength.label}
											</span>
										</p>
									</div>
								)}
							</div>

							{/* confirm password */}
							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Confirm Password
								</label>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
										<Lock size={16} />
									</span>
									<input
										id="confirmPassword"
										type={showConfirmPassword ? 'text' : 'password'}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										placeholder="Re-enter your password"
										autoComplete="new-password"
										required
										className={`w-full pl-10 pr-11 py-2.5 text-sm text-gray-900 bg-white border rounded-xl outline-none placeholder-gray-400 transition-all hover:border-gray-300 focus:ring-4 ${
											confirmPassword && confirmPassword !== password
												? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
												: confirmPassword && confirmPassword === password
												? 'border-green-300 focus:border-green-400 focus:ring-green-500/10'
												: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/10'
										}`}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword((p) => !p)}
										className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 transition-colors"
									>
										{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>

								{/* match hint */}
								{confirmPassword && (
									<p
										className={`mt-1.5 text-xs font-medium ${
											confirmPassword === password
												? 'text-green-600'
												: 'text-red-500'
										}`}
									>
										{confirmPassword === password
											? '✓ Passwords match'
											: '✗ Passwords do not match'}
									</p>
								)}
							</div>

							{/* terms */}
							<div className="flex items-start gap-2.5">
								<input
									id="terms"
									type="checkbox"
									checked={agreedToTerms}
									onChange={(e) => setAgreedToTerms(e.target.checked)}
									className="h-4 w-4 mt-0.5 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer shrink-0"
								/>
								<label
									htmlFor="terms"
									className="text-sm text-gray-600 cursor-pointer select-none leading-relaxed"
								>
									I agree to the{' '}
									<a
										href="#"
										className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
									>
										Terms of Service
									</a>{' '}
									and{' '}
									<a
										href="#"
										className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
									>
										Privacy Policy
									</a>
								</label>
							</div>

							{/* error */}
							{errorMessage && (
								<div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
									<AlertCircle size={16} className="mt-0.5 shrink-0" />
									<span>{errorMessage}</span>
								</div>
							)}

							{/* success */}
							{successMessage && (
								<div className="flex items-start gap-2.5 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl">
									<CheckCircle2 size={16} className="mt-0.5 shrink-0" />
									<span>{successMessage}</span>
								</div>
							)}

							{/* submit */}
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white text-sm font-semibold py-3 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md active:scale-[0.98]"
							>
								{isSubmitting ? (
									<>
										<Loader2 size={16} className="animate-spin" />
										Creating account…
									</>
								) : (
									<>
										Create Account
										<ArrowRight size={16} />
									</>
								)}
							</button>
						</form>
					</div>

					{/* api pill */}
					<div className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-sm">
						<span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
						<p className="text-xs text-gray-400 truncate">
							<span className="font-medium text-gray-500">API: </span>
							{endpoint}
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}