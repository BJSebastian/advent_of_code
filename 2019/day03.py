#===========================================================================================
#  Advent of Code 2019
#  --- Day 3: Crossed Wires ---
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
      intersection_steps_to.append(steps.get((row, col)) + step_count)

def main():
  global row
  global col
  global step_count
  global steps
  global grid
 
  # open the file.
  file_to_process = open("input03.txt","r")

  wire_number = 0

  # process all lines (wires) in the file.
  for wire in file_to_process:
    
    # start at the central port.
    row = 0
    col = 0
    step_count = 0

    # follow the wire...
    wire_moves = wire.split(",")
    for move in wire_moves:
      direction = move[0]
      distance = int(move[1:])
      follow_wire(wire_number, direction, distance)

    wire_number += 1

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

main()