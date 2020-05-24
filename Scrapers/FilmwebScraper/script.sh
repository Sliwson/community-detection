#!/bin/bash
for i in {0..99}
do
   echo $i 
   node readActorsRelationListBot.js $i
   sleep 3
done
