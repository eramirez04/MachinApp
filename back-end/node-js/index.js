import Express from "express";
import bodyParser from "body-parser";
import rutaTipoFicha from "./src/routes/TipoFichaRoutes.js";
import rutaFicha from "./src/routes/FichaRoutes.js";
import rutaVariable from "./src/routes/VariableRoutes.js";
import rutaDetalle from "./src/routes/DetalleRoutes.js";
import RutaUsuario from "./src/routes/UserRoutes.js";
import RutaRol from "./src/routes/RolUserRouter.js";
import ActivitiesRoutes from "./src/routes/ActivitiesRoutes.js";
import mantenimiento from "./src/routes/mantenimientoRuter.js";
import tipoMantRoutes from "./src/routes/tipoMantRoutes.js";
import rutaSitio from "./src/routes/sitiosRouter.js";
import rutaSede from "./src/routes/sedesRouter.js";
/* import rutaCentro from "./src/routes/centrosRouter.js" */
import rutaArea from "./src/routes/areasRouter.js";
import rutaTipoSitio from "./src/routes/tipo_sitioRouter.js";
import LoginRouter from "./src/routes/LoginRoutes.js";
import partesMantRoutes from "./src/routes/partesMantRoutes.js";
const serve = Express();
const port = 3000;

import cors from "cors";

serve.use(cors());

serve.use(bodyParser.json());
serve.use(bodyParser.urlencoded({ extended: true }));
serve.set("view engine", "ejs");
serve.set("views", "./views");
serve.use(Express.static("./public"));
serve.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Bienvenidos a MachinApp" });
});
serve.use("/tipoFicha", rutaTipoFicha);
serve.use("/ficha", rutaFicha);
serve.use("/variable", rutaVariable);
serve.use("/detalle", rutaDetalle);
serve.use("/user", RutaUsuario);
serve.use("/rol", RutaRol);
serve.use("/actividades", ActivitiesRoutes);
serve.use("/mantenimiento", mantenimiento);
serve.use("/tipomantenimiento", tipoMantRoutes);
serve.use("/tipositio", rutaTipoSitio);
serve.use("/sitio", rutaSitio);
serve.use("/sede", rutaSede);
/* serve.use('/centro', rutaCentro) */
serve.use("/area", rutaArea);
serve.use("/partes_mantenimiento", partesMantRoutes);
serve.use(LoginRouter);
serve.use("/documents", (req, res) => {
  res.render("documentacion.ejs");
});

serve.listen(port, () => {
  console.log(`servidor escuchando en el http://localhost:${port}`);
});
