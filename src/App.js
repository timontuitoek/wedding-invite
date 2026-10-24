import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import siteConfig from './siteConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { IntroProvider } from './contexts/IntroContext';

// Lazy load components for better performance
const EventPage = lazy(() => import('./components/EventPage'));
const UploadPhotos = lazy(() => import('./components/UploadPhotos'));
const Gifts = lazy(() => import('./components/Gifts'));
const Travel = lazy(() => import('./components/Travel'));
const FAQ = lazy(() => import('./components/FAQ'));
const MessageToCouple = lazy(() => import('./components/MessageToCouple'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
      <p className="text-sage-600">Loading...</p>
    </div>
  </div>
);

// Route configuration
const routeMap = {
  events: { path: '/events', Component: EventPage },
  uploadPhotos: { path: '/upload-photos', Component: UploadPhotos },
  registry: { path: '/gifts', Component: Gifts },
  travel: { path: '/travel', Component: Travel },
  faq: { path: '/faq', Component: FAQ },
  messageToCouple: { path: '/message-to-couple', Component: MessageToCouple },
};

function App() {
  // Generate routes based on enabled features
  const getRoutes = () => {
    const routes = [];

    Object.entries(siteConfig.features).forEach(([key, feature]) => {
      if (feature.enabled && routeMap[key]) {
        const { path, Component } = routeMap[key];
        routes.push(
          <Route
            key={key}
            path={path}
            element={
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            }
          />
        );
      }
    });

    return routes;
  };

  return (
    <Router>
      <IntroProvider>
        <div className="App flex flex-col min-h-screen bg-ivory-50">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {getRoutes()}
              <Route path="/registry" element={<Navigate to="/gifts" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </IntroProvider>
    </Router>
  );
}

export default App;
