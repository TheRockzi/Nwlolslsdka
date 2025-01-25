import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Shield, User, Ban, Key, RefreshCw, Check, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  username: string;
  created_at: string;
  is_staff: boolean;
  staff_role?: string;
  is_banned?: boolean;
}

const StaffPanel = () => {
  const { profile, updateUserRole } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [newRole, setNewRole] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const staffRoles = ['CEO', 'Manager', 'Administrator'];
  const isHigherRole = profile?.staff_role === 'CEO' || 
                      (profile?.staff_role === 'Manager' && selectedUser?.staff_role !== 'CEO');

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('profiles_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles' 
        }, 
        () => {
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleRoleUpdate = async () => {
    if (!selectedUser || !newRole) return;

    try {
      const success = await updateUserRole(selectedUser.id, newRole, true);
      if (success) {
        setSuccess(`Updated role for ${selectedUser.username} to ${newRole}`);
        setError('');
        await fetchUsers();
      } else {
        setError('Failed to update role');
      }
    } catch (err) {
      setError('Error updating role');
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_banned: !selectedUser.is_banned })
        .eq('id', selectedUser.id);

      if (error) throw error;

      setSuccess(`${selectedUser.is_banned ? 'Unbanned' : 'Banned'} ${selectedUser.username}`);
      setError('');
      await fetchUsers();
    } catch (err) {
      setError('Error updating ban status');
    }
  };

  const handlePasswordReset = async () => {
    if (!selectedUser || !newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const { error } = await supabase.auth.admin.updateUserById(
        selectedUser.id,
        { password: newPassword }
      );

      if (error) throw error;

      setSuccess(`Password updated for ${selectedUser.username}`);
      setNewPassword('');
      setError('');
    } catch (err) {
      setError('Error updating password');
    }
  };

  if (!profile?.is_staff) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="text-white text-center">
            Access denied. Staff only area.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Staff Panel</h1>
            <p className="text-gray-400">Manage users and permissions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-green-500" />
            <span className="text-green-500 font-semibold">{profile.staff_role}</span>
          </div>
        </div>

        {(error || success) && (
          <div className={`mb-4 p-4 rounded-lg ${error ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
            <div className="flex items-center space-x-2">
              {error ? <AlertTriangle className="h-5 w-5" /> : <Check className="h-5 w-5" />}
              <span>{error || success}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Users</h2>
              <button 
                onClick={fetchUsers}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <RefreshCw className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-400">Loading users...</div>
              ) : (
                users.map(user => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedUser?.id === user.id
                        ? 'bg-green-600/20 border border-green-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <User className="h-5 w-5 text-gray-400" />
                          <span className="text-white font-medium">{user.username}</span>
                          {user.is_staff && (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-600 text-white">
                              {user.staff_role}
                            </span>
                          )}
                          {user.is_banned && (
                            <span className="px-2 py-1 rounded-full text-xs bg-red-600 text-white">
                              Banned
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          ID: {user.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">User Management</h2>
            {selectedUser ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {selectedUser.username}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Current Role: {selectedUser.staff_role || 'No Role'}
                  </p>
                </div>

                {isHigherRole && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Update Role
                      </label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                      >
                        <option value="">Select Role</option>
                        {staffRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <button
                        onClick={handleRoleUpdate}
                        className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Update Role
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Reset Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-2"
                      />
                      <button
                        onClick={handlePasswordReset}
                        className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Reset Password
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={handleBanUser}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        {selectedUser.is_banned ? 'Unban User' : 'Ban User'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                Select a user to manage
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffPanel;