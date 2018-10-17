const travel = (graphDef, x, y) => {
  const graph = parseGraph(graphDef)
  return shortestPath(graph, x, y)
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

const shortestPath = (graph, startX, startY) {
  return null
}

module.exports = travel;
