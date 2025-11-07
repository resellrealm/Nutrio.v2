import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Star, 
  Target, 
  Zap, 
  TrendingUp,
  Lock,
  Unlock,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Flame,
  Diamond,
  Crown,
  Medal,
  Heart,
  Leaf,
  Camera,
  ChefHat,
  Clock,
  Moon,
  Sun,
  Users,
  CheckCircle
} from 'lucide-react';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';

// Safe percentage helper to avoid NaN/Infinity
const safePct = (current, target) => {
  const safeTarget = Math.max(1, target || 0);
  const raw = Math.round((current / safeTarget) * 100);
  return Math.max(0, Math.min(100, raw));
};

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  
  // User stats (would come from backend)
  const [userStats] = useState({
    level: 5,
    currentXP: 450,
    nextLevelXP: 500,
    totalPoints: 2450,
    rank: 'Meal Master',
    nextRank: 'Macro Guru',
    totalAchievements: 12,
    recentUnlock: 'Hot Streak'
  });

  const levelRanks = [
    { level: 1, name: 'Nutrition Newbie', minXP: 0 },
    { level: 5, name: 'Meal Master', minXP: 500 },
    { level: 10, name: 'Macro Guru', minXP: 1500 },
    { level: 15, name: 'Diet Champion', minXP: 3000 },
    { level: 20, name: 'Nutrition Legend', minXP: 5000 },
    { level: 25, name: 'Health Hero', minXP: 7500 },
    { level: 30, name: 'Wellness Warrior', minXP: 10000 }
  ];

  const achievements = [
    // Streak Achievements
    {
      id: 'hot_streak',
      name: 'Hot Streak',
      description: '3 days in a row',
      icon: Flame,
      category: 'streak',
      points: 50,
      unlocked: true,
      progress: 3,
      maxProgress: 3,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'on_fire',
      name: 'On Fire',
      description: '7 days in a row',
      icon: Zap,
      category: 'streak',
      points: 100,
      unlocked: true,
      progress: 7,
      maxProgress: 7,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 'unstoppable',
      name: 'Unstoppable',
      description: '30 days in a row',
      icon: Diamond,
      category: 'streak',
      points: 500,
      unlocked: false,
      progress: 7,
      maxProgress: 30,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    
    // Goal Achievements
    {
      id: 'protein_king',
      name: 'Protein King',
      description: 'Hit protein goal 10 times',
      icon: Trophy,
      category: 'goals',
      points: 150,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'perfect_balance',
      name: 'Perfect Balance',
      description: 'Hit all macros in one day',
      icon: Target,
      category: 'goals',
      points: 200,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 'consistent_champion',
      name: 'Consistent Champion',
      description: 'Hit goals 7 days straight',
      icon: Medal,
      category: 'goals',
      points: 300,
      unlocked: false,
      progress: 3,
      maxProgress: 7,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-100'
    },
    
    // Dietary Achievements
    {
      id: 'veggie_warrior',
      name: 'Veggie Warrior',
      description: 'Log 10 vegetarian meals',
      icon: Leaf,
      category: 'dietary',
      points: 100,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'plant_power',
      name: 'Plant Power',
      description: '7-day vegetarian streak',
      icon: Heart,
      category: 'dietary',
      points: 200,
      unlocked: false,
      progress: 2,
      maxProgress: 7,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 'vegan_victory',
      name: 'Vegan Victory',
      description: 'Log 10 vegan meals',
      icon: Sparkles,
      category: 'dietary',
      points: 150,
      unlocked: false,
      progress: 4,
      maxProgress: 10,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100'
    },
    {
      id: 'diverse_eater',
      name: 'Diverse Eater',
      description: 'Try different diet types',
      icon: Users,
      category: 'dietary',
      points: 250,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100'
    },
    
    // Exploration Achievements
    {
      id: 'food_photographer',
      name: 'Food Photographer',
      description: 'Analyze 50 meals',
      icon: Camera,
      category: 'exploration',
      points: 200,
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'chef_planner',
      name: 'Chef Planner',
      description: 'Use meal planner 10 times',
      icon: ChefHat,
      category: 'exploration',
      points: 150,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'variety_master',
      name: 'Variety Master',
      description: 'Log 30 different foods',
      icon: Star,
      category: 'exploration',
      points: 250,
      unlocked: false,
      progress: 18,
      maxProgress: 30,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    
    // Special Achievements
    {
      id: 'early_bird',
      name: 'Early Bird',
      description: 'Log breakfast before 8am (5 times)',
      icon: Sun,
      category: 'special',
      points: 100,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100'
    },
    {
      id: 'night_owl',
      name: 'Night Owl',
      description: 'Log dinner (5 times)',
      icon: Moon,
      category: 'special',
      points: 100,
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      color: 'text-slate-500',
      bgColor: 'bg-slate-100'
    },
    {
      id: 'completionist',
      name: 'Completionist',
      description: 'Unlock all badges',
      icon: Crown,
      category: 'special',
      points: 1000,
      unlocked: false,
      progress: 12,
      maxProgress: 30,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', count: achievements.length },
    { id: 'streak', name: 'Streaks', count: achievements.filter(a => a.category === 'streak').length },
    { id: 'goals', name: 'Goals', count: achievements.filter(a => a.category === 'goals').length },
    { id: 'dietary', name: 'Dietary', count: achievements.filter(a => a.category === 'dietary').length },
    { id: 'exploration', name: 'Exploration', count: achievements.filter(a => a.category === 'exploration').length },
    { id: 'special', name: 'Special', count: achievements.filter(a => a.category === 'special').length }
  ];

  // Filter achievements
  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
    if (!achievement.unlocked && achievement.progress === achievement.maxProgress) {
      // Simulate unlocking
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      toast.success(`🎉 Achievement Unlocked: ${achievement.name}!`);
    }
  };

  const AchievementCard = ({ achievement }) => {
    const Icon = achievement.icon;
    const progressPercentage = safePct(achievement.progress, achievement.maxProgress);
    
    return (
      <motion.div
        whileHover={{ scale: achievement.unlocked ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleAchievementClick(achievement)}
        className={`relative cursor-pointer ${
          achievement.unlocked ? 'opacity-100' : 'opacity-75'
        }`}
      >
        <div className={`bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 ${
          achievement.unlocked ? '' : 'grayscale'
        }`}>
          {/* Lock overlay for locked achievements */}
          {!achievement.unlocked && (
            <div className="absolute inset-0 bg-gray-900/10 rounded-xl flex items-center justify-center">
              <Lock className="text-gray-600" size={24} />
            </div>
          )}
          
          {/* Achievement content */}
          <div className="flex items-start space-x-4">
            <div className={`w-14 h-14 ${achievement.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon className={achievement.color} size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Zap className="text-yellow-500" size={16} />
                  <span className="text-sm font-semibold text-gray-700">
                    +{achievement.points} XP
                  </span>
                </div>
                {achievement.unlocked && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Unlocked
                  </span>
                )}
              </div>
              
              {/* Progress bar */}
              {!achievement.unlocked && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Confetti animation */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Trophy className="mr-3 text-yellow-500" size={32} />
          Achievements
        </h1>
        <p className="text-gray-600 mt-2">Track your progress and unlock rewards</p>
      </div>

      {/* User Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-accent rounded-2xl shadow-xl p-6 mb-8 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-2">Current Level</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">{userStats.level}</span>
              <span className="text-lg opacity-80">{userStats.rank}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1 text-white/70">
                <span>XP Progress</span>
                <span>{userStats.currentXP}/{userStats.nextLevelXP}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${safePct(userStats.currentXP, userStats.nextLevelXP)}%` }}
                />
              </div>
              <p className="text-xs text-white/70 mt-1">
                Next: {userStats.nextRank}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-2">Total Points</h3>
            <div className="flex items-center space-x-3">
              <Zap className="text-yellow-300" size={32} />
              <span className="text-4xl font-bold">{userStats.totalPoints}</span>
            </div>
            <p className="text-sm text-white/80 mt-2">
              Earned from {userStats.totalAchievements} achievements
            </p>
          </div>
          
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-2">Recent Unlock</h3>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Flame className="text-orange-300" size={24} />
                <div>
                  <p className="font-semibold">{userStats.recentUnlock}</p>
                  <p className="text-xs text-white/70">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-600" size={20} />
            <span className="text-sm text-gray-600">Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Achievement Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary to-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
            <span className="ml-2 text-sm opacity-80">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Level Progression</h3>
        <div className="space-y-3">
          {levelRanks.map((rank) => (
            <div key={rank.level} className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                userStats.level >= rank.level 
                  ? 'bg-gradient-to-r from-primary to-accent text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {rank.level}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  userStats.level >= rank.level ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {rank.name}
                </p>
                <p className="text-xs text-gray-500">{rank.minXP} XP required</p>
              </div>
              {userStats.level >= rank.level && (
                <CheckCircle className="text-green-500" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              {(() => {
                const IconInModal = selectedAchievement?.icon;
                return (
                  <div className="text-center">
                    <div className={`w-20 h-20 ${selectedAchievement.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      {IconInModal && <IconInModal className={selectedAchievement.color} size={40} />}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedAchievement.name}</h2>
                    <p className="text-gray-600 mb-4">{selectedAchievement.description}</p>
                    
                    <div className="flex items-center justify-center space-x-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Points</p>
                        <p className="text-xl font-bold text-gray-800">+{selectedAchievement.points} XP</p>
                      </div>
                      <div className="w-px h-12 bg-gray-200" />
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <p className="text-xl font-bold text-gray-800">
                          {selectedAchievement.progress}/{selectedAchievement.maxProgress}
                        </p>
                      </div>
                    </div>
                    
                    {selectedAchievement.unlocked ? (
                      <div className="bg-green-100 text-green-700 py-2 px-4 rounded-lg">
                        ✅ Achievement Unlocked!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                            style={{ width: `${safePct(selectedAchievement.progress, selectedAchievement.maxProgress)}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          Complete {selectedAchievement.maxProgress - selectedAchievement.progress} more to unlock!
                        </p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setSelectedAchievement(null)}
                      className="mt-6 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;