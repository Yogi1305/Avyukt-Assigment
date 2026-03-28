import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../main.jsx'

const Todo = () => {
	const [todos, setTodos] = useState([])
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)
	const [editingId, setEditingId] = useState(null)
	const [editTitle, setEditTitle] = useState('')
	const [editDescription, setEditDescription] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const fetchTodos = async () => {
		try {
			setLoading(true)
			setErrorMessage('')

			const { data } = await axios.get(`${BASE_URL}/todo`, {
				withCredentials: true,
			})

			setTodos(data?.todos || data || [])
		} catch (error) {
			setErrorMessage(
				error?.response?.data?.message || 'Failed to fetch todos'
			)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchTodos()
	}, [])

	const handleCreateTodo = async (e) => {
		e.preventDefault()

		if (!title.trim() || !description.trim()) {
			setErrorMessage('Title and description are required')
			return
		}

		try {
			setSubmitting(true)
			setErrorMessage('')

			const { data } = await axios.post(
				`${BASE_URL}/todo/create`,
				{
					title: title.trim(),
					description: description.trim(),
				},
				{
					withCredentials: true,
				}
			)

			const newTodo = data?.todo || data
			setTodos((prev) => [newTodo, ...prev])
			setTitle('')
			setDescription('')
		} catch (error) {
			setErrorMessage(
				error?.response?.data?.message || 'Failed to create todo'
			)
		} finally {
			setSubmitting(false)
		}
	}

	const handleDelete = async (id) => {
		try {
			setErrorMessage('')

			await axios.delete(`${BASE_URL}/todo/delete/${id}`, {
				withCredentials: true,
			})

			setTodos((prev) => prev.filter((todo) => todo._id !== id))
		} catch (error) {
			setErrorMessage(
				error?.response?.data?.message || 'Failed to delete todo'
			)
		}
	}

	const handleToggleComplete = async (todo) => {
		try {
			setErrorMessage('')

			const updatedStatus =
				todo.status === 'completed' ? 'pending' : 'completed'

			const { data } = await axios.put(
				`${BASE_URL}/todo/${todo._id}`,
				{
					title: todo.title,
					description: todo.description,
					status: updatedStatus,
				},
				{
					withCredentials: true,
				}
			)

			const updatedTodo = data?.todo || data

			setTodos((prev) =>
				prev.map((item) => (item._id === todo._id ? updatedTodo : item))
			)
		} catch (error) {
			setErrorMessage(
				error?.response?.data?.message || 'Failed to update status'
			)
		}
	}

	const startEdit = (todo) => {
		setEditingId(todo._id)
		setEditTitle(todo.title)
		setEditDescription(todo.description)
	}

	const cancelEdit = () => {
		setEditingId(null)
		setEditTitle('')
		setEditDescription('')
	}

	const handleSaveEdit = async (todo) => {
		if (!editTitle.trim() || !editDescription.trim()) {
			setErrorMessage('Title and description are required')
			return
		}

		try {
			setErrorMessage('')

			const { data } = await axios.put(
				`${BASE_URL}/todo/${todo._id}`,
				{
					title: editTitle.trim(),
					description: editDescription.trim(),
					status: todo.status,
				},
				{
					withCredentials: true,
				}
			)

			const updatedTodo = data?.todo || data

			setTodos((prev) =>
				prev.map((item) => (item._id === todo._id ? updatedTodo : item))
			)

			cancelEdit()
		} catch (error) {
			setErrorMessage(
				error?.response?.data?.message || 'Failed to update todo'
			)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-8">
			<div className="mx-auto max-w-3xl">
				<h1 className="mb-6 text-3xl font-bold text-blue-600">Todo App</h1>

				{/* create form */}
				<form
					onSubmit={handleCreateTodo}
					className="mb-6 rounded-xl bg-white p-5 shadow-sm"
				>
					<div className="mb-3">
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter todo title"
							className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter todo description"
							rows="4"
							className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
						/>
					</div>

					<button
						type="submit"
						disabled={submitting}
						className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
					>
						{submitting ? 'Adding...' : 'Add Todo'}
					</button>
				</form>

				{/* error */}
				{errorMessage && (
					<div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
						{errorMessage}
					</div>
				)}

				{/* todo list */}
				<div className="space-y-4">
					{loading ? (
						<div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow-sm">
							Loading todos...
						</div>
					) : todos.length === 0 ? (
						<div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow-sm">
							No todos found
						</div>
					) : (
						todos.map((todo) => (
							<div
								key={todo._id}
								className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
							>
								{editingId === todo._id ? (
									<div>
										<div className="mb-3">
											<label className="mb-1 block text-sm font-medium text-gray-700">
												Title
											</label>
											<input
												type="text"
												value={editTitle}
												onChange={(e) => setEditTitle(e.target.value)}
												className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
											/>
										</div>

										<div className="mb-4">
											<label className="mb-1 block text-sm font-medium text-gray-700">
												Description
											</label>
											<textarea
												rows="4"
												value={editDescription}
												onChange={(e) =>
													setEditDescription(e.target.value)
												}
												className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
											/>
										</div>

										<div className="flex gap-2">
											<button
												onClick={() => handleSaveEdit(todo)}
												className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-500"
											>
												Save
											</button>
											<button
												onClick={cancelEdit}
												className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
											>
												Cancel
											</button>
										</div>
									</div>
								) : (
									<div>
										<div className="mb-3 flex items-start justify-between gap-4">
											<div>
												<h2
													className={`text-lg font-semibold ${
														todo.status === 'completed'
															? 'text-gray-400 line-through'
															: 'text-gray-900'
													}`}
												>
													{todo.title}
												</h2>
												<p className="mt-1 text-sm text-gray-600">
													{todo.description}
												</p>
											</div>

											<span
												className={`rounded-full px-3 py-1 text-xs font-medium ${
													todo.status === 'completed'
														? 'bg-green-100 text-green-700'
														: 'bg-yellow-100 text-yellow-700'
												}`}
											>
												{todo.status}
											</span>
										</div>

										<div className="flex flex-wrap gap-2">
											<button
												onClick={() => handleToggleComplete(todo)}
												className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
													todo.status === 'completed'
														? 'bg-yellow-500 hover:bg-yellow-400'
														: 'bg-blue-600 hover:bg-blue-500'
												}`}
											>
												{todo.status === 'completed'
													? 'Mark Pending'
													: 'Mark Complete'}
											</button>

											<button
												onClick={() => startEdit(todo)}
												className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
											>
												Edit
											</button>

											<button
												onClick={() => handleDelete(todo._id)}
												className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
											>
												Delete
											</button>
										</div>
									</div>
								)}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default Todo