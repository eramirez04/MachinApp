export const emailHtml = (nombre, contrasenia) => {
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
            <h1>Contraseña restablecida</h1>
        </div>
        <div class="content">
            <p>Estimado/a ${nombre},</p>
            <p>Nos contactamos contigo porque solicitaste recuperar tu contraseña. No te preocupes, ¡hemos generado una nueva contraseña temporal para que puedas acceder a tu cuenta de forma segura!</p>
        </div>
        <div class="correo">
            <p>Tu nueva contraseña es <br>
            ${contrasenia}</p>
        </div>
        <div class="content">
            <p>Te recomendamos iniciar sesión con esta contraseña lo antes posible y cambiarla por una nueva que sea fácil de recordar pero difícil de adivinar. Puedes incluir una combinación de letras, números y caracteres especiales para hacerla más robusta.</p>
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
