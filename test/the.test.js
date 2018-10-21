const test = require('ava');
const {travel, parse} = require('../traveler');

test.before(() => {
  const input = `
  L O X P
  O X O O
  O O X O
  O O O O
  `
  const LX = 0, LY = 0
  const expected = `(0,0) L
(0,1) O
(0,2) O
(0,3) O
(1,3) O
(2,3) O
(3,3) O
(3,2) O
(3,1) O
(3,0) P`
  const graph = parse(input)

  console.time('warmup')
  // Coerce v8 into optimizing for us
  for (var i = 0; i < 10; i++) {
    const actual = travel(graph, LX, LY)
  }
  console.timeEnd('warmup')
})

test('sam-example', t => {
    const input = `
    L O X P
    O X O O
    O O X O
    O O O O
    `
    const LX = 0, LY = 0
    const expected = `(0,0) L
(0,1) O
(0,2) O
(0,3) O
(1,3) O
(2,3) O
(3,3) O
(3,2) O
(3,1) O
(3,0) P`
    console.time('parsing-sam-example')
    const graph = parse(input)
    console.timeEnd('parsing-sam-example')

    console.time('sam-example')
    const actual = travel(graph, LX, LY)
    console.timeEnd('sam-example')
    t.is(expected, actual, graph)
})

test.skip('20x20', t => {
    const input = `
    L O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O O
    O O O O O O O O O O O O O O O O O O O O P
    `
    const LX = 0, LY = 0
    const expected = `(0,0) L
(0,1) O
(0,2) O
(0,3) O
(1,3) O
(2,3) O
(3,3) O
(3,2) O
(3,1) O
(3,0) P`

    console.time('parsing-20x20')
    const graph = parse(input)
    console.timeEnd('parsing-20x20')
    console.time('20x20')
    const actual = travel(graph, LX, LY)
    console.timeEnd('20x20')
    t.is(expected, actual, graph)
})
//
// test('ezpz - x', t => {
//     const graph = `
//     L O O P
//     X X O O
//     O O X O
//     O O O O
//     `
//     const LX = 0, LY = 0
//     const expected = `(0,0) L
// (1,0) O
// (2,0) O
// (3,0) P`
//
//     const actual = traveler(graph, LX, LY)
//
//     t.is(expected, actual, graph)
// })
