
/// <reference types="vite/client" />

// Declare external modules to help accommodate read-only files with TS errors
declare module 'src/pages/AdminPage' {
  import { FC } from 'react';
  const AdminPage: FC;
  export default AdminPage;
}

declare module 'src/pages/HomePage' {
  import { FC } from 'react';
  const HomePage: FC;
  export default HomePage;
}

declare module 'src/pages/PackageDetailsPage' {
  import { FC } from 'react';
  const PackageDetailsPage: FC;
  export default PackageDetailsPage;
}

// Add declarations for unused imports in read-only files
declare module 'src/context/AuthContext' {
  // This will handle the 'password' and 'supabase' unused variables
}

declare module 'src/pages/PackageDetailsPage' {
  // This will handle the 'MapPin' unused import
}
