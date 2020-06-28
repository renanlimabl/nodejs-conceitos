const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body

  const newRepositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(newRepositorie)

  return response.json(newRepositorie)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoId = repositories.findIndex(repo => repo.id === id)

  if (repoId < 0) {
    return response.status(400).json({ error: "Repo not exists" })
  }

  const { title, url, techs } = request.body

  const newRepositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoId].likes
  }

  repositories[repoId] = newRepositorie

  return response.json(newRepositorie)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  const repoId = repositories.findIndex(repo => repo.id === id)

  if (repoId < 0) {
    return response.status(400).json({ error: "Repo not exists" })
  }

  repositories.splice(repoId, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params

  const currentRepo = repositories.find(repo => repo.id === id)

  if (!currentRepo) {
    return response.status(400).json({ error: "Repo not exists" })
  }

  currentRepo.likes += 1

  return response.json(currentRepo)
});

module.exports = app;
