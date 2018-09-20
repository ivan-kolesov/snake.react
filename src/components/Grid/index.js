import React from "react";
import {View} from 'react-native';
import * as boardConstants from "../../scenes/Game/board";
import Cell from "../../scenes/Game/components/Cell";

export default class Grid extends React.PureComponent {
    static generateGrid() {
        let cells = [];
        let counter = 0;
        for (let i = 0; i <= boardConstants.frameX; i++) {
            for (let j = 0; j <= boardConstants.frameY; j++) {
                cells.push({id: counter++, x: i * boardConstants.segmentRate, y: j * boardConstants.segmentRate});
            }
        }

        return cells;
    }

    render() {
        return (
            <View>
                {Grid.generateGrid().map((cell) => {
                    return <Cell key={cell.id} x={cell.x} y={cell.y}/>;
                })}
            </View>
        );
    }
}