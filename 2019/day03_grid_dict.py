grid = {
  (0, 0): '.',
  (0, 1): '#',
  (1, 0): '#',
  (1, 1): '.',
}

print(grid)

# print cell at row 0, col 1...
print(grid.get((0, 1)))

# add a cell at row 1, col 2...
grid[(1,2)] = "-"

# print newly added cell.
print(grid.get((1, 2)))

# get a cell that does not exist.
print(grid.get((1, 4)))

if grid.get((1, 4)) == None:
  print ("cell not found!")

print("program completed!")