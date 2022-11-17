import React, {Component} from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

export default class GameBoard extends Component {
  render(){
    return (
      <View style={style.boardContainer}>
        {this.props.data.map( (rowData, rowIndex) => {
          return (
            <View style={style.row}>
              {rowData.map( (cell, colIndex) => {
                return(
                  <TouchableOpacity style={style.col} 
                    onPress={ () => {this.props.onClickCell(rowIndex, colIndex);}} 
                    activeOpacity={1}>
                    <Text style={style.cellValue}>
                      {cell.value}
                    </Text>
                  </TouchableOpacity>
                );    
              }
              )}
            </View>
          );
        })
        }
      </View>
    );
  }
}

const style = StyleSheet.create({
  boardContainer: {
    width: "100%",
    aspectRatio: 1
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  col: {
    flex: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center"
  },
  cellValue: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20
  }
});