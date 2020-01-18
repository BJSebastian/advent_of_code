#===========================================================================================
# --- Day 3: Crossed Wires ---
#===========================================================================================

# global scope
row = 0
col = 0
step_count = 0
intersections = []
intersection_steps_to = []

# set the central port at row 0, col 0.
grid = {
  (0, 0): 'o'
}

steps = {
  (0, 0): 0
}

def follow_wire(wire, direction, distance):
  global row
  global col
  global grid

  if direction == 'R':
    for _ in range(distance):
      col += 1
      check_wire(wire)
  elif direction == 'L':
    for _ in range(distance):
      col -= 1
      check_wire(wire)
  elif direction == 'U':
    for _ in range(distance):
      row += 1
      check_wire(wire)
  if direction == 'D':
    for _ in range(distance):
      row -= 1
      check_wire(wire)

def check_wire(wire):
  global row
  global col
  global step_count
  global steps
  global grid

  step_count += 1

  if grid.get((row, col)) == None:
    grid[(row,col)] = wire
    steps[(row,col)] = step_count
  else:
    if grid.get((row, col)) != wire:
      intersections.append((abs(row)) + (abs(col)))
      print(f'intersection found at row: {row} col: {col} steps to get here are: {steps.get((row, col))} and {step_count}')
      intersection_steps_to.append(steps.get((row, col)) + step_count)

def main():
  global row
  global col
  global step_count
  global steps
  global grid
 
  #-----------------------------------------------------------------------------------------
  #  Execute test script from puzzle description from full string of moves...
  #-----------------------------------------------------------------------------------------

  # test #1:
  wire1 = 'R8,U5,L5,D3'
  wire2 = 'U7,R6,D4,L4'

  # test #2:
  # wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'
  # wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83'

  # test #3:
  # wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'
  # wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'

  wire1_moves = wire1.split(",")
  for move in wire1_moves:
    direction = move[0]
    distance = int(move[1:])
    # print(f'following wire 1 {direction}, {distance} from row, col... {row}, {col}')
    follow_wire(0, direction, distance)

  # now were moving to follow the 2nd wire, start at the central port.
  row = 0
  col = 0
  step_count = 0

  wire2_moves = wire2.split(",")
  for move in wire2_moves:
    direction = move[0]
    distance = int(move[1:])
    # print(f'following wire 2 {direction}, {distance} from row, col... {row}, {col}')
    follow_wire(1, direction, distance)

  # check for intersections...
  if len(intersections) > 0:
    print('Manhattan distance:')
    for intersection in sorted(intersections):
      print(intersection)
      break
  
  # check for fewest steps to reach an intersection...
  if len(intersection_steps_to) > 0:
    print('Fewest combined steps the wires must take to reach an intersection:')
    for intersection_steps in sorted(intersection_steps_to):
      print(intersection_steps)
      break

  #-------------------------------------
  #  Done processing commands!
  #-------------------------------------
print("program completed!")

main()