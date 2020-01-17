#===========================================================================================
# --- Day 1: The Tyranny of the Rocket Equation ---
# --- Part Two ---
#===========================================================================================
import math

def fuel_counter_upper(mass):

  # Specifically, to find the fuel required for a module, take its mass, divide by three,
  fuel_required = mass / 3

  # round down,
  fuel_required = math.floor(fuel_required)

  # and subtract 2.
  fuel_required -= 2

  # use recursion to get the fuel needed to carry the fuel
  if (fuel_required) > 0:
    fuel_required += fuel_counter_upper(fuel_required)
  else:
    fuel_required = 0

  return fuel_required
  
def main():

  # test run from examples provided in spec.
  # modules_mass = [14, 1969, 100756]
  # for mass in modules_mass:
  #   print(fuel_counter_upper(mass))

  # run with test data provided.
  total_fuel_requirement = 0

  # open the file.
  file_to_process = open("day01.txt","r")

  # process all lines in the file
  for mass in file_to_process:
    total_fuel_requirement += fuel_counter_upper(int(mass))

  print(total_fuel_requirement)

main()