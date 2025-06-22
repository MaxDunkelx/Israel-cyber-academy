# 🛡️ Israel Cyber Academy

A comprehensive e-learning platform focused on cybersecurity education, built with React, Firebase, and modern web technologies.

## 🌟 Features

### 🎓 Student Features
- **Interactive Lessons**: 9 comprehensive cybersecurity lessons with multimedia content
- **Real-time Progress Tracking**: Monitor learning progress across all lessons
- **Interactive Exercises**: Hands-on simulations and exercises for practical learning
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Hebrew Language Support**: Full RTL support and Hebrew interface

### 👨‍🏫 Teacher Features
- **Student Pool Management**: Drag-and-drop student assignment to classes
- **Class Management**: Create, manage, and delete classes with lesson assignments
- **Student Analytics**: Comprehensive progress tracking and performance analytics
- **Teaching Notes**: Preview lessons and add slide-specific teaching notes
- **Real-time Monitoring**: Track student activity and engagement

### 🔐 Security Features
- **Role-based Access Control**: Secure teacher and student separation
- **Firebase Authentication**: Enterprise-grade user authentication
- **Security Event Logging**: Comprehensive audit trail for all actions
- **Input Validation**: XSS protection and data sanitization
- **Rate Limiting**: Protection against abuse and attacks

## 🚀 Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **State Management**: React Context API, Custom Hooks
- **UI Components**: Lucide React Icons, Framer Motion
- **Security**: Custom security utilities, role-based access control
- **Development**: ESLint, PostCSS, Hot Reload

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project setup

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Israel-cyber-academy.git
   cd Israel-cyber-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Download your Firebase config and update `src/firebase/firebase-config.js`

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
Israel-cyber-academy/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── common/         # Shared components
│   │   ├── exercises/      # Interactive exercise components
│   │   ├── slides/         # Lesson slide components
│   │   ├── teacher/        # Teacher-specific components
│   │   └── ui/             # UI component library
│   ├── contexts/           # React contexts
│   ├── data/               # Lesson data and content
│   ├── firebase/           # Firebase configuration and services
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── main.jsx           # Application entry point
├── scripts/               # Database setup and utility scripts
└── docs/                  # Documentation files
```

## 📚 Lesson Content

The platform includes 9 comprehensive cybersecurity lessons:

1. **מבוא לאבטחת סייבר** - Introduction to Cybersecurity
2. **רכיבי המחשב** - Computer Components
3. **מערכת ההפעלה Windows** - Windows Operating System
4. **מערכת ההפעלה Linux** - Linux Operating System
5. **רשתות תקשורת** - Computer Networks
6. **פרוטוקולי תקשורת** - Communication Protocols
7. **פיתוח אתרים** - Web Development
8. **מסדי נתונים** - Databases
9. **כלי פיתוח** - Development Tools

Each lesson includes:
- Interactive slides with multimedia content
- Hands-on exercises and simulations
- Progress tracking and assessments
- Real-world examples and case studies

## 👨‍🏫 Teacher Console

### Student Pool Management
- View all available students
- Create classes with lesson assignments
- Drag-and-drop student assignment
- Class capacity management
- Real-time updates

### Student Analytics
- Individual student progress tracking
- Class performance overview
- Engagement metrics
- Progress visualization
- Filtering and search capabilities

### Teaching Notes
- Preview all lesson content
- Add slide-specific notes
- Organize teaching materials
- Share notes with other teachers
- Export functionality

## 🔐 Security Implementation

### Authentication & Authorization
- Firebase Authentication integration
- Role-based access control (Student/Teacher/Admin)
- Secure route protection
- Session management

### Data Security
- Firestore security rules
- Input validation and sanitization
- XSS protection
- CSRF protection

### Audit Trail
- Comprehensive security event logging
- User action tracking
- Access attempt monitoring
- Performance metrics

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Environment Configuration
- Production Firebase project
- Custom domain setup
- SSL certificate configuration
- CDN optimization

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with Vite
- **Loading Speed**: < 2 seconds initial load
- **Mobile Performance**: Optimized for all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write comprehensive comments
- Add unit tests for new features
- Update documentation
- Follow security best practices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Technical Support**: support@israelcyber.academy
- **Documentation**: [Wiki](https://github.com/your-username/Israel-cyber-academy/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/Israel-cyber-academy/issues)

## 🙏 Acknowledgments

- Firebase team for the excellent backend services
- React team for the amazing frontend framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and beta testers

---

**Built with ❤️ for cybersecurity education in Israel** 