import {
  BaseDirectory,
  readTextFile,
  writeFile,
  createDir,
} from '@tauri-apps/api/fs';
import { createContext, useContext, useState } from 'react';

export interface Config {
  debug: boolean;
}

export interface ConfigContext {
  config: Config | null;
  setConfig: (config: Config) => Promise<void>;
  loadConfig: () => Promise<Config>;
}

export function useConfigProvider(): ConfigContext {
  const [currConfig, set] = useState<Config | null>(null);

  return {
    config: currConfig,
    setConfig: async (config: Config) => {
      const newConfig = config
        ? {
            ...(currConfig || {}),
            ...config,
          }
        : null;
      set(newConfig);
      await createDir('', { dir: BaseDirectory.App, recursive: true });
      await writeFile(
        { contents: JSON.stringify(newConfig), path: 'config.json' },
        { dir: BaseDirectory.App }
      );
    },
    loadConfig: async () => {
      try {
        const json = await readTextFile('config.json', {
          dir: BaseDirectory.App,
        });
        const loadedConfig = JSON.parse(json);
        set(loadedConfig);
        return loadedConfig;
      } catch (e) {
        console.log(e);
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
