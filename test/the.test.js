const test = require('ava');
const traveler = require('../traveler');

test('sam example', t => {
    const graph = `
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

    const actual = traveler(graph, LX, LY)

    t.is(expected, actual, graph)
})

test('ezpz - x', t => {
    const graph = `
    L O O P
    X X O O
    O O X O
    O O O O
    `
    const LX = 0, LY = 0
    const expected = `(0,0) L
(1,0) O
(2,0) O
(3,0) P`

    const actual = traveler(graph, LX, LY)

    t.is(expected, actual, graph)
})
