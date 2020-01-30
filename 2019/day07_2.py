#==========================================================================================
#  Advent of Code 2019
#  --- Day 7: Amplification Circuit ---
#==========================================================================================
from itertools import permutations

class Amp:
  def __init__(self, prog):
    self.prog           = prog[:]
    self.ip             = 0
    self.output         = 0
    self.input_counter  = 0
    self.halt           = False

def run_amp_program(amp, phase, input):
  
  continue_running_program = True

  while continue_running_program:

    parm1 = 0 
    parm1_mode = 0
    parm2 = 0
    parm2_mode = 0
    parm3 = 0

    opcode = amp.prog[amp.ip]

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

      parm1 = int(amp.prog[amp.ip+1])
      parm2 = int(amp.prog[amp.ip+2])
      parm3 = int(amp.prog[amp.ip+3])
      # print(f"process instruction at pos {amp.ip}: {amp.prog[amp.ip]} {parm1} {parm2} {parm3}")

    elif (int(opcode) == 5 or int(opcode) == 6):

      parm1 = int(amp.prog[amp.ip+1])
      parm2 = int(amp.prog[amp.ip+2])
      # print(f"process instruction at pos {amp.ip}: {amp.prog[amp.ip]} {parm1} {parm2}")

    elif (int(opcode) == 3 or int(opcode) == 4):

      parm1 = int(amp.prog[amp.ip+1])
      # print(f"process instruction at pos {amp.ip}: {amp.prog[amp.ip]} {parm1}")

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
        value1 = amp.prog[parm1]

      if parm2_mode == 1:
        value2 = parm2
      else:
        value2 = amp.prog[parm2]

      if int(opcode) == 1:
        amp.prog[parm3] = int(value1) + int(value2)
      elif int(opcode) == 2:
        amp.prog[parm3] = int(value1) * int(value2)
      amp.ip += 4

    elif int(opcode) == 3:
      #-------------------------------------------------------------------------------------
      #  3 - Input to position
      #-------------------------------------------------------------------------------------      
      if amp.input_counter > 0:
        amp.prog[parm1] = input
      else:
        amp.prog[parm1] = phase

      amp.input_counter += 1
      amp.ip += 2

      # print(f"                   : place input: {amp.prog[parm1]} into pos: {parm1}")
      # print("-------------------------------------------------------------------------------")

    elif int(opcode) == 4:
      #-------------------------------------------------------------------------------------
      #  4 - Output from position
      #-------------------------------------------------------------------------------------      
      amp.output = amp.prog[parm1]
      amp.ip += 2
      continue_running_program = False
      break

    elif int(opcode) == 5:
      #-------------------------------------------------------------------------------------
      #  5 - Jump-if-True
      #-------------------------------------------------------------------------------------
        
      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = amp.prog[parm1]

      if int(value1) != 0:
        # set 2nd parameter value (based on mode).
        if parm2_mode == 1:
          value2 = parm2
        else:
          value2 = amp.prog[parm2]
        amp.ip = int(value2)
      else:
        amp.ip += 3
      
    elif int(opcode) == 6:
      #-------------------------------------------------------------------------------------
      #  6 - Jump-if-False
      #-------------------------------------------------------------------------------------

      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = amp.prog[parm1]

      if int(value1) == 0:
        # set 2nd parameter value (based on mode).
        if parm2_mode == 1:
          value2 = parm2
        else:
          value2 = amp.prog[parm2]
        amp.ip = int(value2)
      else:
        amp.ip += 3

    elif int(opcode) == 7:
      #-------------------------------------------------------------------------------------
      #  7 - Less Than
      #-------------------------------------------------------------------------------------

      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = amp.prog[parm1]

      # set 2nd parameter value (based on mode).
      if parm2_mode == 1:
        value2 = parm2
      else:
        value2 = amp.prog[parm2]

      if int(value1) < int(value2):
        amp.prog[parm3] = 1
      else:
        amp.prog[parm3] = 0

      amp.ip += 4

    elif int(opcode) == 8:
      #-------------------------------------------------------------------------------------
      #  8 - Equals
      #-------------------------------------------------------------------------------------
      # set 1st parameter value (based on mode).
      if parm1_mode == 1:
        value1 = parm1
      else:
        value1 = amp.prog[parm1]

      # set 2nd parameter value (based on mode).
      if parm2_mode == 1:
        value2 = parm2
      else:
        value2 = amp.prog[parm2]

      if int(value1) == int(value2):
        amp.prog[parm3] = 1
      else:
        amp.prog[parm3] = 0

      amp.ip += 4

    elif int(opcode) == 99:
      #-------------------------------------------------------------------------------------
      #  99 - Halt
      #-------------------------------------------------------------------------------------
      amp.halt = True
      continue_running_program = False
      break

    else:
      print("Unknown opcode encountered")
      amp.halt = True
      continue_running_program = False
      break

  return amp

def main():

  # intcode program from test data...

  # # day 2, test 1...
  # data = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5"
  # phase_setting_seq = (9,8,7,6,5)

  # day 2, test 2...
  # data = "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10"
  # phase_setting_seq = (9,7,8,5,6)

  # intcode program from data file.
  data = ""
  with open('input07.txt', 'r') as file:
    data = file.read()

  # Get all permutations of [9, 8, 7, 6, 5] 
  possible_phase_setting_sequences = permutations([9, 8, 7, 6, 5]) 

  highest_output_signal = 0

  prog = data.split(",")

  for phase_setting_seq in possible_phase_setting_sequences:
    # reset the amps for new phase sequence.
    amps = []
    for _ in range(5):
      amps.append(Amp(prog))
    active = 0

    continue_running_amps = True
    prev_output_signal = 0

    while continue_running_amps:
      for x in phase_setting_seq:
        # print(f"run program on amp: {active} with phase setting: {x}, input: {prev_output_signal}, ip: {amps[active].ip}")
        amps[active] = run_amp_program(amps[active], x, prev_output_signal)
        prev_output_signal = amps[active].output

        if prev_output_signal > highest_output_signal:
          highest_output_signal = prev_output_signal

        if amps[active].halt:
          continue_running_amps = False
          break

        if active == 4:
          active = 0
        else:
          active += 1

  print(f"Highest signal that can be sent to the thrusters?: {highest_output_signal}")

main()

