const express = require("express");

const app = express();

app.use(express.json());

/**
 * GET    = Buscar uma informação dentro do servidor;
 * POST   = Inserir uma informação no servidor;
 * PUT    = Alterar uma informação no servidor;
 * DELETE = Deletar uma informação no servidor;
 * PATCH  = Alterar uma informação específica;
 *
 * TIPOS DE PARÂMETROS:
 * route params => http://localhost:3333/produtos/123456789
 * query params => http://localhost:3333/produtos?name=teclado&description=teclado%20gamer
 * body params  => {
 * "name": "teclado",
 * "description": "teclado gamer"
 * }
 */

app.get("/cursos", (request, response) => {
  const query = request.query;
  console.log(query);
  return response.status(200).json({ message: "Curso criado com sucesso!" });
});

app.post("/cursos", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.status(201).json({ message: "Curso criado com sucesso!" });
});

app.put("/cursos/:id", (request, response) => {
  const { id } = request.params;
  console.log(`O id selecionado foi: `, id);
  return response.status(200).json({ message: `O ID selecionado foi: ${id}` });
});

// localhost:3333
app.listen(3333);
