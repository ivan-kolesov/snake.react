import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SharedStyle from '../../shared/config/SharedStyles';
import {segmentRate} from './board';

export interface BoardDimensions {
  /** View width — used both as the board container width and wrap-around-x in logic. */
  viewWidth: number;
  /** View height — used as the board container height. */
  viewHeight: number;
  /** Number of horizontal cells available to the snake (logic). */
  frameX: number;
  /** Number of vertical cells available to the snake (logic). */
  frameY: number;
}

const SCOREBOARD_VERTICAL = SharedStyle.scoreBoard.height + 5; // height + marginBottom

const floorToSegment = (n: number): number => n - (n % segmentRate);

export const useBoardDimensions = (): BoardDimensions => {
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();

  return useMemo(() => {
    const usableWidth = width - insets.left - insets.right;
    const usableHeight =
      height - insets.top - insets.bottom - SCOREBOARD_VERTICAL;

    const viewWidth = floorToSegment(usableWidth);
    const viewHeight = floorToSegment(usableHeight);

    const frameX = viewWidth / segmentRate - 1;
    const frameY = viewHeight / segmentRate - 1;

    return {viewWidth, viewHeight, frameX, frameY};
  }, [width, height, insets.left, insets.right, insets.top, insets.bottom]);
};
