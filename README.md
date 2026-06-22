# Enclave Trovador

Primera version de un sitio estatico para GitHub Pages. Usa HTML, CSS y JavaScript puro, sin frameworks, WordPress ni backend.

## Estructura

- `index.html`: portada del sitio.
- `artistas.html`: tarjetas cargadas desde `data/artistas.json`.
- `agenda.html`: eventos cargados desde `data/agenda.json`.
- `sumate.html`: llamado con boton provisorio a Google Forms.
- `contacto.html`: datos de contacto.
- `css/estilos.css`: estilos responsive y paleta visual.
- `js/app.js`: menu movil, carga de datos y filtros.
- `img/guitar_hero.jpg`: imagen principal de portada.
- `data/artistas.json`: artistas ficticios.
- `data/agenda.json`: eventos ficticios.

## Publicar con GitHub Pages

1. Fusionar el pull request a la rama `main`.
2. Entrar en GitHub a `Settings` > `Pages`.
3. En `Build and deployment`, elegir `Deploy from a branch`.
4. Seleccionar la rama `main` y la carpeta `/root`.
5. Guardar los cambios.
6. Esperar a que GitHub Pages publique la URL del sitio.

## Editar contenido

Para actualizar artistas o eventos no hace falta tocar el HTML:

- Artistas: editar `data/artistas.json`.
- Agenda: editar `data/agenda.json`.

Los cambios se reflejan cuando GitHub Pages vuelve a publicar el sitio.
