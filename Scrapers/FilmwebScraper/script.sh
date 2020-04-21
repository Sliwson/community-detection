#!/bin/bash
for i in {1901..2000}
do
   echo $i 
   node readActorsRelationWithDateListBot.js $i
   sleep 3
done
