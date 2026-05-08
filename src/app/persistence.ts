import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGH_SCORE_KEY = '@snake/highScore';

export const loadHighScore = async (): Promise<number> => {
  const raw = await AsyncStorage.getItem(HIGH_SCORE_KEY);
  if (raw === null) {
    return 0;
  }
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const saveHighScore = (value: number): void => {
  AsyncStorage.setItem(HIGH_SCORE_KEY, String(value)).catch(() => {
    // Best-effort persistence; ignore I/O errors.
  });
};
