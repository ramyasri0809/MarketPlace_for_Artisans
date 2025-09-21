# CraftBazaar - AI-Powered Traditional Crafts Marketplace

A complete e-commerce platform for traditional Indian crafts with full Flipkart/Amazon-like functionality.

## 🚀 Features

### 🛒 **E-commerce Core**
- Complete product catalog with search and filtering
- Shopping cart with persistent storage
- Multi-step checkout process
- Order management and tracking
- Real-time inventory management

### 💳 **Advanced Payment System**
- Multiple payment methods (UPI, Cards, COD, Net Banking, Wallets)
- Enhanced UPI integration with popular apps (PhonePe, Google Pay, Paytm, etc.)
- Secure UPI PIN entry for transactions
- Payment processing simulation with status tracking
- Delivery charge calculation (Free shipping above ₹2000)

### 👥 **User Management**
- Dual user types: Customers and Artisans
- Complete authentication system (Login/Signup)
- User session management
- Profile management

### 🎨 **Artisan Features**
- Product addition and management
- Artisan dashboard
- Product attribution and tracking

### 📱 **Modern UI/UX**
- Responsive design for all devices
- Traditional craft-themed design (terracotta, amber, orange palette)
- Smooth animations and transitions
- Toast notifications with actions
- Loading states and progress indicators

### 💾 **Data Persistence**
- LocalStorage for cart and orders
- User session persistence
- Product data management

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite

## 📂 Project Structure

```
src/
├── components/
│   ├── Header.tsx                 # Main navigation header
│   ├── ProductGrid.tsx            # Product display grid
│   ├── FilterSidebar.tsx          # Filters and search
│   ├── ProductCard.tsx            # Individual product card
│   └── modals/
│       ├── CartModal.tsx          # Shopping cart
│       ├── CheckoutModal.tsx      # Multi-step checkout
│       ├── AuthModal.tsx          # Login/Signup
│       ├── ProductDetailModal.tsx # Product details
│       ├── OrdersModal.tsx        # Order history
│       ├── AddProductModal.tsx    # Add new product (Artisan)
│       ├── PaymentProcessingModal.tsx # Payment progress
│       ├── OrderStatusModal.tsx   # Order confirmation
│       └── UpiPinModal.tsx        # UPI PIN entry
├── context/
│   └── AppContext.tsx             # Global state management
├── data/
│   └── mockData.ts                # Sample products and data
├── types/
│   └── index.ts                   # TypeScript interfaces
├── utils/
│   └── index.ts                   # Utility functions
├── styles/
│   └── globals.css                # Global styles and Tailwind config
└── App.tsx                        # Main application component
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Clone/Create the project structure**:
```bash
mkdir craftbazaar-marketplace
cd craftbazaar-marketplace
```

2. **Initialize the project**:
```bash
npm init -y
npm install react react-dom typescript @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react tailwindcss
```

3. **Install dependencies**:
```bash
npm install lucide-react sonner
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-slider
npm install @radix-ui/react-tabs @radix-ui/react-progress
```

4. **Copy all the provided files** into their respective directories

5. **Start the development server**:
```bash
npm run dev
```

## 🎯 Key Features Explained

### 🛒 **Cart Persistence**
Cart items and orders are automatically saved to localStorage and persist across browser sessions and user logins/logouts.

### 💳 **Enhanced UPI Payment**
- Select from popular UPI apps (PhonePe, Google Pay, Paytm, Amazon Pay, BHIM)
- Enter 6-digit UPI PIN with custom keypad
- Realistic payment processing simulation
- Support for custom UPI IDs

### 🏪 **Artisan Functionality**
- Artisans can add new products to the marketplace
- Products are immediately available for purchase
- Real-time product grid updates

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly UI elements

## 🎨 Design System

### Color Palette
- **Primary**: Orange/Terracotta tones (#EA580C, #F97316, #FB923C)
- **Secondary**: Amber accents (#F59E0B, #FBBF24)
- **Background**: Gradient from orange-50 to yellow-50
- **Text**: Traditional warm grays and blacks

### Typography
- Clean, modern fonts with traditional warmth
- Proper heading hierarchy
- Readable body text

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any future API integrations:
```env
VITE_API_BASE_URL=your_api_url
VITE_PAYMENT_GATEWAY_KEY=your_payment_key
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom color scheme defined in `globals.css`.

## 🚀 Deployment

### For Development
```bash
npm run dev
```

### For Production
```bash
npm run build
npm run preview
```

### Deploy to Vercel/Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder

## 🧪 Testing Features

### Demo Credentials
- **Email**: demo@craftbazaar.com
- **Password**: demo123
- **User Types**: Customer or Artisan

### Test Payment
- **UPI PIN**: Any 6-digit number (123456)
- **Card Details**: Use any 16-digit number
- **UPI Apps**: Select any app for simulation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Indian artisans for inspiration
- Unsplash for high-quality craft images
- Shadcn for beautiful UI components
- Lucide for consistent icons

## 📞 Support

For support, email support@craftbazaar.com or create an issue in the repository.

---

**Built with ❤️ for preserving traditional Indian crafts and supporting local artisans**