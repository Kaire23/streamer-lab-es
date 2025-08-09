// Tree shaking optimization file
// This file helps eliminate dead code by explicitly importing only what we need

// Only import used React features
export { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';

// Only import used Wouter features  
export { Router, Route, Link, useLocation, useParams } from 'wouter';

// Only import used query features
export { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';

// Only import used helmet features
export { Helmet, HelmetProvider } from 'react-helmet-async';

// Explicitly exclude unused features to help bundlers tree shake
// This comment helps bundlers understand what can be safely removed