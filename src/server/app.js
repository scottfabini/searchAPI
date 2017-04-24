import express from 'express'
import path from 'path'
import DepthFirstPaths from './DepthFirstPaths'
import BreadthFirstPaths from './BreadthFirstPaths'
import Graph from './Graph'
const app = express()
let WEB_PORT = 8000 || env.process.PORT
app.use(express.static(__dirname + 'client'));

let graph = new Graph(10)

app.get('/', function(req, res) {
    res.set('Content-Type', 'text/html')
    res.status(200)
    res.sendFile(path.join(__dirname + '/../client/index.html'), null, (err) => {
      if (err) {
        next(err)
      } else {
        console.log('Sent: index.html')
      }
    })
});

app.get('/reset', (req, res) => {
  graph = new Graph(10)
  let dfp = new DepthFirstPaths(graph, 1);
  res.status(200)
  res.send(renderApp(graph.stringify()))

})

app.get('/create', (req, res) => {
  graph.addEdge(5, 2)
  graph.addEdge(0, 1)
  graph.addEdge(1, 2)
  graph.addEdge(2, 3)
  graph.addEdge(3, 4)
  graph.addEdge(3, 5)
  let dfp = new DepthFirstPaths(graph, 1);
  res.status(200)
  res.send(renderApp(graph.stringify()))

})


app.get('/addEdge', (req, res) => {
  let edge = req.query
  graph.addEdge(edge.source, edge.dest)
  res.status(200)
  res.send(renderApp(graph.stringify()))
})

app.get('/displayPathDFS', (req, res) => {
  let source = req.query.source
  let dest = req.query.dest
  let dfp = new DepthFirstPaths(graph, source);
  dfp.hasPathTo(dest)
  let result = dfp.pathTo(dest)
  result = result === null ? ['None'] : result
  res.status(200)
  res.send(renderApp(result.join(' -> ')))
})

app.get('/displayPathBFS', (req, res) => {
  let source = req.query.source
  let dest = req.query.dest
  let bfp = new BreadthFirstPaths(graph, source);
  bfp.hasPathTo(dest)
  let result = bfp.pathTo(dest)
  result = result === null ? ['None'] : result
  res.status(200)
  res.send(renderApp(result.join(' -> ')))
})


app.get('/displayGraph', (req, res) => {
  res.status(200)
  //res.send(renderApp(graph.stringify()))
  let result = graph.stringify()
  res.send(renderApp(result))
})

const renderApp = (result) =>
  `<!doctype html>
  <html>
  <head>
    <title>Graph API</title>
  </head>
  <body>
    <div>
    <form action="http://localhost:8000/create" method="get">
      <input type="submit" value="Create Graph" />
    </form>
    <form action="http://localhost:8000/reset" method="get">
      <input type="submit" value="Reset Graph" />
    </form>
    <form action="http://localhost:8000/addEdge" method="get">
      <input type="text" name="source" value="3"/>
      <input type="text" name="dest" value="5"/>
      <input type="submit" value="Add Edge" />
    </form>
    <form action="http://localhost:8000/displayPathDFS" method="get">
      <input type="text" name="source" value="1"/>
      <input type="text" name="dest" value="3"/>
      <input type="submit" value="Display Path from a to b (DFS)" />
      <form action="http://localhost:8000/displayPathBFS" method="get">
      <input type="submit" value="Display Path from a to b (BFS)" />
      </form>
    </form>
    <form action="http://localhost:8000/displayGraph" method="get">
      <input type="submit" value="Display Graph" />
    </form>
    <p>Result:</p>
    <textarea cols='32' rows='10'>${result}</textarea>
    </div>
  </body>
  </html>
  `

app.listen(WEB_PORT, () => {
  console.log(`Host connected on ${WEB_PORT}`)
})
