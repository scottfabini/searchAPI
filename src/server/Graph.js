import AdjList from './AdjList'
class Graph {
  constructor(V) {
    this.V = V // number of vertices
    this.E = 0 // number of edges
    this.adj = new Array(V) // an array of adjacency lists
    for (let i = 0; i < V; i++) {
      this.adj[i] = new AdjList()
    }
  }

  addEdge(v, w) {
    this.adj[v].add(w)
    this.adj[w].add(v)
    this.E++
  }

  getAdj(v) {
    if (this.adj[v]) {
      return this.adj[v].toArray()
    }
    else return []
  }

  vertexCount() {
    return this.V
  }

  edgeCount() {
    return this.E
  }

  stringify() {
    let stringBuffer = ''
    for (let v = 0; v < this.V; v++) {
      stringBuffer += v
      stringBuffer += ' |-> '
      stringBuffer += this.adj[v].toArray().join(" -> ")
      stringBuffer += '\n'
    }
    return stringBuffer
  }
}
module.exports = Graph
