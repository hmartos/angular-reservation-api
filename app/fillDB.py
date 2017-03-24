#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = 'hmartos'

from datetime import timedelta, date
import pymongo
import json

# DEVELOPMENT
# mongoUri = "mongodb://127.0.0.1:27017"
# dbName = "reservations"
# collectionName = "reservations"

# PRODUCTION
mongoUri = "mongodb://mean-hector.rhcloud.com:27017"
dbName = "mean"
collectionName = "reservations"

file = open('./fillDB.json', 'w+')

client = pymongo.MongoClient(mongoUri)
db = client[dbName]
collection = db[collectionName]

def dateRange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)

def hourRange():
    availableHours = []
    for hour in ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"]:
        availableHour = {
            "hour": hour,
            "available": True
        }
        availableHours.append(availableHour)
    return availableHours

start_date = date(2017, 1, 1)
end_date = date(2019, 1, 1)
for single_date in dateRange(start_date, end_date):
    document = {
        "date": single_date.strftime("%Y-%m-%d"),
        "hours": hourRange()

    }
    #collection.insert_one(document)
    print >>file, document
print "DB correctly filled"