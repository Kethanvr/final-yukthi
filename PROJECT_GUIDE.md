# InstaScan MVP - Product Safety Scanner

A complete Next.js application that scans products and analyzes their safety for different user profiles using mock AI capabilities.

## 🚀 Features

- **Multi-Profile System**: Create and manage multiple family member profiles
- **Smart Product Scanner**: Simulated AI-powered product analysis
- **Safety Analysis**: Comprehensive safety checks for Food, Cosmetics, and Medicine
- **Profile Switching**: Instantly re-analyze products for different profiles
- **AI Chat Assistant**: Ask questions about scanned products
- **Scan History**: Track all previously scanned products
- **Reminders**: Expiry tracking and medicine intake reminders

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Data Storage**: LocalStorage (mock backend)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## 🗂️ Project Structure

```
app/
  (auth)/          # Authentication screens
  (onboarding)/    # Profile creation wizard
  (main)/          # Main application screens
lib/
  context/         # React Context for state management
  mockData/        # Mock product and profile data
  utils/           # Mock AI pipeline utilities
  types/           # TypeScript type definitions
  constants/       # App constants
components/        # Reusable React components
```

## 🎯 User Flow

1. **Login/Signup** → Choose or create a profile
2. **Onboarding** → Complete 6-step health profile wizard
3. **Home** → View dashboard with scan history
4. **Camera** → Scan product (simulated)
5. **Results** → View safety analysis
6. **Profile Switch** → Re-analyze for different family member
7. **Chat** → Ask AI about product safety
8. **History** → Browse past scans

## 💡 Mock Data

The app includes:
- 20 pre-loaded products (Food, Cosmetic, Medicine)
- 4 sample profiles (Grandma, Baby, Adult, Pregnant)
- Intelligent safety analysis based on health profiles
- Context-aware AI chat responses

## 🔧 Key Features

### Profile-Based Safety Analysis
- Checks allergies, chronic conditions, dietary preferences
- Age-appropriate warnings (babies, pregnancy, elderly)
- Ingredient-level analysis
- Nutritional risk assessment

### Multi-Agent Pipeline (Simulated)
- **Stage 1**: Product extraction (2-3s delay)
- **Stage 2**: Safety analysis (instant)
- **Stage 3**: AI chat (context-aware responses)

### Profile Switching
- Instant re-analysis without re-scanning
- Maintains scan history per profile
- Updates chat context automatically

## 📱 Screens

- ✅ Login & Signup
- ✅ 6-Step Onboarding Wizard
- ✅ Home Dashboard
- ✅ Camera/Scanner
- ✅ Results Page
- ✅ Scan History
- ✅ Profile Management
- ✅ Reminders
- ✅ AI Chat

## 🎨 Design Highlights

- Mobile-first responsive design
- Bottom navigation for easy access
- Floating scan button
- Color-coded safety badges (Green/Yellow/Red)
- Gradient backgrounds
- Smooth transitions

## 🧪 Testing

Since this is a mock MVP:
1. Go to `/login` to start
2. Select a pre-loaded profile or create new one
3. Scan products (selects random product from database)
4. Switch profiles to see different safety analyses
5. Chat with AI about products

## 📝 Notes

- All data stored in localStorage
- No backend API calls
- Simulated processing delays for realism
- Mock AI responses based on pattern matching
- Profile switching re-runs analysis instantly

## 🚀 Deployment

```bash
npm run build
npm run start
```

Deploy to Vercel, Netlify, or any Next.js-compatible platform.

## 📄 License

MIT


