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
    layers = []
    image_output = []

    data = ""
    with open(file_name, 'r') as file:
      data = file.read()

    while start_position < len(data):
      row_data = data[start_position:end_position]
            
      start_position += row_length
      end_position += row_length

      layer_info = {
        "layer": layer,
        "row": row,
        "layer_pixels": row_data
      }

      layers.append(layer_info)

      row += 1

      if row > 6:
        row = 1
        layer += 1

    for layer in layers:
      if layer["layer"] == 1:
        image_output.append(layer["layer_pixels"])
      else:
        curr_row = layer["layer_pixels"]

        peek_position = 0
        while peek_position < len(curr_row):
          if image_output[layer["row"]-1][peek_position] == "2" and curr_row[peek_position] != "2":
            image_output[layer["row"]-1] = \
              image_output[layer["row"]-1][:peek_position] + \
              curr_row[peek_position] + \
              image_output[layer["row"]-1][peek_position+1:]

          peek_position += 1

    for output_layer in image_output:
      print(output_layer.replace('0',' '))

  except FileNotFoundError:
    print("\tError!", file_name, " File not found\n")

main()