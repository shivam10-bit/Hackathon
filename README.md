# Hackathon25 Mobile App

A modern, interactive React Native mobile application for hackathon management with a beautiful UI design and full backend integration.

## 🚀 Features

- **Modern UI/UX**: Beautiful, interactive design with smooth animations
- **Authentication**: Login/Register with secure token management
- **Dashboard**: Comprehensive project and team management
- **Real-time Updates**: Live project progress tracking
- **Team Collaboration**: Team formation and member management
- **Responsive Design**: Optimized for all mobile devices
- **Backend Integration**: Full Python backend connectivity

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with cyan accents
- **Gradient Backgrounds**: Beautiful linear gradients throughout
- **Smooth Animations**: React Native Animatable for fluid transitions
- **Interactive Elements**: Touch feedback and gesture handling
- **Material Icons**: Consistent iconography using Material Design
- **Glass Morphism**: Semi-transparent cards with backdrop blur effects

## 📱 Screens

1. **Home Screen**: Landing page with feature highlights and stats
2. **Login Screen**: Secure authentication with form validation
3. **Register Screen**: User registration with skill selection
4. **Dashboard**: Main app interface with bottom navigation
5. **Profile Screen**: User profile management and settings
6. **Settings Screen**: App configuration and preferences

## 🛠️ Tech Stack

- **Frontend**: React Native 0.72.6
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper
- **Animations**: React Native Animatable
- **Gradients**: React Native Linear Gradient
- **Icons**: React Native Vector Icons
- **HTTP Client**: Axios
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Python backend running on localhost:5000

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackathon_25
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run on device/emulator**
   ```bash
   # Android
   npm run android
   # or
   yarn android
   
   # iOS (macOS only)
   npm run ios
   # or
   yarn ios
   ```

## 🔧 Configuration

### Backend Connection

The app is configured to connect to your Python backend at `http://localhost:5000`. Update the API base URL in `src/services/api.js` if needed:

```javascript
const API_BASE_URL = 'http://your-backend-url:port';
```

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
API_BASE_URL=http://localhost:5000
ENVIRONMENT=development
```

## 📱 App Structure

```
src/
├── screens/           # App screens
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── DashboardScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
├── services/          # API services
│   └── api.js
├── components/        # Reusable components
├── assets/           # Images, fonts, etc.
└── utils/            # Utility functions
```

## 🔌 API Endpoints

The app integrates with your Python backend through these endpoints:

- **Authentication**: `/login`, `/register`
- **User Management**: `/user/profile`, `/user/change-password`
- **Projects**: `/projects`, `/projects/:id`
- **Teams**: `/teams`, `/teams/:id/invite`
- **Hackathon**: `/hackathon`, `/hackathon/leaderboard`

## 🎯 Key Features

### Authentication System
- Secure login/register with form validation
- JWT token management
- Password visibility toggle
- Social login integration ready

### Dashboard
- Project progress tracking
- Team member management
- Quick action buttons
- Recent activity feed
- Statistics overview

### Profile Management
- User profile editing
- Skill tags
- Contact information
- Settings configuration

### Team Collaboration
- Team creation and management
- Member invitations
- Project assignment
- Progress monitoring

## 🎨 Customization

### Colors
The app uses a consistent color palette defined in the styles:

```javascript
const colors = {
  primary: '#00d4ff',      // Cyan accent
  secondary: '#ff6b6b',    // Red accent
  success: '#4ecdc4',      // Green accent
  warning: '#ffd93d',      // Yellow accent
  background: '#1a1a2e',   // Dark background
  surface: '#16213e',      // Card background
  text: '#ffffff',         // Primary text
  textSecondary: '#b8b8b8' // Secondary text
};
```

### Themes
Easily customize the app's appearance by modifying the theme variables in each screen's styles.

## 🚨 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build errors**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build errors**
   ```bash
   cd ios && pod deintegrate && pod install && cd ..
   ```

4. **Backend connection issues**
   - Ensure your Python backend is running on localhost:5000
   - Check CORS configuration in your backend
   - Verify network permissions in Android/iOS

### Performance Tips

- Use `useCallback` and `useMemo` for expensive operations
- Implement lazy loading for large lists
- Optimize image sizes and formats
- Use React Native's performance profiler

## 📱 Platform Support

- **Android**: API level 21+ (Android 5.0+)
- **iOS**: iOS 12.0+
- **React Native**: 0.72.6

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Push notifications
- Offline mode support
- Real-time chat
- File upload/download
- Advanced analytics
- Multi-language support
- Dark/light theme toggle
- Biometric authentication

---

**Built with ❤️ for Hackathon25**
