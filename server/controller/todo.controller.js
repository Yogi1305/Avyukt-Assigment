import Todo from "../model/todo.model.js"

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }
        const newTodo = new Todo({
            title,
            description,
            user: req.user._id
        });
        await newTodo.save();
        res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Server error' });
    }   
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id });  
        res.json({ todos ,message: 'Todos fetched successfully' });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const todo = await Todo.findOne({ _id: id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (status) todo.status = status;
        await todo.save();
        res.json({ message: 'Todo updated successfully', todo });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Server error' });
    }   
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }   
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
}