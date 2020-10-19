require("dotenv").config();

import mongoose from "mongoose";
const initMongo = async () => {
  const mongoUri = process.env.mongoURI;

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true, //internal stuff...
      useFindAndModify: false
    });

    console.log("connected to database");
  } catch (err) {
    console.error("DB ERROR", err);
    process.exit(1);
  }
};

initMongo();

import api from "./api";
import { GraphQLServer } from "graphql-yoga";

api.authorize = async function(request, idMatch = null) {
  const user = request.session.user;
  // return user;
  if (!user || (idMatch !== null && idMatch !== user.id)) {
    if (request.session.store)
      request.session.store.destroy(request.session.id);
    request.session.destroy();
    throw new Error("not authorized");
  }

  return api.user.findOne({ _id: user.id }).exec();
};

const server = new GraphQLServer({
  typeDefs: api.schema,
  resolvers: api.resolvers,
  context: req => ({
    ...req,
    api
  })
});

import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import { szeTime } from "szeutils";

const MongoStore = require("connect-mongo")(session);

server.express.use(helmet());
server.express.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080"
  })
);

server.express.use(
  session({
    cookie: {
      maxAge: szeTime.toMs({ h: 3 })
    },
    resave: false,
    name: "stocktraderSession",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    // secure: true //https
  })
);

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  return next();
});

server.start(() => {
  console.log("Server is running on port 4000");
});
