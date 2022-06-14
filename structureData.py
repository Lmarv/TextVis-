# data structuring, sentiment calculation per sentence, and and searching for spells, characters, and groups
# author: Julia Guettler

import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import characters_dictionary as cd


# load cleaned txt files in the string text
b="7"
path = "./archiveHP/Book"+b

with open( path + "_clean2.txt") as file:
    text = file.read()

# create a new data frame to save each sentence, its sentiment, the chapter and book it is in 
df = pd.DataFrame(columns=("sentence", "sentiment", "chapter", "book"))


#-------------- STRUCTURING -----------------

# break book into chapters by splitting at "-- CHAPTER "
chapters = text.split("-- CHAPTER ")

# empty lists to later append to data frame
book = []
chapter = []
sentence = []

# current book is the name of the book loaded
currentBook = chapters[0].replace("--- BOOK ", "").replace(".\n", "")

# remove the title of the book (firsts list element) from the list of chapters
chapters.pop(0)

# loop over all the chapters -> every element in chapters is a string beginning with the chapter name
for c in chapters:
    # create a list of sentences by splitting at "."
    sentencelist = c.split(".")

    # replace line breaks in a sentence with space
    sentencelist = [s.replace("\n", " ") for s in sentencelist]

    # remove empty lines from list of sentences
    sentencelist = [s for s in sentencelist if s != " " and s != "\n" and s != ""]

    # loop over the list of sentences
    for s in sentencelist:

        # create one row for the data frame by appending the sentence, current chapter and current book to the respective lists
        sentence.append(s)
        chapter.append(sentencelist[0].title())
        book.append(currentBook.title())

# print(len(book), len(chapter), len(sentence)) # those have to be the same length, just to check

# set the columns of the data frame
df["sentence"] = sentence
df["chapter"] = chapter
df["book"] = book




#------------------- SENTIMENT CALCULATION -------------------

# initialize the Vader Sentiment Intensity Analyzer
sia = SentimentIntensityAnalyzer()

# calculate the compound sentiment for every sentence in the df column sentence and save it in the list sentiment
sentiment = [sia.polarity_scores(sent)["compound"] for sent in df["sentence"]]

# append the sentiment list to the data frame
df["sentiment"] = sentiment


# ------------------- SEARCHING FOR SPELLS, CHARACTERS, AND GROUPS IN THE SENTENCES ----------------------

# read spells data into list allSpells
allSpells = pd.read_csv("./Spells.csv", sep=";")
allSpells = list(allSpells["Incantation"])

# save dictionary with characters in names 
names = cd.names

# allSpells = [spell.lower() for spell in allSpells if spell.lower() != "unknown" and spell.lower() != "pack" and spell.lower() != "none"]
allSpells = [spell for spell in allSpells if spell != "Unknown" and spell != "Pack" and spell != "None"]

# create empty lists to save spells, characters and groups per sentence 
spells = []
characters = []
groups = []

# loop over every sentence 
for sent in list(df["sentence"]):
    # create empty lists to save mentioned spells, characters and groups per sentence
    currentSpells = []
    currentCharacters = []
    currentGroups = []

    # loop over all spells and append the ones found to currentSpells
    for spell in allSpells:
        if spell in sent:
            currentSpells.append(spell)
    
    # append currentSpells to spells
    spells.append(currentSpells)

    # loop over names dictionary's keys 
    for k in names.keys():
        # v is the value of the key
        v = names.get(k)

        # v[0] is the list of names for the same character
        for n in v[0]:
            # if one of the names in v[0] is found in the sentence, the key (full name) is appended to currentCharacters and v[1] (the groups the character belongs to) is appended to currentCroups 
            if n in sent:
                currentCharacters.append(k)
                currentGroups += (v[1])
    # currentCharacters and currentGroups are converted into sets and appended to characters and groups
    currentCharacters = set(currentCharacters)
    currentGroups = set(currentGroups)
    characters.append(currentCharacters)
    groups.append(currentGroups)

# append the lists of spells, characters and groups to the data frame
df["spells"] = spells
df["characters"] = characters
df["groups"] = groups

print(df.head())

# save the data frame with the columns sentence, chapter, book, sentiment, spells, characters, and groups
with open("./data_not_lowered/Book"+b+".csv", "w") as file2:
    file2.write(df.to_csv(header=True, index=False, sep="|"))
