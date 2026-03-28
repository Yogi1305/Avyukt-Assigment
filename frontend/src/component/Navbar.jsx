import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
	CheckSquare,
	LogIn,
	LogOut,
	User,
	Loader2,
	Menu,
	X,
} from 'lucide-react'
import { BASE_URL } from '../main.jsx'

export default function Navbar() {
	const navigate = useNavigate()
	const location = useLocation()

	const [user, setUser] = useState(null)
	const [authLoading, setAuthLoading] = useState(true)
	const [logoutLoading, setLogoutLoading] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)

	/* ── check auth on every route change ── */
	useEffect(() => {
		const checkAuth = async () => {
			setAuthLoading(true)
			try {
				const { data } = await axios.get(`${BASE_URL}/user/checkauth`, {
					withCredentials: true,
				})
				setUser(data?.user || data || null)
			} catch {
				setUser(null)
			} finally {
				setAuthLoading(false)
			}
		}
		checkAuth()
	}, [location.pathname])

	/* close mobile menu on route change */
	useEffect(() => {
		setMobileOpen(false)
	}, [location.pathname])

	const handleLogout = async () => {
		setLogoutLoading(true)
		try {
			await axios.post(
				`${BASE_URL}/user/logout`,
				{},
				{ withCredentials: true }
			)
			setUser(null)
			navigate('/login')
		} catch {
			/* still redirect even if request fails */
			setUser(null)
			navigate('/login')
		} finally {
			setLogoutLoading(false)
		}
	}

	/* ── shared nav links ── */
	const navLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'My Todos', to: '/todo' },
		{ label: 'About', to: '/about' },
	]

	const isActive = (to) => location.pathname === to

	return (
		<header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="flex items-center justify-between h-16">

					{/* ── Logo ── */}
					<Link
						to="/"
						className="flex items-center gap-2.5 group shrink-0"
					>
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-500 transition-colors">
							<CheckSquare size={17} className="text-white" />
						</div>
						<span className="text-gray-900 font-bold text-lg tracking-tight">
							Todo<span className="text-blue-600">App</span>
						</span>
					</Link>

					{/* ── Desktop nav links ── */}
					<nav className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									isActive(link.to)
										? 'text-blue-600 bg-blue-50'
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
								}`}
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* ── Desktop auth area ── */}
					<div className="hidden md:flex items-center gap-3">
						{authLoading ? (
							<div className="flex items-center gap-2 text-gray-400 text-sm">
								<Loader2 size={16} className="animate-spin" />
								<span>Loading…</span>
							</div>
						) : user ? (
							<>
								{/* user badge */}
								<div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5">
									<div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
										{user?.fullName?.charAt(0) ||
											user?.name?.charAt(0) ||
											user?.email?.charAt(0) ||
											'U'}
									</div>
									<div className="leading-tight">
										<p className="text-xs font-semibold text-gray-800 max-w-30 truncate">
											{user?.fullName || user?.name || 'User'}
										</p>
										<p className="text-[10px] text-gray-400 max-w-30 truncate">
											{user?.email}
										</p>
									</div>
								</div>

								{/* logout button */}
								<button
									onClick={handleLogout}
									disabled={logoutLoading}
									className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 hover:bg-red-50 px-3.5 py-2 rounded-xl transition-all duration-150 disabled:opacity-60 disabled:cursor-wait active:scale-[0.97]"
								>
									{logoutLoading ? (
										<Loader2 size={15} className="animate-spin" />
									) : (
										<LogOut size={15} />
									)}
									{logoutLoading ? 'Logging out…' : 'Logout'}
								</button>
							</>
						) : (
							<>
								<Link
									to="/login"
									className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200 hover:bg-blue-50 px-3.5 py-2 rounded-xl transition-all duration-150 active:scale-[0.97]"
								>
									<LogIn size={15} />
									Sign In
								</Link>
								<Link
									to="/register"
									className="flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.97]"
								>
									<User size={15} />
									Sign Up
								</Link>
							</>
						)}
					</div>

					{/* ── Mobile hamburger ── */}
					<button
						onClick={() => setMobileOpen((p) => !p)}
						className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
					>
						{mobileOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* ── Mobile menu ── */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 border-t border-gray-100 ${
					mobileOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="px-4 py-4 space-y-1 bg-white">

					{/* nav links */}
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
								isActive(link.to)
									? 'text-blue-600 bg-blue-50'
									: 'text-gray-700 hover:bg-gray-50'
							}`}
						>
							{link.label}
						</Link>
					))}

					{/* divider */}
					<div className="h-px bg-gray-100 my-2" />

					{/* mobile auth */}
					{authLoading ? (
						<div className="flex items-center gap-2 px-4 py-2.5 text-gray-400 text-sm">
							<Loader2 size={15} className="animate-spin" />
							Checking session…
						</div>
					) : user ? (
						<>
							{/* user row */}
							<div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
								<div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold uppercase shrink-0">
									{user?.fullName?.charAt(0) ||
										user?.name?.charAt(0) ||
										user?.email?.charAt(0) ||
										'U'}
								</div>
								<div className="leading-tight min-w-0">
									<p className="text-sm font-semibold text-gray-800 truncate">
										{user?.fullName || user?.name || 'User'}
									</p>
									<p className="text-xs text-gray-400 truncate">{user?.email}</p>
								</div>
							</div>

							{/* logout */}
							<button
								onClick={handleLogout}
								disabled={logoutLoading}
								className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-60 disabled:cursor-wait"
							>
								{logoutLoading ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									<LogOut size={16} />
								)}
								{logoutLoading ? 'Logging out…' : 'Logout'}
							</button>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
							>
								<LogIn size={16} className="text-blue-600" />
								Sign In
							</Link>
							<Link
								to="/register"
								className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-sm"
							>
								<User size={16} />
								Create Account
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	)
}