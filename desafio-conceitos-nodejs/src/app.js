const express = require("express");
const cors = require("cors");
const { v4, validate } = require("uuid")
// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/repositories/:id", validadeRepId)

const repositories = [];

function validadeRepId(request, response, next) {
    const { id } = request.params

    if(!validate(id))
        return response.status(400).json({ error: "Invalid Repository ID."})

    return next()
}

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body

    const repository = {
        id: v4(),
        title,
        url,
        techs,
        likes: 0
    }

    repositories.push(repository)

    return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params
    const { title, url, techs } = request.body

    const repIndex = repositories.findIndex(rep => rep.id == id)

    const repository = {
        ...repositories[repIndex],
        title,
        url,
        techs
    }

    repositories[repIndex] = repository

    return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params
    
    const repIndex = repositories.findIndex(rep => rep.id == id)

    repositories.splice(repIndex, 1)

    return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params

    const repository = repositories.find(rep => rep.id == id)

    repository.likes += 1

    return response.json(repository)
});

module.exports = app;
