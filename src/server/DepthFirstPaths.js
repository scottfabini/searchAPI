import Graph from './Graph'
class DepthFirstPaths {

  constructor(G, s) {
    this.marked = new Array(G.vertexCount()) // search has already been called for this vertex
    this.edgeTo = new Array(G.vertexCount()) // last vertex on known path to this vertex
    this.s = s // source vertex
    this.dfs(G, s)
  }

  dfs(G, v) {
    this.marked[v] = true
    for (let w of G.getAdj(v)) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v
        this.dfs(G, w)
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
      path.push(x)
    }
    path.push(this.s)
    path.reverse()
    return path
  }
}

module.exports = DepthFirstPaths
