'use strict'

import net from 'net'
import { randomizeInteger } from "./randomizeInteger.js"

var answer_to_client;
var max;
var min;

net.createServer(cnn => {   

    cnn.on('data', (data) => {

      let clinet_message = JSON.parse(data)

      if (clinet_message.range != undefined) {

        console.log(`Клиент загадал число в диапозоне: ${clinet_message.range}`);

        min = Number(clinet_message.range.split(" - ")[0]);
        max = Number(clinet_message.range.split(" - ")[1]);
        answer_to_client = randomizeInteger(min, max)

        console.log(`Сервер думает что это число: ${answer_to_client}`);

        cnn.write(JSON.stringify({"answer": answer_to_client }));

      } else if (clinet_message.hint != undefined) {

        if (clinet_message.hint == "more") {

          console.log("Клиент подсказывает что число больше !");
          answer_to_client = randomizeInteger(answer_to_client, max)
          console.log(`Сервер думает что это число: ${answer_to_client}`);
          cnn.write(JSON.stringify({"answer": answer_to_client }));

        } else if (clinet_message.hint == "less") {
          
          console.log("Клиент подсказывает что число меньше !");
          answer_to_client = randomizeInteger(min, answer_to_client)
          console.log(`Сервер думает что это число: ${answer_to_client}`);         
          cnn.write(JSON.stringify({"answer": answer_to_client }));

        }
      } 
    })
}).listen(60123, () => console.log('Готов к игре...'))