#===========================================================================================
#  Advent of Code 2019
#  --- Day 2: 1202 Program Alarm ---
#===========================================================================================

def process_intcodes(intcodes):

  instruction_pointer = 0
  parm1 = 0
  parm2 = 0
  parm3 = 0
  
  for _ in intcodes[::4]:
    opcode = intcodes[instruction_pointer]

    if (int(opcode) == 1 or int(opcode) == 2):
      parm1 = int(intcodes[instruction_pointer+1])
      parm2 = int(intcodes[instruction_pointer+2])
      parm3 = int(intcodes[instruction_pointer+3])

    if int(opcode) == 1:
      intcodes[parm3] = int(intcodes[parm1]) + int(intcodes[parm2])
    elif int(opcode) == 2:
      intcodes[parm3] = int(intcodes[parm1]) * int(intcodes[parm2])
    elif int(opcode) == 99:
      break
    else:
      print("Unknown opcode encountered")

    instruction_pointer += 4

  return intcodes

def main():

  # test scenario #1:
  # test = "1,0,0,0,99"
  # test = "2,3,0,3,99"
  # test = "2,4,4,5,99,0"
  # test = "1,1,1,4,99,5,6,0,99"
  # print(process_intcodes(test))

  # open the file.
  with open('input02.txt', 'r') as file:
    data = file.read()
    intcodes = data.split(",")

    # --- Part One ---
    # before running the program, replace position 1 with the value 12 
    # and replace position 2 with the value 2.
    intcodes[1] = 12
    intcodes[2] = 2
    program_output = process_intcodes(intcodes)
    
    # What value is left at position 0 after the program halts?
    print(f'Value at position 0: {program_output[0]}')

    # --- Part Two ---
    output_found = False
    for x in range(99):
      for y in range(99):
        # reset the data.
        intcodes = data.split(",")
        intcodes[1] = x
        intcodes[2] = y
        program_output = process_intcodes(intcodes)
        # What value is left at position 0 after the program halts?
        if program_output[0] == 19690720:
          output_found = True
          print(f'Value at position 0 for noun/verb: {x}/{y}' + 
            f' {program_output[0]} ' +
            f' Answer: {100 * x + y}')
          break
      
      if output_found:
        break
    
main()