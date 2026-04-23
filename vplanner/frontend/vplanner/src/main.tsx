import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, createRootRoute, createRoute, RouterProvider } from '@tanstack/react-router'
import 'leaflet/dist/leaflet.css'
import './styles/tokens.css'
import './index.css'
import App from './App.tsx'
import WorldMap from './components/Map.tsx'
import TripDetail from './components/TripDetail.tsx'
import PlanForm from './components/PlanForm.tsx'

export const rootRoute = createRootRoute({
  component: App,
  validateSearch: (search: Record<string, unknown>): { lat?: number; lng?: number } => ({
    lat: search.lat ? Number(search.lat) : undefined,
    lng: search.lng ? Number(search.lng) : undefined,
  }),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WorldMap,
})

export const tripDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trips/$tripId',
  component: TripDetail,
})

const planRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plan',
  component: PlanForm,
})

const routeTree = rootRoute.addChildren([indexRoute, tripDetailRoute, planRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
