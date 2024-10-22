export const emailHtml_mantenimiento = (mantenimiento) => {
    const currentYear = new Date().getFullYear();
  
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Recordatorio de Mantenimiento</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
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
            .footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Recordatorio de Mantenimiento</h1>
            </div>
            <div class="content">
                <p>Estimado/a ${mantenimiento.us_nombre} ${mantenimiento.us_apellidos},</p>
                <p>Le recordamos que tiene un mantenimiento programado para los próximos 7 días.</p>
                <p>Detalles del mantenimiento:</p>
                <ul>
                    <li><strong>Código de Mantenimiento:</strong> ${mantenimiento.mant_codigo_mantenimiento}</li>
                    <li><strong>Máquina:</strong> ${mantenimiento.referencia_maquina} (${mantenimiento.tipo_equipo})</li>
                    <li><strong>Actividad:</strong> ${mantenimiento.acti_nombre}</li>
                    <li><strong>Descripción:</strong> ${mantenimiento.acti_descripcion}</li>
                    <li><strong>Fecha de Mantenimiento:</strong> ${mantenimiento.mant_fecha_proxima}</li>
                </ul>
                <p>Por favor, asegúrese de estar preparado para este mantenimiento. Si necesita más información, no dude en contactarnos.</p>
            </div>
            <div class="footer">
                <p>&copy; ${currentYear} MachinApp. 2669959</p>
            </div>
        </div>
    </body>
    </html>
    `;
    return html;
  };
  