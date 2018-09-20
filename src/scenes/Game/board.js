import SharedStyle from "../../components/SharedStyles";

export const segmentRate = 20;
export const boardWidth = SharedStyle.board.width;
export const boardHeight = SharedStyle.board.height - 20;
export const frameX = (boardWidth - 20) / segmentRate;
export const frameY = boardHeight / segmentRate;