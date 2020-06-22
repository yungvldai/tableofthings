// TODO check
const isElement = (check) => check instanceof Element;

const bindCtxForMethods = (methods, context) => {
  for (const method of methods) {
    context[method] = context[method].bind(context);
  }
}

const unique = () => Math.random().toString(36).substring(2, 15);

const getDocumentCoords = (el) => {
  let box = el.getBoundingClientRect();
  return [box.left + pageXOffset, box.top + pageYOffset];
}

const getSize = (el) => {
  let box = el.getBoundingClientRect();
  return [box.width, box.height];
}

const minmax = (min, value, max) => {
  if (value > max) return max;
  else if (value < min) return min;
  return value;
}

export { bindCtxForMethods, isElement, unique, getDocumentCoords, getSize, minmax };
