// Type declarations for lazy-loaded components

// Auth pages
declare module '../../features/auth/pages/Login' {
    const Login: React.ComponentType;
    export default Login;
}


declare module '../../features/auth/pages/ForgotPassword' {
    const ForgotPassword: React.ComponentType;
    export default ForgotPassword;
}

declare module '../../features/auth/pages/ResetPassword' {
    const ResetPassword: React.ComponentType;
    export default ResetPassword;
}


// Onboarding pages
declare module '../../features/auth/pages/CreateAccount' {
    const CreateAccount: React.ComponentType;
    export default CreateAccount;
}


// Dashboard pages
declare module '../../features/dashboard/pages/DashboardHome' {
    const DashboardHome: React.ComponentType;
    export default DashboardHome;
}

// User pages
declare module '../../features/user/pages/Profile' {
    const Profile: React.ComponentType;
    export default Profile;
}

declare module '../../features/user/pages/Settings' {
    const Settings: React.ComponentType;
    export default Settings;
}

// Upload pages

// Metrics pages

// Analytics pages

// Billing pages

// Generic fallback for any other lazy-loaded components
declare module '../../features/*/pages/*' {
    const Component: React.ComponentType;
    export default Component;
} 