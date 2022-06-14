# clean the data and save it as txt file
# author: Julia Guettler

import pandas as pd
import re

# open txt data of each book and read the lines, save in lines
path = "./archiveHP/Book7"
with open( path + ".txt") as file:
    lines = file.readlines()

# remove empty lines
lines = [line for line in lines if line != "\n"]

# regex to find the page numbers
pagenumbers = "Page \| \d+ ?\n*Harry Potter .*J.K. Rowling"


# append all the lines to single string text
# add a "." after the chapter and book names for splitting along "."
text = "" 
for line in lines:
    if "-- CHAPTER " in line or "--- BOOK " in line:
        line = line+"."
    text += line

# delete the page numbers in text
text = re.sub(pagenumbers, "", text)
# replace multiple empty lines with just one
text = text.replace("\n \n", "\n")

# remove . after Mr., Mrs. and St. to later split at the end of a sentence indicated by "."
text = text.replace("Mr.", "Mr")
text = text.replace("Mrs.", "Mrs")
text = text.replace("St.", "St")

# save the txt file
with open(path + "_clean2.txt", "w") as endfile:
    endfile.write(text)

