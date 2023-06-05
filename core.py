import sys
import json
from Utils import WordCnt

def returnWordCnt():
    f = open("static/data/wordscnt.json",encoding='utf-8')
    tmp = json.load(f)
    return list(zip(tmp.keys(), tmp.values()))
    