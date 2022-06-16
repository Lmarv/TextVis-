import json 
import csv 

with open('Data.csv', "r") as f:
    reader = csv.reader(f, delimiter='|')
    next(reader)
    data = {'entry': []}
    for row in reader:
        data['entry'].append({'id':row[0], 'sentence': row[1],
        'sentiment': row[2], 'chapter': row[3], 'book': row[4],
        'spells': row[5], 'characters': row[6], 'gruops': row[7]})
        # print(row)
    
with open('Data.json', 'w') as f:
    json.dump(data, f, indent=4)
