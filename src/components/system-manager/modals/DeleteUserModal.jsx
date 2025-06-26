/**
 * DeleteUserModal Component
 * 
 * Modal for confirming user deletion
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, AlertTriangle, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase-config';
import { logSecurityEvent } from '../../../utils/security';
import Button from '../../ui/Button';

const DeleteUserModal = ({ user, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (confirmText !== 'מחק') {
      toast.error('יש להקליד "מחק" לאישור');
      return;
    }

    setLoading(true);

    try {
      // Ensure we're using the correct document ID
      const documentId = user.documentId || user.uid;
      
      // Delete user document from Firestore
      const userRef = doc(db, 'users', documentId);
      await deleteDoc(userRef);

      // Note: Firebase Auth user deletion requires re-authentication
      // For now, we'll only delete the Firestore document
      // The Auth user will need to be deleted separately by an admin
      
      // Log security event
      logSecurityEvent('USER_DELETED', {
        userId: documentId,
        userEmail: user.email,
        deletedBy: auth.currentUser?.uid,
        timestamp: new Date().toISOString()
      });

      toast.success('המשתמש נמחק בהצלחה');
      onSuccess();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('אירעה שגיאה במחיקת המשתמש');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-lg w-full max-w-md"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-red-400 flex items-center space-x-2">
                <Trash2 className="w-5 h-5" />
                <span>מחק משתמש</span>
              </h2>
              <Button
                onClick={onClose}
                variant="secondary"
                size="sm"
                className="flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Warning */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">אזהרה!</span>
                </div>
                <p className="text-red-300 text-sm">
                  פעולה זו תמחק את המשתמש לצמיתות. לא ניתן לשחזר את הנתונים.
                </p>
              </div>

              {/* User Info */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.displayName}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                    <div className="text-gray-400 text-sm capitalize">{user.role}</div>
                  </div>
                </div>
              </div>

              {/* Confirmation */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  הקלד "מחק" לאישור
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                  placeholder="מחק"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleDelete}
                  disabled={loading || confirmText !== 'מחק'}
                  variant="danger"
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>מוחק...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>מחק משתמש</span>
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="flex-1"
                >
                  ביטול
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteUserModal; 