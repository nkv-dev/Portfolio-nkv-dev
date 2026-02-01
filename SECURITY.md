# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

I take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report via:

- **Email**: [security@yourdomain.com](mailto:security@yourdomain.com) (replace with actual)
- **Private GitHub Advisory**: [Report a vulnerability](../../security/advisories/new)

### What to Include

When reporting a vulnerability, please include:

- **Type of vulnerability** (e.g., XSS, CSRF, injection)
- **Affected versions**
- **Step-by-step instructions** to reproduce
- **Proof-of-concept** (if possible)
- **Impact assessment**
- **Suggested fix** (optional)

### Response Timeline

| Phase | Timeframe |
|-------|-----------|
| Acknowledgment | Within 48 hours |
| Initial Assessment | Within 1 week |
| Fix Development | Depends on severity |
| Patch Release | ASAP after fix |
| Public Disclosure | After fix is deployed |

### Severity Levels

- **Critical**: Immediate action required (data breach, RCE)
- **High**: Significant impact (XSS, authentication bypass)
- **Medium**: Moderate impact (CSRF, information disclosure)
- **Low**: Minor impact (best practice violations)

## Security Best Practices

### For Users

1. **Always use HTTPS**: Ensure your deployment uses HTTPS
2. **Keep dependencies updated**: Regularly update CDN links
3. **Content Security Policy**: Implement CSP headers
4. **Form Security**: Use Formspree for secure form handling
5. **Regular Audits**: Periodically review security practices

### For Contributors

1. **No Secrets in Code**: Never commit API keys, passwords, or tokens
2. **Validate Input**: Always validate and sanitize user input
3. **HTTPS Resources**: Use HTTPS for all external resources
4. **Minimal Dependencies**: Keep dependencies minimal and trusted
5. **Code Review**: All changes reviewed for security implications

### Current Security Measures

This portfolio implements:

- ✅ **No User Data Storage**: Site doesn't store user data
- ✅ **External Form Handling**: Formspree handles forms securely
- ✅ **HTTPS Ready**: All resources use HTTPS
- ✅ **Minimal Dependencies**: Only trusted CDN libraries
- ✅ **No Server-Side Code**: Static site reduces attack surface
- ✅ **Content Security Policy**: Can be implemented at CDN level

### Dependencies Security

| Dependency | Version | Security Status |
|------------|---------|-----------------|
| Bootstrap | 5.3.8 | ✅ Monitored |
| Lenis | 1.1.18 | ✅ Monitored |
| Formspree | Latest | ✅ Monitored |

### Known Limitations

1. **Static Site**: Limited server-side security controls
2. **Third-Party Services**: Relies on Formspree security
3. **Client-Side Code**: JavaScript can be inspected
4. **No Authentication**: No user accounts to protect

## Security Checklist

### Deployment Security

- [ ] HTTPS enforced (HSTS headers)
- [ ] CSP headers configured
- [ ] Security.txt file present
- [ ] robots.txt configured appropriately
- [ ] No sensitive data in HTML/JS
- [ ] CDN security features enabled

### Code Security

- [ ] Input validation on forms
- [ ] Output encoding for dynamic content
- [ ] No eval() or innerHTML with user data
- [ ] Secure CDN links (SRI hashes recommended)
- [ ] No hardcoded secrets

### Monitoring

- [ ] Regular dependency audits
- [ ] Security scanning (if available)
- [ ] Access logs monitoring
- [ ] Uptime monitoring

## Vulnerability Disclosure Policy

### Responsible Disclosure

1. Reporter submits vulnerability privately
2. Acknowledge receipt within 48 hours
3. Investigate and validate the report
4. Develop and test a fix
5. Deploy fix to production
6. Notify reporter of resolution
7. Publicly disclose (with reporter's permission)

### Public Disclosure

- **Timeline**: 90 days after fix deployment
- **Credit**: Reporter credited (if desired)
- **Details**: Technical details shared for education

## Compliance

### Standards Reference

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [W3C Security Guidelines](https://www.w3.org/Security/)

### Privacy

This site:
- Does not use cookies (except essential)
- Does not track users
- Does not collect personal information
- Does not share data with third parties (except Formspree for forms)

See [Privacy Policy](PRIVACY.md) for details.

## Contact

**Security Team**: [security@yourdomain.com](mailto:security@yourdomain.com)  
**Project Owner**: [nitesh.kumar@email.com](mailto:nitesh.kumar@email.com)

**Response Time**: Within 48 hours

---

**Last Updated**: February 2024  
**Policy Version**: 1.0
