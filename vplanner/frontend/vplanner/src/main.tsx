import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, createRootRouteWithContext, createRoute, RouterProvider, redirect } from '@tanstack/react-router'
import 'leaflet/dist/leaflet.css'
import './styles/tokens.css'
import './index.css'
import App from './App.tsx'
import AppLayout from './components/AppLayout.tsx'
import WorldMap from './components/Map.tsx'
import TripDetail from './components/TripDetail.tsx'
import PlanForm from './components/PlanForm.tsx'
import { AuthProvider, useAuth } from './context/AuthContext.tsx'
import type { AuthContextValue } from './context/AuthContext.tsx'
import Login from './components/Login.tsx'

export const rootRoute = createRootRouteWithContext<{ auth: AuthContextValue }>()({
    component: App,
    validateSearch: (search: Record<string, unknown>): { lat?: number; lng?: number } => ({
        lat: search.lat ? Number(search.lat) : undefined,
        lng: search.lng ? Number(search.lng) : undefined,
    }),
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
        redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
    }),
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({ to: '/' })
        }
    },
    component: Login,
})

const authenticatedLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: '_authenticated',
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: { redirect: location.href },
            })
        }
    },
    component: AppLayout,
})

const indexRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/',
    component: WorldMap,
})

export const tripDetailRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/trips/$tripId',
    component: TripDetail,
})

const planRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/plan',
    component: PlanForm,
})

const routeTree = rootRoute.addChildren([
    loginRoute,
    authenticatedLayoutRoute.addChildren([indexRoute, tripDetailRoute, planRoute]),
])

const router = createRouter({
    routeTree,
    context: { auth: undefined! as AuthContextValue },
})

declare module '@tanstack/react-router' {
    interface Register { router: typeof router }
}

// eslint-disable-next-line react-refresh/only-export-components
function InnerApp() {
    const auth = useAuth()
    return <RouterProvider router={router} context={{ auth }} />
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <InnerApp />
        </AuthProvider>
    </StrictMode>,
)
