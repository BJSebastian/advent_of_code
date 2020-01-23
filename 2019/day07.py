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
  
  # print(f"Input is: {input1}, {input2}")
  # print("-------------------------------------------------------------------------------")

  while process_intcodes:

    input_entered = 0
    parm1 = 0 
    parm1_mode = 0
    parm2 = 0
    parm2_mode = 0
    parm3 = 0

    opcode = intcodes[instruction_pointer]

    # print(f"opcode: {opcode}")

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
    if (int(opcode) == 1 or int(opcode) == 2
      or int(opcode) == 7 or int(opcode) == 8):

      parm1 = int(intcodes[instruction_pointer+1])
      parm2 = int(intcodes[instruction_pointer+2])
      parm3 = int(intcodes[instruction_pointer+3])
      # print(f"process instruction at pos {instruction_pointer}: {intcodes[instruction_pointer]} {parm1} {parm2} {parm3}")

    elif (int(opcode) == 5 or int(opcode) == 6):

      parm1 = int(intcodes[instruction_pointer+1])
      parm2 = int(intcodes[instruction_pointer+2])
      # print(f"process instruction at pos {instruction_pointer}: {intcodes[instruction_pointer]} {parm1} {parm2}")

    elif (int(opcode) == 3 or int(opcode) == 4):

      parm1 = int(intcodes[instruction_pointer+1])
      # print(f"process instruction at pos {instruction_pointer}: {intcodes[instruction_pointer]} {parm1}")

    #---------------------------------------------------------------------------------------
    #  Process the instruction.
    #---------------------------------------------------------------------------------------
    report_line = "                   : "

    if int(opcode) == 1 or int(opcode) == 2:
      #-------------------------------------------------------------------------------------
      #  1 - Add 
      #  2 - Multiply
      #-------------------------------------------------------------------------------------
      value1 = 0
      value2 = 0

      if parm1_mode == 1:
        value1 = parm1
        report_line += f"{parm1} " 
        report_line += "* " if int(opcode) == 2 else "+ "
      else:
        value1 = intcodes[parm1]
        report_line += f"value at pos {parm1}: {intcodes[parm1]} " 
        report_line += "* " if int(opcode) == 2 else "+ "

      if parm2_mode == 1:
        value2 = parm2
        report_line += f"{parm2}"
      else:
        value2 = intcodes[parm2]
        report_line += f"value at pos {parm2}: {intcodes[parm2]}"

      # print(report_line)
      # print("-------------------------------------------------------------------------------")

      if int(opcode) == 1:
        intcodes[parm3] = int(value1) + int(value2)
      elif int(opcode) == 2:
        intcodes[parm3] = int(value1) * int(value2)
      instruction_pointer += 4

    elif int(opcode) == 3:
      #-------------------------------------------------------------------------------------
      #  3 - Input to position
      #-------------------------------------------------------------------------------------
      # input_entered = input("Hit us up with that input? ")
      
      if input1_used:
        intcodes[parm1] = input2
      else:
        intcodes[parm1] = input1
        input1_used = True

      # print(f"                   : place input: {input_entered} into pos: {parm1}")
      # print("-------------------------------------------------------------------------------")
      instruction_pointer += 2

    elif int(opcode) == 4:
      #-------------------------------------------------------------------------------------
      #  4 - Output from position
      #-------------------------------------------------------------------------------------
      # if parm1_mode == 1:
      #   print(f"                   : output is value {parm1}")
      # else:
      #   print(f"                   : output of position {parm1}: {intcodes[parm1]}")
      
      output = intcodes[parm1]

      # print("-------------------------------------------------------------------------------")
      instruction_pointer += 2

    elif int(opcode) == 5:
      #-------------------------------------------------------------------------------------
      #  5 - Jump-if-True
      #-------------------------------------------------------------------------------------
        
      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
        report_line += f"Is {parm1} non-zero? " 
      else:
        value1 = intcodes[parm1]
        report_line += f"Is value at pos {parm1}: {intcodes[parm1]} is non-zero? "

      if int(value1) != 0:
        # set 2nd parameter value (based on mode).
        if parm2_mode == 1:
          value2 = parm2
          report_line += f"Set instruction pointer to value {parm2}" 
        else:
          value2 = intcodes[parm2]
          report_line += f" -- set instruction pointer to value at pos {parm2}: {intcodes[parm2]}"
        instruction_pointer = int(value2)
      else:
        instruction_pointer += 3
      
      # print(report_line)
      # print("-------------------------------------------------------------------------------")

    elif int(opcode) == 6:
      #-------------------------------------------------------------------------------------
      #  6 - Jump-if-False
      #-------------------------------------------------------------------------------------

      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
        report_line += f"Is {parm1} zero? " 
      else:
        value1 = intcodes[parm1]
        report_line += f"Is value at pos {parm1}: {intcodes[parm1]} is zero? "

      if int(value1) == 0:
        # set 2nd parameter value (based on mode).
        if parm2_mode == 1:
          value2 = parm2
          report_line += f"Set instruction pointer to value {parm2}" 
        else:
          value2 = intcodes[parm2]
          report_line += f" -- set instruction pointer to value at pos {parm2}: {intcodes[parm2]}"
        instruction_pointer = int(value2)
      else:
        instruction_pointer += 3

      # print(report_line)
      # print("-------------------------------------------------------------------------------")

    elif int(opcode) == 7:
      #-------------------------------------------------------------------------------------
      #  7 - Less Than
      #-------------------------------------------------------------------------------------

      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
        report_line += f"Is {parm1} < " 
      else:
        value1 = intcodes[parm1]
        report_line += f"Id value at pos {parm1}: {intcodes[parm1]} < " 

      # set 2nd parameter value (based on mode).
      if parm2_mode == 1:
        value2 = parm2
        report_line += f"{parm2} ?" 
      else:
        value2 = intcodes[parm2]
        report_line += f"value at pos {parm2}: {intcodes[parm2]} ?" 

      if int(value1) < int(value2):
        intcodes[parm3] = 1
      else:
        intcodes[parm3] = 0

      # print(report_line)
      # print("-------------------------------------------------------------------------------")
      instruction_pointer += 4

    elif int(opcode) == 8:
      #-------------------------------------------------------------------------------------
      #  8 - Equals
      #-------------------------------------------------------------------------------------
      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
        report_line += f"Is {parm1} = " 
      else:
        value1 = intcodes[parm1]
        report_line += f"Id value at pos {parm1}: {intcodes[parm1]} = " 

      # set 2nd parameter value (based on mode).
      if parm2_mode == 1:
        value2 = parm2
        report_line += f"{parm2} ?" 
      else:
        value2 = intcodes[parm2]
        report_line += f"value at pos {parm2}: {intcodes[parm2]} ?" 

      if int(value1) == int(value2):
        intcodes[parm3] = 1
      else:
        intcodes[parm3] = 0

      # print(report_line)
      # print("-------------------------------------------------------------------------------")
      instruction_pointer += 4

    elif int(opcode) == 99:
      #-------------------------------------------------------------------------------------
      #  99 - Halt
      #-------------------------------------------------------------------------------------
      # print(f"Processing opcode: {opcode} - Halt and Catch Fire!")
      process_intcodes = False
      break

    else:
      print("Unknown opcode encountered")
      process_intcodes = False
      break

  return output

def main():

  # intcode program from test data...
  # data = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"
  # seq_tuple = (4, 3, 2, 1, 0)

  # test 2...
  # data = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
  # seq_tuple = (0, 1, 2, 3, 4)

  # test 3...
  # data = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
  # seq_tuple = (1, 0, 4, 3, 2)

  # open the file.
  with open('input07.txt', 'r') as file:
    data = file.read()

    # seq_tuple = (0, 1, 2, 3, 4)
    # Get all permutations of [1, 2, 3] 
    perm = permutations([0, 1, 2, 3, 4]) 

    count = 1
    highest_output_signal = 0

    for seq_tuple in list(perm): 
      amp_output_signal = 0
      # print("-------------------------------------------------------------------------------")
      for x in seq_tuple:
        intcodes = data.split(",")
        amp_output_signal = process_intcodes(intcodes, x, amp_output_signal)
        # print(f"Amp Output: {amp_output_signal}")
        # print("-------------------------------------------------------------------------------")

      if amp_output_signal > highest_output_signal:
        highest_output_signal = amp_output_signal
      print(f"run #{count} output is: {amp_output_signal}")
      count += 1

  print(f"Highest signal that can be sent to the thrusters?: {highest_output_signal}")

  #----------------------------------------------------------------------------------------
  #  Simple run through...
  #----------------------------------------------------------------------------------------
  
  # # Amplifier A
  # intcodes = data.split(",")
  # amp_output = 0
  # amp_output = process_intcodes(intcodes, seq_tuple[0], amp_output)
  # print(f"Amp Output: {amp_output}")

  # # Amplifier B
  # intcodes = data.split(",")
  # amp_output = process_intcodes(intcodes, seq_tuple[1], amp_output)
  # print(f"Amp Output: {amp_output}")

  # # Amplifier C
  # intcodes = data.split(",")
  # amp_output = process_intcodes(intcodes, seq_tuple[2], amp_output)
  # print(f"Amp Output: {amp_output}")

  # # Amplifier D
  # intcodes = data.split(",")
  # amp_output = process_intcodes(intcodes, seq_tuple[3], amp_output)
  # print(f"Amp Output: {amp_output}")

  # # Amplifier E
  # intcodes = data.split(",")
  # amp_output = process_intcodes(intcodes, seq_tuple[4], amp_output)
  # print(f"Amp Output: {amp_output}")
        
main()
