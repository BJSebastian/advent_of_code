#===========================================================================================
#  Advent of Code 2019
#  --- Day 8: Space Image Format ---
#  --- Part One ---
#===========================================================================================

def main():

  try:
    file_name = "input08.txt"

    # process all lines in the file
    layer = 1
    row = 1
    start_position = 0
    row_length = 25 # rows are 25 pixels wide.
    end_position = row_length
    layer_zero_digits = 0
    layer_one_digits = 0
    layer_two_digits = 0
    layers = []

    data = ""
    with open(file_name, 'r') as file:
      data = file.read()

    while start_position < len(data):
      row_data = data[start_position:end_position]

      # print(f"layer: {layer} row: {row}: {row_data}")

      layer_zero_digits += row_data.count('0')
      layer_one_digits += row_data.count('1')
      layer_two_digits += row_data.count('2')
      
      start_position += row_length
      end_position += row_length
      row += 1
      if row > 6:
        layer_info = {
          "layer": layer,
          "zeroes": layer_zero_digits,
          "ones": layer_one_digits,
          "twos": layer_two_digits
        }
        layers.append(layer_info)
        row = 1
        layer += 1
        layer_zero_digits = 0
        layer_one_digits = 0
        layer_two_digits = 0

    for layer in layers:
      print(f'layer {layer["layer"]}: has {layer["zeroes"]} zeroes.')

    fewest_zeroes = min(layers, key=lambda x:x['zeroes'])
    print(f'layer {fewest_zeroes["layer"]}: has the fewest zeroes.')
    print(f'layer {fewest_zeroes["layer"]}: has {fewest_zeroes["ones"]} ones.')
    print(f'layer {fewest_zeroes["layer"]}: has {fewest_zeroes["twos"]} twos.')
    print(f'Aswer is: {fewest_zeroes["ones"] * fewest_zeroes["twos"]}')
  except FileNotFoundError:
    print("\tError!", file_name, " File not found\n")

main()