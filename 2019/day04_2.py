#===========================================================================================
#  Advent of Code 2019
#  --- Day 4: Secure Container ---
#  --- Part Two ---
#===========================================================================================
from collections import Counter

min = 193651
max = 649729

matches = []

for number in range(min, max + 1):
    is_increasing = True
    has_double = False

    previous = []

    for character in str(number):
        if len(previous) > 0:
            if character < previous[-1]:
                is_increasing = False
                break
            if previous.count(character) > 0:
                has_double = True

        previous.append(character)
    
    if is_increasing and has_double and 2 in Counter(previous).values():
        matches.append(number)


print(len(matches))