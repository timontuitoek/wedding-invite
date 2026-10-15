import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import siteConfig from './siteConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

// Lazy load components for better performance
const OurStory = lazy(() => import('./components/OurStory'));
const EventPage = lazy(() => import('./components/EventPage'));
const UploadPhotos = lazy(() => import('./components/UploadPhotos'));
const Registry = lazy(() => import('./components/Registry'));
const Travel = lazy(() => import('./components/Travel'));
const FAQ = lazy(() => import('./components/FAQ'));

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
  ourStory: { path: '/our-story', Component: OurStory },
  events: { path: '/events', Component: EventPage },
  uploadPhotos: { path: '/upload-photos', Component: UploadPhotos },
  registry: { path: '/registry', Component: Registry },
  travel: { path: '/travel', Component: Travel },
  faq: { path: '/faq', Component: FAQ },
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
      <div className="App flex flex-col min-h-screen bg-ivory-50">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {getRoutes()}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
