const travel = (graphDef, x, y) => {
  const graph = parseGraph(graphDef.trim())
  return shortestPath(graph, x, y);
}

const parseGraph = graphDef => {
  const outer = []

  outer.push([])

  for (const char of graphDef) {
    switch(char) {
      case 'L':
      case 'O':
      case 'P':
      case 'X':
        outer[outer.length - 1].push(char)
        break;
      case '\n':
        outer.push([])
        break;
    }
  }

  return outer;
}

const shortestPath = (graph, startX, startY) => {
  let x = startX
  let y = startY
  // Assume square as given
  const n = graph.length

  const steps = []

  let current = graph[y][x]
  while (x < n && y < n) {
    // console.log(x, y, current, graph);
    if (current !== 'X') {
      steps.push(`(${x},${y}) ${current}`)
    }
    if (current === 'P') {
      break;
    }
    current = graph[y][++x]
  }

  return steps.join('\n')
}

module.exports = travel;
