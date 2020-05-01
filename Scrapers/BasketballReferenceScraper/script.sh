#!/bin/bash
for i in {151..200}
do
   echo $i 
   node readPlayersSeasons.js $i
   sleep 3
done
