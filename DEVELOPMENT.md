# 🚀 Israel Cyber Academy - Development Guide

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [State Management](#state-management)
- [Testing](#testing)
- [Performance](#performance)
- [Deployment](#deployment)

## 🎯 Project Overview

Israel Cyber Academy is a React-based educational platform focused on cybersecurity learning. The platform features interactive lessons, role-based access, and real-time progress tracking.

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **Animations**: Framer Motion
- **UI Components**: Lucide React Icons
- **Drag & Drop**: React Beautiful DnD

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd israel-cyber-academy

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
Create a `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📁 Project Structure

```
src/
├── 📁 components/
│   ├── 📁 common/          # Reusable UI components
│   │   ├── ErrorBoundary.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── Button.jsx
│   ├── 📁 exercises/       # Interactive exercise components
│   │   ├── DragDropExercise.jsx
│   │   ├── MatchingExercise.jsx
│   │   └── MultipleChoiceExercise.jsx
│   ├── 📁 lessons/         # Lesson-specific components
│   │   ├── Lesson.jsx
│   │   └── InteractiveLesson.jsx
│   ├── Navigation.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── Roadmap.jsx
│   └── TeacherDashboard.jsx
├── 📁 contexts/            # React Context providers
│   └── AuthContext.jsx
├── 📁 hooks/               # Custom React hooks
│   ├── useLocalStorage.js
│   └── useDebounce.js
├── 📁 utils/               # Utility functions
│   └── constants.js
├── 📁 data/                # Static data
│   └── lessons.js
├── 📁 firebase/            # Firebase configuration
│   └── firebase-config.js
├── 📁 assets/              # Static assets
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## 📝 Coding Standards

### JavaScript/JSX Standards
- Use **functional components** with hooks
- Use **const** for component declarations
- Use **camelCase** for variables and functions
- Use **PascalCase** for components
- Use **UPPER_SNAKE_CASE** for constants

### Naming Conventions
```javascript
// ✅ Good
const UserProfile = () => { ... }
const handleSubmit = () => { ... }
const USER_ROLES = { ... }

// ❌ Bad
const userProfile = () => { ... }
const Submit = () => { ... }
const userRoles = { ... }
```

### File Organization
- One component per file
- Export components as default
- Use index.js for barrel exports
- Group related components in folders

## 🧩 Component Guidelines

### Component Structure
```javascript
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2, children }) => {
  // 1. Hooks
  const [state, setState] = useState(initialValue);
  
  // 2. Event handlers
  const handleClick = () => { ... };
  
  // 3. Effects
  useEffect(() => { ... }, []);
  
  // 4. Render
  return (
    <div className="component-name">
      {children}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  children: PropTypes.node
};

ComponentName.defaultProps = {
  prop2: 0
};

export default ComponentName;
```

### Styling Guidelines
- Use **Tailwind CSS** for styling
- Create custom components for repeated patterns
- Use CSS custom properties for theme colors
- Follow mobile-first responsive design

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Support screen readers

## 🔄 State Management

### Context Usage
- Use Context for global state (auth, theme, etc.)
- Keep context providers at the top level
- Split contexts by domain (AuthContext, ThemeContext)

### Local State
- Use `useState` for component-specific state
- Use `useReducer` for complex state logic
- Use `useMemo` and `useCallback` for performance

### Data Flow
```javascript
// ✅ Good - Props down, events up
const Parent = () => {
  const [data, setData] = useState([]);
  const handleUpdate = (newData) => setData(newData);
  
  return <Child data={data} onUpdate={handleUpdate} />;
};

// ❌ Bad - Avoid prop drilling
const Parent = () => {
  return <Child1 data={data} />;
};
```

## 🧪 Testing

### Testing Strategy
- Unit tests for utility functions
- Component tests for UI components
- Integration tests for user flows
- E2E tests for critical paths

### Testing Tools
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing

### Test Structure
```javascript
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## ⚡ Performance

### Optimization Techniques
- **Code splitting** with React.lazy()
- **Memoization** with React.memo()
- **Bundle optimization** with tree shaking
- **Image optimization** and lazy loading
- **Virtual scrolling** for large lists

### Performance Monitoring
- Use React DevTools Profiler
- Monitor bundle size
- Track Core Web Vitals
- Use Lighthouse for audits

### Best Practices
```javascript
// ✅ Good - Memoized component
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;
});

// ✅ Good - Lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// ✅ Good - Debounced search
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    // Search with debounced query
  }, [debouncedQuery]);
};
```

## 🚀 Deployment

### Build Process
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Configuration
- Use environment variables for configuration
- Separate configs for dev/staging/prod
- Never commit sensitive data

### Deployment Checklist
- [ ] All tests pass
- [ ] Code is linted
- [ ] Bundle size is optimized
- [ ] Environment variables are set
- [ ] Firebase rules are configured
- [ ] Performance is acceptable

## 🔧 Development Workflow

### Git Workflow
1. Create feature branch from main
2. Make changes and commit with descriptive messages
3. Push branch and create pull request
4. Code review and approval
5. Merge to main

### Commit Message Format
```
type(scope): description

feat(auth): add password reset functionality
fix(ui): resolve navigation menu alignment
docs(readme): update installation instructions
```

### Code Review Checklist
- [ ] Code follows standards
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] Performance is considered
- [ ] Accessibility is maintained

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 🤝 Contributing

1. Follow the coding standards
2. Write tests for new features
3. Update documentation
4. Ensure accessibility
5. Consider performance impact

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Contact the development team
- Check the documentation first

---

**Happy Coding! 🎉** 