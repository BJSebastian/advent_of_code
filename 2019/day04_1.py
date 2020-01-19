#===========================================================================================
#  Advent of Code 2019
#  --- Day 4: Secure Container ---
#  --- Part One ---
#===========================================================================================
possible_passwords = 0

min = 193651
max = 649729

for number in range(min, max + 1):
  
  password = str(number)
  adjacents_found = False
  number_increases = True
  adjacents = 0

  for n in range(len(password) - 1):

    curr_digit = int(password[n])
    next_digit = int(password[n + 1])

    # check for a adjacent #...
    if curr_digit == next_digit:
      adjacents += 1
    elif adjacents == 1:
      adjacents_found = True
      adjacents = 0
    else:
      adjacents = 0

    # check for next number decrease
    if next_digit < curr_digit:
      number_increases = False
    
    if adjacents_found and not number_increases:
      break

  # we need to check the last pass to see if an adjacent was discovered,
  # if one has not aready been found.
  if number_increases and not adjacents_found and adjacents == 1:
    adjacents_found = True

  if adjacents_found and number_increases:
    possible_passwords += 1
    # print(password)

print(f'Possible passwords {possible_passwords}')