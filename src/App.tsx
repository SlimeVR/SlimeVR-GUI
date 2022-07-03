import {
  useProvideWebsocketApi,
  WebSocketApiContext,
} from './hooks/websocket-api';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { Home } from './components/home/Home';
import { BodyProportions } from './components/proportions/BodyProportions';
import { AppContextProvider } from './components/providers/AppContext';
import { useEffect } from 'react';
import { MainLayoutRoute } from './components/MainLayout';
import { SettingsLayoutRoute } from './components/settings/SettingsLayout';
import { GeneralSettings } from './components/settings/pages/GeneralSettings';
import { Serial } from './components/settings/pages/Serial';

import { Event, listen } from '@tauri-apps/api/event';
import { TopBar } from './components/TopBar';
import { ConfigContextProvider } from './components/providers/ConfigContext';
import { OnboardingLayout } from './components/onboarding/OnboardingLayout';
import { HomePage } from './components/onboarding/pages/Home';
import { WifiCredsPage } from './components/onboarding/pages/WifiCreds';
import { ConnectTrackersPage } from './components/onboarding/pages/ConnectTracker';
import { OnboardingContextProvider } from './components/onboarding/OnboardingContextProvicer';
import { MountingPage } from './components/onboarding/pages/mouting/Mounting';

function Layout() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayoutRoute>
              <Home />
            </MainLayoutRoute>
          }
        />
        <Route
          path="/proportions"
          element={
            <MainLayoutRoute>
              <BodyProportions />
            </MainLayoutRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsLayoutRoute>
              <Outlet></Outlet>
            </SettingsLayoutRoute>
          }
        >
          <Route path="trackers" element={<GeneralSettings />} />
          <Route path="serial" element={<Serial />} />
        </Route>
        <Route
          path="/onboarding"
          element={
            <OnboardingContextProvider>
              <OnboardingLayout>
                <Outlet></Outlet>
              </OnboardingLayout>
            </OnboardingContextProvider>
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="wifi-creds" element={<WifiCredsPage />} />
          <Route path="connect-trackers" element={<ConnectTrackersPage />} />
          <Route path="mounting" element={<MountingPage />} />
        </Route>
        <Route path="*" element={<TopBar></TopBar>}></Route>
      </Routes>
    </>
  );
}

function App() {
  const websocketAPI = useProvideWebsocketApi();

  useEffect(() => {
    const unlisten = listen(
      'server-status',
      (event: Event<[string, string]>) => {
        const [event_type, s] = event.payload;
        if ('stderr' === event_type) {
          // This strange invocation is what lets us lose the line information in the console
          // See more here: https://stackoverflow.com/a/48994308
          setTimeout(
            console.log.bind(
              console,
              `%c[SERVER] %c${s}`,
              'color:cyan',
              'color:red'
            )
          );
        } else if (event_type === 'stdout') {
          setTimeout(
            console.log.bind(
              console,
              `%c[SERVER] %c${s}`,
              'color:cyan',
              'color:green'
            )
          );
        } else if (event_type === 'error') {
          console.error('Error: %s', s);
        } else if (event_type === 'terminated') {
          console.error('Server Process Terminated: %s', s);
        } else if (event_type === 'other') {
          console.log('Other process event: %s', s);
        }
      }
    );
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      unlisten.then(() => {});
    };
  }, []);

  return (
    <Router>
      <ConfigContextProvider>
        <WebSocketApiContext.Provider value={websocketAPI}>
          <AppContextProvider>
            <div className="h-full w-full text-standard bg-background-80 text-background-10">
              <div className="flex-col h-full">
                {!websocketAPI.isConnected && (
                  <>
                    <TopBar></TopBar>
                    <div className="flex w-full h-full justify-center items-center p-2">
                      Connection lost to server
                    </div>
                  </>
                )}
                {websocketAPI.isConnected && <Layout></Layout>}
              </div>
            </div>
          </AppContextProvider>
        </WebSocketApiContext.Provider>
      </ConfigContextProvider>
    </Router>
  );
}

export default App;
