import re
import jieba
# 判断字符是否为汉字
def is_chinese(word):
    pattern = re.compile(r'[^\u4e00-\u9fa5]')
    if pattern.search(word):
        return False
    else:
        return True

def cutWord(data, stop_words):
    # 分词并获取词频
    word_cnt={}
    for review in data:
        rs=jieba.lcut(review)
        for word in rs:
            if word in stop_words:
                continue
            else:
                word_cnt[word]=word_cnt.get(word,0)+1
    word_cnt = list(zip(word_cnt.keys(), word_cnt.values())).sort(key=lambda item:item[1])
    return word_cnt[:150]
        

