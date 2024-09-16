const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

module.exports = { prisma, bcrypt, jwt, app };
