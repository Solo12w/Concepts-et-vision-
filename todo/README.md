# 📝 Todo List Application

A modern, feature-rich todo list application with local storage functionality. Stay organized and manage your tasks efficiently.

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with priority levels and due dates
- ✏️ **Edit Tasks** - Modify existing tasks
- 🗑️ **Delete Tasks** - Remove tasks from your list
- ✔️ **Mark Complete** - Check off finished tasks
- 💾 **Local Storage** - All tasks are automatically saved to your browser

### Advanced Features
- 🎯 **Priority Levels** - Organize tasks by Low, Medium, or High priority
- 📅 **Due Dates** - Set and track due dates for your tasks
- 🔍 **Smart Filtering**
  - All tasks
  - Active (pending) tasks
  - Completed tasks
  - High priority tasks
- 📊 **Statistics Dashboard**
  - Total tasks count
  - Completed tasks count
  - Pending tasks count
  - High priority tasks count
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📤 **Export Tasks** - Download your tasks as a JSON file
- 📥 **Import Tasks** - Upload previously exported tasks
- 🔔 **Real-time Notifications** - Get feedback on all actions
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🚀 Quick Start

### Installation

1. Clone the repository or download the files:
```bash
git clone https://github.com/Solo12w/todo-app.git
cd todo-app
```

2. Open `index.html` in your web browser:
```bash
# Option 1: Direct open
open index.html

# Option 2: Use Python server
python -m http.server 8000
# Visit http://localhost:8000
```

## 📖 How to Use

### Adding a Task
1. Type your task in the input field
2. Select priority (Low, Medium, High)
3. Optionally set a due date
4. Click "Add" or press Enter

### Managing Tasks
- **Complete Task**: Check the checkbox next to a task
- **Edit Task**: Click the edit button (pencil icon)
- **Delete Task**: Click the delete button (trash icon)
- **Clear Completed**: Remove all completed tasks at once

### Filtering
- Click filter buttons to view different task categories
- Active: Shows only incomplete tasks
- Completed: Shows only finished tasks
- High Priority: Shows only high-priority tasks

### Theme
- Click the moon/sun icon in the header to toggle dark mode
- Your preference is saved automatically

### Export/Import
- **Export**: Download all tasks as a JSON file (backup)
- **Import**: Upload a previously exported JSON file

## 💾 Local Storage

All your tasks are automatically saved to your browser's local storage. They will persist even after:
- Closing the browser
- Refreshing the page
- Clearing the browser cache (local storage is separate)

### Storage Details
- Storage Key: `todoAppData`
- No internet connection required
- No account needed
- All data stays on your device

## 📁 File Structure

```
todo-app/
├── index.html      # Main HTML file
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript logic and app functionality
└── README.md       # This file
```

## 🎨 Design Features

- **Modern UI** with gradient accents
- **Smooth Animations** for better UX
- **Dark Mode Support** for comfortable night usage
- **Responsive Layout** adapts to all screen sizes
- **Accessibility** - Keyboard navigation support
- **Color-coded Priorities** - Visual priority indicators
- **Due Date Warnings** - Overdue task highlighting

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and animations
- **Vanilla JavaScript** - No frameworks or dependencies
- **Local Storage API** - Browser-based data persistence
- **Font Awesome** - Icon library (via CDN)

## 🌈 Color Scheme

- **Primary**: #6366f1 (Indigo)
- **Secondary**: #ec4899 (Pink)
- **Accent**: #f97316 (Orange)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)

## 📱 Responsive Breakpoints

- **Desktop**: 900px+ (full layout)
- **Tablet**: 768px - 900px (adjusted grid)
- **Mobile**: < 768px (single column)
- **Small Mobile**: < 480px (optimized for small screens)

## 🔒 Data Privacy

- All data is stored locally on your device
- No data is sent to any server
- No cookies or tracking
- You have complete control over your data

## 💡 Tips & Tricks

1. **Keyboard Shortcut**: Press Enter to add a task
2. **Bulk Delete**: Use "Clear Completed" to remove all finished tasks at once
3. **Backup**: Regularly export your tasks as backup
4. **Organization**: Use priorities and due dates to stay organized
5. **Theme**: Switch to dark mode for better night vision

## 🐛 Known Limitations

- Local storage is limited to ~5-10MB per domain
- Clearing browser data will remove all tasks
- Different browsers have separate local storage
- File import expects valid JSON format

## 🚀 Future Enhancements

Potential features for future versions:
- Categories/Tags for tasks
- Task descriptions/notes
- Recurring tasks
- Notifications/Reminders
- Cloud sync
- Task sharing
- Collaborative lists
- Mobile app version

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📞 Support

For issues or questions, please create an issue on GitHub.

---

**Made with ❤️ for productivity**

*Last Updated: June 2024*