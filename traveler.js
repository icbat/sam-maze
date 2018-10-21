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
  const visitedNodes = []
  visitedNodes.push(root.toString())
  return BFS(root, graph)
}

const BFS = (root, graph) => {
  const openNodes = []
  const closedNodes = new Set()
  const meta = new Map()

  openNodes.push(root)
  meta.set(root, [null, root.toString()])

  while (openNodes.length > 0) {
    const subRoot = openNodes.shift()
    if (subRoot.value === 'P') {
      return constructPath(subRoot, meta)
    }
    for (const neighbor of getLegalNeighbors(subRoot, graph)) {
      if (closedNodes.has(neighbor.toString())) {
        continue;
      }
      if (!openNodes.includes(neighbor)) {
        meta.set(neighbor, [subRoot, neighbor.toString()])
        openNodes.push(neighbor)
      }
    }
    closedNodes.add(subRoot.toString())
  }
}

const constructPath = (endNode, meta) => {
  const output = []

  let node = endNode
  while (meta.get(node)[0]) {
    const [beforeNode, string] = meta.get(node)
    output.push(string)
    node = beforeNode
  }
  output.push(meta.get(node)[1])

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
    this.children = []
  }

  toString() {
    return `(${this.x},${this.y}) ${this.value}`
  }
}

module.exports = travel;
