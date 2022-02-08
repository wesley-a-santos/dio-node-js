import express from "express";
import errorHandler from "./middlewares/error.handler.middleware";
import statusRoutes from "./routes/status.routes";
import usersroute from "./routes/users.route";

const app = express();

//Configurações da Aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurações de Rotas
app.use(statusRoutes);
app.use(usersroute);

//Configuração dos Middlewares
app.use(errorHandler);

//Inicializar Servidor
app.listen(3000, () => {
  console.log('Aplicação executando na porta 3000');
});
