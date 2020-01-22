#==========================================================================================
#  Advent of Code 2019
#  --- Day 5: Sunny with a Chance of Asteroids ---
#==========================================================================================

def process_intcodes(input, intcodes):

  instruction_pointer = 0
  process_intcodes = True
  
  print(f"Input is: {input}")
  print("-------------------------------------------------------------------------------")

  while process_intcodes:

    parm1 = 0 
    parm1_mode = 0
    parm2 = 0
    parm2_mode = 0
    parm3 = 0
    # parm3_mode = 0

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
    # if (len(str(opcode)) > 4):
    #   parm3_mode = str(opcode)[-5:]
    #   parm3_mode = int(parm2_mode[:1])

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
      print(f"process instruction at pos {instruction_pointer}: {intcodes[instruction_pointer]} {parm1} {parm2} {parm3}")

    elif (int(opcode) == 5 or int(opcode) == 6):

      parm1 = int(intcodes[instruction_pointer+1])
      parm2 = int(intcodes[instruction_pointer+2])
      print(f"process instruction at pos {instruction_pointer}: {intcodes[instruction_pointer]} {parm1} {parm2}")

    elif (int(opcode) == 3 or int(opcode) == 4):

      parm1 = int(intcodes[instruction_pointer+1])
      print(f"pprocess instruction at pos {instruction_pointer}: {intcodes[instruction_pointer]} {parm1}")

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

      print(report_line)
      print("-------------------------------------------------------------------------------")

      if int(opcode) == 1:
        intcodes[parm3] = int(value1) + int(value2)
      elif int(opcode) == 2:
        intcodes[parm3] = int(value1) * int(value2)
      instruction_pointer += 4

    elif int(opcode) == 3:
      #-------------------------------------------------------------------------------------
      #  3 - Input to position
      #-------------------------------------------------------------------------------------
      intcodes[parm1] = input
      print(f"                   : place input: {input} into pos: {parm1}")
      print("-------------------------------------------------------------------------------")
      instruction_pointer += 2

    elif int(opcode) == 4:
      #-------------------------------------------------------------------------------------
      #  4 - Output from position
      #-------------------------------------------------------------------------------------
      if parm1_mode == 1:
        print(f"                   : output is value {parm1}")
      else:
        print(f"                   : output of position {parm1}: {intcodes[parm1]}")
      
      print("-------------------------------------------------------------------------------")
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
      
      print(report_line)
      print("-------------------------------------------------------------------------------")

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

      print(report_line)
      print("-------------------------------------------------------------------------------")

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

      print(report_line)
      print("-------------------------------------------------------------------------------")
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

      print(report_line)
      print("-------------------------------------------------------------------------------")
      instruction_pointer += 4

    elif int(opcode) == 99:
      #-------------------------------------------------------------------------------------
      #  99 - Halt
      #-------------------------------------------------------------------------------------
      print(f"Processing opcode: {opcode} - Halt")
      process_intcodes = False
      break

    else:
      print("Unknown opcode encountered")
      process_intcodes = False
      break

  return intcodes

def main():

  # intcode program from test data...
  # data = "3,9,8,9,10,9,4,9,99,-1,8"
  # data = "3,9,7,9,10,9,4,9,99,-1,8"
  # data = "3,3,1108,-1,8,3,4,3,99"
  # data = "3,3,1107,-1,8,3,4,3,99"
  # data = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"
  # data = "3,3,1105,-1,9,1101,0,0,12,4,12,99,1"

  # intcodes = data.split(",")
  # input = 2
  # process_intcodes(input, intcodes)

  #-----------------------------------------------------------------------------------------
  #  Process the file.
  #-----------------------------------------------------------------------------------------
  with open('input05.txt', 'r') as file:
    data = file.read()
    intcodes = data.split(",")
    input = 5
    process_intcodes(input, intcodes)
        
main()