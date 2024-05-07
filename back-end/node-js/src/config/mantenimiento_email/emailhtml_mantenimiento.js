export const emailHtml_mantenimiento = (usuario) => {
    const currentYear = new Date().getFullYear();
  
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Correo Electrónico</title>
        <style>
          /* Fuentes */
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          /* Estilos CSS para el correo */
            body {
                font-family: 'Roboto', sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #333333;
                color: #ffffff;
                padding: 20px;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            .content {
                padding: 20px;
            }
            .correo {
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
            .footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
            }

            .footer-content {
                max-width: 800px;
                margin: 0 auto;
            }

            .footer-content p {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Recordatorio de Mantenimiento</h1>
            </div>
            <div class="content">
                <p>Estimado/a ${usuario.us_nombre} ${usuario.us_apellidos},</p>
                <p>Queremos recordarte que tienes un mantenimiento programado en 7 días para la máquina con referencia ${usuario.referencia_maquina}.</p>
                <p>A continuación, te proporcionamos los detalles del mantenimiento:</p>
                <ul>
                    <li><strong>Código de Mantenimiento:</strong> ${usuario.mant_codigo_mantenimiento}</li>
                    <li><strong>Descripción:</strong> ${usuario.mant_descripcion}</li>
                    <li><strong>Fecha de Realización:</strong> ${usuario.mant_fecha_realizacion}</li>
                    <li><strong>Estado de la Actividad:</strong> ${usuario.acti_estado}</li>
                    <li><strong>Nombre de la Actividad:</strong> ${usuario.acti_nombre}</li>
                    <li><strong>Tipo de Mantenimiento:</strong> ${usuario.tipo_mantenimiento}</li>
                    <li><strong>Fecha de Inicio de Garantía:</strong> ${usuario.fi_fecha_inicio_garantia}</li>
                    <li><strong>Fecha de Fin de Garantía:</strong> ${usuario.fi_fecha_fin_garantia}</li>
                    <li><strong>Descripción de la Garantía:</strong> ${usuario.fi_descripcion_garantia}</li>
                </ul>
                <p>Por favor, asegúrate de programar este mantenimiento y tomar las medidas necesarias. Si necesitas más información, no dudes en contactarnos.</p>
            </div>
            <footer class="footer">
            <div class="footer-content">
                <p>&copy; ${currentYear} MachinApp. 2669959</p>
            </div>
        </footer>
        </div>
    </body>
    </html>
    `;
    return html;
};