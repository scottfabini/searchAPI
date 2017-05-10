import Graph from './Graph'
class BreadthFirstPaths {

  constructor(G, s) {
    this.marked = new Array(G.vertexCount())
    this.edgeTo = new Array(G.vertexCount())
    this.s = s // source vertex
    this.bfs(G, s)
  }

  bfs(G, s) {
    let queue = []
    this.marked[s] = true
    queue.push(s)
    while (queue.length !== 0) {
      let v = queue.shift()
      for (let w of G.getAdj(v)) {
        if (!this.marked[w]) {
          this.edgeTo[w] = v
          this.marked[w] = true
          queue.push(w)
        }
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v]
  }

  pathTo(v) {
    if (!this.hasPathTo(v)) { return null}
    let path = []
    for (let x = v; x != this.s; x = this.edgeTo[x] ) {
      path.unshift(x)
    }
    path.unshift(this.s)
    return path
  }
}

module.exports = BreadthFirstPaths
