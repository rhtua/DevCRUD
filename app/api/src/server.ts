import express from "express";

const api = express();
api.listen(3000, () => console.log("O servidor está de pé"));