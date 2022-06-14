# average sentiment calculation per chapter, save df containing each chapter and its sentiment values
# author: Julia Guettler

import pandas as pd
import numpy as np

df=pd.read_csv("./Data.csv", sep="|")


# empty lists to save the name of the chapter
chapterName = []

#the average sentiment excluding 0.0 sentiments from the calculation of the average
avgSentiment = []

#the median sentiment excluding 0.0 sentiments from the calculation of the median
medianSentiment = []

#the average sentiment including 0.0 sentiments
avgSentiment0= []

#compile list of unique chapter names
uniqueChapters = []
for c in list(df["chapter"]):
    if c not in uniqueChapters:
        uniqueChapters.append(c)

# for every chapter create a partDf which contains all the columns from the df but only the rows of the current chapter
# save the sentiment column of the chapter in cSentiment
# calculate the averages and the median from the cSentiment list and append them to the respective lists per chapter
for c in uniqueChapters:
    partDf = df[df["chapter"] == c]
    cSentiment = list(partDf["sentiment"])

    chapterName.append(c)
    avgSentiment0.append(np.mean(cSentiment))
    cSentiment = [s for s in cSentiment if s != 0.0]
    avgSentiment.append(np.mean(cSentiment))
    medianSentiment.append(np.median(cSentiment))


# create a new data frame with the columns id, chaptername, avgsentiment, mediansentiment, and avgsentiment0 (including 0.0 in the calculations)
chapters = pd.DataFrame(columns=["id", "chaptername", "avgsentiment", "mediansentiment", "avgsentiment0"]) 

# fill the data frame with the previously compiled lists
chapters["chaptername"] = chapterName
chapters["avgsentiment"] = avgSentiment
chapters["mediansentiment"] = medianSentiment
chapters["avgsentiment0"] = avgSentiment0
chapters["id"] = list(range(len(chapters)))

# save the new data frame chapters as a CSV file with pipe ("|") as separator
with open("./chapterSentiment.csv", "w") as file2:
    file2.write(chapters.to_csv(header=True, index=False, sep="|"))
