const fs = require('fs');

async function readInput() {
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();

  let totalSeats = 0;
  let highestSeatId = 0;
  let seats = [];

  values.forEach((row) => {

    totalSeats++;

    let bounds = {
      firstRow: 0,
      lastRow: 127,
      firstCol: 0,
      lastCol: 7,
      finalRow: 0,
      finalCol: 0,
      getSeatId: function() {
        return this.finalRow * 8 + this.finalCol;
      }
    };

    for (let i = 0; i < row.length; i++) {

      const command = row[i];

      switch (command) {
        case "F":
          bounds.lastRow =  Math.floor(bounds.firstRow + ((bounds.lastRow - bounds.firstRow) / 2));
          break;
        case "B":
          bounds.firstRow = Math.ceil(bounds.lastRow - ((bounds.lastRow - bounds.firstRow) / 2));
          break;
        case "L":
          bounds.lastCol = Math.floor(bounds.firstCol + ((bounds.lastCol - bounds.firstCol) / 2));
          break;
        case "R":
          bounds.firstCol = Math.ceil(bounds.lastCol - ((bounds.lastCol - bounds.firstCol) /2));
          break;
      }

      bounds.finalRow = (bounds.firstRow < bounds.lastRow ? bounds.firstRow : bounds.lastRow);
      bounds.finalCol = (bounds.firstCol < bounds.lastCol ? bounds.firstCol : bounds.lastCol);
    }

    const seatId = bounds.getSeatId();
    console.log(`row ${bounds.finalRow}, col ${bounds.finalCol}, seat ID ${seatId}.`);

    if (seatId > highestSeatId) highestSeatId = seatId;
    seats.push(seatId);

  });

  console.log(`Total # of seats: ${totalSeats} `);
  console.log(`Hightest seat id: ${highestSeatId} `);

  for (let i = 1; i <= highestSeatId ; i++) {
    if (!(seats.includes(i))) {
      console.log(`Seat ${i} has not been taken.`);
    }
  }

}

puzzle();
