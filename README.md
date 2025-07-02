## Demo
https://drive.google.com/file/d/1dq4RG47Ua6btxefYPhe2WcgAcGyCQLxf/view?usp=drive_link
## Live Deployment
- **Live URL**: https://se-3355-final-git-master-egemen-ballis-projects.vercel.app/
## Overview
This is a comprehensive movie platform where users can explore films, rate and review them, and maintain personalized watchlists. It features multilingual support, intuitive navigation, and seamless login options including both standard email/password and Google OAuth authentication.
### Key Features

- **Movie Discovery**: Browse popular movies, search by title/people
- **User Ratings & Reviews**: Rate movies (1-10 scale) and write detailed reviews
- **Personal Watchlist**: Save movies to Watchlist
- **User Authentication**: Local registration/login + Google OAuth
- **Internationalization**: Multi-language support (English/Turkish)
- **Responsive Design**: Optimized for desktop and mobile devices (Responsive)
- **Real-time Search**: Typeahead suggestions and advanced search capabilities

Integrated MVC structure combining frontend (Vue) and backend (Express + Remult) in a single cohesive codebase
![resim](https://github.com/user-attachments/assets/f9da63f8-52c5-40fc-b2aa-c762c317eb57)

## Tech Stack

### Frontend
- **Vue3**
- **TypeScript**
- **CSS3**

### Backend
- **Express**
- **Remult**
- **PostgreSQL**

### Deployment
**Vercel**
**Node.js**

## Problems Encountered & Solutions

### 1. Google OAuth Integration
**Problem**: Complex OAuth flow with Azure-hosted backend required careful configuration.
**Solution**:
- Used a separate application state to distinguish users authenticated via Google OAuth
- Ensured seamless user experience by managing session state independently from local authentication
- Handled token decoding and user data mapping securely on the client side

### 2. Unified Deployment with Remult
**Problem**: Using Remult tightly couples the frontend and backend, which made simultaneous deployment and execution challenging during production setup.
**Solution**:
- Structured the project to serve both frontend and backend from a single Express server
- Configured build and serve scripts to ensure proper order and compatibility
- Ensured static frontend assets are correctly served after backend APIs are initialized
