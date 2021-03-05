export function randomizeInteger(min, max) {

  min = Math.ceil(min);  
  max = Math.floor(max); 

  return min + Math.floor((max - min) * Math.random());
}