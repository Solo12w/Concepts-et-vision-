// ============================================
// TODO LIST APP - JAVASCRIPT
// ============================================

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoAppData';
        this.editingId = null;
        
        this.init();
    }

    init() {
        this.loadTodos();
        this.setupEventListeners();
        this.render();
        this.loadTheme();
        this.updateLastSync();
    }

    setupEventListeners() {
        // Add todo
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.filter-btn').classList.add('active');
                this.currentFilter = e.target.closest('.filter-btn').dataset.filter;
                this.render();
            });
        });

        // Clear completed
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTodos());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput').addEventListener('change', (e) => this.importTodos(e));
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const priority = document.getElementById('prioritySelect').value;
        const dueDate = document.getElementById('dueDateInput').value;
        const text = input.value.trim();

        if (!text) {
            this.showNotification('Please enter a task', 'error');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: priority,
            dueDate: dueDate || null,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        
        input.value = '';
        document.getElementById('prioritySelect').value = 'medium';
        document.getElementById('dueDateInput').value = '';
        
        this.showNotification('Task added successfully!', 'success');
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
        this.showNotification('Task deleted', 'info');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Edit task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            this.saveTodos();
            this.render();
            this.showNotification('Task updated', 'success');
        }
    }

    clearCompleted() {
        const count = this.todos.filter(t => t.completed).length;
        if (count === 0) {
            this.showNotification('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Delete ${count} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
            this.showNotification(`${count} task(s) deleted`, 'success');
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'high':
                return this.todos.filter(t => t.priority === 'high');
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;
        const highPriority = this.todos.filter(t => t.priority === 'high').length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('highPriorityTasks').textContent = highPriority;
    }

    isOverdue(dueDate) {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        } else {
            emptyState.classList.add('hidden');
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            const priorityClass = todo.priority || 'medium';
            const isOverdue = this.isOverdue(todo.dueDate);
            const dueDateText = todo.dueDate ? `${this.formatDate(todo.dueDate)}${isOverdue ? ' (Overdue)' : ''}` : '';

            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''} 
                       data-id="${todo.id}">
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        <span class="priority-badge ${priorityClass}">${todo.priority}</span>
                        ${dueDateText ? `<span class="due-date ${isOverdue ? 'overdue' : ''}">
                            <i class="fas fa-calendar"></i> ${dueDateText}
                        </span>` : ''}
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" data-id="${todo.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${todo.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            // Checkbox event
            li.querySelector('.checkbox').addEventListener('change', (e) => {
                this.toggleTodo(parseInt(e.target.dataset.id));
            });

            // Edit button
            li.querySelector('.edit-btn').addEventListener('click', () => {
                this.editTodo(todo.id);
            });

            // Delete button
            li.querySelector('.delete-btn').addEventListener('click', () => {
                if (confirm('Delete this task?')) {
                    this.deleteTodo(todo.id);
                }
            });

            todoList.appendChild(li);
        });

        this.updateStats();
    }

    saveTodos() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        this.updateLastSync();
    }

    loadTodos() {
        const stored = localStorage.getItem(this.storageKey);
        this.todos = stored ? JSON.parse(stored) : [];
    }

    updateLastSync() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
    }

    exportTodos() {
        if (this.todos.length === 0) {
            this.showNotification('No tasks to export', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Tasks exported successfully!', 'success');
    }

    importTodos(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (!Array.isArray(imported)) {
                    throw new Error('Invalid format');
                }

                // Merge with existing todos
                this.todos = [...this.todos, ...imported];
                this.saveTodos();
                this.render();
                this.showNotification(`${imported.length} task(s) imported!`, 'success');
            } catch (error) {
                this.showNotification('Error importing tasks', 'error');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        const icon = document.querySelector('.theme-toggle i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.querySelector('.theme-toggle i').className = 'fas fa-sun';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TodoApp();
    });
} else {
    new TodoApp();
}