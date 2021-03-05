import net from 'net'
import fs from 'fs'

import { randomizeInteger } from "./randomizeInteger.js"

const min = process.argv[2]
const max = process.argv[3]

if (!min || !max) {
  throw new Error("Введите диапозон")
}

if (min > max || min == max) {
  throw new Error("Неверный диапозон")
}



const hiddenNumber = randomizeInteger(min, max) 
console.log("Клиент загадал число - ", hiddenNumber);

const range = {"range": `${min} - ${max}`}

const client = net.connect({ port: 60123 })
client.write(JSON.stringify(range))

client.on('data', data => {

  const serverAnswer = JSON.parse(data)

  console.log(`Сервер думает что вы загадали: ${serverAnswer.answer}`);

  if (serverAnswer.answer == hiddenNumber) {

    console.log("Число угаданно");
    client.end()

  } else {
    if (hiddenNumber > serverAnswer.answer) {
      console.log("Число больше !");
      client.write(JSON.stringify({"hint": "more"}))
    } else {
      console.log("Число меньше !");
      client.write(JSON.stringify({"hint": "less"}))
    }

  }
})

// {"range": "min-max"}