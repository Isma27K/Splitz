# Splitz 💰

A modern personal finance management application built with Electron, React, and TypeScript. Splitz helps you track your income, manage accounts, monitor commitments, and maintain financial records with an intuitive and beautiful interface.

## 🚀 Features

### 💳 Account Management
- **Multiple Account Types**: Support for pocket money, short-term, and long-term accounts
- **Asset Tracking**: Monitor your financial assets with detailed account information
- **Account Proportions**: Set and track proportional allocations across accounts

### 📊 Financial Tracking
- **Income Management**: Set up monthly income and payday tracking
- **Transaction Records**: Detailed record keeping for all financial transactions
- **Commitment Tracking**: Monitor debts and subscriptions with duration-based tracking

### 🔐 User Authentication
- **Secure Login System**: Password-protected access with bcrypt encryption
- **First-Time Setup**: Guided onboarding process for new users
- **User Profile Management**: Personalized financial dashboard

### 🎨 Modern UI/UX
- **Dark/Light Theme**: Toggle between themes with next-themes
- **Responsive Design**: Built with Tailwind CSS and Radix UI components
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Interactive Dashboard**: Real-time financial overview with trending indicators

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions

### Backend & Database
- **Electron** - Cross-platform desktop application framework
- **TypeORM** - Object-relational mapping with SQLite
- **Better SQLite3** - Fast, synchronous SQLite database
- **bcrypt** - Password hashing and security

### Development Tools
- **ESLint** - Code linting and quality
- **Electron Builder** - Application packaging and distribution
- **React Router** - Client-side routing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Splitz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run database migrations** (if needed)
   ```bash
   npm run migration:run
   ```

## 🚀 Usage

### Development Mode
Start the application in development mode with hot reload:
```bash
npm run dev
```

### Production Build
Build the application for production:
```bash
npm run build
```

### Database Management
```bash
# Generate new migration
npm run migration:generate

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## 📱 Application Structure

### Database Entities
- **User**: Stores user credentials, income, and payday information
- **Account**: Manages different types of financial accounts
- **Commitment**: Tracks debts and subscriptions with duration
- **Record**: Transaction records linked to accounts or commitments

### Key Components
- **Dashboard**: Main financial overview with asset cards and trends
- **Asset Management**: Account listing and management interface
- **Authentication**: Secure login and registration system
- **First Setup**: Guided onboarding for new users

## 🔧 Configuration

### Electron Builder
The application uses `electron-builder.json5` for packaging configuration:
- Windows: NSIS installer with custom settings
- macOS: DMG distribution
- Linux: AppImage format

### Database Configuration
- Development: Local SQLite file in project directory
- Production: SQLite file in user data directory
- Auto-migration in production environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Isma27K**

## 🔮 Future Enhancements

- Enhanced reporting and analytics
- Budget planning and forecasting
- Multi-currency support
- Data export/import functionality
- Mobile companion app

---

**Built with**: ❤️ and modern web technologies
