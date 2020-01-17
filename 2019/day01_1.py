#===========================================================================================
# --- Day 1: The Tyranny of the Rocket Equation ---
# --- Part One ---
#===========================================================================================
import math

def fuel_counter_upper(mass):

  # Specifically, to find the fuel required for a module, take its mass, divide by three,
  fuel_required = mass / 3

  # round down,
  fuel_required = math.floor(fuel_required)

  # and subtract 2.
  fuel_required -= 2

  return fuel_required
  

def main():

  # test run from examples provided in spec.
  # modules_mass = [12, 14, 1969, 100756, 142388]
  # for mass in modules_mass:
  #   print(fuel_counter_upper(mass))

  fuel_requirements = []
  total_fuel_requirement = 0

  try:
    file_name = "day01.txt"

    # open the file.
    file_to_process = open(file_name,"r")

    # process all lines in the file
    for mass in file_to_process:
      fuel_requirements.append(fuel_counter_upper(int(mass)))

    for fuel_requirement in fuel_requirements:
      # print(fuel_requirement)
      total_fuel_requirement += fuel_requirement

    print(total_fuel_requirement)

  except FileNotFoundError:
    print("\tError!", file_name, " File not found\n")
  
  except ValueError:
    print("\tError!", file_name, "contains non-numeric data\n")

main()