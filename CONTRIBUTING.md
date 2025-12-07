# Contributing to Secret Santa Platform

First off, thank you for considering contributing to Secret Santa Platform! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear use case**
- **Detailed description**
- **Mockups or examples** (if applicable)
- **Potential implementation approach**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for beginners
- `help wanted` - Issues that need attention

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18+)
- npm (v9+)
- MongoDB Atlas account
- Git

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Secret-Santa.git
   cd Secret-Santa
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/macamisp/Secret-Santa.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your credentials
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

### Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in the PR template

## 🔄 Pull Request Process

1. **Update documentation** if needed
2. **Follow the PR template**
3. **Link related issues**
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Ensure CI passes**

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated (when applicable)
- [ ] All tests pass
- [ ] Dependent changes merged

## 💻 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Leverage type inference where appropriate

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): Promise<User> => {
  // ...
}

// Bad
const getUser = (id: any): any => {
  // ...
}
```

### React Components

- Use functional components
- Implement proper prop types
- Keep components focused and small
- Use meaningful component names

```tsx
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`
- Styles: `kebab-case.css`

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Max line length: 100 characters
- Use trailing commas in objects/arrays

## 📝 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(auth): add password reset functionality

Implemented password reset flow with email verification.
Users can now request password reset links.

Closes #123
```

```bash
fix(groups): resolve pairing generation bug

Fixed issue where users could be paired with themselves.
Added validation to prevent self-pairing.

Fixes #456
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Update tests for bug fixes
- Aim for high coverage
- Test edge cases

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update API documentation
- Include code examples

## 🎨 UI/UX Guidelines

- Follow existing design patterns
- Maintain dark theme consistency
- Ensure responsive design
- Test on multiple devices
- Optimize for accessibility

## ❓ Questions?

- Open a [Discussion](https://github.com/macamisp/Secret-Santa/discussions)
- Join our Discord server
- Email: support@secretsanta.com

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Coding!** 🎅🎁
