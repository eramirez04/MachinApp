/**
 * @swagger
 * /user/registrar:
 *   post:
 *     summary: Registrar Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Emersson"
 *               apellidos:
 *                 type: string
 *                 example: "String"
 *               correo:
 *                 type: string
 *                 example: "String"
 *               numero_documento:
 *                 type: string
 *                 example: "String"
 *               tipo_documento:
 *                 type: string
 *                 example: "String"
 *               contrasenia:
 *                 type: string
 *                 example: "String"
 *               especialidad:
 *                 type: string
 *                 example: "String"
 *               empresa:
 *                 type: string
 *                 example: "String"
 *               rol:
 *                 type: string
 *                 example: "String"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: "emerssonramirez11@gmail.com"
 *               contrasenia:
 *                 type: string
 *                 example: "y2sMs6d8ZT"
 *     responses:
 *       200:
 *         description: Usuario autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Mensaje:
 *                   type: string
 *                   example: "Usuario autorizado"
 *                 usuario:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idUsuarios:
 *                         type: integer
 *                         example: 7
 *                       us_contrasenia:
 *                         type: string
 *                         example: "$2a$10$gl5AQmQ0ReXYLQAHED.NcuRtKOS/LFvYgE26yoheLAtZKRAw.spc6"
 *                       rol_nombre:
 *                         type: string
 *                         example: "Administrador"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Listar usuario logueado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario logueado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idUsuarios:
 *                     type: integer
 *                     example: 7
 *                   us_nombre:
 *                     type: string
 *                     example: "Emersson"
 *                   us_apellidos:
 *                     type: string
 *                     example: "Ramirez Ruiz"
 *                   us_correo:
 *                     type: string
 *                     example: "emerssonramirez510@gmail.com"
 *                   us_tipo_documento:
 *                     type: string
 *                     example: "cedula de ciudadania"
 *                   us_numero_documento:
 *                     type: string
 *                     example: "1084330529"
 *                   us_contrasenia:
 *                     type: string
 *                     example: "$2a$10$SVQ9ugm9Yg7EK/A4Azy3ee2HyBQ1tCVr3aIYJH0p6/4UgqtuSnhGO"
 *                   us_especialidad:
 *                     type: string
 *                     example: "Analista y desarrollador de software"
 *                   us_empresa:
 *                     type: string
 *                     example: "SENA Empresa"
 *                   rol_nombre:
 *                     type: string
 *                     example: "Administrador"
 *                   idRoles:
 *                     type: integer
 *                     example: 1
 */

/**
 * @swagger
 * /user/recover-password:
 *   post:
 *     summary: Recuperación de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_identificacion:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       200:
 *         description: Contraseña recuperada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensage:
 *                   type: string
 *                   example: "Contraseña recuperada"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 correo_usuario:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "emerssonramirez510@gmail.com"
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Listar todos los usuarios (solo administradores)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idUsuarios:
 *                     type: integer
 *                     example: 1
 *                   us_nombre:
 *                     type: string
 *                     example: "Juan Camilo"
 *                   us_apellidos:
 *                     type: string
 *                     example: "Alvarez Molano"
 *                   us_correo:
 *                     type: string
 *                     example: "camilo@gmail.com"
 *                   us_numero_documento:
 *                     type: string
 *                     example: "1079534574"
 *                   us_tipo_documento:
 *                     type: string
 *                     example: "cedula de ciudadania"
 *                   us_contrasenia:
 *                     type: string
 *                     example: "cami3008"
 *                   us_empresa:
 *                     type: string
 *                   rol_nombre:
 *                     type: string
 *                     example: "Administrador"
 *                   rol_descripcion:
 *                     type: string
 *                     example: "administrador del sistema"
 */

/**
 * @swagger
 * /sedes/registrarsede:
 *   post:
 *     summary: Registra una nueva sede.
 *     tags: 
 *       - sedes:
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede_nombre_centro:
 *                 type: string
 *                 example: Centro Administrativo
 *               sede_nombre:
 *                 type: string
 *                 example: Sede Principal
 *               sede_descripcion:
 *                 type: string
 *                 example: Sede principal de la organización
 *               sede_regional:
 *                 type: string
 *                 example: Región Central
 *               sede_municipio:
 *                 type: string
 *                 example: Bogotá
 *               sede_direccion:
 *                 type: string
 *                 example: Calle 123
 *               sede_subdirector:
 *                 type: string
 *                 example: Juan Pérez
 *               contacto:
 *                 type: string
 *                 example: +57 321 456 7890
 *               img_sede:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de la sede
 *     responses:
 *       200:
 *         description: Sede registrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sede registrada correctamente
 *       400:
 *         description: Error de validación o registro fallido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se registró la sede
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: El campo es obligatorio
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /sedes/listarsede:
 *   get:
 *     summary: Obtiene la lista de todas las sedes.
 *     tags:
 *       - sedes:
 *     responses:
 *       200:
 *         description: Lista de sedes obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sedes encontradas
 *                 resultadoSede:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Sede Central
 *                       direccion:
 *                         type: string
 *                         example: Calle Falsa 123
 *                       telefono:
 *                         type: string
 *                         example: +1 234 567 890
 *       404:
 *         description: No se encontraron sedes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron sedes
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectarse a la base de datos
 */
/**
 * @swagger
 * /sedes/editarsede/:id_sede:
 *   put:
 *     summary: Actualiza una sede existente.
 *     tags: 
 *       - sedes:
 *     parameters:
 *       - in: path
 *         name: id_sede
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sede a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede_nombre_centro:
 *                 type: string
 *                 example: Centro Administrativo
 *               sede_nombre:
 *                 type: string
 *                 example: Sede Principal
 *               sede_descripcion:
 *                 type: string
 *                 example: Descripción de la sede
 *               sede_regional:
 *                 type: string
 *                 example: Región Central
 *               sede_municipio:
 *                 type: string
 *                 example: Bogotá
 *               sede_direccion:
 *                 type: string
 *                 example: Calle 123
 *               sede_subdirector:
 *                 type: string
 *                 example: Juan Pérez
 *               contacto:
 *                 type: string
 *                 example: +57 321 456 7890
 *               img_sede:
 *                 type: string
 *                 example: sede.jpg
 *                 description: Nombre de archivo de imagen de la sede
 *     responses:
 *       200:
 *         description: Sede actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sede actualizada con éxito
 *       400:
 *         description: Error de validación o actualización fallida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se actualizó la sede
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: El campo es obligatorio
 *       404:
 *         description: Sede no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sede no encontrada
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /sedes/listarsede/:id_sede:
 *   get:
 *     summary: Obtiene una sede por su ID.
 *     tags:
 *       - sedes:
 *     parameters:
 *       - in: path
 *         name: id_sede
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sede a obtener
 *     responses:
 *       200:
 *         description: Sede encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sede encontrada
 *                 resultadoSede:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idSede:
 *                         type: integer
 *                         example: 1
 *                       sede_nombre_centro:
 *                         type: string
 *                         example: Centro Administrativo
 *                       sede_nombre:
 *                         type: string
 *                         example: Sede Principal
 *                       sede_descripcion:
 *                         type: string
 *                         example: Descripción de la sede
 *                       sede_regional:
 *                         type: string
 *                         example: Región Central
 *                       sede_municipio:
 *                         type: string
 *                         example: Bogotá
 *                       sede_direccion:
 *                         type: string
 *                         example: Calle 123
 *                       sede_subdirector:
 *                         type: string
 *                         example: Juan Pérez
 *                       contacto:
 *                         type: string
 *                         example: +57 321 456 7890
 *                       img_sede:
 *                         type: string
 *                         example: sede.jpg
 *       404:
 *         description: Sede no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontró la sede
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /area/listar:
 *   get:
 *     summary: "Listar todas las áreas"
 *     tags:
 *       - areas:
 *     description: "Devuelve una lista de todas las áreas registradas."
 *     responses:
 *       200:
 *         description: "Lista de áreas encontradas."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Áreas encontradas"
 *                 resultadoArea:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idArea:
 *                         type: integer
 *                         example: 1
 *                       sede_nombre:
 *                         type: string
 *                         example: "Yamboro"
 *                       area_nombre:
 *                         type: string
 *                         example: "TIC"
 *                       img_area:
 *                         type: string
 *                         format: binary
 *                         nullable: true
 *                         example: null
 */

/**
 * @swagger
 * /area/registrar:
 *   post:
 *     summary: "Registrar una nueva área"
 *     tags:
 *       - areas:
 *     description: "Registra una nueva área en una sede específica."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede_nombre:
 *                 type: string
 *                 example: "Yamboro"
 *               area_nombre:
 *                 type: string
 *                 example: "TIC"
 *               img_area:
 *                 type: string
 *                 format: binary
 *                 description: "Imagen opcional de la área."
 *     responses:
 *       200:
 *         description: "Área registrada exitosamente."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Área registrada exitosamente"
 */
/**
 * @swagger
 * /areas/editararea/:id_area:
 *   put:
 *     summary: Actualiza una área específica por su ID.
 *     tags:
 *       - areas:
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del área a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               area_nombre:
 *                 type: string
 *                 example: Área de Finanzas
 *               img_area:
 *                 type: string
 *                 format: binary
 *                 description: Imagen actualizada del área
 *     responses:
 *       200:
 *         description: Área actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Área actualizada con éxito
 *       400:
 *         description: Error en la validación de datos o no se actualizó el área.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se actualizó el área
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: El nombre del área es obligatorio
 *                       param:
 *                         type: string
 *                         example: area_nombre
 *                       location:
 *                         type: string
 *                         example: body
 *       404:
 *         description: Área no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Área no encontrada
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /areas/listararea/:id_area:
 *   get:
 *     summary: Obtiene una área específica por su ID.
 *     tags:
 *       - areas:
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del área a buscar
 *     responses:
 *       200:
 *         description: Área encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Área encontrada
 *                 resultadoArea:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idArea:
 *                         type: integer
 *                         example: 1
 *                       sede_nombre:
 *                         type: string
 *                         example: Sede Principal
 *                       area_nombre:
 *                         type: string
 *                         example: Área de TI
 *                       img_area:
 *                         type: string
 *                         example: area_ti.jpg
 *       400:
 *         description: ID de área no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: ID de área no proporcionado
 *       404:
 *         description: No se encontró el área.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontró el área
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /sedes/listarporsede/:id_sede:
 *   get:
 *     summary: Obtiene todas las áreas de una sede específica.
 *     tags:
 *       - areas:
 *     parameters:
 *       - in: path
 *         name: id_sede
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sede para la cual se quieren listar las áreas
 *     responses:
 *       200:
 *         description: Áreas encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Áreas encontradas
 *                 resultadoAreas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idArea:
 *                         type: integer
 *                         example: 1
 *                       area_nombre:
 *                         type: string
 *                         example: Área de Finanzas
 *                       img_area:
 *                         type: string
 *                         example: finanzas.jpg
 *                       sede_nombre:
 *                         type: string
 *                         example: Sede Central
 *       404:
 *         description: No se encontraron áreas para la sede especificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron áreas para la sede especificada
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /sitios/registrarsitio:
 *   post:
 *     summary: Registra un nuevo sitio.
 *     tags:
 *       - ambientes:
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sit_nombre:
 *                 type: string
 *                 example: Laboratorio de Ciencias
 *               img_sitio:
 *                 type: string
 *                 format: binary
 *               sit_fk_areas:
 *                 type: integer
 *                 example: 2
 *               sit_fk_tipo_sitio:
 *                 type: integer
 *                 example: 1
 *               sit_fk_usuarios:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Sitio registrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sitio registrado correctamente
 *       400:
 *         description: Error en la solicitud o el sitio ya existe para el instructor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Ya existe ambiente asignado al instructor
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Nombre del sitio es obligatorio
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */

/**
 * @swagger
 * /sitios/listarsitio:
 *   get:
 *     summary: Obtiene la lista de todos los sitios registrados.
 *     tags:
 *       - ambientes:
 *     responses:
 *       200:
 *         description: Sitios encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sitios encontrados
 *                 resultadoSitio:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idAmbientes:
 *                         type: integer
 *                         example: 1
 *                       sit_nombre:
 *                         type: string
 *                         example: Laboratorio de Informática
 *                       tipo_sitio:
 *                         type: string
 *                         example: Laboratorio
 *                       sit_fecha_registro:
 *                         type: string
 *                         format: date
 *                         example: 2023-10-09
 *                       area_nombre:
 *                         type: string
 *                         example: Área de TI
 *                       instructor_encargado:
 *                         type: string
 *                         example: Juan Pérez
 *       404:
 *         description: No se encontraron sitios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron sitios
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /sitios/editarsitio/:id_sitio:
 *   put:
 *     summary: Actualiza un sitio existente.
 *     tags:
 *       - ambientes:
 *     parameters:
 *       - in: path
 *         name: id_sitio
 *         required: true
 *         description: ID del sitio a actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sit_nombre:
 *                 type: string
 *                 example: Laboratorio de Ciencias
 *               sit_fecha_registro:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-09"
 *               img_sitio:
 *                 type: string
 *                 format: binary
 *               sit_fk_areas:
 *                 type: integer
 *                 example: 2
 *               sit_fk_tipo_sitio:
 *                 type: integer
 *                 example: 1
 *               sit_fk_usuarios:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Sitio actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sitio actualizado con éxito
 *       400:
 *         description: Error en la solicitud o no se actualizó el sitio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se actualizó el sitio
 *       404:
 *         description: Sitio no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sitio no encontrado
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /sitios/listarsitioporid/:id_sitio:
 *   get:
 *     summary: Obtiene un sitio por su ID.
 *     tags:
 *       - ambientes:
 *     parameters:
 *       - in: path
 *         name: id_sitio
 *         required: true
 *         description: ID del sitio a buscar.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Sitio encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sitio encontrado
 *                 resultadoSitio:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idAmbientes:
 *                         type: integer
 *                         example: 1
 *                       sit_nombre:
 *                         type: string
 *                         example: Laboratorio de Ciencias
 *                       tipo_sitio:
 *                         type: string
 *                         example: Tipo A
 *                       sit_fecha_registro:
 *                         type: string
 *                         format: date
 *                         example: "2024-10-09"
 *                       area_nombre:
 *                         type: string
 *                         example: Área de Tecnología
 *                       instructor_encargado:
 *                         type: string
 *                         example: Juan Pérez
 *       400:
 *         description: ID de sitio no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: ID de sitio no proporcionado
 *       404:
 *         description: Sitio no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontró el sitio
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /sitios/listarporarea/:id_area:
 *   get:
 *     summary: Obtiene sitios por el ID de un área.
 *     tags:
 *       - ambientes:
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: ID del área para buscar sitios.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Sitios encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sitios encontrados
 *                 resultadoSitios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idAmbientes:
 *                         type: integer
 *                         example: 1
 *                       sit_nombre:
 *                         type: string
 *                         example: Laboratorio de Ciencias
 *                       sit_fecha_registro:
 *                         type: string
 *                         format: date
 *                         example: "2024-10-09"
 *                       img_sitio:
 *                         type: string
 *                         example: imagen_sitio.jpg
 *                       tipo_sitio:
 *                         type: string
 *                         example: Tipo A
 *                       area_nombre:
 *                         type: string
 *                         example: Área de Tecnología
 *                       instructor_encargado:
 *                         type: string
 *                         example: Juan Pérez
 *       404:
 *         description: No se encontraron sitios para el área especificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron sitios para el área especificada
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 *                   example: Error al conectar a la base de datos
 */
/**
 * @swagger
 * /fichas/registrar:
 *   post:
 *     summary: Registra una ficha técnica de maquinaria.
 *     tags: 
 *       - Ficha Técnica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placaSena:
 *                 type: string
 *                 example: "ABC-123"
 *               fiEstado:
 *                 type: string
 *                 example: "Activo"
 *               fk_sitio:
 *                 type: integer
 *                 example: 1
 *               fk_tipo_ficha:
 *                 type: integer
 *                 example: 1
 *               fiImagen:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de la ficha.
 *               fiTecnica:
 *                 type: string
 *                 format: binary
 *                 description: Documento técnico de la ficha.
 *     responses:
 *       200:
 *         description: Ficha técnica registrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Se registró la ficha técnica correctamente con QR
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Error de validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       404:
 *         description: Error al registrar la ficha técnica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al registrar ficha
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al registrar la ficha
 */
/**
 * @swagger
 * /fichas/listar:
 *   get:
 *     summary: Lista las fichas técnicas de equipos.
 *     tags: 
 *       - Ficha Técnica
 *     responses:
 *       200:
 *         description: Fichas técnicas encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idFichas:
 *                     type: integer
 *                     example: 1
 *                   fi_placa_sena:
 *                     type: string
 *                     example: "ABC-123"
 *                   fi_estado:
 *                     type: string
 *                     example: "Activo"
 *                   sit_nombre:
 *                     type: string
 *                     example: "Sala de Conferencias"
 *                   nombre:
 *                     type: string
 *                     example: "Computadora"
 *                   fi_fecha_adquisicion:
 *                     type: string
 *                     example: "2023-01-15"
 *                   fi_serial:
 *                     type: string
 *                     example: "SN123456"
 *                   fi_fecha_inicio_garantia:
 *                     type: string
 *                     example: "2023-02-01"
 *                   fi_fecha_fin_garantia:
 *                     type: string
 *                     example: "2024-02-01"
 *                   fi_descripcion_garantia:
 *                     type: string
 *                     example: "Garantía de un año"
 *                   fi_descripcion:
 *                     type: string
 *                     example: "Computadora portátil"
 *                   fi_marca:
 *                     type: string
 *                     example: "Dell"
 *                   fi_modelo:
 *                     type: string
 *                     example: "XPS 13"
 *                   fi_precioEquipo:
 *                     type: number
 *                     format: float
 *                     example: 1200.50
 *       404:
 *         description: No se encontraron fichas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron fichas.
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en el servidor
 */

/**
 * @swagger
 * /fichas/actualizarFichaEsp/:idFicha:
 *   put:
 *     summary: Actualiza el estado o el sitio de una ficha técnica.
 *     tags: 
 *       - Ficha Técnica
 *     parameters:
 *       - in: path
 *         name: idFicha
 *         required: true
 *         description: ID de la ficha a actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         name: body
 *         description: Datos para actualizar la ficha.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             fiEstado:
 *               type: string
 *               example: "Inactivo"
 *             fk_sitio:
 *               type: integer
 *               example: 2
 *     responses:
 *       200:
 *         description: Actualización exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se actualizó correctamente el estado de la ficha"
 *       400:
 *         description: No se proporcionaron datos válidos para actualizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se proporcionaron datos válidos para actualizar"
 *       404:
 *         description: Error al actualizar la ficha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar ficha"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /fichas/listarPorAmbiente/:idAmbiente:
 *   get:
 *     summary: Obtiene las fichas técnicas asociadas a un ambiente específico.
 *     tags:
 *       - Ficha Técnica
 *     parameters:
 *       - in: path
 *         name: idAmbiente
 *         required: true
 *         description: ID del ambiente para obtener sus fichas.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Fichas encontradas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idFichas:
 *                     type: integer
 *                     example: 1
 *                   fi_placa_sena:
 *                     type: string
 *                     example: "ABC123"
 *                   fi_imagen:
 *                     type: string
 *                     example: "imagen.jpg"
 *                   fi_estado:
 *                     type: string
 *                     example: "Activo"
 *                   ti_fi_nombre:
 *                     type: string
 *                     example: "Equipo de cómputo"
 *                   fi_serial:
 *                     type: string
 *                     example: "SER123456"
 *                   fi_modelo:
 *                     type: string
 *                     example: "Modelo X"
 *       404:
 *         description: No se encontraron fichas en el ambiente especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron fichas en este ambiente"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /fichas/listarInfoEspecifica/:idFicha:
 *   get:
 *     summary: Obtiene la información específica de una ficha técnica por su ID.
 *     tags:
 *       - Ficha Técnica
 *     parameters:
 *       - in: path
 *         name: idFicha
 *         required: true
 *         description: ID de la ficha técnica que se desea consultar.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Información de la ficha encontrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idFichas:
 *                   type: integer
 *                   example: 1
 *                 fi_placa_sena:
 *                   type: string
 *                   example: "ABC123"
 *                 fi_imagen:
 *                   type: string
 *                   example: "imagen.jpg"
 *                 fi_estado:
 *                   type: string
 *                   example: "Activo"
 *                 CodigoQR:
 *                   type: string
 *                   example: "QR123456"
 *                 sit_Nombre:
 *                   type: string
 *                   example: "Nombre del sitio"
 *                 area_nombre:
 *                   type: string
 *                   example: "Nombre del área"
 *                 sede_nombre:
 *                   type: string
 *                   example: "Nombre de la sede"
 *                 ficha_respaldo:
 *                   type: string
 *                   example: "respaldo.pdf"
 *                 tipoEquipo:
 *                   type: string
 *                   example: "Equipo de cómputo"
 *                 fi_fecha_adquisicion:
 *                   type: string
 *                   example: "2023-01-01"
 *                 fi_serial:
 *                   type: string
 *                   example: "SER123456"
 *                 fi_fecha_inicio_garantia:
 *                   type: string
 *                   example: "2023-01-01"
 *                 fi_fecha_fin_garantia:
 *                   type: string
 *                   example: "2024-01-01"
 *                 fi_descripcion_garantia:
 *                   type: string
 *                   example: "Garantía de un año"
 *                 fi_descripcion:
 *                   type: string
 *                   example: "Descripción del equipo"
 *                 fi_marca:
 *                   type: string
 *                   example: "Marca X"
 *                 fi_modelo:
 *                   type: string
 *                   example: "Modelo Y"
 *                 fi_precioEquipo:
 *                   type: number
 *                   example: 500.00
 *                 mantenimientos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idMantenimiento:
 *                         type: integer
 *                         example: 1
 *                       mant_estado:
 *                         type: string
 *                         example: "Completado"
 *                       mant_costo_final:
 *                         type: number
 *                         example: 150.00
 *                       mant_ficha_soporte:
 *                         type: string
 *                         example: "soporte.pdf"
 *                       tipo_mantenimiento:
 *                         type: string
 *                         example: "Preventivo"
 *                       idSolicitud:
 *                         type: integer
 *                         example: 1
 *       404:
 *         description: No se encontró la ficha técnica especificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontró ficha"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /fichas/listarMantenimientosMaquina/:idFicha:
 *   get:
 *     summary: Obtiene la lista de mantenimientos de una máquina por su ID de ficha.
 *     tags:
 *       - Ficha Técnica
 *     parameters:
 *       - in: path
 *         name: idFicha
 *         required: true
 *         description: ID de la ficha técnica de la máquina para la cual se desean consultar los mantenimientos.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de mantenimientos encontrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idMantenimiento:
 *                     type: integer
 *                     example: 1
 *                   nombre_solicitante:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   mant_codigo_mantenimiento:
 *                     type: string
 *                     example: "MANT001"
 *                   mant_estado:
 *                     type: string
 *                     example: "Completado"
 *                   mant_costo_final:
 *                     type: number
 *                     example: 150.00
 *                   mant_ficha_soporte:
 *                     type: string
 *                     example: "soporte.pdf"
 *                   tipo_mantenimiento:
 *                     type: string
 *                     example: "Preventivo"
 *       404:
 *         description: No se encontraron mantenimientos para la ficha técnica especificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron mantenimientos para este equipo"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /detalles:
 *   post:
 *     summary: Registra un nuevo detalle de ficha.
 *     tags: [Detalles Fichas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detFkFicha:
 *                 type: integer
 *                 example: 1
 *                 description: ID de la ficha a la que se le añadirá el detalle.
 *               detFkVariable:
 *                 type: integer
 *                 example: 2
 *                 description: ID de la variable correspondiente al detalle.
 *               detValor:
 *                 type: string
 *                 example: "Valor del detalle"
 *                 description: Valor del detalle que se está registrando.
 *     responses:
 *       200:
 *         description: Detalle registrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se registró correctamente"
 *       400:
 *         description: Error en la validación de los datos proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       404:
 *         description: No se registró correctamente el detalle.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se registró correctamente"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /variables:
 *   post:
 *     summary: Registra una nueva variable.
 *     tags: [Variables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               varNombre:
 *                 type: string
 *                 example: "Nombre de la variable"
 *                 description: Nombre de la nueva variable.
 *               varDescripcion:
 *                 type: string
 *                 example: "Descripción de la variable"
 *                 description: Descripción de la nueva variable.
 *     responses:
 *       200:
 *         description: Variable registrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se registró correctamente"
 *       400:
 *         description: Error en la validación de los datos proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       404:
 *         description: No se registró la variable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se registró"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /solicitud:
 *   post:
 *     summary: Registra una nueva solicitud de mantenimiento.
 *     tags: [Solicitud]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prioridad:
 *                 type: string
 *                 example: "alta"
 *                 description: Prioridad de la solicitud (alta, media, baja).
 *               descripcion:
 *                 type: string
 *                 example: "Problema con la máquina."
 *                 description: Descripción del problema.
 *               costo_estimado:
 *                 type: number
 *                 example: 150.00
 *                 description: Costo estimado para la reparación.
 *               obsevaciones:
 *                 type: string
 *                 example: "Revisar urgentemente."
 *                 description: Observaciones adicionales.
 *               temaLegal:
 *                 type: string
 *                 example: "Cumplimiento de normativas."
 *                 description: Tema legal relacionado con la solicitud.
 *               nombre_solicitante:
 *                 type: string
 *                 example: "Juan Pérez"
 *                 description: Nombre del solicitante.
 *               correo_solicitante:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *                 description: Correo del solicitante.
 *     responses:
 *       201:
 *         description: Solicitud registrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Nueva solicitud registrada"
 *                 data_id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Error en la validación de los datos o no se pudo registrar la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /Solicitud:
 *   get:
 *     summary: Obtiene las solicitudes de mantenimiento pendientes.
 *     tags: [Solicitud]
 *     responses:
 *       200:
 *         description: Lista de solicitudes pendientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idSolicitud:
 *                     type: integer
 *                     example: 1
 *                     description: ID de la solicitud.
 *                   soli_prioridad:
 *                     type: string
 *                     example: "alta"
 *                     description: Prioridad de la solicitud.
 *                   soli_descripcion_problemas:
 *                     type: string
 *                     example: "Problema con la máquina."
 *                     description: Descripción del problema.
 *                   soli_costo_estimado:
 *                     type: number
 *                     example: 150.00
 *                     description: Costo estimado para la reparación.
 *                   soli_observaciones:
 *                     type: string
 *                     example: "Revisar urgentemente."
 *                     description: Observaciones adicionales.
 *                   soli_estado:
 *                     type: string
 *                     example: "pendiente"
 *                     description: Estado de la solicitud.
 *                   temas_legal:
 *                     type: string
 *                     example: "Cumplimiento de normativas."
 *                     description: Tema legal relacionado con la solicitud.
 *                   nombre_solicitante:
 *                     type: string
 *                     example: "Juan Pérez"
 *                     description: Nombre del solicitante.
 *                   correo_solicitante:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                     description: Correo del solicitante.
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 *                 error:
 *                   type: string
 *                   example: "Descripción del error"
 */
/**
 * @swagger
 * /solicitud/PDF:
 *   get:
 *     summary: Obtiene las solicitudes de mantenimiento para generar un PDF.
 *     tags: [Solicitud]
 *     responses:
 *       200:
 *         description: Lista de solicitudes para el PDF.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idSolicitud:
 *                     type: integer
 *                     example: 1
 *                     description: ID de la solicitud.
 *                   soli_prioridad:
 *                     type: string
 *                     example: "alta"
 *                     description: Prioridad de la solicitud.
 *                   soli_descripcion_problemas:
 *                     type: string
 *                     example: "Problema con la máquina."
 *                     description: Descripción del problema.
 *                   soli_costo_estimado:
 *                     type: number
 *                     example: 150.00
 *                     description: Costo estimado para la reparación.
 *                   soli_observaciones:
 *                     type: string
 *                     example: "Revisar urgentemente."
 *                     description: Observaciones adicionales.
 *                   soli_estado:
 *                     type: string
 *                     example: "pendiente"
 *                     description: Estado de la solicitud.
 *                   temas_legal:
 *                     type: string
 *                     example: "Cumplimiento de normativas."
 *                     description: Tema legal relacionado con la solicitud.
 *                   fecha_solicitud:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-01T14:30:00Z"
 *                     description: Fecha en la que se realizó la solicitud.
 *                   nombre_solicitante:
 *                     type: string
 *                     example: "Juan Pérez"
 *                     description: Nombre del solicitante.
 *                   correo_solicitante:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                     description: Correo del solicitante.
 *                   fi_placa_sena:
 *                     type: string
 *                     example: "ABC123"
 *                     description: Placa del equipo relacionado con la solicitud.
 *                   acti_nombres:
 *                     type: string
 *                     example: "Mantenimiento preventivo, Revisión de seguridad"
 *                     description: Nombres de las actividades asociadas.
 *                   acti_descripciones:
 *                     type: string
 *                     example: "Cambio de aceite, Inspección de frenos"
 *                     description: Descripciones de las actividades asociadas.
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 *                 error:
 *                   type: string
 *                   example: "Descripción del error"
 */
/**
 * @swagger
 * /solicitud/actualizar/:idSolicitud:
 *   put:
 *     summary: Actualiza una solicitud de mantenimiento.
 *     tags: [Solicitud]
 *     parameters:
 *       - in: path
 *         name: idSolicitud
 *         required: true
 *         description: ID de la solicitud a actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prioridad:
 *                 type: string
 *                 example: "alta"
 *                 description: Prioridad de la solicitud.
 *               descripcion:
 *                 type: string
 *                 example: "Problema con la máquina."
 *                 description: Descripción del problema.
 *               costo_estimado:
 *                 type: number
 *                 example: 150.00
 *                 description: Costo estimado para la reparación.
 *               observaciones:
 *                 type: string
 *                 example: "Revisar urgentemente."
 *                 description: Observaciones adicionales.
 *               temaLegal:
 *                 type: string
 *                 example: "Cumplimiento de normativas."
 *                 description: Tema legal relacionado con la solicitud.
 *               nombre_solicitante:
 *                 type: string
 *                 example: "Juan Pérez"
 *                 description: Nombre del solicitante.
 *               correo_solicitante:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *                 description: Correo del solicitante.
 *     responses:
 *       200:
 *         description: Solicitud actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se actualizo correctamente la solicitud"
 *       400:
 *         description: Error de validación de la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Prioridad es un campo requerido"]
 *       404:
 *         description: No se encontró la solicitud para actualizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar solicitud"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error del servidor"
 */
/**
 * @swagger
 * /solicitudes/listarPorId/:idSolicitud:
 *   get:
 *     summary: Obtiene una solicitud de mantenimiento por su ID.
 *     tags: [Solicitud]
 *     parameters:
 *       - in: path
 *         name: idSolicitud
 *         required: true
 *         description: ID de la solicitud que se desea obtener.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Solicitud encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idSolicitud:
 *                   type: integer
 *                   example: 1
 *                 soli_prioridad:
 *                   type: string
 *                   example: "alta"
 *                 soli_descripcion_problemas:
 *                   type: string
 *                   example: "Problema con la máquina."
 *                 soli_costo_estimado:
 *                   type: number
 *                   example: 150.00
 *                 soli_observaciones:
 *                   type: string
 *                   example: "Revisar urgentemente."
 *                 soli_estado:
 *                   type: string
 *                   example: "pendiente"
 *                 temas_legal:
 *                   type: string
 *                   example: "Cumplimiento de normativas."
 *                 fecha_solicitud:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-01T12:00:00Z"
 *                 nombre_solicitante:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 correo_solicitante:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 acti_nombre:
 *                   type: string
 *                   example: "Mantenimiento general"
 *                 acti_descripcion:
 *                   type: string
 *                   example: "Revisar el motor."
 *                 fi_placa_sena:
 *                   type: string
 *                   example: "ABC123"
 *       404:
 *         description: No se encontró una solicitud con ese ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró un solicitud con ese id."
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el controlador listarSolicitudPorId: Error detallado."
 */
/**
 * @swagger
 * /actividades/registrar:
 *   post:
 *     summary: Registrar varias actividades
 *     description: Registra múltiples actividades en la base de datos en una única transacción. Si alguna actividad falla, se revierte la transacción.
 *     tags: [Actividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 acti_nombre:
 *                   type: string
 *                   description: Nombre de la actividad
 *                   example: "Revisión de maquinaria"
 *                 acti_descripcion:
 *                   type: string
 *                   description: Descripción de la actividad
 *                   example: "Revisión periódica de la maquinaria industrial"
 *                 acti_fecha_realizacion:
 *                   type: string
 *                   format: date
 *                   description: Fecha de realización de la actividad
 *                   example: "2024-09-01"
 *                 acti_estado:
 *                   type: string
 *                   description: Estado de la actividad. El valor por defecto es 'en ejecucion'.
 *                   example: "realizado"
 *                 acti_fk_solicitud:
 *                   type: integer
 *                   description: ID de la solicitud relacionada con la actividad
 *                   example: 10
 *     responses:
 *       200:
 *         description: Actividades registradas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Se registraron correctamente las actividades"
 *       400:
 *         description: Error en la validación de los datos de entrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "El nombre de la actividad es requerido"
 *                       param:
 *                         type: string
 *                         example: "acti_nombre"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       500:
 *         description: Error en el servidor al registrar las actividades.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor: Error al registrar una o más actividades"
 */
/**
 * @swagger
 * /actividades/actualizar/:id_actividades:
 *   put:
 *     summary: Actualiza una actividad existente.
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id_actividades
 *         required: true
 *         description: ID de la actividad que se desea actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acti_nombre:
 *                 type: string
 *                 example: "Mantenimiento preventivo"
 *               acti_descripcion:
 *                 type: string
 *                 example: "Revisión de los filtros de la máquina."
 *               acti_fecha_realizacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-15T10:00:00Z"
 *               acti_estado:
 *                 type: string
 *                 example: "completado"
 *               acti_fk_solicitud:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Actividad actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menssage:
 *                   type: string
 *                   example: "se actualizo con exito"
 *       404:
 *         description: No se pudo actualizar la actividad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menssage:
 *                   type: string
 *                   example: "No se actualizo"
 *       400:
 *         description: Errores de validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menssage:
 *                   type: string
 *                   example: "error: mensaje detallado"
 */
/**
 * @swagger
 * /mantenimiento/registrar:
 *   post:
 *     summary: Registra un nuevo mantenimiento.
 *     tags:
 *       - Mantenimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mant_codigo_mantenimiento:
 *                 type: string
 *                 example: "MANT-001"
 *               mant_estado:
 *                 type: string
 *                 example: "activo"
 *               mant_fecha_proxima:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-15T10:00:00Z"
 *               man_fecha_realizacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-01T10:00:00Z"
 *               mant_descripcion:
 *                 type: string
 *                 example: "Revisión general de equipos."
 *               mant_costo_final:
 *                 type: number
 *                 format: float
 *                 example: 1500.00
 *               fk_tipo_mantenimiento:
 *                 type: integer
 *                 example: 1
 *               fk_solicitud_mantenimiento:
 *                 type: integer
 *                 example: 1
 *               tecnico:
 *                 type: string
 *                 example: "Juan Pérez"
 *     responses:
 *       200:
 *         description: Mantenimiento registrado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se registró el mantenimiento con éxito"
 *                 idMantenimiento:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Errores de validación o no se registró el mantenimiento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se registró el mantenimiento"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error: mensaje detallado"
 */
/**
 * @swagger
 * /mantenimiento/listar/:
 *   get:
 *     summary: Lista todos los mantenimientos.
 *     tags:
 *       - Mantenimiento
 *     responses:
 *       200:
 *         description: Lista de mantenimientos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idMantenimiento:
 *                     type: integer
 *                     example: 1
 *                   referencia_maquina:
 *                     type: string
 *                     example: "PLACA-001"
 *                   codigo_mantenimiento:
 *                     type: string
 *                     example: "MANT-001"
 *                   descripcion_mantenimiento:
 *                     type: string
 *                     example: "Revisión general de equipos."
 *                   mant_fecha_realizacion:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-01"
 *                   mant_fecha_proxima:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-15"
 *                   mant_costo_final:
 *                     type: number
 *                     format: float
 *                     example: 1500.00
 *                   estado_maquina:
 *                     type: string
 *                     example: "en funcionamiento"
 *                   idActividades:
 *                     type: integer
 *                     example: 1
 *                   acti_nombre:
 *                     type: string
 *                     example: "Actividad de mantenimiento"
 *                   tipo_mantenimiento:
 *                     type: string
 *                     example: "Preventivo"
 *                   idFichas:
 *                     type: integer
 *                     example: 1
 *                   estado_ficha:
 *                     type: string
 *                     example: "activo"
 *                   mant_estado:
 *                     type: string
 *                     example: "completado"
 *       404:
 *         description: No se encontraron mantenimientos en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron mantenimientos en la base de datos."
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el controlador listartodosmantenimientos: mensaje detallado"
 */
/**
 * @swagger
 * /mantenimiento/Actualizar_mantenimiento/:idMantenimiento:
 *   put:
 *     summary: Actualiza un mantenimiento existente.
 *     tags:
 *       - Mantenimiento
 *     parameters:
 *       - name: idMantenimiento
 *         in: path
 *         required: true
 *         description: ID del mantenimiento a actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mant_codigo_mantenimiento:
 *                 type: string
 *                 example: "MANT-002"
 *               mant_estado:
 *                 type: string
 *                 example: "en proceso"
 *               mant_fecha_proxima:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-30"
 *               man_fecha_realizacion:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *               mant_descripcion:
 *                 type: string
 *                 example: "Mantenimiento preventivo."
 *               mant_costo_final:
 *                 type: number
 *                 format: float
 *                 example: 1200.00
 *               fk_tipo_mantenimiento:
 *                 type: integer
 *                 example: 2
 *               fk_solicitud_mantenimiento:
 *                 type: integer
 *                 example: 1
 *               mant_ficha_soporte:
 *                 type: string
 *                 example: "path/to/support/file.pdf"
 *     responses:
 *       200:
 *         description: Mantenimiento actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Mantenimiento actualizado con éxito"
 *       400:
 *         description: Error de validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Mensaje de error de validación"
 *                       param:
 *                         type: string
 *                         example: "mant_estado"
 *       404:
 *         description: Mantenimiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Mantenimiento no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error: mensaje detallado"
 */
/**
 * @swagger
 * /mantenimiento/listar_por_id/:idMantenimiento:
 *   get:
 *     summary: Obtiene la información detallada de un mantenimiento por su ID.
 *     tags:
 *       - Mantenimiento
 *     parameters:
 *       - name: idMantenimiento
 *         in: path
 *         required: true
 *         description: ID del mantenimiento a obtener.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Información detallada del mantenimiento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idMantenimiento:
 *                   type: integer
 *                   example: 1
 *                 referencia_maquina:
 *                   type: string
 *                   example: "ABC1234"
 *                 codigo_mantenimiento:
 *                   type: string
 *                   example: "MANT-002"
 *                 descripcion_mantenimiento:
 *                   type: string
 *                   example: "Mantenimiento preventivo de máquina"
 *                 mant_fecha_proxima:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-30"
 *                 man_fecha_realizacion:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-15"
 *                 mant_costo_final:
 *                   type: number
 *                   format: float
 *                   example: 1200.00
 *                 fk_solicitud_mantenimiento:
 *                   type: integer
 *                   example: 5
 *                 tecnico:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 id_tecnico:
 *                   type: integer
 *                   example: 3
 *                 estado_maquina:
 *                   type: string
 *                   example: "activo"
 *                 idActividades:
 *                   type: integer
 *                   example: 2
 *                 acti_nombre:
 *                   type: string
 *                   example: "Revisión de aceite"
 *                 tipo_mantenimiento:
 *                   type: string
 *                   example: "Preventivo"
 *                 idFichas:
 *                   type: integer
 *                   example: 1
 *                 estado_ficha:
 *                   type: string
 *                   example: "Operativa"
 *                 mant_estado:
 *                   type: string
 *                   example: "Completado"
 *       404:
 *         description: No se encontró un mantenimiento con ese ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró un mantenimiento con ese id."
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el controlador listarMantenimientoPorId: mensaje detallado"
 */
/**
 * @swagger
 * /mantenimiento/excelconsultavariables:
 *   get:
 *     summary: Consulta consolidada de mantenimientos para exportar datos a Excel.
 *     tags: 
 *       - Mantenimiento
 *     responses:
 *       200:
 *         description: Consulta exitosa de los datos de mantenimientos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idMantenimiento:
 *                     type: integer
 *                     example: 1
 *                   fi_placa_sena:
 *                     type: string
 *                     example: "ABC1234"
 *                   codigo_mantenimiento:
 *                     type: string
 *                     example: "MANT-002"
 *                   mant_fecha_proxima:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-30"
 *                   man_fecha_realizacion:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-15"
 *                   nombre:
 *                     type: string
 *                     example: "Compresor"
 *                   mant_costo_final:
 *                     type: number
 *                     format: float
 *                     example: 1200.00
 *                   fk_tecnico:
 *                     type: integer
 *                     example: 3
 *                   descripcion_mantenimiento:
 *                     type: string
 *                     example: "Revisión general de compresor"
 *                   tipo_mantenimiento:
 *                     type: string
 *                     example: "Preventivo"
 *                   sit_nombre:
 *                     type: string
 *                     example: "Almacén"
 *                   area_nombre:
 *                     type: string
 *                     example: "Producción"
 *                   sede_nombre_centro:
 *                     type: string
 *                     example: "Centro Norte"
 *                   sede_nombre:
 *                     type: string
 *                     example: "Planta Principal"
 *                   soli_prioridad:
 *                     type: string
 *                     example: "Alta"
 *                   par_nombre_repuesto:
 *                     type: string
 *                     example: "Filtro, Aceite"
 *                   par_costo_total:
 *                     type: number
 *                     format: float
 *                     example: 450.00
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el controlador excelconsultavariables: mensaje de error"
 */
/**
 * @swagger
 * /partes/registrar:
 *   post:
 *     summary: Registrar partes de mantenimiento
 *     description: Registra múltiples partes de mantenimiento asociadas a un mantenimiento específico.
 *     tags:
 *       - Partes de Mantenimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 par_fk_mantenimientos:
 *                   type: integer
 *                   description: ID del mantenimiento al que está asociada la parte
 *                   example: 5
 *                 par_nombre_repuesto:
 *                   type: string
 *                   description: Nombre del repuesto o parte del mantenimiento
 *                   example: "Filtro de aceite"
 *                 par_costo:
 *                   type: number
 *                   format: float
 *                   description: Costo de la parte
 *                   example: 150.50
 *     responses:
 *       200:
 *         description: Partes de mantenimiento registradas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se registraron las partes de mantenimiento con éxito"
 *       400:
 *         description: Error en la solicitud, por ejemplo, si el cuerpo no es un array o está vacío.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se esperaba un array de partes de mantenimiento."
 *       404:
 *         description: No se registraron correctamente las partes de mantenimiento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se registraron las partes de mantenimiento con éxito"
 *       500:
 *         description: Error interno del servidor al registrar las partes de mantenimiento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error: Error al registrar las partes de mantenimiento"
 */
/**
 * @swagger
 * /partes/actualizar/:id_partes_mantenimiento:
 *   put:
 *     summary: Actualiza una parte de mantenimiento específica por su ID.
 *     tags:
 *       - Partes de Mantenimiento
 *     parameters:
 *       - in: path
 *         name: id_partes_mantenimiento
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la parte de mantenimiento a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               par_fk_mantenimientos:
 *                 type: integer
 *                 example: 1
 *                 description: ID del mantenimiento al que pertenece la parte.
 *               par_nombre_repuesto:
 *                 type: string
 *                 example: "Filtro de aire"
 *                 description: Nombre del repuesto.
 *               par_costo:
 *                 type: number
 *                 format: float
 *                 example: 150.75
 *                 description: Costo del repuesto.
 *     responses:
 *       200:
 *         description: Parte de mantenimiento actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Se actualizó con éxito"
 *       400:
 *         description: Error de validación en el cuerpo de la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "El campo 'par_nombre_repuesto' es requerido y debe ser un texto válido"
 *       404:
 *         description: La parte de mantenimiento no se encontró o no se actualizó.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se actualizó"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en actualizar: mensaje de error"
 */
/**
 * @swagger
 * /partes/listar_por_idmantenimiento/:idMantenimiento:
 *   get:
 *     summary: Listar todas las partes de mantenimiento asociadas a un mantenimiento específico.
 *     tags: 
 *       - Partes de Mantenimiento
 *     parameters:
 *       - in: path
 *         name: idMantenimiento
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del mantenimiento para obtener las partes de mantenimiento.
 *     responses:
 *       200:
 *         description: Lista de partes de mantenimiento.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_partes_mantenimiento:
 *                     type: integer
 *                     description: ID de la parte de mantenimiento.
 *                     example: 1
 *                   par_fk_mantenimientos:
 *                     type: integer
 *                     description: ID del mantenimiento al que pertenece la parte.
 *                     example: 1
 *                   par_nombre_repuesto:
 *                     type: string
 *                     description: Nombre del repuesto.
 *                     example: "Filtro de aceite"
 *                   par_costo:
 *                     type: number
 *                     format: float
 *                     description: Costo del repuesto.
 *                     example: 75.5
 *       404:
 *         description: No se encontraron partes de mantenimiento para el ID de mantenimiento especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron partes de mantenimiento para ese id de mantenimiento."
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en el controlador listarPartesMantenimientoPorIdMantenimiento: mensaje de error"
 */
/**
 * @swagger
 * /roles/registrar:
 *   post:
 *     summary: Registrar un nuevo rol en el sistema.
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del rol a registrar.
 *                 example: "admin"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del rol.
 *                 example: "Administrador del sistema"
 *     responses:
 *       200:
 *         description: Rol registrado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Rol Registrado con exito"
 *       400:
 *         description: Error de validación o no se pudo registrar el rol.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Mensaje:
 *                   type: string
 *                   example: "Usuario no registrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Mensaje:
 *                   type: string
 *                   example: "Error en el servidor"
 */
/**
 * @swagger
 * /roles/listar:
 *   get:
 *     summary: Listar todos los roles.
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de todos los roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idRoles:
 *                     type: integer
 *                     example: 1
 *                   rol_nombre:
 *                     type: string
 *                     example: "admin"
 *                   rol_descripcion:
 *                     type: string
 *                     example: "Rol administrativo del sistema"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error en el servidor"
 */
/**
 * @swagger
 * /roles/actualizar/:id:
 *   put:
 *     summary: Actualizar un rol específico por ID.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a actualizar.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Datos del rol a actualizar.
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               example: "admin"
 *             descripcion:
 *               type: string
 *               example: "Rol administrativo del sistema"
 *     responses:
 *       200:
 *         description: Rol actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Rol actualizado con éxito"
 *       404:
 *         description: No se encontró el rol con el ID especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "No se encontro Rol"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error en el servidor"
 */
/**
 * @swagger
 * /roles/listar/:id:
 *   get:
 *     summary: Obtener un rol específico por ID.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a obtener.
 *     responses:
 *       200:
 *         description: Detalles del rol obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Rol:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idRoles:
 *                         type: integer
 *                         example: 1
 *                       rol_nombre:
 *                         type: string
 *                         example: "admin"
 *                       rol_descripcion:
 *                         type: string
 *                         example: "Administrador del sistema"
 *       404:
 *         description: No se encontró el rol con el ID especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Mensaje:
 *                   type: string
 *                   example: "No se encontro el rol"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en el servidor"
 */