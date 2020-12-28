const fs = require('fs');
const inputFilename = "input.txt";
let maxRowIndex = 0;
let maxColIndex = 0;

function checkSeat(seats, seat) {

  let debug = false;
  // if (seat.row === 1 && seat.col === 8) {
  //   debug = true;
  // }

  let currSeatStatus = seat.seatStatus;
  let adjacentOccupied = 0;

  if (currSeatStatus === "L" ||
    currSeatStatus === "#") {

    // Test finding a seat...
    // if (seat.row === 0 && seat.col === 0) {
    //   const checkSeat = seats.find(({
    //     row,
    //     col
    //   }) => row === 0 && col === 0);
    //   if (checkSeat.seatStatus === "L") {
    //     seat.seatStatus = "#";
    //   }
    // }

    // Start at seat to the upper left...
    if (seat.row > 0 && seat.col > 0) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row - 1 && col === seat.col - 1);
      if (debug) console.log('top left', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    // Check seat above...
    if (seat.row > 0) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row - 1 && col === seat.col);
      if (debug) console.log('top', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    // Check seat above right...
    if (seat.row > 0 && seat.col < maxColIndex) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row - 1 && col === seat.col + 1);
      if (debug) console.log('top right', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    // Check seat to the right...
    if (seat.col < maxColIndex) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row && col === seat.col + 1);
      if (debug) console.log('right', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    // Check seat below right...
    if (seat.row + 1 < maxRowIndex && seat.col < maxColIndex) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row + 1 && col === seat.col + 1);
      if (debug) console.log('bottom right', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    // Check seat below...
    if (seat.row + 1 < maxRowIndex) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row + 1 && col === seat.col);
      if (debug) console.log('bottom', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    // Check seat below left...
    if (seat.row + 1 < maxRowIndex && seat.col > 0) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row + 1 && col === seat.col - 1);
      if (debug) console.log('bottom left', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    // Check seat to the left...
    if (seat.col > 0) {
      const checkSeat = seats.find(({
        row,
        col
      }) => row === seat.row && col === seat.col - 1);
      if (debug) console.log('left', seat.row -1, seat.col -1, checkSeat);
      if (checkSeat.seatStatus === "#") {
        adjacentOccupied++;
      }
    }

    if (currSeatStatus === "L" && adjacentOccupied === 0) {
      seat.seatStatus = "#";
    } else if (currSeatStatus === "#" && adjacentOccupied >= 4) {
      seat.seatStatus = "L";
    }
  }

  if (debug) {
    console.log(`Row: ${seat.row} Col: ${seat.col} # Adjacents: ${adjacentOccupied}`);
  }
}

function printSeats(seats) {
  let currRow = 0;
  let rowSeats = '';
  seats.forEach((seat) => {
    if (seat.row != currRow) {
      console.log(rowSeats);
      rowSeats = seat.seatStatus;
      currRow = seat.row;
    } else {
      rowSeats += seat.seatStatus;
    }
  });
  // print last row.
  console.log(rowSeats);
};

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');
  const lines = input.split('\n');
  const seats = [];
  let row = 0;
  lines.forEach((line) => {

    if (maxColIndex === 0) {
      maxColIndex = line.length - 1;
    }

    // console.log(line);
    for (var col = 0; col < line.length; col++) {
      seats.push({
        row: row,
        col: col,
        seatStatus: line[col]
      });
    }

    row++;

    if (row > maxRowIndex) {
      maxRowIndex = row;
    }
  });

  // for debugging:
  // console.log(seats);

  // create a copy of our array of seat objects.
  // we need to do this because we need to keep the original seat arrangement as we go 
  // thru and check adjacent seats.
  // How do you clone an Array of Objects in Javascript?
  // https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
  // const newSeats = JSON.parse(JSON.stringify(seats));
  // newSeats.forEach((seat) => {
  //   checkSeat(seats, seat);
  // });

  // print rows before changes:
  console.log();
  console.log("rows before...");
  printSeats(seats);

  // // print all rows after changes:
  // console.log();
  // console.log("rows after...");
  // printSeats(newSeats);

  // const newSeats2 = JSON.parse(JSON.stringify(newSeats));
  // newSeats2.forEach((seat) => {
  //   checkSeat(newSeats, seat);
  // });

  // // print all rows after changes:
  // console.log();
  // console.log("rows after a 2nd round...");
  // printSeats(newSeats2);

  let round = 0;
  let mapsAreDifferent = true;
  let startingSeats = JSON.parse(JSON.stringify(seats));
  let endingSeats = JSON.parse(JSON.stringify(seats));
  while (round <= 1000 && mapsAreDifferent) {

    round++;

    // Change seats.
    endingSeats.forEach((seat) => {
      checkSeat(startingSeats, seat);
    });

    // print all rows after changes:
    // console.log();
    // console.log(`rows after round: ${round}...`);
    // printSeats(endingSeats);

    let mapCheck = true;
    let occupiedSeats = 0;
    for (let i = 0; i < startingSeats.length; i++) {
      if (startingSeats[i].seatStatus != endingSeats[i].seatStatus) {
        mapCheck = false;
      }
      else if (endingSeats[i].seatStatus === "#") {
        occupiedSeats++;
      }
    }

    if (mapCheck) {
      mapsAreDifferent = false;
      console.log(`# occupied seats: ${occupiedSeats}`);
    } else {
      startingSeats = JSON.parse(JSON.stringify(endingSeats));
    }

    // console.log(startingSeats);
    // console.log(endingSeats);
  }

}

puzzle();
