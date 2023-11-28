import React, { Suspense } from "react"

// ** Router Import
import Router from "./router/Router"

import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

// Create a client
const queryClient = new QueryClient()

const App = () => {
  return (
    <Suspense fallback={null}>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
