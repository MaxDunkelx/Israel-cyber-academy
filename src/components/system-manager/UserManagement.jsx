/**
 * UserManagement Component - System Manager
 * 
 * Complete user management interface for system managers
 * Features:
 * - View all users (students and teachers)
 * - Create new teachers
 * - Assign students to teachers
 * - Delete users
 * - Bulk operations
 * - Search and filter
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Mail,
  Phone,
  Calendar,
  Shield,
  GraduationCap,
  Eye,
  MoreHorizontal,
  Plus,
  RefreshCw
} from 'lucide-react';
import { usePureAuth } from '../../contexts/PureAuthContext';
import { logSecurityEvent } from '../../utils/security';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

// Import modals
import CreateStudentModal from './modals/CreateStudentModal';
import AssignStudentsModal from './modals/AssignStudentsModal';
import DeleteUserModal from './modals/DeleteUserModal';
import EditUserModal from './modals/EditUserModal';

const UserManagement = () => {
  const { currentUser } = usePureAuth();
  
  // State management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  // Modal states
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showAssignStudents, setShowAssignStudents] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users based on search and role
  useEffect(() => {
    let filtered = users;

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  /**
   * Load all users from Firebase
   */
  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all users from Firebase
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const documentId = doc.id; // This is the correct Firestore document ID
        
        fetchedUsers.push({
          uid: documentId, // Always use the document ID as uid
          documentId: documentId, // Keep document ID for reference
          ...data,
          // Ensure dates are properly converted
          createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date(),
          lastLogin: data.lastLogin?.toDate?.() || data.lastLogin || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt || new Date()
        });
      });

      // Sort users by display name in JavaScript
      fetchedUsers.sort((a, b) => {
        const nameA = a.displayName || a.email || '';
        const nameB = b.displayName || b.email || '';
        return nameA.localeCompare(nameB);
      });

      setUsers(fetchedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('אירעה שגיאה בטעינת המשתמשים');
      setLoading(false);
    }
  };

  /**
   * Handle user selection for bulk operations
   */
  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  /**
   * Handle select all users
   */
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.uid));
    }
  };

  /**
   * Handle user deletion
   */
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteUser(true);
  };

  /**
   * Handle user editing
   */
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  /**
   * Handle bulk delete
   */
  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      toast.error('יש לבחור משתמשים למחיקה');
      return;
    }
    setShowDeleteUser(true);
  };

  /**
   * Get user statistics
   */
  const getUserStats = () => {
    const totalUsers = users.length;
    const students = users.filter(u => u.role === 'student').length;
    const teachers = users.filter(u => u.role === 'teacher').length;
    const unassignedStudents = users.filter(u => u.role === 'student' && !u.teacherId).length;
    
    return { totalUsers, students, teachers, unassignedStudents };
  };

  /**
   * Format date for display
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /**
   * Get role display info
   */
  const getRoleInfo = (role) => {
    const roleMap = {
      student: { label: 'תלמיד', icon: GraduationCap, color: 'text-green-400' },
      teacher: { label: 'מורה', icon: Shield, color: 'text-blue-400' },
      system_manager: { label: 'מנהל מערכת', icon: Shield, color: 'text-purple-400' }
    };
    return roleMap[role] || roleMap.student;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = getUserStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">ניהול משתמשים</h2>
          <p className="text-gray-300">ניהול תלמידים, מורים והרשאות</p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={loadUsers}
            variant="secondary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>רענן</span>
          </Button>
          <Button
            onClick={() => setShowCreateStudent(true)}
            variant="primary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>צור משתמש חדש</span>
          </Button>
          <Button
            onClick={() => setShowAssignStudents(true)}
            variant="secondary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>הקצאת תלמידים</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="dark">
          <div className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
            <div className="text-sm text-gray-300">סה"כ משתמשים</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-3xl font-bold text-white">{stats.students}</div>
            <div className="text-sm text-gray-300">תלמידים</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-3xl font-bold text-white">{stats.teachers}</div>
            <div className="text-sm text-gray-300">מורים</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center">
            <UserMinus className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <div className="text-3xl font-bold text-white">{stats.unassignedStudents}</div>
            <div className="text-sm text-gray-300">תלמידים לא מוקצים</div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card variant="dark">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="חיפוש לפי שם, אימייל..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            {/* Role Filter */}
            <div className="md:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">כל התפקידים</option>
                <option value="student">תלמידים</option>
                <option value="teacher">מורים</option>
                <option value="system_manager">מנהלי מערכת</option>
              </select>
            </div>
            
            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex space-x-2">
                <Button
                  onClick={handleBulkDelete}
                  variant="danger"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>מחק נבחרים ({selectedUsers.length})</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card variant="dark">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-right p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="text-right p-4 text-gray-300">משתמש</th>
                <th className="text-right p-4 text-gray-300">תפקיד</th>
                <th className="text-right p-4 text-gray-300">פרטים</th>
                <th className="text-right p-4 text-gray-300">תאריך הצטרפות</th>
                <th className="text-right p-4 text-gray-300">התחברות אחרונה</th>
                <th className="text-right p-4 text-gray-300">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                const isSelected = selectedUsers.includes(user.uid);
                
                return (
                  <motion.tr
                    key={user.uid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleUserSelect(user.uid)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.displayName?.charAt(0) || user.email?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.displayName}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className={`flex items-center space-x-2 ${roleInfo.color}`}>
                        <roleInfo.icon className="w-4 h-4" />
                        <span className="text-sm">{roleInfo.label}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="text-sm text-gray-300">
                        {user.role === 'student' && (
                          <div>
                            <div>גיל: {user.age || 'לא צוין'}</div>
                            <div>מין: {user.sex === 'male' ? 'זכר' : 'נקבה'}</div>
                            {user.teacherId && <div className="text-green-400">מוקצה למורה</div>}
                          </div>
                        )}
                        {user.role === 'teacher' && (
                          <div>
                            <div>כיתות: {user.teacherClasses?.length || 0}</div>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="p-4 text-sm text-gray-300">
                      {formatDate(user.createdAt)}
                    </td>
                    
                    <td className="p-4 text-sm text-gray-300">
                      {formatDate(user.lastLogin)}
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleEditUser(user)}
                          variant="secondary"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Edit className="w-3 h-3" />
                          <span>ערוך</span>
                        </Button>
                        
                        <Button
                          onClick={() => handleDeleteUser(user)}
                          variant="danger"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>מחק</span>
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">לא נמצאו משתמשים</p>
            </div>
          )}
        </div>
      </Card>

      {/* Modals */}
      <AnimatePresence>
        
        {showAssignStudents && (
          <AssignStudentsModal
            onClose={() => setShowAssignStudents(false)}
            onSuccess={() => {
              setShowAssignStudents(false);
              loadUsers();
              toast.success('התלמידים הוקצו בהצלחה');
            }}
          />
        )}
        
        {showDeleteUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={() => setShowDeleteUser(false)}
            onSuccess={() => {
              setShowDeleteUser(false);
              setSelectedUser(null);
              setSelectedUsers([]);
              loadUsers();
              toast.success('המשתמש נמחק בהצלחה');
            }}
          />
        )}
        
        {showEditUser && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setShowEditUser(false)}
            onSuccess={() => {
              setShowEditUser(false);
              setSelectedUser(null);
              loadUsers();
              toast.success('המשתמש עודכן בהצלחה');
            }}
          />
        )}
        
        <CreateStudentModal
          isOpen={showCreateStudent}
          onClose={() => setShowCreateStudent(false)}
          onSuccess={() => { setShowCreateStudent(false); loadUsers(); }}
        />
      </AnimatePresence>
    </div>
  );
};

export default UserManagement; 