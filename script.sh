#!/bin/bash
for i in {1..43997}
do
    echo "Guardando data $i de 23997 "
    node app.js $i
    sleep 2
done
#502