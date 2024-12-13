import * as fs from 'fs';

type Direction = 'up' | 'right' | 'down' | 'left';

interface Position {
    row: number;
    col: number;
}

// Read the input grid from a file
function readInput(filename: string): string[][] {
    const input = fs.readFileSync(filename, 'utf-8');
    return input.split('\n').map(line => line.split(''));
}

// Determine the next position and direction based on the current state
function getNextPosition(grid: string[][], position: Position, direction: Direction): [Position, Direction] {
    let { row, col } = position;
    let newDirection: Direction = direction;

    // Determine the new position based on the current direction
    switch (direction) {
        case 'up':
            row--;
            break;
        case 'right':
            col++;
            break;
        case 'down':
            row++;
            break;
        case 'left':
            col--;
            break;
    }

    // Check for obstructions or out-of-bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === '#') {
        // Turn right if there's an obstruction or out-of-bounds
        switch (direction) {
            case 'up':
                newDirection = 'right';
                break;
            case 'right':
                newDirection = 'down';
                break;
            case 'down':
                newDirection = 'left';
                break;
            case 'left':
                newDirection = 'up';
                break;
        }
        // Revert position to stay in place and update direction
        return [position, newDirection];
    }

    return [{ row, col }, newDirection];
}

// Simulate the guard's movement and count distinct positions visited
function simulateGuard(grid: string[][], startPosition: Position, startDirection: Direction): Set<string> {
    let position = startPosition;
    let direction = startDirection;
    const visitedPositions = new Set<string>();

    while (true) {
        // Record the current position
        visitedPositions.add(`${position.row},${position.col}`);

        // Get the next position and direction
        const [nextPosition, nextDirection] = getNextPosition(grid, position, direction);

        // Check if the guard has left the grid
        if (nextPosition.row < 0 || nextPosition.row >= grid.length || nextPosition.col < 0 || nextPosition.col >= grid[0].length) {
            break;
        }

        // Update position and direction for the next iteration
        position = nextPosition;
        direction = nextDirection;
    }

    return visitedPositions;
}

// Find potential loop-causing obstructions
function findLoopObstructions(grid: string[][], startPosition: Position, startDirection: Direction): Set<string> {
    const potentialObstructions = new Set<string>();

    // Simulate the guard's path
    const visitedPositions = simulateGuard(grid, startPosition, startDirection);

    // Check each visited position for potential obstruction placement
    visitedPositions.forEach(pos => {
        const [row, col] = pos.split(',').map(Number);

        // Check each direction for potential loops
        for (const direction of ['up', 'right', 'down', 'left'] as Direction[]) {
            let testGrid = grid.map(row => [...row]);
            testGrid[row][col] = '#'; // Place a potential obstruction

            // Simulate the guard's movement again with the obstruction
            const testVisited = simulateGuard(testGrid, startPosition, startDirection);

            // If the guard gets stuck in a loop, record this obstruction position
            if (testVisited.size < visitedPositions.size) {
                potentialObstructions.add(pos);
            }
        }
    });

    return potentialObstructions;
}

// Main function to solve the puzzle
function solvePuzzle(filename: string) {
    const grid = readInput(filename);

    // Find the starting position and direction
    let startPosition: Position = { row: 0, col: 0 };
    let startDirection: Direction = 'up';

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '^') {
                startPosition = { row, col };
                grid[row][col] = '.'; // Clear the starting position
                break;
            }
        }
    }

    // Part 1: Count distinct positions visited
    const visitedPositions = simulateGuard(grid, startPosition, startDirection);
    console.log(`Part 1: Distinct positions visited: ${visitedPositions.size}`);

    // Part 2: Find potential obstructions
    const loopObstructions = findLoopObstructions(grid, startPosition, startDirection);
    console.log(`Part 2: Potential loop-causing obstructions: ${loopObstructions.size}`);
}

// Solve the puzzle with the input file
solvePuzzle('sample.txt');
