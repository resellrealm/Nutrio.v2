import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Flame, 
  Award,
  Calendar,
  BarChart3,
  Activity,
  Utensils,
  Clock,
  ChevronRight,
  Star,
  Zap
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data
  const weeklyData = [
    { day: 'Mon', calories: 1850, protein: 95, carbs: 210, fats: 65 },
    { day: 'Tue', calories: 2100, protein: 110, carbs: 240, fats: 70 },
    { day: 'Wed', calories: 1950, protein: 102, carbs: 220, fats: 68 },
    { day: 'Thu', calories: 2050, protein: 108, carbs: 235, fats: 72 },
    { day: 'Fri', calories: 1900, protein: 98, carbs: 215, fats: 66 },
    { day: 'Sat', calories: 2200, protein: 115, carbs: 250, fats: 75 },
    { day: 'Sun', calories: 1650, protein: 78, carbs: 180, fats: 55 }
  ];

  const macroDistribution = [
    { name: 'Protein', value: 25, color: '#10b981' },
    { name: 'Carbs', value: 45, color: '#84cc16' },
    { name: 'Fats', value: 30, color: '#f59e0b' }
  ];

  const recentMeals = [
    { id: 1, name: 'Green Power Smoothie', time: '8:30 AM', calories: 320, type: 'breakfast' },
    { id: 2, name: 'Quinoa Buddha Bowl', time: '1:00 PM', calories: 380, type: 'lunch' },
    { id: 3, name: 'Apple with Almond Butter', time: '3:30 PM', calories: 180, type: 'snack' }
  ];

  const todayStats = {
    calories: { current: 880, target: 2000 },
    protein: { current: 45, target: 120 },
    water: { current: 5, target: 8 },
    steps: { current: 6543, target: 10000 }
  };

  const achievements = [
    { name: 'Hot Streak', progress: '3 days', icon: Flame, color: 'text-orange-500' },
    { name: 'Protein Goal', progress: '38%', icon: Target, color: 'text-purple-500' },
    { name: 'Weekly Champion', progress: '5/7 days', icon: Award, color: 'text-yellow-500' }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={color} size={24} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Here's your nutrition overview for today</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Calories Today"
          value={`${todayStats.calories.current}`}
          subtitle={`of ${todayStats.calories.target} goal`}
          icon={Activity}
          color="text-primary"
          onClick={() => navigate('/analyze')}
        />
        <StatCard
          title="Current Streak"
          value="7 days"
          subtitle="Personal best!"
          icon={Flame}
          color="text-orange-500"
          onClick={() => navigate('/achievements')}
        />
        <StatCard
          title="Level Progress"
          value="Level 5"
          subtitle="450/500 XP"
          icon={Zap}
          color="text-yellow-500"
          onClick={() => navigate('/achievements')}
        />
        <StatCard
          title="Goals Met"
          value="4/7"
          subtitle="This week"
          icon={Target}
          color="text-purple-500"
          onClick={() => navigate('/goals')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Progress */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <BarChart3 className="mr-2 text-primary" size={20} />
              Today's Progress
            </h2>
            <button 
              onClick={() => navigate('/goals')}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
            >
              View Details
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={(todayStats.calories.current / todayStats.calories.target) * 100}
                  text={`${Math.round((todayStats.calories.current / todayStats.calories.target) * 100)}%`}
                  styles={buildStyles({
                    textColor: '#10b981',
                    pathColor: '#10b981',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">Calories</p>
              <p className="text-xs text-gray-500">{todayStats.calories.current}/{todayStats.calories.target}</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={(todayStats.protein.current / todayStats.protein.target) * 100}
                  text={`${Math.round((todayStats.protein.current / todayStats.protein.target) * 100)}%`}
                  styles={buildStyles({
                    textColor: '#84cc16',
                    pathColor: '#84cc16',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">Protein</p>
              <p className="text-xs text-gray-500">{todayStats.protein.current}g/{todayStats.protein.target}g</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={(todayStats.water.current / todayStats.water.target) * 100}
                  text={`${todayStats.water.current}/${todayStats.water.target}`}
                  styles={buildStyles({
                    textColor: '#3b82f6',
                    pathColor: '#3b82f6',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">Water</p>
              <p className="text-xs text-gray-500">glasses</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={(todayStats.steps.current / todayStats.steps.target) * 100}
                  text={`${Math.round((todayStats.steps.current / todayStats.steps.target) * 100)}%`}
                  styles={buildStyles({
                    textColor: '#f59e0b',
                    pathColor: '#f59e0b',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">Steps</p>
              <p className="text-xs text-gray-500">{todayStats.steps.current.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Macro Distribution */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Macro Distribution</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {macroDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {macroDistribution.map((macro) => (
              <div key={macro.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                  <span className="text-sm text-gray-700">{macro.name}</span>
                </div>
                <span className="text-sm font-semibold">{macro.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Trends and Recent Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Calorie Trends */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-primary" size={20} />
            Weekly Calorie Trends
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Meals */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Utensils className="mr-2 text-primary" size={20} />
              Today's Meals
            </h2>
            <button 
              onClick={() => navigate('/history')}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
            >
              View All
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentMeals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    meal.type === 'breakfast' ? 'bg-yellow-100' :
                    meal.type === 'lunch' ? 'bg-green-100' :
                    meal.type === 'dinner' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    {meal.type === 'breakfast' ? '🌅' :
                     meal.type === 'lunch' ? '☀️' :
                     meal.type === 'dinner' ? '🌙' : '🍿'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{meal.name}</p>
                    <p className="text-xs text-gray-500">{meal.time}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">{meal.calories} cal</span>
              </div>
            ))}
            
            <button 
              onClick={() => navigate('/analyze')}
              className="w-full mt-4 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              + Log Next Meal
            </button>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="mt-8 bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Award className="mr-2 text-yellow-500" size={20} />
            Recent Progress
          </h2>
          <button 
            onClick={() => navigate('/achievements')}
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
          >
            View All Achievements
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 flex items-center space-x-3"
              >
                <div className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center`}>
                  <Icon className={achievement.color} size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{achievement.name}</p>
                  <p className="text-sm text-gray-600">{achievement.progress}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
