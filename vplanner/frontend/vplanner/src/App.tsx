import { Outlet } from "@tanstack/react-router"
import { CitiesProvider } from "./context/CititesContext"
import { SearchLoadingProvider } from "./context/SearchLoadingContext"
import { SnackbarProvider } from "./context/SnackbarContext"

function App() {
  return (
    <SnackbarProvider>
      <SearchLoadingProvider>
        <CitiesProvider>
          <Outlet />
        </CitiesProvider>
      </SearchLoadingProvider>
    </SnackbarProvider>
  )
}

export default App
