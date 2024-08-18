import './index.css'

import React from 'react'

import posthog from 'posthog-js'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SlateProvider } from 'slate-ui'

import { HandbookPage } from '@pages/handbook'

import { SplashPage } from './pages/'

posthog.init('phc_usadFahh3q5J9R4a9fc9CRxAWgpu5VR6q6KRMbkXs94', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
})

const splashRouter = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <SplashPage />,
      },
      {
        path: 'handbook/*',
        element: <HandbookPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <SlateProvider>
        <RouterProvider router={splashRouter} />
      </SlateProvider>
    </HelmetProvider>
  </React.StrictMode>
)
