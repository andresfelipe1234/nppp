# Brújula

App web instalable para registrar ingresos y gastos, definir metas de ahorro y dar seguimiento a tareas y hábitos. No requiere cuenta: la información se guarda en el almacenamiento local del navegador de este dispositivo.

## Probar en el computador

1. Instala Node.js si aún no está instalado.
2. Abre una terminal dentro de `outputs` y ejecuta `npx serve .`.
3. Abre la dirección local que indique la terminal (normalmente `http://localhost:3000`). `localhost` permite probar el service worker sin publicar la app.
4. Para verificar rutas en un subdirectorio, sirve la carpeta superior y abre `/outputs/` (por ejemplo `http://localhost:3000/outputs/`).
5. Abre las herramientas de desarrollo del navegador → **Application** → **Manifest** y **Service Workers**. Confirma los iconos, el manifiesto y que el worker esté activo. Después de cargarla una vez, activa el modo sin conexión y recarga para comprobar la pantalla de la app.

El worker almacena solo los archivos estáticos enumerados de la interfaz. No guarda movimientos financieros, datos de formularios, llamadas a API ni respuestas de terceros en la caché. La fuente de Google Fonts necesita conexión si aún no está en la caché del navegador; el sistema usará fuentes locales de respaldo sin conexión. Los datos se guardan en el navegador del dispositivo, no se sincronizan entre dispositivos y pueden borrarse al limpiar los datos del sitio.

## Publicar gratis con HTTPS

### GitHub Pages

1. Crea un repositorio público en GitHub y sube **el contenido** de `outputs` (deja `index.html` en la raíz que se publicará).
2. En el repositorio abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona la rama `main` y la carpeta `/(root)`, y guarda.
4. Espera a que GitHub muestre la URL publicada en esa pantalla. En **Settings → Pages**, activa **Enforce HTTPS** si aparece como opción.

GitHub Pages ofrece publicación desde una rama en repositorios públicos con GitHub Free y admite HTTPS. Guía: [configurar la fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) y [proteger el sitio con HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

### Netlify Drop

1. Abre [Netlify Drop](https://app.netlify.com/drop) e inicia sesión si te lo solicita.
2. Arrastra la carpeta `outputs` completa al área de publicación.
3. Usa la URL HTTPS que Netlify entrega para abrir la app. La guía oficial está en [Netlify Drop Quickstart](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).

No abras el HTML como `file://`: manifiesto, instalación y service worker requieren un origen HTTP/HTTPS. En producción, HTTPS es obligatorio para instalar la PWA.

## Instalar en el celular

### Android con Chrome

1. Abre la URL HTTPS publicada en Chrome.
2. Elige **Instalar aplicación** en el menú ⋮ o usa el botón **Instalar** si aparece en la página.
3. Confirma y abre Brújula desde la pantalla de inicio.

### iPhone con Safari

1. Abre la URL HTTPS en **Safari**.
2. Toca **Compartir → Añadir a pantalla de inicio → Añadir**.
3. Abre Brújula desde el nuevo icono.

En iOS la instalación se inicia manualmente desde Safari; no se muestra el evento/botón de instalación de Chrome. El icono de inicio usa `apple-touch-icon.png`. El almacenamiento permanece en ese dispositivo y navegador; iOS puede administrar/eliminar almacenamiento del sitio, así que conserva una copia de los datos importantes. No hay sincronización ni respaldo remoto implementado.

## Uso rápido

- **Ingreso o gasto:** Inicio → **Agregar ingreso/gasto**, escribe el valor y elige categoría. Hay categorías como Internet, servicios, arriendo y mercado/comida. En Finanzas puedes filtrar el historial.
- **Meta:** Metas → **Crear una meta**; toca **＋** junto a ella para registrar un aporte. El progreso se actualiza automáticamente.
- **Tarea:** Inicio → **Nueva tarea** o Rutina → **Agregar tarea**. Toca el círculo para marcarla completa.
- **Hábito:** Hábitos → **Agregar un hábito**. Toca el círculo al completar el hábito del día.
- **Turno de Uber Envíos:** Uber → **Registrar turno**. Anota entregas y valores recibidos en efectivo, transferencia y en la app. Cada forma de pago queda separada.
- **Metas de Uber:** Uber → **Editar metas** para definir objetivos diarios, semanales y mensuales. El avance se calcula con los turnos registrados.

Los ingresos de Uber aparecen automáticamente como ingresos en Finanzas, el balance y el historial. No los registres otra vez manualmente para evitar duplicarlos. Puedes cambiar las metas iniciales en cualquier momento.

- **Calendario:** Calendario → toca cualquier día o cambia de mes. Los puntos señalan movimientos y días con hábitos/tareas completados; el resumen muestra la actividad de la fecha.
- **Racha:** Hábitos → la tarjeta de fuego cuenta los días seguidos con al menos un hábito o una tarea completados.
- **Reiniciar datos:** Hábitos → **Reiniciar todos los datos**. Confirma para borrar los registros de este navegador y comenzar de nuevo.

## Pruebas básicas de lógica

Con Node.js instalado, desde `outputs` ejecuta `node --test tests/finance.test.cjs`. Comprueba ingresos, gastos, balance, validación de montos, actualización de metas, inclusión de ingresos Uber en Finanzas y cálculo de rachas.
