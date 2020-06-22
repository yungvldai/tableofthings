import './index.scss';
import tot from '../lib';


let a = new tot.Table({
  el: document.getElementById("testarea")
})

a.on('dragend', (a) => {
  console.log('aaa', a)
})

let b = new tot.Thing({
  el: document.getElementById('testthing')
})

let c = new tot.Thing({
  el: document.getElementById('testthing2'),
  initialX: 100,
  initialY: 100
})

let d = new tot.Thing({
  el: document.getElementById('testthing3'),
  initialX: 200,
  initialY: 200
})

a.addThing(b);

b.on('dragstart', (a) => {
  console.log('start', a)
})

b.on('dragend', (a) => {
  console.log('end', a)
})

a.addThing(c);
a.addThing(d);

