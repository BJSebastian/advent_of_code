#===========================================================================================
#  Advent of Code 2019
#  --- Day 6: Universal Orbit Map ---
#===========================================================================================
def count_orbits(curr_node_value, orbits):
  count = 1
  if orbits.get(curr_node_value) == None: 
    return 0
  else:
    count += count_orbits(orbits.get(curr_node_value), orbits)
  return count

def main():
  orbits = {}
  objects = set()
  
  try:
    file_name = "input06.txt"

    # open the file.
    file_to_process = open(file_name,"r")

    # process all lines in the file
    for orbit in file_to_process:
      orbit_pair = orbit.rstrip().split(")")
      orbits[orbit_pair[1]] = orbit_pair[0]
      objects.add(orbit_pair[0])
      objects.add(orbit_pair[1])

    total_orbits = 0
    for obj in sorted(objects):
      # recursively count orbits (parents) for this node.
      node_orbits = count_orbits(obj, orbits)
      total_orbits += node_orbits
      # print(f"Node {obj} has {node_orbits} orbits.")

    print(f"total orbits: {total_orbits}")

  except FileNotFoundError:
    print("\tError!", file_name, " File not found\n")
  
  except ValueError:
    print("\tError!", file_name, "contains non-numeric data\n")

main()