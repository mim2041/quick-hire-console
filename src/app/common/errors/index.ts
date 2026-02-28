import { lazy } from 'react';

export const NotFound = lazy(() => import('./pages/NotFound'));
export const Forbidden = lazy(() => import('./pages/Forbidden'));
export const ServerError = lazy(() => import('./pages/ServerError'));
