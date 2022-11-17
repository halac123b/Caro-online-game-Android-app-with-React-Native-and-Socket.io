import React, {Component} from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class RoomSelector extends Component {
  render(){
    return (
      <View>
        <Text>Pick a room to join</Text>
        {this.props.rooms.map( (room, roomIndex) => {
          return(
            <TouchableOpacity style={style.room} 
              onPress={ () => {this.props.onClickRoom(roomIndex)}} 
              activeOpacity={1}>
              <Text style={style.roomName}>
                {room.name}
              </Text>
              <Text>
                {room.players.length} people is playing
              </Text>
            </TouchableOpacity>
          );    
        }
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  room: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 5,
    padding: 5
  },
  roomName: {
    fontSize: 20,
    fontWeight: "bold"
  }
});