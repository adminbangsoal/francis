// List of admin emails that should skip onboarding
const ADMIN_EMAILS = [
  'alisyageza24@gmail.com',
  'admin@bangsoal.co.id',
  'joseph.srgh@gmail.com'
];

/**
 * Check if the user is an admin based on role, is_admin flag, or email
 */
export const isAdminUser = (user: any): boolean => {
  if (!user) return false;
  
  return user?.role === 'admin' || 
         user?.is_admin === true ||
         ADMIN_EMAILS.includes(user?.email || '');
};

/**
 * Get the appropriate redirect path based on user role
 */
export const getRedirectPath = (user: any): string => {
  return isAdminUser(user) ? '/admin' : '/dashboard';
};