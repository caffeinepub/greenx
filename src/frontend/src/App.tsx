import { RouterProvider, createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import LoginPage from './pages/LoginPage';
import LandOwnerDashboard from './pages/land-owner/LandOwnerDashboard';
import LandOwnerReportsPage from './pages/land-owner/LandOwnerReportsPage';
import LandOwnerSupportRequestPage from './pages/land-owner/LandOwnerSupportRequestPage';
import LandOwnerCropTimelinePage from './pages/land-owner/LandOwnerCropTimelinePage';
import FieldManagerDashboard from './pages/field-manager/FieldManagerDashboard';
import ExpertDashboard from './pages/expert/ExpertDashboard';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLandManagementPage from './pages/admin/AdminLandManagementPage';
import AdminFarmersPage from './pages/admin/AdminFarmersPage';
import AdminDiagnosticsPage from './pages/admin/AdminDiagnosticsPage';
import AdminWeatherAnalyticsPage from './pages/admin/AdminWeatherAnalyticsPage';
import AdminFinancePage from './pages/admin/AdminFinancePage';
import AdminExportsPage from './pages/admin/AdminExportsPage';
import AdminExportOrderDetailPage from './pages/admin/AdminExportOrderDetailPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';

const queryClient = new QueryClient();

const rootRoute = createRootRoute();

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginPage,
});

const landOwnerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/land-owner',
  component: LandOwnerDashboard,
});

const landOwnerReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/land-owner/reports',
  component: LandOwnerReportsPage,
});

const landOwnerSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/land-owner/support',
  component: LandOwnerSupportRequestPage,
});

const landOwnerTimelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/land-owner/timeline',
  component: LandOwnerCropTimelinePage,
});

const fieldManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/field-manager',
  component: FieldManagerDashboard,
});

const expertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expert',
  component: ExpertDashboard,
});

const workerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/worker',
  component: WorkerDashboard,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/',
  component: AdminDashboardPage,
});

const adminLandRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/land',
  component: AdminLandManagementPage,
});

const adminFarmersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/farmers',
  component: AdminFarmersPage,
});

const adminDiagnosticsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/diagnostics',
  component: AdminDiagnosticsPage,
});

const adminWeatherRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/weather',
  component: AdminWeatherAnalyticsPage,
});

const adminFinanceRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/finance',
  component: AdminFinancePage,
});

const adminExportsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/exports',
  component: AdminExportsPage,
});

const adminExportDetailRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/exports/$orderId',
  component: AdminExportOrderDetailPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/users',
  component: AdminUsersPage,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/settings',
  component: AdminSettingsPage,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDeniedPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  landOwnerRoute,
  landOwnerReportsRoute,
  landOwnerSupportRoute,
  landOwnerTimelineRoute,
  fieldManagerRoute,
  expertRoute,
  workerRoute,
  adminRoute.addChildren([
    adminDashboardRoute,
    adminLandRoute,
    adminFarmersRoute,
    adminDiagnosticsRoute,
    adminWeatherRoute,
    adminFinanceRoute,
    adminExportsRoute,
    adminExportDetailRoute,
    adminUsersRoute,
    adminSettingsRoute,
  ]),
  accessDeniedRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
