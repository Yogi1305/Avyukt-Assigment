import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2 } from 'lucide-react'
import { BASE_URL } from '../main.jsx'

export default function Register() {
	const navigate = useNavigate()

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const endpoint = `${BASE_URL}/user/register`

	const handleSubmit = async (e) => {
		e.preventDefault()
		setErrorMessage('')

		if (!fullName.trim() || !email.trim() || !password.trim()) {
			setErrorMessage('All fields are required.')
			return
		}

		if (password.length < 6) {
			setErrorMessage('Password must be at least 6 characters.')
			return
		}

		setIsSubmitting(true)
		try {
			await axios.post(
				endpoint,
				{
					fullName: fullName.trim(),
					email: email.trim(),
					password,
				},
				{ withCredentials: true }
			)
			navigate('/login')
		} catch (err) {
			setErrorMessage(
				err?.response?.data?.message || 'Registration failed. Try again.'
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="w-full max-w-sm">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
					<h1 className="text-2xl font-bold text-gray-900 mb-1">Register</h1>
					<p className="text-sm text-gray-500 mb-6">
						Already have an account?{' '}
						<Link to="/login" className="text-blue-600 font-medium hover:text-blue-500">
							Sign in
						</Link>
					</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* full name */}
						<div>
							<label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
								Full Name
							</label>
							<div className="relative">
								<User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									id="fullName"
									type="text"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									placeholder="John Doe"
									className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
								/>
							</div>
						</div>

						{/* email */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<div className="relative">
								<Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@example.com"
									className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
								/>
							</div>
						</div>

						{/* password */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<div className="relative">
								<Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Min. 6 characters"
									className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((p) => !p)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							</div>
						</div>

						{/* error */}
						{errorMessage && (
							<p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
								{errorMessage}
							</p>
						)}

						{/* submit */}
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
						>
							{isSubmitting ? (
								<>
									<Loader2 size={16} className="animate-spin" />
									Creating account…
								</>
							) : (
								<>
									Register
									<ArrowRight size={16} />
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}