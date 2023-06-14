# Cine-Enlatado

Instalaciones necesarias
1. Node 18 o superior: https://nodejs.org/es
2. Instalar angular: $ npm install -g @angular/cli en la carpeta del proyecto
3. Instalar nodemon npm install -g nodemon
4. Hacer npm install --en app y en server


Lanzar server y front por separado

1. Ir a app y lanzar con ```ng server```
2. Ir a server y lanzar con ```npm run dev```


Lanzar toda la app desde server (está buildeado el angular dentro)
1. Ir al back y lanzarlo ```npm run dev```


URL publica AWS: **http://54.86.221.92:3000/**

Usuarios:
  - Email: user@user.com Password:123123
  - Email: admin@admin.com Password:123123

Las películas vienen por la API de imdb: https://imdb-api.com/api#SearchMovie-header


Desplegar en AWS:

  1. Bajarse clave
  2. Acceder por consola SSH
  3. ir a la ruta 'cd Cine-Enlatado/server'
  4. usar el comando ```pm2 start npm -- run dev``` dejará funcionando la app hasta que se detenga la instancia
