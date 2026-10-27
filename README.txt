=====================================================================
 EducSex Villa Victoria
 Aplicación web educativa sobre salud sexual y reproductiva
 Villa Victoria, Estado de México
 Fecha de revisión de contenidos: 26 de octubre de 2026
=====================================================================

1. ARCHIVOS DEL PROYECTO
---------------------------------------------------------------------
  index.html   Estructura de la página (HTML5 semántico).
  estilos.css  Diseño visual (fondo oscuro, azul y verde neón).
  script.js    Funciones interactivas (JavaScript comentado).
  README.txt   Este documento.

  Bibliotecas cargadas por CDN (requieren internet):
  - Bootstrap 5.3.3 (diseño adaptable, menú, acordeones, ventana modal).
  - Font Awesome 6.5.2 (iconos).


2. CÓMO ABRIR EL PROYECTO EN VISUAL STUDIO CODE
---------------------------------------------------------------------
  1) Instala Visual Studio Code desde https://code.visualstudio.com
  2) Coloca los cuatro archivos en una misma carpeta.
  3) En VS Code: Archivo > Abrir carpeta... y elige esa carpeta.
  4) (Recomendado) Instala la extensión "Live Server" (de Ritwick Dey):
     Extensiones (Ctrl+Shift+X) > busca "Live Server" > Instalar.
  5) Haz clic derecho sobre index.html > "Open with Live Server".
     Se abrirá el navegador en una dirección como http://127.0.0.1:5500

  Alternativa sin extensiones: haz doble clic en index.html desde el
  explorador de archivos; se abrirá en tu navegador predeterminado.

  Necesitas conexión a internet para que carguen Bootstrap y los iconos.


3. CÓMO USAR LA APLICACIÓN
---------------------------------------------------------------------
  - Menú superior: lleva a cada sección y marca la sección actual.
    En celular se abre con el botón de tres líneas.
  - Inicio: botones "Explorar temas" y "Buscar orientación", y
    tarjetas que abren cada tema.
  - Salud sexual: buscador de temas y tarjetas con "Leer más"
    (contenido, recomendaciones y fuentes).
  - Mitos y realidades: botón "Revelar explicación".
  - Preguntas frecuentes: acordeones.
  - Recursos confiables: enlaces oficiales (Secretaría de Salud,
    CENSIDA, OMS, UNFPA, ISEM) y líneas de ayuda.
  - Directorio local: buscador, filtros por categoría, "Ver ubicación"
    (abre Google Maps en una pestaña nueva) y "Más información"
    (ventana con detalles).
  - EduSex AI: botón flotante abajo a la derecha. Escribe y pulsa
    Enter, o usa las preguntas rápidas. Esc cierra la ventana.
  - Examen: 10 preguntas, botones Anterior/Siguiente/Finalizar,
    resultados con explicaciones y opción de volver a intentarlo.
  - Orientación y contacto: formularios con validación.


4. FUNCIONES IMPLEMENTADAS
---------------------------------------------------------------------
  [x] Menú con indicador de sección (Bootstrap ScrollSpy) y pie de página.
  [x] 12 temas con icono, descripción, contenido, recomendaciones y fuentes.
  [x] Marcas "Requiere revisión" en temas que debe validar personal
      de salud o docente.
  [x] Buscador de temas y mitos con mensaje de "sin coincidencias".
  [x] 6 mitos con botón para revelar la explicación.
  [x] Preguntas frecuentes en acordeón.
  [x] Formularios de orientación y contacto con validaciones accesibles
      (texto + icono, no solo color).
  [x] Directorio con 16 registros, buscador, 7 filtros, mapa y detalles.
  [x] Asistente EduSex AI basado en palabras clave y respuestas preparadas.
  [x] Examen de 10 preguntas con progreso, aviso de pendientes,
      calificación, porcentaje, mensajes por rango y revisión.
  [x] Tabla de pruebas de usabilidad (22 pruebas).
  [x] Sección "Acerca del proyecto".
  [x] Foco visible, enlace "Saltar al contenido", ARIA, movimiento reducido.


5. ORIGEN DE LOS DATOS DEL DIRECTORIO
---------------------------------------------------------------------
  Nombres, localidades, institución y tipo de unidad provienen del
  Catálogo CLUES de la Secretaría de Salud (DGIS), archivo de cierre
  2019, unidades con estatus "EN OPERACIÓN" del municipio de Villa
  Victoria (clave 15-114):
  http://www.dgis.salud.gob.mx/contenidos/intercambio/clues_gobmx.html

  - Calles, horarios y teléfonos locales NO se encontraron en fuentes
    oficiales y aparecen como "Información pendiente de verificación".
  - El Sistema Municipal DIF incluye un apartado de Psicología según su
    Manual de Políticas y Procedimientos 2022-2024 (sitio del municipio).
  - Las categorías "Orientación para adolescentes" y "Organizaciones de
    apoyo juvenil" no tienen registros verificados; la página lo indica.
  - Las imágenes son ilustraciones generadas, no fotografías reales.
  - Pendiente: confirmar cada dato por teléfono o visita y actualizar
    el arreglo DIRECTORIO en script.js.


6. QUÉ REQUIERE SERVIDOR
---------------------------------------------------------------------
  - Envío real de formularios (hoy son demostrativos: validan pero no
    envían ni guardan nada).
  - Conectar EduSex AI a un servicio de IA externo. Debe hacerse desde
    un servidor propio; NUNCA colocar claves de API en script.js ni en
    ningún archivo que llegue al navegador.
  - Guardar resultados del examen (no se recomienda; hoy no se guardan).

  Privacidad: la aplicación no usa localStorage, sessionStorage ni
  cookies. La conversación del asistente y las respuestas del examen
  se borran al recargar o cerrar la página.


7. CÓMO EJECUTAR LAS PRUEBAS DE USABILIDAD
---------------------------------------------------------------------
  1) Abre la sección "Pruebas de usabilidad" de la página.
  2) Para cada fila, sigue el "Procedimiento" con personas usuarias
     reales (idealmente adolescentes del municipio, con consentimiento
     y supervisión adecuada).
  3) Anota lo que ocurrió en "Resultado obtenido" y cambia el estado a
     "Aprobada" o "Requiere corrección". Para editar la tabla, modifica
     el arreglo PRUEBAS y la función renderizarPruebas() en script.js
     (clases: estado-pendiente, estado-aprobada, estado-correccion).
  4) Herramientas sugeridas:
     - Teclado: recorrer con Tab / Shift+Tab / Enter / Espacio / Esc.
     - Lector de pantalla: NVDA (Windows), VoiceOver (Mac/iPhone),
       TalkBack (Android).
     - Contraste: Lighthouse en Chrome (F12 > Lighthouse > Accesibilidad).
     - Móvil: F12 > icono de dispositivo (Ctrl+Shift+M) > 360 px.
     - Consola: F12 > Console, verificar que no aparezcan errores.

  Nota: todas las pruebas están en "Pendiente" porque aún no se han
  ejecutado con usuarios. No se marcan como aprobadas sin ejecutarse.
  El equipo de desarrollo hizo una verificación técnica automatizada
  (carga sin errores de consola, buscador, filtros, chat, cálculo del
  examen y formularios), que no sustituye las pruebas con usuarios.


8. LIMITACIONES Y AVISOS
---------------------------------------------------------------------
  - Los contenidos se basan en fuentes oficiales, pero NO han sido
    revisados por personal de salud ni docentes.
  - La página no realiza diagnósticos ni sustituye la atención médica
    ni la orientación profesional.
  - Emergencias: 911. Línea de la Vida: 800 911 2000 (24 horas).
