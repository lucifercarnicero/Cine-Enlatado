# Cine-Enlatado
1. Ir al back y lanzarlo ```npm run dev```
2. Si quieres lanzar back y front por separado haces el paso 3, sino con el 1 es suficiente.
3. Iniciar la app con ```ng serve```

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
