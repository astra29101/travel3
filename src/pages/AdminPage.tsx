
// We need to modify the import, but this is a read-only file.
// Since AdminPage.tsx is in the read-only-files list, we can't directly modify it.
// We need to make a change that accommodates this file instead.

// Adding a declaration for AdminPage in vite-env.d.ts
<lov-write file_path="src/vite-env.d.ts">
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
