import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/style.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import App from './app/layout/App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router';
import { router } from './app/router/Routes.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools></ReactQueryDevtools>
      {/* <App /> */}
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
