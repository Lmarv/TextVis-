# word cloud calculation for every chapter
# author: Julia Guettler

import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
import json

df = pd.read_csv("./Data.csv", sep="|")

# get the list of chapter names from chapterSentiment.csv file
uniqueChapters = pd.read_csv("./chapterSentiment.csv", sep="|")["chaptername"]

# empty lists to save chapter, text, and tokens
chapter = []
text = []
tokenlist = []
filteredlist = []
lemmatizedlist = []
lemmatizedText = []

# preprocessing
# create lists of tokens, stop words filtered tokens, lemmatized tokens and a lemmatized text with "." to get the context within a sentence for every chapter
for c in uniqueChapters:

    # save the text of the chapter in string tempText
    partDf = df[ df["chapter"] == c ]
    tempText = ".".join(list(partDf["sentence"]))

    # create lemmatized text to look for token context later using the nltk WordNetLemmatizer
    lemmatizer = WordNetLemmatizer()
    lemmaText = tempText

    # remove punctuation (except .) in lemmaText and split along spaces
    for character in ",;:?!-'\"–”“—’()":
        lemmaText = lemmaText.replace(character, "") 
    lemmaText = lemmaText.lower().split(" ")
    
    # remove stop words in lemmaText
    stopWords = set(stopwords.words('english'))
    lemmaText = [w for w in lemmaText if not w in stopWords]

    # lemmatize the text and join it together again
    lemmaText = [lemmatizer.lemmatize(word) for word in lemmaText]
    lemmaText = " ".join(lemmaText)

    # append the lemmatized text to the global lsit of lemmatized texts
    lemmatizedText.append(lemmaText)

    # remove punctuation in tempText
    for character in ".,;:?!-'\"–”“—’":
        tempText = tempText.replace(character, "")

    # lower tempText
    tempText = tempText.lower()

    # tokenize tempText
    tokens = word_tokenize(tempText)

    # remove stop words and save in filtered
    filtered = [word for word in tokens if not word in stopWords]

    # stemming has been removed due to incomplete words in the word cloud. lemmatization has instead been used

    # lemmatize
    lemmatized = [lemmatizer.lemmatize(word) for word in filtered]

    chapter.append(c)
    text.append(tempText)
    tokenlist.append(tokens)
    filteredlist.append(filtered)
    lemmatizedlist.append(lemmatized)

# create new data frame with created lists for every chapter
# in this project only the lemmatized list will be used, but the tokens and filtered tokens will be appended to the data frame in case word clouds with different preprocessing should be displayed 
newDf = pd.DataFrame(columns=["id", "chapter", "tokens", "filtered", "lemmatized", "lemmatizedText"])
newDf["chapter"] = chapter
newDf["tokens"] = tokenlist
newDf["filtered"] = filteredlist
newDf["lemmatized"] = lemmatizedlist
newDf["id"] = list(range(len(uniqueChapters)))
newDf["lemmatizedText"] = lemmatizedText

# lists to save the token, filtered token, and lemmatized token counts 
countTokens = []
countFiltered = []
countLemmatized = []

# select the data frame column out of which the word clouds should be built
column = "lemmatized"

# create new dictionary data to later save into json
data = {"tokens" : []}

# loop over every chapter to count each token 
for c in uniqueChapters:
    partDf = newDf[ newDf["chapter"] == c ]

    # create a set of all tokens (lemmatized) in the chapter 
    tokenList = list(partDf[column])[0]
    tokenSet = set(tokenList)
    
    # get the text of the chapter and split into sentences
    chapterText = list(partDf["lemmatizedText"])[0]
    chapterSentences = chapterText.split(".")

    # loop over every unique token in the chapter 
    for token in tokenSet:

        # create list with the sentences containing the token in question 
        contextSentences = []
        for sentence in chapterSentences:
            if token in sentence:
                contextSentences.append(sentence)
        
        # save all tokens in "token"'s context sentences in contextTokens list
        contextTokens = []
        for sen in contextSentences:
            contextTokens += (word_tokenize(sen))

        # create a list of tuples to save tuples like:("contextToken", frequency), leaving out the token itself
        tuples = []
        for t in set(contextTokens):
            if t == token:
                continue
            tuples.append((t, contextTokens.count(t)))
        
        # sort list of tuples to get top 10 words in context of token
        tuples.sort(key = lambda x: x[1])
        tuples.reverse()
        
        # create one context string saving up to 10 context words for the token
        context = ""
        i = 0
        for t in tuples:
            if i == 10:
                break
            context+= ("\n"+t[0])
            i +=1

        # count the occurrence of token in the text
        count = tokenList.count(token)

        # create one dictionary entry saving the token, it's frequency, the chapter in question (as int), and the  top 10 context tokens as string 
        data["tokens"].append({"token":token,
                               "freq":count,
                               "chapter":int(c.split(" ")[0]),
                               "context":context
                            })

# save the dictionary in json format
with open("/." + column + "T3.json", "w") as file:
    json.dump(data, file, indent=4)