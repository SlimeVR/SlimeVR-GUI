import {
  BaseDirectory,
  readTextFile,
  writeFile,
  createDir,
} from '@tauri-apps/api/fs';
import { appDir } from '@tauri-apps/api/path';

import { createContext, useContext, useState } from 'react';

export interface Config {
  debug: boolean;
  doneOnboarding: boolean;
}

export interface ConfigContext {
  config: Config | null;
  loading: boolean;
  setConfig: (config: Partial<Config>) => Promise<void>;
  loadConfig: () => Promise<Config>;
}

export function useConfigProvider(): ConfigContext {
  const [currConfig, set] = useState<Config | null>(null);
  const [loading, setLoading] = useState(false);

  return {
    config: currConfig,
    loading,
    setConfig: async (config: Partial<Config>) => {
      const newConfig = config
        ? {
            ...currConfig,
            ...config,
          }
        : null;
      set(newConfig as Config);

      await createDir('', { dir: BaseDirectory.App, recursive: true });
      await writeFile(
        { contents: JSON.stringify(newConfig), path: 'config.json' },
        { dir: BaseDirectory.App }
      );
    },
    loadConfig: async () => {
      setLoading(true);
      try {
        const appDirPath = await appDir();
        console.log(appDirPath);
        const json = await readTextFile('config.json', {
          dir: BaseDirectory.App,
        });
        const loadedConfig = JSON.parse(json);
        set(loadedConfig);
        setLoading(false);
        return loadedConfig;
      } catch (e) {
        console.log(e);
        setLoading(false);
        return null;
      }
    },
  };
}

export const ConfigContextC = createContext<ConfigContext>(undefined as never);

export function useConfig() {
  const context = useContext<ConfigContext>(ConfigContextC);
  if (!context) {
    throw new Error('useConfig must be within a ConfigContext Provider');
  }
  return context;
}
