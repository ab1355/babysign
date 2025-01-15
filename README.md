# Baby Sign Language App

A comprehensive web application designed to help parents and caregivers teach sign language to babies through interactive lessons, quizzes, and a supportive community.

## 🌟 Features

### Core Features
- **Interactive Sign Library**: Browse and learn baby sign language with video demonstrations
- **Structured Lessons**: Progressive learning path with difficulty levels
- **Practice Quizzes**: Test knowledge with interactive quizzes
- **Progress Tracking**: Monitor learning progress with achievements and badges
- **Community Forum**: Share experiences and tips with other parents
- **Voice Recognition**: Practice pronunciation with real-time feedback
- **Comprehensive Search**: Find signs, lessons, and community posts easily

### Technical Features
- React with TypeScript for robust type safety
- Material-UI for a modern, responsive design
- Firebase Authentication and Firestore for secure data management
- Web Speech API for voice recognition
- Real-time updates and interactions
- Progressive Web App (PWA) capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ab1355/babysign.git
cd babysign
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## 📱 App Structure

### Components
- `Layout`: Main app layout with navigation
- `SignLibrary`: Browse and search signs
- `Lessons`: Structured learning content
- `Quiz`: Interactive knowledge testing
- `Forum`: Community interaction
- `SignPractice`: Voice recognition practice
- `SearchResults`: Unified search interface

### Services
- `auth.ts`: Firebase authentication
- `firestore.ts`: Database operations
- `voiceRecognition.ts`: Speech recognition
- `forum.ts`: Community features
- `search.ts`: Unified search functionality

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules for data protection
- Input sanitization and validation
- Protected routes and components

## 🎨 UI/UX Features

- Responsive design for all devices
- Intuitive navigation
- Progress indicators
- Interactive feedback
- Accessibility features
- Dark/Light mode support

## 🛠️ Development

### Code Style
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Testing
- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing

### Build and Deploy
```bash
# Build for production
npm run build
# or
yarn build

# Deploy to Firebase
firebase deploy
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [Your Name] - Initial work - [GitHub Profile]

## 🙏 Acknowledgments

- Material-UI for the component library
- Firebase for backend services
- Web Speech API for voice recognition
- All contributors and supporters
