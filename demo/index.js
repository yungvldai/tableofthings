import './index.scss';
import tot from '../lib/index';



let a = new tot.Table({
  el: document.getElementById("testarea"),
  thingsAutoDetect: true
})


console.log(a.getThings())


//a.addThing(c);
//a.addThing(d);

