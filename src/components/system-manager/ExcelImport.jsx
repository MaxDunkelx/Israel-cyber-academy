/**
 * ExcelImport Component - System Manager
 * 
 * Excel import functionality for bulk user creation
 * Features:
 * - Upload Excel files (.xlsx, .xls)
 * - Column mapping
 * - Data validation
 * - Preview before import
 * - Progress tracking
 * - Error handling
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Eye,
  Map,
  Play,
  Pause,
  RefreshCw,
  FileText,
  Mail,
  User,
  Calendar,
  Hash
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const ExcelImport = () => {
  // State management
  const [importData, setImportData] = useState(null);
  const [mapping, setMapping] = useState({});
  const [progress, setProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  // Default column mapping
  const defaultMapping = {
    email: '',
    firstName: '',
    lastName: '',
    age: '',
    sex: '',
    role: 'student' // Default role for imported users
  };

  // Required fields
  const requiredFields = ['email', 'firstName', 'lastName'];

  /**
   * Create user in Firestore (without Firebase Auth login)
   */
  const createUser = async (userData) => {
    try {
      // Generate a unique user ID
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Generate a secure password
      const password = generateSecurePassword();
      
      // Create user profile in Firestore
      const userProfile = {
        uid: userId,
        email: userData.email.toLowerCase(),
        displayName: `${userData.firstName} ${userData.lastName}`,
        role: userData.role || 'student',
        // User credentials
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age ? parseInt(userData.age) : null,
        sex: userData.sex || null,
        // Progress tracking
        progress: {
          1: {
            completed: false,
            score: 0,
            completedAt: null,
            temporary: false,
            lastSlide: 0,
            pagesEngaged: [],
            lastActivity: new Date()
          }
        },
        completedLessons: [],
        currentLesson: 1,
        totalTimeSpent: 0,
        totalPagesEngaged: 0,
        achievements: [],
        streak: 0,
        // Password (for login verification)
        password: password,
        // Status flags
        hasFirebaseAuth: false, // Will be created on first login
        isActive: true,
        // Timestamps
        createdAt: serverTimestamp(),
        lastLogin: null,
        lastActivityDate: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Store profile in Firestore
      await setDoc(doc(db, 'users', userId), userProfile);
      
      // Log security event
      logSecurityEvent('USER_CREATED_VIA_IMPORT', {
        userId: userId,
        userEmail: userData.email,
        userRole: userData.role || 'student',
        createdBy: 'system_manager',
        timestamp: new Date().toISOString()
      });
      
      console.log('✅ User created via import:', userId);
      
      return { success: true, userId: userId, password };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(getUserCreationErrorMessage(error));
    }
  };

  /**
   * Generate secure password for imported users
   */
  const generateSecurePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  /**
   * Get user-friendly error message
   */
  const getUserCreationErrorMessage = (error) => {
    if (error.code === 'permission-denied') {
      return 'אין הרשאה ליצור משתמשים';
    } else if (error.message && error.message.includes('already exists')) {
      return 'כתובת האימייל כבר קיימת במערכת';
    } else if (error.message && error.message.includes('invalid')) {
      return 'נתונים לא תקינים';
    } else {
      return 'אירעה שגיאה ביצירת המשתמש';
    }
  };

  /**
   * Handle file drop/upload
   */
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (data.length < 2) {
          toast.error('הקובץ חייב להכיל לפחות כותרת ושורה אחת של נתונים');
          return;
        }

        // Extract headers and data
        const headers = data[0];
        const rows = data.slice(1).filter(row => row.some(cell => cell !== null && cell !== ''));

        // Auto-map columns based on header names
        const autoMapping = {};
        headers.forEach((header, index) => {
          const headerLower = header?.toString().toLowerCase();
          if (headerLower.includes('email') || headerLower.includes('אימייל')) {
            autoMapping.email = index;
          } else if (headerLower.includes('first') || headerLower.includes('שם')) {
            autoMapping.firstName = index;
          } else if (headerLower.includes('last') || headerLower.includes('משפחה')) {
            autoMapping.lastName = index;
          } else if (headerLower.includes('age') || headerLower.includes('גיל')) {
            autoMapping.age = index;
          } else if (headerLower.includes('sex') || headerLower.includes('gender') || headerLower.includes('מין')) {
            autoMapping.sex = index;
          }
        });

        setImportData({
          headers,
          rows,
          fileName: file.name
        });
        setMapping(autoMapping);
        setPreviewData(rows.slice(0, 5)); // Show first 5 rows
        setValidationErrors([]);
        setImportResults(null);
        setProgress(0);

        toast.success(`הקובץ נטען בהצלחה: ${rows.length} שורות נתונים`);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        toast.error('אירעה שגיאה בקריאת הקובץ');
      }
    };
    reader.readAsBinaryString(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  /**
   * Validate import data
   */
  const validateData = () => {
    if (!importData) return false;

    const errors = [];
    const processedData = [];

    importData.rows.forEach((row, rowIndex) => {
      const userData = {};
      let rowHasErrors = false;

      // Extract data based on mapping
      Object.entries(mapping).forEach(([field, columnIndex]) => {
        if (columnIndex !== '' && columnIndex !== null) {
          userData[field] = row[columnIndex];
        }
      });

      // Validate required fields
      requiredFields.forEach(field => {
        if (!userData[field] || userData[field].toString().trim() === '') {
          errors.push(`שורה ${rowIndex + 2}: שדה ${field} חסר`);
          rowHasErrors = true;
        }
      });

      // Validate email format
      if (userData.email && !isValidEmail(userData.email)) {
        errors.push(`שורה ${rowIndex + 2}: פורמט אימייל לא תקין`);
        rowHasErrors = true;
      }

      // Validate age
      if (userData.age) {
        const age = parseInt(userData.age);
        if (isNaN(age) || age < 5 || age > 18) {
          errors.push(`שורה ${rowIndex + 2}: גיל לא תקין (5-18)`);
          rowHasErrors = true;
        }
      }

      // Validate sex
      if (userData.sex) {
        const sex = userData.sex.toString().toLowerCase();
        if (!['male', 'female', 'זכר', 'נקבה', 'm', 'f'].includes(sex)) {
          errors.push(`שורה ${rowIndex + 2}: ערך מין לא תקין`);
          rowHasErrors = true;
        }
      }

      if (!rowHasErrors) {
        processedData.push(userData);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  /**
   * Email validation
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Process import
   */
  const processImport = async () => {
    if (!validateData()) {
      toast.error(`נמצאו ${validationErrors.length} שגיאות. אנא תקן אותן לפני הייבוא.`);
      return;
    }

    setIsImporting(true);
    setProgress(0);

    try {
      const results = {
        total: importData.rows.length,
        success: 0,
        failed: 0,
        errors: []
      };

      // Process each row
      for (let i = 0; i < importData.rows.length; i++) {
        const row = importData.rows[i];
        const userData = {};

        // Extract data based on mapping
        Object.entries(mapping).forEach(([field, columnIndex]) => {
          if (columnIndex !== '' && columnIndex !== null) {
            userData[field] = row[columnIndex];
          }
        });

        try {
          // Real user creation
          await createUser(userData);
          results.success++;
        } catch (error) {
          results.failed++;
          results.errors.push(`שורה ${i + 2}: ${error.message}`);
        }

        setProgress(((i + 1) / importData.rows.length) * 100);
      }

      setImportResults(results);
      
      if (results.success > 0) {
        toast.success(`יובאו ${results.success} משתמשים בהצלחה`);
      }
      
      if (results.failed > 0) {
        toast.error(`${results.failed} משתמשים נכשלו בייבוא`);
      }

    } catch (error) {
      console.error('Import error:', error);
      toast.error('אירעה שגיאה בתהליך הייבוא');
    } finally {
      setIsImporting(false);
    }
  };

  /**
   * Reset import
   */
  const resetImport = () => {
    setImportData(null);
    setMapping({});
    setProgress(0);
    setIsImporting(false);
    setImportResults(null);
    setValidationErrors([]);
    setPreviewData([]);
  };

  /**
   * Download template
   */
  const downloadTemplate = () => {
    const template = [
      ['email', 'firstName', 'lastName', 'age', 'sex'],
      ['student1@example.com', 'יוסי', 'כהן', '12', 'male'],
      ['student2@example.com', 'דנה', 'לוי', '11', 'female']
    ];

    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    
    XLSX.writeFile(wb, 'user_import_template.xlsx');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">ייבוא משתמשים מקובץ Excel</h2>
          <p className="text-gray-300">ייבוא תלמידים ומורים מקובץ Excel</p>
        </div>
        
        <Button
          onClick={downloadTemplate}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>הורד תבנית</span>
        </Button>
      </div>

      {/* File Upload */}
      <Card variant="dark">
        <div className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <input {...getInputProps()} />
            
            {!importData ? (
              <div>
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg text-white mb-2">
                  {isDragActive ? 'שחרר את הקובץ כאן' : 'גרור קובץ Excel לכאן או לחץ לבחירה'}
                </p>
                <p className="text-gray-400 text-sm">
                  תמיכה בקבצי .xlsx ו-.xls
                </p>
              </div>
            ) : (
              <div>
                <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <p className="text-lg text-white mb-2">{importData.fileName}</p>
                <p className="text-gray-400 text-sm">
                  {importData.rows.length} שורות נתונים
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Column Mapping */}
      {importData && (
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Map className="w-5 h-5" />
              <span>מיפוי עמודות</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(defaultMapping).map(([field, defaultValue]) => (
                <div key={field}>
                  <label className="block text-gray-300 text-sm mb-2">
                    {field === 'email' && 'אימייל'}
                    {field === 'firstName' && 'שם פרטי'}
                    {field === 'lastName' && 'שם משפחה'}
                    {field === 'age' && 'גיל'}
                    {field === 'sex' && 'מין'}
                    {field === 'role' && 'תפקיד'}
                    {requiredFields.includes(field) && <span className="text-red-400">*</span>}
                  </label>
                  
                  {field === 'role' ? (
                    <select
                      value={mapping[field] || defaultValue}
                      onChange={(e) => setMapping({...mapping, [field]: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="student">תלמיד</option>
                      <option value="teacher">מורה</option>
                    </select>
                  ) : (
                    <select
                      value={mapping[field] || ''}
                      onChange={(e) => setMapping({...mapping, [field]: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">בחר עמודה</option>
                      {importData.headers.map((header, index) => (
                        <option key={index} value={index}>
                          {header} (עמודה {index + 1})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>שגיאות אימות ({validationErrors.length})</span>
            </h3>
            
            <div className="max-h-40 overflow-y-auto space-y-2">
              {validationErrors.map((error, index) => (
                <div key={index} className="text-red-400 text-sm p-2 bg-red-500/10 rounded">
                  {error}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Data Preview */}
      {importData && previewData.length > 0 && (
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>תצוגה מקדימה (5 שורות ראשונות)</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    {importData.headers.map((header, index) => (
                      <th key={index} className="text-right p-2 text-gray-300">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-700">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2 text-gray-300">
                          {cell || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      {/* Import Progress */}
      {isImporting && (
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>מתבצע ייבוא...</span>
            </h3>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-gray-300 text-sm">
              {Math.round(progress)}% הושלם
            </p>
          </div>
        </Card>
      )}

      {/* Import Results */}
      {importResults && (
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>תוצאות הייבוא</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{importResults.total}</div>
                <div className="text-gray-300 text-sm">סה"כ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{importResults.success}</div>
                <div className="text-gray-300 text-sm">הושלמו בהצלחה</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{importResults.failed}</div>
                <div className="text-gray-300 text-sm">נכשלו</div>
              </div>
            </div>
            
            {importResults.errors.length > 0 && (
              <div className="max-h-40 overflow-y-auto space-y-2">
                <h4 className="text-red-400 font-semibold">שגיאות:</h4>
                {importResults.errors.map((error, index) => (
                  <div key={index} className="text-red-400 text-sm p-2 bg-red-500/10 rounded">
                    {error}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {importData && (
        <div className="flex space-x-4">
          <Button
            onClick={processImport}
            disabled={isImporting || validationErrors.length > 0}
            variant="primary"
            className="flex items-center space-x-2"
          >
            {isImporting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>מיובא...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>התחל ייבוא</span>
              </>
            )}
          </Button>
          
          <Button
            onClick={resetImport}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>אפס</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExcelImport; 