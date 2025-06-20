# Israel Cyber Academy 🛡️

An interactive learning platform for cybersecurity education, built with React and modern web technologies.

## 🌟 Features

- **Interactive Lessons**: Slide-based learning with multiple content types
- **Engaging Exercises**: Drag-and-drop, matching, and multiple-choice activities
- **Progress Tracking**: Real-time statistics and completion tracking
- **User Authentication**: Secure login and profile management
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Eye-friendly interface for extended learning sessions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MaxDunkelx/Israel-cyber-academy.git
   cd Israel-cyber-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 📚 Project Structure

```
src/
├── components/
│   ├── slides/           # Individual slide components
│   ├── exercises/        # Interactive exercise components
│   └── ui/              # Reusable UI components
├── data/
│   └── lessons/         # Lesson content and slide data
├── contexts/            # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── firebase/           # Firebase configuration
```

## 🎯 Key Components

### Slide Types
- **Presentation Slides**: Rich content with images, text, and animations
- **Poll Slides**: Interactive voting and feedback collection
- **Video Slides**: Embedded video content with completion tracking
- **Interactive Slides**: Drag-and-drop, matching, and quiz exercises
- **Break Slides**: Pause and reflection moments
- **Reflection Slides**: Text input for user thoughts and feedback
- **Quiz Slides**: Multiple-choice assessments with scoring

### Exercise Types
- **Drag & Drop**: Categorize items by dragging to correct areas
- **Matching**: Connect related items or concepts
- **Multiple Choice**: Traditional quiz format with immediate feedback

## 🛠️ Technologies Used

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Icons**: Lucide React
- **Drag & Drop**: react-beautiful-dnd

## 📊 Features in Detail

### Learning Experience
- **Progress Tracking**: Automatic saving of lesson progress
- **Time Tracking**: Monitor learning duration and engagement
- **Statistics Dashboard**: View learning metrics and achievements
- **Resume Functionality**: Continue from where you left off

### User Interface
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Reduced eye strain for extended use
- **Hebrew RTL Support**: Full right-to-left text support
- **Accessibility**: Keyboard navigation and screen reader support

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for educational purposes
- Designed with accessibility in mind
- Inspired by modern e-learning platforms

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the documentation in the `/docs` folder
- Review the troubleshooting guide

---

**Happy Learning! 🎓** 