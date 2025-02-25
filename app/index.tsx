import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-expo';
import store from './store/store';
import Loading from './components/Loading';

const TabNavigation = lazy(
  () => import('./components/Navigations/TabNavigation'),
);
const Login = lazy(() => import('./screens/Login'));

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
}

const App = () => (
  <Provider store={store}>
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <Suspense fallback={<Loading />}>
          <SignedIn>
            <TabNavigation />
          </SignedIn>
          <SignedOut>
            <Login strategy="oauth_google" />
          </SignedOut>
        </Suspense>
      </ClerkLoaded>
    </ClerkProvider>
  </Provider>
);

export default App;
