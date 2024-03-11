# -*- coding: utf-8 -*-
"""
new Env('甬派任务本MK1.0');
先运行脚本，有问题到群里问 https://t.me/mkwd123
通知模块请复制青龙的notify.py到脚本同级目录
"""
import datetime #line:7
import json #line:8
import os #line:9
import random #line:10
import re #line:11
import threading #line:12
from queue import Queue #line:13
import time #line:14
import requests #line:15
def ftime ():#line:28
    OOOO000OO0O0O0OOO =datetime .datetime .now ().strftime ('%Y-%m-%d %H:%M:%S')#line:29
    return OOOO000OO0O0O0OOO #line:30
def load_notify ():#line:33
    global send #line:34
    try :#line:35
        from notify import send #line:36
        print ("加载通知服务成功！")#line:37
        return True #line:38
    except :#line:39
        print ('加载通知服务失败,请复制一份青龙notify.py到同级文件夹')#line:40
        return False #line:41
class YPAPP :#line:44
    def __init__ (OOOO0OO00000OOOOO ,O0O0OO0O00OOO0OO0 ,O0OO0000OOO0OO000 ):#line:45
        OOOO0OO00000OOOOO .session =requests .session ()#line:46
        OOOO0OO00000OOOOO .deviceid =O0OO0000OOO0OO000 .split ('#')[0 ]#line:47
        print("报错信息：",O0OO0000OOO0OO000)
        OOOO0OO00000OOOOO .ticket =O0OO0000OOO0OO000 .split ('#')[1 ]#line:48
        OOOO0OO00000OOOOO .session .headers ={'User-Agent':'okhttp/4.9.1'if re .match (r'^[a-z0-9]*$',OOOO0OO00000OOOOO .deviceid )else 'PLYongPaiProject/10.1.1 (iPhone; iOS 15.7.9; Scale/2.00)','appversion':'10.1.1','ticket':OOOO0OO00000OOOOO .ticket ,'deviceid':OOOO0OO00000OOOOO .deviceid ,}#line:55
        OOOO0OO00000OOOOO .index =O0O0OO0O00OOO0OO0 #line:56
        OOOO0OO00000OOOOO .newsIds =[]#line:57
        OOOO0OO00000OOOOO .score =0 #line:58
        OOOO0OO00000OOOOO .userid =None #line:59
        OOOO0OO00000OOOOO .msg =''#line:60
    def get_userinfo (O00000O0O00O000O0 ):#line:62
        O000O0O0OOO0OOOO0 ='https://ypapp.cnnb.com.cn/web-nbcc/member/member/info'#line:63
        O0O0000OO000OO0O0 =O00000O0O00O000O0 .session .get (O000O0O0OOO0OOOO0 ).json ()#line:64
        OOO0O00000O0OO0OO =json .loads (O0O0000OO000OO0O0 .get ('data'))#line:65
        O00000O0O00O000O0 .userid =OOO0O00000O0OO0OO .get ('userId')#line:66
        OO000OOOO0OOO0O00 =f'https://ypapp.cnnb.com.cn/yongpai-user/api/user/my_level?userId={O00000O0O00O000O0.userid}'#line:67
        O0O0O000OOOOOOO0O =O00000O0O00O000O0 .session .get (OO000OOOO0OOO0O00 ).json ()#line:68
        O00000O0O00O000O0 .score =O0O0O000OOOOOOO0O .get ('data').get ('score')#line:69
        if O00000O0O00O000O0 .userid :#line:70
            if O00000O0O00O000O0 .score <50 :#line:71
                O0O0OO0O0O0O0000O =f'【登录】[账号{O00000O0O00O000O0.index}] 登录成功,现有积分{O00000O0O00O000O0.score}'#line:72
            else :#line:73
                O0O0OO0O0O0O0000O =f'【登录】[账号{O00000O0O00O000O0.index}] 登录成功,现有积分{O00000O0O00O000O0.score}，够转转盘了'#line:74
            print (O0O0OO0O0O0O0000O )#line:75
            O00000O0O00O000O0 .msg +=O0O0OO0O0O0O0000O +'\n'#line:76
            return True #line:77
        else :#line:78
            O0O0OO0O0O0O0000O =f'【登录】[账号{O00000O0O00O000O0.index}] 获取账号信息失败'#line:79
            print (O0O0OO0O0O0O0000O )#line:80
            O00000O0O00O000O0 .msg +=O0O0OO0O0O0O0000O +'\n'#line:81
            return False #line:82
    def get_newsids (O00000OOOO0000O0O ):#line:84
        O0O0O0OOOOOOO0OOO =int (time .time ()*1000 )#line:85
        while len (O00000OOOO0000O0O .newsIds )<50 :#line:86
            for O0OO0OO0OOO0O00OO in range (5 ):#line:87
                OOOO0OO00000OO0OO =f'https://ypapp.cnnb.com.cn/yongpai-news/api/v2/news/list?channelId={O0OO0OO0OOO0O00OO}&currentPage=1&timestamp={O0O0O0OOOOOOO0OOO}'#line:88
                
                O0OO0O0OO0O0OOO00 =O00000OOOO0000O0O .session .get (OOOO0OO00000OO0OO ).json ()#line:89
               
                if O0OO0O0OO0O0OOO00 .get ('code')!=0 :#line:90
                    print ('获取新闻失败')#line:91
                    continue #line:92
                OO0O00O0O0OOOOOOO =O0OO0O0OO0O0OOO00 ['data']['content']#line:93
                for OO0OO0OO000000O0O in OO0O00O0O0OOOOOOO :#line:94
                    if OO0OO0OO000000O0O .get ('newsId'):#line:95
                        O00000OOOO0000O0O .newsIds .append (OO0OO0OO000000O0O ['newsId'])#line:96
                O00000OOOO0000O0O .newsIds =list (set (O00000OOOO0000O0O .newsIds ))#line:97
    def read_news (O00OO00OOO00O0O0O ,O0OO00OO000O0OOO0 ,OOOO0O0OOOOO0O0O0 ):#line:99
        O0O000OOOOOOOO00O =f'https://ypapp.cnnb.com.cn/yongpai-news/api/news/detail?newsId={OOOO0O0OOOOO0O0O0}&userId={O00OO00OOO00O0O0O.userid}'#line:100
        O000O0000OO00OO0O =O00OO00OOO00O0O0O .session .get (O0O000OOOOOOOO00O ).json ()#line:101

        if O000O0000OO00OO0O .get ('code')==0 :#line:102
            print (f'【阅读】[账号{O00OO00OOO00O0O0O.index}] 第{O0OO00OO000O0OOO0}次阅读完成')#line:103
    def prize (OO0OOOO0O00OOO0OO ,OOOOOO0OOO0OOO00O ,OOOO00O00OOO000O0 ):#line:105
        O0000OOOO0OOO0OO0 =f'https://ypapp.cnnb.com.cn/yongpai-ugc/api/praise/save_news?userId={OO0OOOO0O00OOO0OO.userid}&newsId={OOOO00O00OOO000O0}&deviceId={OO0OOOO0O00OOO0OO.deviceid}'#line:106
        OOOOOO0OO00OOOO00 =OO0OOOO0O00OOO0OO .session .get (O0000OOOO0OOO0OO0 ).json ()#line:107

        if OOOOOO0OO00OOOO00 .get ('code')==0 :#line:108
            print (f'【点赞】[账号{OO0OOOO0O00OOO0OO.index}] 第{OOOOOO0OOO0OOO00O}次{OOOOOO0OO00OOOO00["data"]["review"]}，获得积分{OOOOOO0OO00OOOO00["data"].get("score")}')#line:109
        else :#line:110
            print (f'【点赞】[账号{OO0OOOO0O00OOO0OO.index}] 第{OOOOOO0OOO0OOO00O}次{OOOOOO0OO00OOOO00["data"]["review"]}')#line:111
    def forward (a ,b ,c ):#line:105
        O0000OOOO0OOO0OO0 =f'https://ypapp.cnnb.com.cn/yongpai-ugc/api/forward/news?userId={a.userid}&newsId={c}&source=1'#line:106
        OOOOOO0OO00OOOO00 =a .session .get (O0000OOOO0OOO0OO0 ).json ()#line:107

        if OOOOOO0OO00OOOO00 .get ('code')==0 :#line:108
             print (f'【转发】[账号{a.index}] 获得积分{OOOOOO0OO00OOOO00["data"]}')#line:109
        else :#line:110
            print (f'【转发】[账号{a.index}] 错误！！！')#line:111
    
    
    
    def run (O00O0000OO0O0OOO0 ):#line:113
        number = 15
        if O00O0000OO0O0OOO0 .get_userinfo ():#line:114
            O00O0000OO0O0OOO0 .get_newsids ()#line:115
            random .shuffle (O00O0000OO0O0OOO0 .newsIds )#line:116
            O0O00O0OOOOOOO000 =random .sample (range (len (O00O0000OO0O0OOO0 .newsIds )),50 )#line:117
            O0O00O0OOOOOOO000 .sort ()#line:118
            for O00OO0O0OO0O000O0 ,O00OO0O00O00OO00O in enumerate (O0O00O0OOOOOOO000 ,start =1 ):#line:119
                O00O0000OO0O0OOO0 .read_news (O00OO0O0OO0O000O0 ,O00O0000OO0O0OOO0 .newsIds [O00OO0O00O00OO00O ])#line:120
                time .sleep (1 )#line:121
                
                O00O0000OO0O0OOO0 .prize (O00OO0O0OO0O000O0 ,O00O0000OO0O0OOO0 .newsIds [O00OO0O00O00OO00O ])#line:122
                time .sleep (2 )#line:123
                if number >=0 :
                    print("转发剩余次数：",number)
                    O00O0000OO0O0OOO0 .forward (O00OO0O0OO0O000O0 ,O00O0000OO0O0OOO0 .newsIds [O00OO0O00O00OO00O ])#line:122
                    time .sleep (5 )#line:123
                    number = number - 1
                else:
                    print("转发完成，不再转发") 

                
            O00O0000OO0O0OOO0 .get_userinfo ()#line:124
            return O00O0000OO0O0OOO0 .msg #line:125
def yp (O0OOOO0000OOOO0O0 ,OO00OO0OOOO0O0OO0 ):#line:128
    while not O0OOOO0000OOOO0O0 .empty ():#line:129
        OOO0OOOO0OOO00O00 ,OO0OO0OOOO0O0O00O =O0OOOO0000OOOO0O0 .get ()#line:130
        OO000OO00OO00O0OO =YPAPP (OOO0OOOO0OOO00O00 ,OO0OO0OOOO0O0O00O )#line:131
        OO00OO0OOOO0O0OO0 .put (OO000OO00OO00O0OO .run ())#line:132
def main ():#line:147
    OOOOOOO00O00OO00O =os .getenv ('mkypck')#line:149
    if not OOOOOOO00O00OO00O :#line:150
        print ('叼毛没有获取到甬派ck')#line:151
        exit ()#line:152
    O0OO0O00O0O000000 =OOOOOOO00O00OO00O .replace ('&','\n').split ('\n')#line:153
    OOO00OO000OO0000O =f'共获取到{len(O0OO0O00O0O000000)}个账号\n\n'#line:154
    print (f'共获取到{len(O0OO0O00O0O000000)}个账号\n')#line:155
    OOOO0OO0000OOOOO0 =Queue ()#line:156
    O0O0O0OO0OO0OO0OO =Queue ()#line:157
    O0O00OO000O0OOOO0 =[]#line:158
    for OO0O000OOO00O0000 ,OOOOOOO00O00OO00O in enumerate (O0OO0O00O0O000000 ,start =1 ):#line:159
        OOOO0OO0000OOOOO0 .put ([OO0O000OOO00O0000 ,OOOOOOO00O00OO00O ])#line:160
    for OO0O000OOO00O0000 in range (5 ):#line:161
        OO0OO0000OOOO0OO0 =threading .Thread (target =yp ,args =(OOOO0OO0000OOOOO0 ,O0O0O0OO0OO0OO0OO ))#line:162
        OO0OO0000OOOO0OO0 .start ()#line:163
        O0O00OO000O0OOOO0 .append (OO0OO0000OOOO0OO0 )#line:164
    for OOOO0O0O0O0O000O0 in O0O00OO000O0OOOO0 :#line:165
        OOOO0O0O0O0O000O0 .join ()#line:166
    while not O0O0O0OO0OO0OO0OO .empty ():#line:167
        OOO00OO000OO0000O +=O0O0O0OO0OO0OO0OO .get ()+'\n'#line:168
    if load_notify ():#line:169
        send ('甬派任务通知',OOO00OO000OO0000O +f'\n\n本通知by：MK1.0垃圾甬派任务本 讨论群：654564427\n通知时间：{ftime()}')#line:171
if __name__ =='__main__':#line:174
    main ()#line:175