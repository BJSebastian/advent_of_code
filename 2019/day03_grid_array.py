#===========================================================================================
# --- Day 3: Crossed Wires ---
#===========================================================================================

# global scope
grid = []
row = 0
col = 0

def create_grid(w, h):
  global row
  global col
  global grid

  # set grid (w)idth, (h)eight and possible wire (c)olors...  
  # w, h, c = 11, 10, 2
  c = 2
  grid = [[[0 for z in range(c)] for x in range(w)] for y in range(h)]

  # Create 3 dimensional array with a "." in each cell and a "o" at the starting position
  # for each wire.
  for x in range(h):
    for y in range(w):
      for z in range(c):
        #grid[x][y] = str(x + 1) + '.' + str(y + 1)
        grid[x][y][z] = '.'

  # place the central port at 1,1 for the 1st and 2nd wires.
  row = 1
  col = 1
  grid[row][col][0] = 'o'
  grid[row][col][1] = 'o'

  # print the grid.
  print_grid(grid)
  print()

def print_grid(grid):
  collisions = []
  # loop rows (in reverse order)...
  for x in range(len(grid)-1, -1, -1):
    row = ''
    # loop cols...
    for y in range(len(grid[0])):
      if grid[x][y][0] != '.' and grid[x][y][1] != '.' and \
        grid[x][y][0] != 'o' and grid[x][y][1] != 'o':
        row += 'X '
        collisions.append((x - 1) + (y - 1))
      elif grid[x][y][0] != '.':
        row += grid[x][y][0] + ' '
      elif grid[x][y][1] != '.':
        row += grid[x][y][1] + ' '
      else:
        row += '. '


    print(row)

  if len(collisions) > 0:
    print('Manhattan distance:')
    for collision in sorted(collisions):
      print(collision)
      break

def follow_wire(wire, direction, distance):
  global row
  global col
  global grid

  if row > 1 or col > 1:
    grid[row][col][wire] = '+'

  if direction == 'R':
    for _ in range(distance):
      col += 1
      grid[row][col][wire] = '-'
  elif direction == 'L':
    for _ in range(distance):
      col -= 1
      grid[row][col][wire] = '-'
  elif direction == 'U':
    for _ in range(distance):
      row += 1
      grid[row][col][wire] = '|'
  if direction == 'D':
    for _ in range(distance):
      row -= 1
      grid[row][col][wire] = '|'

  print_grid(grid)
  print()
  
def main():
  global row
  global col
  global grid

  #-----------------------------------------------------------------------------------------
  #  Manually execute each test script from puzzle description...
  #-----------------------------------------------------------------------------------------

  # create grid width 11 cols x height 10 rows
  # create_grid(11, 10)
  
  # # For the 1st wire... 
  # # 1) process a R8 (Right 8) command...
  # follow_wire(0, 'R', 8)

  # # 2) process an U5 (Up 5) command...
  # follow_wire(0, 'U', 5)

  # #  process a L5 (Left 5) command...
  # follow_wire(0, 'L', 5)

  # # process a D3 (Down 3) command...
  # follow_wire(0, 'D', 3)

  # # now were moving to follow the 2nd wire, start at the central port.
  # row = 1
  # col = 1

  # # For the 2nd wire...
  # # 1) process an U7 (Up 7) command...
  # follow_wire(1, 'U', 7)
  
  # # 2) process a R6 (Right 6) command...
  # follow_wire(1, 'R', 6)

  # # 3) process a D4 (Down 4) command...
  # follow_wire(1, 'D', 4)

  # # 4) process a L4 (Left 4) command...
  # follow_wire(1, 'L', 4)

  #-----------------------------------------------------------------------------------------
  #  Execute test script from puzzle description from full string of moves...
  #-----------------------------------------------------------------------------------------

  test_script_wire1 = 'R8,U5,L5,D3'
  test_script_wire2 = 'U7,R6,D4,L4'

  # create grid width (cols) x height (rows)
  create_grid(11, 10)

  wire1_moves = test_script_wire1.split(",")
  for move in wire1_moves:
    direction = move[0]
    distance = int(move[1:])
    print(f'following wire 1 {direction}, {distance} from row, col... {row}, {col}')
    follow_wire(0, direction, distance)

  # now were moving to follow the 2nd wire, start at the central port.
  row = 1
  col = 1

  wire2_moves = test_script_wire2.split(",")
  for move in wire2_moves:
    direction = move[0]
    distance = int(move[1:])
    print(f'following wire 2 {direction}, {distance} from row, col... {row}, {col}')
    follow_wire(1, direction, distance)

  print_grid(grid)

  #-------------------------------------
  #  Done processing commands!
  #-------------------------------------
  print("program done!")

main()