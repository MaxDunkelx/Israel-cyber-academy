# Israel Cyber Academy

A comprehensive cyber security learning platform designed for students aged 10-13, featuring interactive lessons, real-time progress tracking, and a teacher management system.

## 🚀 Features

### Student Platform
- **Interactive Lessons**: 9 comprehensive cyber security lessons with slides, exercises, and simulations
- **Progress Tracking**: Real-time progress monitoring and achievement system
- **Interactive Exercises**: Drag & drop, matching, multiple choice, and simulator exercises
- **Responsive Design**: Mobile-friendly interface with Hebrew RTL support
- **Achievement System**: Badges and progress indicators

### Teacher Platform
- **Student Management**: Assign students to classes and monitor progress
- **Analytics Dashboard**: View student progress and lesson completion statistics
- **Session Hosting**: Real-time lesson control and student monitoring
- **Comments System**: Add teaching notes and feedback

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Shared components (LoadingSpinner, ErrorBoundary)
│   ├── exercises/       # Interactive exercise components
│   ├── slides/          # Slide type components
│   ├── teacher/         # Teacher-specific components
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts (AuthContext)
├── data/                # Lesson data and content
│   └── lessons/         # Individual lesson files and slides
├── firebase/            # Firebase configuration and services
├── hooks/               # Custom React hooks
└── utils/               # Utility functions and helpers
```

## 🎯 Lesson Content

The platform includes 9 comprehensive lessons:

1. **מבוא לעולם הסייבר** - Introduction to Cyber Security
2. **יסודות המחשב** - Computer Fundamentals
3. **מערכת ההפעלה Windows** - Windows Operating System
4. **מערכת ההפעלה Linux** - Linux Operating System
5. **יסודות הרשת** - Network Fundamentals
6. **פרוטוקולי תקשורת** - Communication Protocols
7. **פיתוח אתרים** - Web Development
8. **יסודות מסדי נתונים** - Database Fundamentals
9. **דפדפנים ואבטחה** - Browsers and Security

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Israel-cyber-academy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🔧 Development Scripts

The `scripts/` directory contains utility scripts for:
- Database setup and migration
- Teacher user creation
- Role management
- Firebase configuration

## 🎨 Design System

The platform uses a consistent design system with:
- Dark theme with cyber security aesthetic
- Hebrew RTL support
- Responsive design patterns
- Accessibility features
- Loading states and error handling

## 🔐 Security Features

- Role-based access control (Student/Teacher)
- Firebase Authentication
- Secure Firestore rules
- Input validation and sanitization
- Security event logging

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🌐 Internationalization

- Hebrew language support
- RTL (Right-to-Left) text direction
- Cultural adaptations for Israeli students

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team. 