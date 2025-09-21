# 🛒 E-commerce Platform

A modern, full-featured e-commerce platform built with React, TypeScript, and Vite. This project aims to create a comprehensive online shopping experience similar to popular platforms like Shopee and Lazada.

## ✨ Features

### 👥 Multi-User System
- **🛍️ Customers**: Browse products, manage cart, place orders, track purchases
- **🏪 Vendors**: Manage store, products, variants, process orders with analytics dashboard
- **👨‍💼 Admin**: System management with modern dashboard and comprehensive analytics
- **👤 Guest Users**: Browse and search products (registration required for purchases)

### 🛍️ Core Shopping Features
- **Product Catalog**: Advanced product browsing with variants and attributes
- **Smart Search**: Real-time search with context management
- **Shopping Cart**: Full cart management with quantity controls
- **Checkout Process**: Complete order placement system
- **Order Tracking**: Real-time order status updates
- **Wishlist**: Save favorite products
- **Product Reviews**: Rating and review system

### 📊 Vendor Dashboard
- **Analytics Charts**: Revenue tracking, order status distribution, store ratings
- **Product Management**: Create, update, and manage product variants
- **Order Processing**: Comprehensive order management with status updates
- **Store Profile**: Complete store information management

### 🎛️ Admin Panel
- **Modern Dashboard**: Built with Shadcn/UI components
- **System Analytics**: Interactive charts and data visualization
- **User Management**: Comprehensive user and vendor administration

### 🚀 Technical Features
- **Real-time Updates**: Socket.IO integration for live notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Code splitting, lazy loading, and efficient state management
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Beautiful interfaces with multiple component libraries

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme
- **UI Libraries**: 
  - Material-UI (MUI) - Data tables, pagination
  - Shadcn/UI - Modern admin components
  - Radix UI - Accessible components
  - Lucide React - Icons
- **Charts**: Chart.js, Recharts for analytics
- **State Management**: React Context API
- **Routing**: React Router DOM v7
- **Forms**: Formik + Yup validation
- **Real-time**: Socket.IO Client

### Additional Features
- **Authentication**: JWT + Firebase integration
- **Image Processing**: Sharp for optimization
- **Animations**: Motion & Tailwind animate
- **Notifications**: React Toastify + Sonner
- **Development**: ESLint, TypeScript strict mode

## 📋 Prerequisites

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher (or yarn/pnpm)
- **Git**: Latest version

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd vite-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# API Configuration
VITE_SERVER_PORT=your_server_port
VITE_API_HOST=your_domain_server

VITE_CLOUD_B_URL=your_cloud_storage_url+'/'
VITE_CLOUD_NAME=your_cloud_id+'/'
VITE_CLOUD_T_I=your_asset_type+'/'
VITE_CLOUD_VER='upload/'+your_cloud_version+'/'
VITE_CLOUD_F_P=your_asset_folder
```

### 4. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run test` - Start development server with host flag  
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
vite-project/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, CSS, static files
│   │   ├── css/           # Custom CSS files
│   │   └── img/           # Images and icons
│   ├── components/        # Reusable components
│   │   ├── forms/         # Form components
│   │   ├── loading/       # Loading states
│   │   ├── modules/       # Feature modules
│   │   ├── ui/            # Shadcn/UI components
│   │   └── ui-custom/     # Custom UI components
│   ├── context/           # React Context providers
│   │   ├── ProductContext.tsx
│   │   ├── SearchContext.tsx
│   │   ├── UserContext.tsx
│   │   └── VendorContext.tsx
│   ├── pages/             # Page components
│   │   ├── Global/        # Public pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── guest/         # Customer pages
│   │   └── vendor/        # Vendor management
│   ├── services/          # API services and configs
│   ├── utils/             # Utility functions and types
│   └── App.tsx            # Main app component
├── firebase.ts            # Firebase configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Key Features Detail

### Multi-Role Dashboard
- **Customer Dashboard**: Order history, wishlist, profile management
- **Vendor Dashboard**: Sales analytics, product management, order processing
- **Admin Dashboard**: System overview, user management, platform analytics

### Advanced Product Management
- **Product Variants**: Multiple versions with different attributes
- **Image Galleries**: Slideshow product images
- **Inventory Tracking**: Stock management per variant
- **Pricing Control**: Flexible pricing for different variants

### Real-time Features
- **Live Order Updates**: Instant order status changes
- **Search Suggestions**: Real-time search results
- **Notifications**: Live system notifications

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom CSS variables for theming
- Extended color palette
- Animation support
- Responsive breakpoints

### TypeScript
Strict TypeScript configuration with:
- Path aliases (`@/*` for `src/*`)
- Strict type checking
- Modern ES2020+ target

## 🐛 Known Issues

- Firebase configuration needs to be properly set up for authentication
- Socket.IO server URL needs to be configured for real-time features
- Some API endpoints may need backend implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow the established project structure
- Use TypeScript for all new components
- Implement responsive design for all UI elements
- Add proper error handling and loading states
- Write meaningful commit messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- **Vercel** - Automatic deployments from Git
- **Netlify** - Easy static site hosting
- **Firebase Hosting** - Google's hosting solution

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Roadmap

- [ ] Payment gateway integration
- [ ] Advanced search filters
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] AI-powered product recommendations
- [ ] Advanced vendor analytics
- [ ] Chat system between buyers and sellers

---

**Built with ❤️ using modern web technologies**
