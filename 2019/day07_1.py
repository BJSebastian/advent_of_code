#==========================================================================================
#  Advent of Code 2019
#  --- Day 7: Amplification Circuit ---
#==========================================================================================
from itertools import permutations 

def process_intcodes(intcodes, input1, input2):
  
  input1_used = False
  output = 0
  instruction_pointer = 0
  process_intcodes = True
  
  while process_intcodes:

    # input_entered = 0
    parm1 = 0 
    parm1_mode = 0
    parm2 = 0
    parm2_mode = 0
    parm3 = 0

    opcode = intcodes[instruction_pointer]

    #---------------------------------------------------------------------------------------
    #  Determine parameter mode for each parameter:
    #---------------------------------------------------------------------------------------
    if (len(str(opcode)) > 2):
      parm1_mode = str(opcode)[-3:]
      parm1_mode = int(parm1_mode[:1])
    if (len(str(opcode)) > 3):
      parm2_mode = str(opcode)[-4:]
      parm2_mode = int(parm2_mode[:1])

    #---------------------------------------------------------------------------------------
    #  Determine opcode
    #---------------------------------------------------------------------------------------
    if (opcode == "99999" or opcode == "9999" or opcode == "999" or opcode == "99"):
      opcode = "99"
    elif (len(str(opcode)) > 1):
      opcode = str(opcode)[-1:]

    #---------------------------------------------------------------------------------------
    #  Get parameter values.
    #---------------------------------------------------------------------------------------
    parm1 = int(intcodes[instruction_pointer+1])

    if (int(opcode) == 1 or int(opcode) == 2
      or int(opcode) == 5 or int(opcode) == 6
      or int(opcode) == 7 or int(opcode) == 8):
      parm2 = int(intcodes[instruction_pointer+2])

    if (int(opcode) == 1 or int(opcode) == 2
      or int(opcode) == 7 or int(opcode) == 8):
      parm3 = int(intcodes[instruction_pointer+3])

    #---------------------------------------------------------------------------------------
    #  Process the instruction.
    #---------------------------------------------------------------------------------------
    if int(opcode) == 1 or int(opcode) == 2:
      #-------------------------------------------------------------------------------------
      #  1 - Add 
      #  2 - Multiply
      #-------------------------------------------------------------------------------------
      value1 = 0
      value2 = 0

      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = intcodes[parm1]

      if parm2_mode == 1:
        value2 = parm2
      else:
        value2 = intcodes[parm2]

      if int(opcode) == 1:
        intcodes[parm3] = int(value1) + int(value2)
      elif int(opcode) == 2:
        intcodes[parm3] = int(value1) * int(value2)
      instruction_pointer += 4

    elif int(opcode) == 3:
      #-------------------------------------------------------------------------------------
      #  3 - Input to position
      #-------------------------------------------------------------------------------------      
      if input1_used:
        intcodes[parm1] = input2
      else:
        intcodes[parm1] = input1
        input1_used = True

      instruction_pointer += 2

    elif int(opcode) == 4:
      #-------------------------------------------------------------------------------------
      #  4 - Output from position
      #-------------------------------------------------------------------------------------      
      output = intcodes[parm1]
      instruction_pointer += 2

    elif int(opcode) == 5:
      #-------------------------------------------------------------------------------------
      #  5 - Jump-if-True
      #-------------------------------------------------------------------------------------
        
      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = intcodes[parm1]

      if int(value1) != 0:
        # set 2nd parameter value (based on mode).
        if parm2_mode == 1:
          value2 = parm2
        else:
          value2 = intcodes[parm2]
        instruction_pointer = int(value2)
      else:
        instruction_pointer += 3
      
    elif int(opcode) == 6:
      #-------------------------------------------------------------------------------------
      #  6 - Jump-if-False
      #-------------------------------------------------------------------------------------

      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = intcodes[parm1]

      if int(value1) == 0:
        # set 2nd parameter value (based on mode).
        if parm2_mode == 1:
          value2 = parm2
        else:
          value2 = intcodes[parm2]
        instruction_pointer = int(value2)
      else:
        instruction_pointer += 3

    elif int(opcode) == 7:
      #-------------------------------------------------------------------------------------
      #  7 - Less Than
      #-------------------------------------------------------------------------------------

      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = intcodes[parm1]

      # set 2nd parameter value (based on mode).
      if parm2_mode == 1:
        value2 = parm2
      else:
        value2 = intcodes[parm2]

      if int(value1) < int(value2):
        intcodes[parm3] = 1
      else:
        intcodes[parm3] = 0

      instruction_pointer += 4

    elif int(opcode) == 8:
      #-------------------------------------------------------------------------------------
      #  8 - Equals
      #-------------------------------------------------------------------------------------
      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = intcodes[parm1]

      # set 2nd parameter value (based on mode).
      if parm2_mode == 1:
        value2 = parm2
      else:
        value2 = intcodes[parm2]

      if int(value1) == int(value2):
        intcodes[parm3] = 1
      else:
        intcodes[parm3] = 0

      instruction_pointer += 4

    elif int(opcode) == 99:
      #-------------------------------------------------------------------------------------
      #  99 - Halt
      #-------------------------------------------------------------------------------------
      process_intcodes = False
      break

    else:
      print("Unknown opcode encountered")
      process_intcodes = False
      break

  return output

def main():

  # intcode program from test data...

  # test 1...
  # data = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"
  # seq_tuple = (4, 3, 2, 1, 0)

  # test 2...
  # data = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
  # seq_tuple = (0, 1, 2, 3, 4)

  # test 3...
  # data = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
  # seq_tuple = (1, 0, 4, 3, 2)

  # open the file.
  data = ""
  with open('input07.txt', 'r') as file:
    data = file.read()

  # Get all permutations of [0, 1, 2, 3, 4] 
  possible_phase_setting_sequences = permutations([0, 1, 2, 3, 4]) 

  count = 1
  highest_output_signal = 0

  for phase_setting_seq in list(possible_phase_setting_sequences): 
    amp_output_signal = 0

    for x in phase_setting_seq:
      intcodes = data.split(",")
      amp_output_signal = process_intcodes(intcodes, x, amp_output_signal)

    if amp_output_signal > highest_output_signal:
      highest_output_signal = amp_output_signal
    print(f"run #{count} output is: {amp_output_signal}")
    count += 1

  print(f"Highest signal that can be sent to the thrusters?: {highest_output_signal}")

main()
