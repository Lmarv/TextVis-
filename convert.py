from base64 import encode
import json 
import csv 

with open('Data.csv', "r") as f:
    reader = csv.reader(f, delimiter='|')
    next(reader)
    data = {'entry': []}
    for row in reader:
        data['entry'].append({'id':row[0], 'sentence': row[1],
        'sentiment': row[2], 'chapter': row[3], 'book': row[4],
        'spells': row[5], 'characters': row[6], 'groups': row[7]})
        # print(row)
    
with open('Data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

with open('./books/Book7.csv', "r") as f:
    reader = csv.reader(f, delimiter='|')
    next(reader)
    data = {'entry': []}
    for row in reader:
        data['entry'].append({'sentence': row[0],
        'sentiment': row[1], 'chapter': row[2], 'book': row[3],
        'spells': row[4], 'characters': row[5], 'groups': row[6]})
        # print(row)
    
with open('Book7.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

with open('Spells.csv', "r", encoding='utf-8') as f:
    reader = csv.reader(f, delimiter=';')
    next(reader)
    data = {'spells': []}
    for row in reader:
        data['spells'].append({'name':row[0], 'incantation': row[1],
        'type': row[2], 'effect': row[3], 'light': row[4]})
        # print(row)
    
with open('Spells.json', 'w', encoding='utf8') as f:
    json.dump(data, f, indent=4)