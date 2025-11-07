# 🚀 QUICK SETUP GUIDE

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Add API Keys

Open `src/utils/api.js` and replace these lines:

```javascript
APP_ID: 'YOUR_NUTRITIONIX_APP_ID',    // Get from nutritionix.com
APP_KEY: 'YOUR_NUTRITIONIX_APP_KEY',   // Get from nutritionix.com  
API_KEY: 'YOUR_SPOONACULAR_API_KEY',   // Get from spoonacular.com
```

## Step 3: Run the App
```bash
npm run dev
```

## Step 4: Add Your Logo Images

Place your logo files in the `public/` folder:
- `nutrio-icon.svg` - Your primary logo
- `nutrio-text.svg` - Your secondary logo

## Step 5: Test

Open http://localhost:5173

**Default test login:**
- Any email/password works (demo mode)
- Complete onboarding
- Start using the app!

## Step 6: For iOS (Xcode)

```bash
npm run build
npx cap sync ios
npx cap open ios
```

---

## 🎯 What's Included

✅ All UI fixes (padding, colors, no horizontal scroll)
✅ Daily motivational quotes (365)
✅ Glassmorphism quote card  
✅ Nutritionix API integration (add your keys)
✅ Subscription system (5 free scans/month)
✅ Account page with dark mode
✅ All gamification working
✅ Mobile-first design

---

## 💡 Quick Tips

- **No API keys?** App uses mock data - still fully functional
- **Dark mode?** Toggle in Account page
- **Test premium?** Set `localStorage.setItem('subscriptionTier', 'premium')`
- **Reset scans?** Set `localStorage.setItem('scansThisMonth', '0')`

---

Need help? Check the main README.md!
