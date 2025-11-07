# 🌱 Nutrio - AI-Powered Nutrition Tracker

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Xcode (for iOS development)

### Installation

1. **Install dependencies:**
```bash
cd nutrio-app-complete
npm install
```

2. **Set up API keys:**

Edit `src/utils/api.js` and add your API keys:

```javascript
export const API_CONFIG = {
  NUTRITIONIX: {
    APP_ID: 'your_app_id_here',
    APP_KEY: 'your_app_key_here',
  },
  SPOONACULAR: {
    API_KEY: 'your_api_key_here',
  },
};
```

**Get your API keys:**
- **Nutritionix**: https://www.nutritionix.com/business/api
  - Free tier: 200 requests/day
  - Sign up and get APP_ID and APP_KEY
- **Spoonacular**: https://spoonacular.com/food-api
  - Free tier: 150 requests/day
  - Sign up and get API_KEY

3. **Run development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

---

## 📱 iOS Setup with Capacitor

### Install Capacitor
```bash
cd ..
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init
```

### Add iOS platform
```bash
npx cap add ios
```

### Sync web code to iOS
```bash
cd nutrio-app-complete
npm run build
npx cap sync
```

### Open in Xcode
```bash
npx cap open ios
```

---

## ✨ What's New

### Fixed Issues:
✅ Removed "Welcome back" message - replaced with daily motivational quotes
✅ Removed bell and user icons from header
✅ Fixed iOS safe area padding (no more overlap with status bar)
✅ Fixed horizontal scroll - now ONLY vertical scrolling
✅ Mobile-first responsive design
✅ Updated to teal color palette (#7fc7a1)
✅ Added your custom logos

### New Features:
✅ **Daily Quotes System** - 365 motivational quotes that rotate daily
✅ **Glassmorphism Quote Card** - Beautiful frosted glass effect with animated border
✅ **Nutritionix API Integration** - Real food recognition from photos
✅ **Subscription System** - Free tier (5 scans/month) vs Premium (£7.99 - unlimited)
✅ **Account Page** - Complete profile management with dark mode toggle
✅ **Dark Mode** - Full dark theme support
✅ **Scan Limit Tracking** - Automatically tracks monthly scan usage
✅ **Enhanced Gamification** - XP, levels, achievements all working
✅ **Recipe Recommendations** - Personalized based on diet and preferences

---

## 🎯 Core Features

### 1. **Meal Analyzer**
- Take photo of food
- AI analyzes and returns nutrition data
- Save to meal history
- Add to favorites

### 2. **Dashboard**
- Daily nutrition overview
- Progress rings for goals
- Weekly trends chart
- Recent meals
- Current streak display

### 3. **Goals Tracking**
- Custom calorie goals
- Macro targets (protein, carbs, fats)
- Micronutrients (fiber, vitamins)
- Progress visualization

### 4. **Achievements & Gamification**
- XP system (+10 per meal, +25 protein goal, +50 all goals)
- Level progression (1-20+)
- Badges and achievements
- Streak tracking
- Leaderboards (coming soon)

### 5. **Meal Planner**
- Scan fridge/cupboard
- Get meal suggestions
- Filter by difficulty and meal type
- Personalized recommendations

### 6. **Favourites**
- Save meals
- Cookbook scanning (OCR)
- Recipe collections
- Import from URLs

### 7. **History**
- Complete meal log
- Filter by date
- Search meals
- Weekly summaries

### 8. **Account/Profile**
- Personal details
- Goals & preferences
- **Dark mode toggle**
- Subscription management
- Notification settings
- Data export

---

## 💰 Subscription System

### Free Tier:
- 5 food scans per month
- Basic dashboard
- 7-day history
- Limited achievements

### Premium (£7.99/month):
- **Unlimited food scans**
- Full meal planner
- Complete history
- All achievements
- Recipe scanning
- Data export
- Priority support

**Implementation:**
- Scan counter in `localStorage`
- Resets monthly automatically
- Paywall prompts when limit reached

---

## 🎨 Design System

### Colors:
- **Primary**: `#7fc7a1` (Teal)
- **Accent**: `#6bb591` (Darker Teal)
- **Background Light**: `#f9fafb`
- **Background Dark**: `#111827`

### Typography:
- **Font**: Inter
- Weights: 300, 400, 500, 600, 700, 800

### Components:
- Glassmorphism cards
- Smooth animations
- iOS-style toggles
- Progress rings
- Gradient buttons

---

## 📁 Project Structure

```
nutrio-app-complete/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       └── Layout.jsx          # Main app layout with sidebar
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MealAnalyzer.jsx
│   │   ├── MealPlanner.jsx
│   │   ├── Goals.jsx
│   │   ├── Favourites.jsx
│   │   ├── Achievements.jsx
│   │   ├── History.jsx
│   │   └── Account.jsx             # NEW: Account/profile page
│   ├── store/
│   │   ├── store.js                # Redux store
│   │   ├── authSlice.js
│   │   ├── nutritionSlice.js
│   │   └── achievementsSlice.js
│   ├── utils/
│   │   ├── api.js                  # API functions (Nutritionix, Spoonacular)
│   │   └── helpers.js              # Helper utilities
│   ├── data/
│   │   └── quotes.js               # 365 daily quotes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── nutrio-icon.svg
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔧 Key Files to Know

### `src/utils/api.js`
- Contains all API configurations
- Nutritionix integration for food recognition
- Spoonacular integration for recipes
- Subscription/scan limit logic
- **YOU MUST ADD YOUR API KEYS HERE**

### `src/data/quotes.js`
- 365 motivational quotes
- Auto-rotates daily
- Categorized (health, confidence, drive, etc.)

### `src/components/Layout/Layout.jsx`
- Main app shell
- Sidebar navigation
- Quote card display
- Dark mode toggle
- Mobile responsive

### `src/pages/Account.jsx`
- Profile management
- Dark mode settings
- Subscription info
- Notification preferences

---

## 📝 TODO / Next Steps

### Phase 2 Features (Future):
- [ ] Barcode scanner
- [ ] Water tracker
- [ ] Voice logging
- [ ] Apple Health sync
- [ ] Restaurant menu scanner
- [ ] Social features (friends, challenges, leaderboards)
- [ ] Meal prep planner
- [ ] Advanced analytics

---

## 🐛 Known Issues

None currently! All core features working.

---

## 💡 Tips

1. **Testing without API keys**: 
   - The app uses mock data when API keys aren't set
   - You can still test all features

2. **Dark Mode**:
   - Toggle in Account page
   - Persists across sessions
   - Smooth transitions

3. **Subscription Testing**:
   - Free users get 5 scans/month
   - Counter resets automatically each month
   - Test by changing `localStorage` values

4. **Mobile Testing**:
   - Use iOS Simulator
   - Or build to device via Xcode
   - Responsive design works on all screen sizes

---

## 📞 Support

For issues or questions:
- Check the code comments
- Review API documentation
- Contact: your-email@example.com

---

## 📄 License

MIT License - See LICENSE file

---

**Made with 💚 by the Nutrio Team**
