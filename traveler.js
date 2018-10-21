const parse = graphDef => {
  graphDef = graphDef.trim()
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

const travel = (graph, startX, startY) => {
  const root = new Node(startX, startY, graph[startY][startX])
  return BFS(root, graph)
}

const BFS = (root, graph) => {
  const openNodes = []
  const closedNodes = new Set()
  const parentMap = new Map()

  openNodes.push(root)
  parentMap.set(root, null)

  while (openNodes.length > 0) {
    const currentNode = openNodes.shift()
    if (currentNode.value === 'P') {
      return constructOutput(currentNode, parentMap)
    }
    for (const neighbor of getLegalNeighbors(currentNode, graph)) {
      if (closedNodes.has(neighbor)) {
        continue;
      }
      if (!openNodes.includes(neighbor)) {
        parentMap.set(neighbor, currentNode)
        openNodes.push(neighbor)
      }
    }
    closedNodes.add(currentNode)
  }
}

const constructOutput = (node, meta) => {
  const output = []

  while (node) {
    output.push(node.toString())
    node = meta.get(node)
  }

  return output.reverse().join('\n')
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
  }

  toString() {
    return `(${this.x},${this.y}) ${this.value}`
  }
}

module.exports = {parse,travel};
