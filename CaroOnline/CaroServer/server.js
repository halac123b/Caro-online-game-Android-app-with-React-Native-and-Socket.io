var io = require("socket.io")(3000);

const x = "x";
const o = "o";
const _ = "";

var rooms = [];

for (let roomIndex = 1; roomIndex <= 11; roomIndex++){
  let newRoom = {
    name: "Room " + roomIndex,
    players: [],
    data: []
  };
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
  newRoom.data = newData;

  rooms.push(newRoom);
}

io.on("connect", (socket) => {
  console.log("A user connected");
  socket.emit("roomList", rooms);

  socket.on("joinRoom", (roomIndex) => {
    let numberPlayers = rooms[roomIndex].players.length;
    if (numberPlayers == 2){
      socket.emit("joinResult", {result: false});
    }
    else if (numberPlayers == 0){
      rooms[roomIndex].players.push({
        socketId: socket.id,
        type: x,
      });
      socket.emit("joinResult",
      { result: true, 
        currentRoom: roomIndex,
        type: x 
      });
    }
    else{
      rooms[roomIndex].players.push({
        socketId: socket.id,
        type: o,
      });
      socket.emit("joinResult",
      { result: true, 
        currentRoom: roomIndex,
        type: o 
      });
    }
  })

  socket.on("setCell", (cell) => {
    let currentRoom = rooms[cell.roomIndex];
    currentRoom.players.forEach( (player) => {
      currentRoom.data[cell.row][cell.col].value = cell.type;
      io.to(player.socketId).emit("gameData", currentRoom.data);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});