const travel = (graphDef, x, y) => {
  const graph = parseGraph(graphDef.trim())
  return graphToTree(graph, x, y)
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

const graphToTree = (graph, startX, startY) => {
  const root = new Node(startX, startY, graph[startY][startX])
  const visitedNodes = new Set()
  visitedNodes.add(root.toString())
  return DFS(root, visitedNodes, graph)
}

const DFS = (node, visitedNodes, graph) => {
  for (const neighbor of getLegalNeighbors(node, graph)) {
    visitedNodes.add(neighbor.toString())
    console.log(visitedNodes);
    if (neighbor.value === 'P') {
      return visitedNodes
    } else {
      if (!visitedNodes.has(neighbor.toString())) {
        return DFS(neighbor, visitedNodes, graph)
      }
    }
  }
}

const getLegalNeighbors = (current, graph) => {
  // Assume square
  const n = graph[0].length

  const neighbors = [
    {x: current.x, y: current.y+1},
    {x: current.x, y: current.y-1},
    {x: current.x+1, y: current.y},
    {x: current.x-1, y: current.y},
  ]

  const legals = neighbors.filter(point => isOnBoard(point.x, point.y, n))
  const withoutBlocks = legals.filter(point => graph[point.y][point.x] !== 'X')

  const nodes = withoutBlocks.map(point => new Node(point.x, point.y, graph[point.y][point.x]))
  return nodes
}

const isOnBoard = (x, y, n) => x >= 0 && y >= 0 && x < n && y < n

class Node {
  constructor(x, y, value) {
    this.x = x
    this.y = y
    this.value = value
    this.children = []
  }

  toString() {
    return `(${this.x},${this.y}) ${this.value}`
  }
}

module.exports = travel;
