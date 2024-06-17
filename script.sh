#!/bin/bash
counter=0
for i in {55..43997}
do
    echo "Guardando data $i de 23997 "
    node app.js $i
    sleep 9
    counter=$(i)
done
echo counter
#18