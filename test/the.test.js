const graphs = [
  `L O X P
  O X O O
  O O X O
  O O O O`,
]

const outputs = [
  `(0,0) L
  (0,1) O
  (0,2) O
  (0,3) O
  (1,3) O
  (2,3) O
  (3,3) O
  (3,2) O
  (3,1) O
  (3,0) P`,
]

const test = require('ava');
const traveler = require('../traveler');

test('they pass', t => {
  for (const index in graphs) {
    const graph = graphs[index]
    const expected = outputs[index]

    const actual = traveler(graph)

    t.is(expected, actual, graph)
  }
})
