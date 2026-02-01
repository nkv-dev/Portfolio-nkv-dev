# Contributing to Nitesh Kumar Verma's Portfolio

First off, thank you for considering contributing to this portfolio project! 🎉

This document provides guidelines and instructions for contributing to this project. Following these guidelines helps maintain code quality and ensures a smooth collaboration process.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Questions?](#questions)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to:

- **Be Respectful**: Treat everyone with respect. Healthy debate is encouraged, but harassment is not tolerated.
- **Be Constructive**: Provide constructive feedback and be open to receiving it.
- **Be Inclusive**: Welcome newcomers and help them learn.
- **Focus on What's Best**: Consider what is best for the project and its users.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- [Git](https://git-scm.com/) installed
- A modern web browser (Chrome, Firefox, Safari, Edge)
- [Python 3](https://www.python.org/) (for local server)
- A code editor (VS Code recommended)

### Fork and Clone

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - This creates your own copy of the project

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

3. **Set up upstream remote**
   ```bash
   git remote add upstream https://github.com/nitesh-kumar-verma/portfolio.git
   ```

4. **Start local server**
   ```bash
   python3 -m http.server 8000
   ```

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating a bug report:

- **Check existing issues** to avoid duplicates
- **Test on latest version** to ensure the bug still exists
- **Collect information** about the bug (browser, OS, steps to reproduce)

**When submitting a bug report, include:**

```markdown
**Bug Description:**
Clear description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Screenshots:**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Safari, Firefox]
- Version: [e.g., 91.0]
- Device: [e.g., Desktop, iPhone X, Samsung Galaxy]

**Additional Context:**
Add any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear title**
- **Provide detailed description**
- **Explain why this enhancement would be useful**
- **List possible alternatives**
- **Include mockups or examples** if applicable

### Contributing Code

#### Types of Contributions Welcome

- **Bug fixes**: Fix broken functionality
- **Performance improvements**: Optimize loading or runtime
- **Accessibility improvements**: Enhance a11y compliance
- **Documentation**: Improve README, code comments, guides
- **New features**: Add new sections or functionality
- **Refactoring**: Improve code quality without changing behavior
- **Translations**: Translate to other languages
- **Tests**: Add automated testing

#### What to Avoid

- **Breaking changes** without discussion
- **Major architectural changes** without prior approval
- **Dependencies** unless absolutely necessary
- **Generated files** in commits (use .gitignore)

## 💻 Development Workflow

### Branch Naming Convention

```
type/short-description

Examples:
feature/add-dark-mode
bugfix/fix-mobile-menu
docs/update-readme
perf/optimize-images
refactor/simplify-nav
```

**Types:**
- `feature/` - New features
- `bugfix/` - Bug fixes
- `docs/` - Documentation only
- `perf/` - Performance improvements
- `refactor/` - Code refactoring
- `style/` - Code style changes (formatting)
- `test/` - Adding tests

### Creating a Branch

```bash
# Ensure you're on main and up to date
git checkout main
git pull upstream main

# Create your branch
git checkout -b feature/your-feature-name

# Or using the convention
git checkout -b feature/add-contact-form-validation
```

### Making Changes

1. **Edit files** in your editor
2. **Test changes** in browser at `http://localhost:8000`
3. **Check browser console** for errors
4. **Test responsiveness** using DevTools
5. **Check accessibility** using axe or Lighthouse

### Committing Changes

#### Commit Message Format

We follow **Conventional Commits** specification:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

**Examples:**

```bash
# Good commits
git commit -m "feat(contact): Add Formspree form integration"
git commit -m "fix(nav): Resolve mobile menu toggle issue"
git commit -m "perf(hero): Optimize video loading with preload"
git commit -m "docs(readme): Update deployment instructions"
git commit -m "style(css): Format with consistent indentation"

# With body
git commit -m "feat(projects): Add filter by technology

- Add dropdown for technology filtering
- Implement filtering logic in projects.js
- Update projects.css for filter UI
- Add keyboard navigation for accessibility"
```

#### Commit Best Practices

- ✏️ **Use present tense**: "Add feature" not "Added feature"
- 🔤 **Use imperative mood**: "Move cursor to..." not "Moves cursor to..."
- 📏 **Limit first line** to 72 characters or less
- 📝 **Reference issues** in body: "Fixes #123" or "Closes #456"
- 🎯 **One logical change** per commit

### Syncing with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Checkout your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main

# Update your feature branch
git checkout feature/your-branch
git rebase main
```

## 📐 Style Guidelines

### HTML Guidelines

```html
<!-- Use semantic HTML -->
<header>...</header>
<main>...</main>
<section>...</section>
<footer>...</footer>

<!-- Proper indentation (2 spaces) -->
<div class="container">
  <div class="row">
    <div class="col">
      <p>Content</p>
    </div>
  </div>
</div>

<!-- Always use alt attributes -->
<img src="avatar.jpg" alt="Nitesh Kumar Verma - Profile Photo">

<!-- ARIA labels for icons -->
<button aria-label="Close menu">
  <i class="bi bi-x"></i>
</button>
```

**Standards:**
- Semantic HTML5 elements
- 2-space indentation
- Double quotes for attributes
- Kebab-case for IDs and classes: `contact-section`
- Lowercase tag names

### CSS Guidelines

```css
/* Use CSS custom properties */
:root {
  --tech-primary: #ef4444;
  --tech-secondary: #dc2626;
}

/* BEM naming convention */
.contact-section { }
.contact-section__card { }
.contact-section__card--highlighted { }

/* Mobile-first approach */
.contact-container {
  /* Mobile styles first */
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .contact-container {
    /* Desktop styles */
    grid-template-columns: 1fr 1fr;
  }
}

/* Organize properties logically */
.selector {
  /* Positioning */
  position: relative;
  z-index: 1;
  
  /* Display & Box Model */
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  
  /* Typography */
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  
  /* Visual */
  background: #fff;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  /* Misc */
  cursor: pointer;
  transition: all 0.3s ease;
}
```

**Standards:**
- 2-space indentation
- One selector per line
- Space after property colon: `property: value;`
- Trailing semicolons required
- Comments for complex sections

### JavaScript Guidelines

```javascript
// Use const/let, avoid var
const API_URL = 'https://api.example.com';
let currentSlide = 0;

// Use arrow functions for callbacks
const handleClick = (event) => {
  event.preventDefault();
  console.log('Clicked!');
};

// Async/await for asynchronous code
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Destructuring
const { name, email } = user;
const [first, second] = items;

// Template literals
const message = `Hello, ${name}! Welcome to ${site}.`;

// Default parameters
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

// Modular organization
/***************************
 * CONTACT SECTION
 ***************************/
function initContactForm() {
  // Implementation
}

function validateEmail(email) {
  // Implementation
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initContactForm, validateEmail };
}
```

**Standards:**
- 2-space indentation
- Single quotes for strings (unless template literals)
- Semicolons required
- camelCase for variables/functions
- PascalCase for classes
- UPPER_CASE for constants
- Trailing commas in multi-line objects/arrays

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass (if applicable)
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main
- [ ] No console.log statements left in code
- [ ] Browser console is error-free
- [ ] Responsive design tested
- [ ] Accessibility checked

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-branch
   ```

2. **Create PR on GitHub**
   - Go to your fork on GitHub
   - Click "Pull Request"
   - Select `main` branch of original repo

3. **Fill out PR template**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## How Has This Been Tested?
Describe the tests you ran

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on multiple browsers/devices
- [ ] Any dependent changes have been merged and published

## Related Issues
Fixes #(issue number)
Closes #(issue number)
```

### PR Review Process

1. **Automated checks** must pass
2. **At least one review** required from maintainers
3. **All conversations** must be resolved
4. **Branch must be up to date** before merging

### Addressing Review Feedback

```bash
# Make requested changes
# Edit files...

# Stage and commit
git add .
git commit -m "refactor: Address PR feedback

- Fix variable naming
- Add error handling
- Update comments"

# Push changes (automatically updates PR)
git push origin feature/your-branch
```

## 🧪 Testing

### Manual Testing Checklist

#### Functionality
- [ ] All links work correctly
- [ ] Forms submit properly
- [ ] Navigation works smoothly
- [ ] Mobile menu toggles correctly
- [ ] Scroll animations trigger properly

#### Responsive Design
- [ ] Test on mobile (320px - 480px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1024px+)
- [ ] Check for horizontal scrolling
- [ ] Verify font sizes are readable

#### Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

#### Performance
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Fast load time (< 3s)
- [ ] Smooth animations (60fps)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] ARIA labels present

### Automated Testing (Future)

```javascript
// Example test structure (for future implementation)
describe('Contact Form', () => {
  test('validates email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
  });
  
  test('submits form successfully', async () => {
    // Mock fetch
    // Test form submission
  });
});
```

## 📝 Documentation

### Code Documentation

```javascript
/**
 * Initialize contact form functionality
 * Handles form submission, validation, and user feedback
 * @param {HTMLFormElement} form - The contact form element
 * @returns {void}
 */
function initContactForm(form) {
  // Implementation
}

/**
 * Validates email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
```

### README Updates

When adding new features:

1. Update feature list in README
2. Add configuration instructions if needed
3. Update screenshots if UI changed
4. Add troubleshooting section if applicable

## ❓ Questions?

### Getting Help

- **General Questions**: Open a [Discussion](../../discussions)
- **Bug Reports**: Open an [Issue](../../issues)
- **Security Issues**: See [SECURITY.md](SECURITY.md)
- **Direct Contact**: Email [nitesh.kumar@email.com](mailto:nitesh.kumar@email.com)

### Common Issues

**Q: My changes aren't showing up**
A: Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

**Q: Local server won't start**
A: Check if port 8000 is available: `lsof -i :8000`

**Q: Git push is rejected**
A: Pull latest changes first: `git pull upstream main`

## 🎉 Recognition

Contributors will be:
- Listed in README acknowledgments
- Mentioned in release notes
- Credited in commit history

Thank you for contributing to this project! 🚀

---

**Last Updated**: February 2026
