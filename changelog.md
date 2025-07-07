# UO Babel Changelog

## [7.0.20.0] - 2024-12-28

### Added
- **JWT Authentication System**: Implemented secure token-based authentication
- **New Ironman Ranking system** with real-time leaderboards
- **Patreon integration** for subscriber benefits
- **Enhanced login system** with Vincular authentication
- **New subscriber status API endpoint**
- **Improved launcher** for both Windows and Linux platforms
- **Middleware for route protection** with automatic token validation
- **Authentication utilities** for token generation and verification

### Changed
- Updated client version to 7.0.20.0
- Updated BabelUO version to 1.0.5
- Enhanced website layout and navigation
- Improved performance with Next.js 15.3.3
- Updated React to version 19.0.0
- **Login API now returns JWT token** for client authentication

### Fixed
- Resolved authentication token handling issues
- Fixed launcher download links for Linux users
- Improved error handling in API endpoints
- Enhanced security for user data
- **Fixed token validation and expiration handling**

### Technical Improvements
- Migrated to Next.js App Router
- Implemented TypeScript throughout the application
- Added Tailwind CSS v4 for improved styling
- Enhanced SEO optimization
- Improved build process with Turbopack
- **Added comprehensive JWT token management**
- **Implemented secure route protection middleware**

### Security Enhancements
- **JWT tokens with 7-day expiration**
- **Automatic token validation on protected routes**
- **Secure token storage recommendations**
- **Environment variable configuration for client tokens**

## [7.0.19.0] - 2024-12-27

### Previous Version
- Initial release of the new UO Babel client
- Basic authentication system
- Core game functionality
- Windows launcher support

---

*For detailed information about each update, please refer to the individual release notes.* 