interface CacheStore {
  [key: string]: {
    data: any;
    timestamp: number;
  };
}

const globalCache: CacheStore = {};

export function getFromCache<T>(key: string, maxAgeMs = 60000): T | null {
  const item = globalCache[key];
  if (!item) return null;
  if (Date.now() - item.timestamp > maxAgeMs) {
    delete globalCache[key];
    return null;
  }
  return item.data as T;
}

export function setToCache(key: string, data: any) {
  globalCache[key] = {
    data,
    timestamp: Date.now(),
  };
}

export function invalidateServerCache(pattern?: string) {
  if (!pattern) {
    Object.keys(globalCache).forEach((k) => delete globalCache[k]);
    return;
  }
  Object.keys(globalCache).forEach((k) => {
    if (k.includes(pattern)) {
      delete globalCache[k];
    }
  });
}
