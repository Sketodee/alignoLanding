import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.email || '',
    email: user?.email || '',
  });

  // Get first letter of email for large profile icon
  const getProfileInitial = () => {
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const handleSave = () => {
    // Here you would typically make an API call to update user info
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
    // You might want to update the user context here
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.email || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubscriptionClick = () => {
    navigate('/subscription');
  };

  const handleAffiliateClick = () => {
    navigate('/affiliate');
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="w-[95%] lg:w-[80%]  mx-auto">
          {/* Header */}
          <div className="bg-zinc-900 rounded-xl p-4 sm:p-6 mb-6 border border-zinc-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile</h1>
              <button
                onClick={() => navigate('/')}
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm sm:text-base"
              >
                ← Back to Home
              </button>
            </div>

            {/* Profile Info Section */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {getProfileInitial()}
              </div>
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h2 className="text-lg font-semibold text-white mb-1">
                      {user.email || 'User'}
                    </h2>
                    <p className="text-gray-400 mb-3">{user.email}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      placeholder="Your name"
                    />
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      placeholder="Your email"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-zinc-900 rounded-xl p-4 sm:p-6 mb-6 border border-zinc-700/50">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-zinc-700 space-y-1 sm:space-y-0">
                <span className="text-gray-400 text-sm sm:text-base">Member since</span>
                <span className="text-white text-sm sm:text-base">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-zinc-700 space-y-1 sm:space-y-0">
                <span className="text-gray-400 text-sm sm:text-base">Account status</span>
                <span className="text-green-400 bg-green-400/20 px-2 py-1 rounded-full text-xs sm:text-sm w-fit">
                  Active
                </span>
              </div>

              <div
                onClick={handleSubscriptionClick}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 space-y-1 sm:space-y-0 cursor-pointer hover:bg-zinc-800/50 rounded-md px-2 -mx-2 transition-colors group border border-transparent hover:border-zinc-600 "
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm sm:text-base">Subscription</span>
                  <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full sm:hidden">
                    Tap to manage
                  </span>
                </div>
                <div className="hidden md:block flex items-center space-x-2">
                  {/* <span className="text-purple-400 text-sm sm:text-base">Free Plan</span> */}
                  <svg
                    className="w-4 h-4 text-purple-400 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div
                onClick={handleAffiliateClick}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 space-y-1 sm:space-y-0 cursor-pointer hover:bg-zinc-800/50 rounded-md px-2 -mx-2 transition-colors group border border-transparent hover:border-zinc-600"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm sm:text-base">Affiliate</span>
                  <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full sm:hidden">
                    Tap to manage
                  </span>
                </div>
                <div className="hidden md:block flex items-center space-x-2">
                  {/* <span className="text-purple-400 text-sm sm:text-base">Free Plan</span> */}
                  <svg
                    className="w-4 h-4 text-purple-400 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>


            </div>
          </div>

          {/* Settings */}
          <div className="bg-zinc-900 rounded-xl p-4 sm:p-6 mb-6 border border-zinc-700/50">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Settings</h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full text-left px-3 sm:px-4 py-3 text-white hover:bg-zinc-800 rounded-md transition-colors text-sm sm:text-base">
                Change Password
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-3 text-white hover:bg-zinc-800 rounded-md transition-colors text-sm sm:text-base">
                Privacy Settings
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-3 text-white hover:bg-zinc-800 rounded-md transition-colors text-sm sm:text-base">
                Notification Preferences
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-950/50 rounded-xl p-4 sm:p-6 border border-red-800/50">
            <h3 className="text-lg sm:text-xl font-semibold text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors font-medium text-sm sm:text-base"
              >
                Logout
              </button>
              <button className="w-full bg-red-800 hover:bg-red-900 text-white py-3 rounded-md transition-colors text-sm sm:text-base">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;