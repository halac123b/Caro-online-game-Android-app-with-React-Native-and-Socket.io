import React, {Component} from "react";

import {
  StyleSheet,
  Text,
  ScrollView,
  ToastAndroid
} from "react-native";
import RoomSelector from "./RoomSelector";
import GameBoard from "./GameBoard";
import io from "socket.io-client";

const x = "x";
const o = "o";
const _ = "";

export default class Game extends Component {
  state = {
    screen: "roomSelector",
    io: io("http://10.0.134.19:3000"),
    rooms: [],
    data: [],
    currentRoom: -1,
    type: x
  };

  createBoardData(){
    let newData = [];
    for (let row = 0; row < 10; row++){
      let newRow = [];
      for (let col = 0; col < 10; col++){
        newRow.push({
          row: row,
          col: col,
          value: _
        });
      }
      newData.push(newRow);
    }
    this.setState({data: newData});
  }

  componentDidMount(){
    this.state.io.on("connect", () => {
      this.state.io.on("roomList", (rooms) => {
        this.setState({rooms: rooms});
      });
      this.state.io.on("joinResult", (data) => {
        if (data.result == true){
          this.startGame(data.currentRoom, data.type);
        }
        else {
          ToastAndroid.show("This room is full", ToastAndroid.SHORT);
        }
      });

      this.state.io.on("gameData", (gameData) => {
        this.setState({data: gameData});
      })

      this.state.io.on("disconnect", () => 
        ToastAndroid.show("Disconnected", ToastAndroid.SHORT));
    });
  }

  joinRoom(roomIndex){
    this.state.io.emit("joinRoom", roomIndex);
  }

  startGame(currentRoom, type){
    this.setState({type: type});
    this.setState({currentRoom: currentRoom});
    this.createBoardData();
    this.setState({screen: "gameBoard"});
  }

  clickCell(row, col){
    this.state.io.emit("setCell", {
      row: row, 
      col: col,
      roomIndex: this.state.currentRoom,
      type: this.state.type
    });
  }

  renderScreens(){
    let screen = null;

    if (this.state.screen == "roomSelector"){
      screen = <RoomSelector rooms={this.state.rooms}
                onClickRoom={(roomIndex) => this.joinRoom(roomIndex)}/>;
    }
    else if (this.state.screen == "gameBoard"){
      screen = <GameBoard data={this.state.data}
                onClickCell={(row, col) => this.clickCell(row, col)}/>;
    }
    return screen;
  }

  render(){
    return (
      <ScrollView>
        <Text style={style.header}>River Caro Online</Text>
        {this.renderScreens()}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  header: {
    fontSize: 25,
    color: "white",
    backgroundColor: "black",
    marginBottom: 20,
    padding: 5
  }
});