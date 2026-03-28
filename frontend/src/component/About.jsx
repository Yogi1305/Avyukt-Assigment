import React from 'react'
import {
	Mail,
	Phone,
	GraduationCap,
	Briefcase,
	Code2,
	Trophy,
	FolderGit2,
} from 'lucide-react'

const About = () => {
	return (
		<div className="min-h-screen bg-gray-50 px-4 py-10">
			<div className="mx-auto max-w-4xl">

				{/* Profile Header */}
				<div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Yogesh Kushwaha
							</h1>
							<p className="mt-1 text-gray-600">Bachelor of Technology</p>
							<p className="text-sm text-gray-500">
								Computer Science and Engineering
							</p>
							<p className="text-sm text-gray-500">
								Kamla Nehru Institute of Technology, Sultanpur
							</p>
						</div>

						<div className="flex flex-col gap-2 text-sm text-gray-600">
							<a
								href="tel:+919315710121"
								className="flex items-center gap-2 hover:text-blue-600"
							>
								<Phone size={15} />
								+91-9315710121
							</a>
							<a
								href="mailto:yogesh.22278@knit.ac.in"
								className="flex items-center gap-2 hover:text-blue-600"
							>
								<Mail size={15} />
								yogesh.22278@knit.ac.in
							</a>
							<a
								href="https://github.com/yogi1305"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2 hover:text-blue-600"
							>
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
								GitHub
							</a>
							<a
								href="https://linkedin.com/in/yogesh-kushwaha"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2 hover:text-blue-600"
							>
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
								LinkedIn
							</a>
						</div>
					</div>
				</div>

				{/* Education */}
				<div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
					<div className="mb-4 flex items-center gap-2">
						<GraduationCap size={20} className="text-blue-600" />
						<h2 className="text-xl font-bold text-gray-900">Education</h2>
					</div>

					<div className="flex items-start justify-between">
						<div>
							<h3 className="font-semibold text-gray-800">
								Bachelor of Technology in Computer Science and Engineering
							</h3>
							<p className="text-sm text-gray-500">
								Kamla Nehru Institute of Technology, Sultanpur
							</p>
						</div>
						<div className="text-right text-sm text-gray-500">
							<p>2022 – 2026</p>
							<p className="font-medium text-gray-700">CGPA: 8.0</p>
						</div>
					</div>
				</div>

				{/* Experience */}
				<div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
					<div className="mb-4 flex items-center gap-2">
						<Briefcase size={20} className="text-blue-600" />
						<h2 className="text-xl font-bold text-gray-900">Experience</h2>
					</div>

					<div className="space-y-6">
						<div>
							<div className="flex items-start justify-between">
								<div>
									<h3 className="font-semibold text-gray-800">BITCS</h3>
									<p className="text-sm text-gray-500">
										Software Development Engineer Intern
									</p>
								</div>
								<p className="text-sm text-gray-500">Feb 2026 – Present</p>
							</div>
							<ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-600">
								<li>
									Developed a full-stack hiring platform enabling both users and
									companies to register, with users able to browse and apply to
									job listings posted by companies.
								</li>
								<li>
									Implemented role-based access control for HR and Interviewer
									roles, allowing shortlisting of candidates and management of
									application stages throughout the recruitment pipeline.
								</li>
								<li>
									Integrated an assessment module within the application process,
									enabling automated test assignments to applicants and
									streamlining the end-to-end hiring workflow.
								</li>
								<li>
									Engineered the backend using NestJS, PostgreSQL, TypeORM, and
									JWT Guards, building RESTful APIs with secure authentication
									and efficient relational data management.
								</li>
							</ul>
						</div>

						<div>
							<div className="flex items-start justify-between">
								<div>
									<h3 className="font-semibold text-gray-800">Neum AI</h3>
									<p className="text-sm text-gray-500">
										Software Development Engineer Intern
									</p>
								</div>
								<p className="text-sm text-gray-500">March 2025 – June 2025</p>
							</div>
							<ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-600">
								<li>
									Engineered frontend caching system using IndexedDB, improving
									application performance by 67% and reducing load times from 6
									seconds to 2 seconds with secure cache clearance protocols.
								</li>
								<li>
									Implemented a comprehensive analytics dashboard with data
									visualization tools that increased user engagement metrics by
									25% and provided actionable insights for product development.
								</li>
								<li>
									Led UI/UX redesign initiative for core application pages,
									resulting in 30% improvement in user satisfaction scores and
									15% reduction in user drop-off rates.
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Projects */}
				<div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
					<div className="mb-4 flex items-center gap-2">
						<FolderGit2 size={20} className="text-blue-600" />
						<h2 className="text-xl font-bold text-gray-900">
							Personal Projects
						</h2>
					</div>

					<div className="space-y-6">
						<div>
							<div className="flex items-start justify-between">
								<div>
									<h3 className="font-semibold text-gray-800">
										ClubSphere – Full Stack Club & Event Management Platform
									</h3>
									<p className="text-xs text-gray-500">
										Node.js, Express.js, MongoDB, Redis, BullMQ, Razorpay,
										Cloudinary, JWT, Nodemailer, Multer
									</p>
								</div>
								<a
									href="#"
									className="text-sm font-medium text-blue-600 hover:text-blue-500"
								>
									Live Website
								</a>
							</div>
							<ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-600">
								<li>
									Designed a scalable backend for managing clubs, events,
									memberships, and payments, featuring JWT authentication, OTP
									verification, and role-based access control.
								</li>
								<li>
									Integrated Razorpay for secure transactions, Cloudinary for
									media uploads, and BullMQ + Redis for background jobs like
									automated notifications and email scheduling.
								</li>
								<li>
									Developed custom registration forms, real-time notifications,
									and an event gallery system, enabling a complete, Google-Forms-
									like club management experience.
								</li>
							</ul>
						</div>

						<div>
							<div className="flex items-start justify-between">
								<div>
									<h3 className="font-semibold text-gray-800">Quizzy</h3>
									<p className="text-xs text-gray-500">
										React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind
										CSS, Razorpay, OpenAI API, JWT
									</p>
								</div>
								<a
									href="#"
									className="text-sm font-medium text-blue-600 hover:text-blue-500"
								>
									Live Website
								</a>
							</div>
							<ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-600">
								<li>
									Designed and developed a full-stack quiz and polling application
									enabling educators to create, manage, and analyse real-time
									assessments with interactive user interfaces.
								</li>
								<li>
									Integrated OpenAI API to automate quiz question generation,
									reducing quiz creation time by 80% and improving question
									variety for educators using the platform.
								</li>
								<li>
									Implemented secure payment processing via Razorpay for premium
									features and a real-time analytics dashboard for quiz
									performance tracking.
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Achievements */}
				<div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
					<div className="mb-4 flex items-center gap-2">
						<Trophy size={20} className="text-blue-600" />
						<h2 className="text-xl font-bold text-gray-900">Achievements</h2>
					</div>

					<ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
						<li>
							<strong>LeetCode:</strong> Completed{' '}
							<span className="font-semibold text-gray-800">650+</span> problems
							with a consistent{' '}
							<span className="font-semibold text-gray-800">300-day streak</span>
						</li>
						<li>
							<strong>GeeksforGeeks:</strong> Solved{' '}
							<span className="font-semibold text-gray-800">500+</span>{' '}
							challenges, earned{' '}
							<span className="font-semibold text-gray-800">3-star rank</span>,
							and maintained a{' '}
							<span className="font-semibold text-gray-800">250-day streak</span>
						</li>
						<li>
							<strong>Electron Forum Quiz Contest:</strong> Hosted a quiz contest
							on self-built Quizzy App during the Electron Forum event, where{' '}
							<span className="font-semibold text-gray-800">100+ participants</span>{' '}
							engaged with questions designed by the forum team.
						</li>
						<li>
							<strong>Winner – Hack O Gravity Hackathon (2025):</strong> Secured
							first place for developing an innovative full-stack solution
							addressing real-world challenges using modern web technologies.
						</li>
					</ul>
				</div>

				{/* Technical Skills */}
				<div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
					<div className="mb-4 flex items-center gap-2">
						<Code2 size={20} className="text-blue-600" />
						<h2 className="text-xl font-bold text-gray-900">
							Technical Skills
						</h2>
					</div>

					<div className="space-y-3 text-sm text-gray-600">
						<div>
							<span className="font-semibold text-gray-800">
								Programming Languages:{' '}
							</span>
							JavaScript (ES6+), C, C++, SQL
						</div>
						<div>
							<span className="font-semibold text-gray-800">Frontend: </span>
							React.js, Redux, HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive
							Design
						</div>
						<div>
							<span className="font-semibold text-gray-800">Backend: </span>
							Node.js, Express.js, NestJS, RESTful APIs, Socket.io, JWT
							Authentication
						</div>
						<div>
							<span className="font-semibold text-gray-800">Databases: </span>
							MongoDB, PostgreSQL, TypeORM, NoSQL, IndexedDB
						</div>
						<div>
							<span className="font-semibold text-gray-800">Developer Tools: </span>
							Git, GitHub, VS Code, npm
						</div>
						<div>
							<span className="font-semibold text-gray-800">Coursework: </span>
							Data Structures and Algorithms, OOP, Operating Systems, DBMS,
							Computer Networks
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About