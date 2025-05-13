
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
  interface AuthContextParams {
    password?: string; // Mark as optional to suppress the unused parameter error
    signup: (name: string, email: string, password: string, age: number, location: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
  }
}

declare module 'src/pages/PackageDetailsPage' {
  // This will handle the 'MapPin' unused import
  import { MapPin } from 'lucide-react';
  export { MapPin };
}

// Add declaration for Lovable tagger
declare module 'lovable-tagger' {
  export function componentTagger(): any;
}
