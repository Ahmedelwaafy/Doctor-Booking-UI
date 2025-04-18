# Doctor Appointment Booking System

A modern, responsive web application for booking doctor appointments. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🏥 Browse and filter doctors by specialty and availability
- 📅 Book appointments with real-time availability checking
- 📱 Responsive design with grid/list view options
- 🌓 Light/dark mode support
- 🎯 Accessible UI components
- ⚡ Fast and smooth animations
- 🌐 Internationalization (i18n) support with RTL
- 🔔 Toast notifications for user actions
- 🛡️ Error boundary for graceful error handling
- 🎨 SEO-friendly with proper meta tags

## Extra Features

Beyond the core requirements, this project includes several additional enhancements:

1. **Advanced Internationalization**
   - Full RTL support for Arabic language
   - Automatic language detection
   - Language switcher component
   - Dynamic HTML direction handling

2. **Enhanced SEO & Meta Tags**
   - React Helmet integration for dynamic meta tags
   - OpenGraph and Twitter card support
   - Canonical URL handling
   - Language-specific meta information

3. **Robust Error Handling**
   - Error Boundary implementation
   - Fallback UI for error states
   - Error recovery mechanisms
   - Detailed error reporting

4. **User Feedback System**
   - Toast notifications for actions
   - Success/error state handling
   - Non-intrusive notification positioning
   - Rich notification styling
   
5. **URL as Single Source of Truth**
   - Filter criteria saved in the URL
   - Shareable and bookmarkable URLs
   - Seamless state restoration from URL

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # React components
├── context/       # React context for state management
├── data/         # Mock data and constants
├── lib/          # Utility functions
└── types/        # TypeScript type definitions
```

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Development**: Vite
- **Notifications**: Sonner
- **SEO**: React Helmet Async
- **Error Handling**: React Error Boundary
- **Internationalization**: i18next

## AI Tools Usage

This project was developed with the assistance of AI tools:

1. **Code Structure**: Used AI to establish the initial project structure and component organization
2. **UI Components**: Generated base component templates that were then customized
3. **TypeScript Types**: Validated and refined type definitions
4. **Accessibility**: Implemented ARIA labels and keyboard navigation

## Known Limitations

1. **Data Persistence**: Currently uses mock data; needs integration with a backend
2. **Authentication**: User authentication system needs to be implemented
3. **Form Validation**: Additional validation for appointment booking required
4. **Error Handling**: More comprehensive error handling needed
5. **Testing**: Unit and integration tests to be added

## Next Steps

1. **Backend Integration**
   - Implement API endpoints
   - Add real-time availability updates
   - Set up database for persistent storage

2. **Authentication**
   - Add user registration and login
   - Implement role-based access control
   - Add profile management

3. **Enhanced Features**
   - Email notifications for appointments
   - Calendar integration
   - Appointment rescheduling
   - Doctor reviews and ratings

4. **Testing**
   - Add unit tests for components
   - Implement integration tests
   - Set up end-to-end testing

5. **Performance**
   - Implement lazy loading for images
   - Add service worker for offline support
   - Optimize bundle size

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.