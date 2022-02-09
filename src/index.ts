import express from "express";
import jwtAuthenticationMiddleware from "./middlewares/jwt-authentication.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.routes";
import statusRoutes from "./routes/status.routes";
import usersRoute from "./routes/users.route";

const app = express();

//Configurações da Aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurações de Rotas
app.use(statusRoutes);
app.use(authorizationRoute);
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//Configuração dos Middlewares
app.use(errorHandler);

//Inicializar Servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000');
});
