import SharedStyle from '../../shared/config/SharedStyles';

export const segmentRate = 20;
export const boardWidth = SharedStyle.board.width;
export const boardHeight = SharedStyle.board.height - segmentRate;
export const frameX = (boardWidth - segmentRate) / segmentRate;
export const frameY = boardHeight / segmentRate;
