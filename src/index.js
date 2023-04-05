const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const costumers = [];

// Middleware
const verifyIfExistsAccountCPF = (request, response, next) => {
  const { cpf } = request.headers;
  const costumer = costumers.find((costumer) => costumer.cpf === cpf);
  if (!costumer) {
    return response.status(400).json({ error: "Customer not found!" });
  }
  request.costumer = costumer;
  return next();
};

// forma de implementar o middleware em todas as rotas da aplicação
// app.use(verifyIfExistsAccountCPF);

/**
 * @method POST
 * @param cpf        = string;
 * @param name       = string;
 * @param id         = uuid;
 * @param statement  = [];
 */
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = costumers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  costumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).json({ message: "Customer created!" });
});

/**
 * @method GET
 * @param {headers} cpf = string;
 */
// forma de implementar o middleware em uma rota específica
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { costumer } = request;
  return response.json(costumer.statement);
});

app.listen(3333);
