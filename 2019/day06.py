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

def get_orbit(current_obj, orbits):
    if current_obj not in orbits: return []
    return [orbits[current_obj]] + get_orbit(orbits[current_obj], orbits)

# def get_path_between(start, end, orbits):
#   start_path, end_path = count_orbits(start, orbits), count_orbits(end, orbits)

def main():
  orbits = {}
  objects = set()
  
  try:
    file_name = "input06.txt"
    # file_name = "input06_2_test.txt"

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
      print(f"Node {obj} has {node_orbits} orbits.")

    print(f"total orbits: {total_orbits}")
    
    # --- PART TWO ---
    # get list of nodes from you to com.
    start_path = get_orbit("YOU", orbits)
    # get list of notes from santa to com.
    end_path = get_orbit("SAN", orbits)
    print(f"start path = {start_path}")
    print(f"end path = {end_path}")

    # find the (only) node that is in both lists of nodes (from santa to com and from you to com)
    overlapping_point = [i for i in start_path if i in end_path][0]
    print(f"overlapping point = {overlapping_point}")

    # the common node index in your list of nodes will be the number of jumps from you to that common node
    start_path_index = start_path.index(overlapping_point)
    # the common node index in santas list of nodes will be the number jumps from santa to that common node
    end_path_index = end_path.index(overlapping_point)
    print(f"start path index = {start_path_index}")
    print(f"end path index = {end_path_index}")
    # the number of jumps from you to santa will be the sum of 
    # the number of jumps from you to that common node +
    # the number jumps from santa to that common node
    print(f"part 2 answer: {start_path_index + end_path_index}")

  except FileNotFoundError:
    print("\tError!", file_name, " File not found\n")
  
  except ValueError:
    print("\tError!", file_name, "contains non-numeric data\n")

main()