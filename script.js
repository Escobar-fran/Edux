/* =========================================================
   EducSex Villa Victoria — script.js
   Organización:
   1. Utilidades
   2. Datos: temas, mitos, directorio, examen, pruebas
   3. Temas y buscador
   4. Mitos y realidades
   5. Directorio local
   6. Asistente EduSex AI
   7. Examen interactivo
   8. Formularios (demostrativos)
   9. Tabla de pruebas
   10. Inicialización
   Privacidad: este archivo NO usa localStorage, sessionStorage ni cookies.
   ========================================================= */

"use strict";

/* ---------- 1. Utilidades ---------- */

/** Quita acentos y pasa a minúsculas para comparar textos. */
function normalizar(texto) {
  return String(texto).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

/** Escapa texto escrito por la persona usuaria antes de mostrarlo en HTML. */
function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const PENDIENTE = "Información pendiente de verificación";

/* Fuentes oficiales reutilizables */
const F = {
  omsSalud: { nombre: "OMS — Salud sexual", url: "https://www.who.int/es/health-topics/sexual-health" },
  omsAdolescentes: { nombre: "OMS — Salud de los adolescentes", url: "https://www.who.int/es/news-room/fact-sheets/detail/adolescents-health-risks-and-solutions" },
  omsIts: { nombre: "OMS — Infecciones de transmisión sexual", url: "https://www.who.int/es/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)" },
  omsVih: { nombre: "OMS — VIH y sida", url: "https://www.who.int/es/news-room/fact-sheets/detail/hiv-aids" },
  omsAnticoncepcion: { nombre: "OMS — Planificación familiar y anticoncepción", url: "https://www.who.int/es/news-room/fact-sheets/detail/family-planning-contraception" },
  omsEmergencia: { nombre: "OMS — Anticoncepción de emergencia", url: "https://www.who.int/es/news-room/fact-sheets/detail/emergency-contraception" },
  omsEmbarazoAdol: { nombre: "OMS — Embarazo en la adolescencia", url: "https://www.who.int/es/news-room/fact-sheets/detail/adolescent-pregnancy" },
  omsViolencia: { nombre: "OMS — Violencia contra la mujer", url: "https://www.who.int/es/news-room/fact-sheets/detail/violence-against-women" },
  ssa: { nombre: "Secretaría de Salud", url: "https://www.gob.mx/salud" },
  censida: { nombre: "CENSIDA", url: "https://www.gob.mx/censida" },
  unfpa: { nombre: "UNFPA México", url: "https://mexico.unfpa.org/es" },
  isem: { nombre: "Instituto de Salud del Estado de México", url: "https://salud.edomex.gob.mx/isem/" }
};

/* ---------- 2. Datos ---------- */

/* Temas educativos. revision: true indica que requiere revisión de personal de salud o docente. */
const TEMAS = [
  {
    id: "tema-salud-sexual", icono: "fa-heart-pulse", titulo: "Salud sexual y reproductiva",
    descripcion: "Qué significa cuidar tu bienestar físico, emocional y social en la sexualidad.",
    contenido: "<p>La salud sexual es un estado de bienestar físico, emocional, mental y social relacionado con la sexualidad; no es solo la ausencia de enfermedades. Incluye vivir la sexualidad de forma segura, informada, sin coerción, discriminación ni violencia.</p><p>La salud reproductiva se refiere a poder decidir si tener hijas o hijos, cuándo y cuántos, con acceso a información y servicios.</p>",
    recomendaciones: ["Busca información en fuentes oficiales.", "Acude a revisiones en tu centro de salud.", "Habla con personas adultas de confianza o personal de salud."],
    fuentes: [F.omsSalud, F.unfpa], revision: true, palabras: "bienestar sexualidad reproductiva salud"
  },
  {
    id: "tema-pubertad", icono: "fa-seedling", titulo: "Pubertad",
    descripcion: "Cambios físicos que preparan al cuerpo para la etapa adulta.",
    contenido: "<p>La pubertad es una etapa en la que el cuerpo cambia por la acción de las hormonas. Puede incluir crecimiento rápido, aparición de vello, cambios en la piel (como acné), desarrollo de mamas, inicio de la menstruación, cambios en la voz, crecimiento de genitales y eyaculaciones nocturnas.</p><p>Comienza y avanza a ritmos distintos en cada persona. No hay una edad “correcta” exacta.</p>",
    recomendaciones: ["No te compares: cada cuerpo tiene su ritmo.", "Si algo te preocupa (dolor fuerte, cambios muy tempranos o tardíos), consulta a personal de salud."],
    fuentes: [F.omsAdolescentes, F.ssa], revision: true, palabras: "menstruacion regla vello acne voz crecimiento hormonas"
  },
  {
    id: "tema-adolescencia", icono: "fa-user-group", titulo: "Cambios durante la adolescencia",
    descripcion: "Emociones, identidad, amistades y nuevas responsabilidades.",
    contenido: "<p>Además de los cambios físicos, en la adolescencia cambian las emociones, la forma de pensar, los intereses y las relaciones. Es común sentir emociones intensas, buscar más independencia y preguntarse sobre la propia identidad.</p><p>La salud mental también es parte de la salud. Pedir ayuda es una muestra de cuidado, no de debilidad.</p>",
    recomendaciones: ["Identifica personas adultas de confianza.", "Si sientes tristeza o ansiedad persistente, busca apoyo. Línea de la Vida: 800 911 2000 (24 horas)."],
    fuentes: [F.omsAdolescentes], revision: true, palabras: "emociones identidad ansiedad tristeza salud mental"
  },
  {
    id: "tema-higiene", icono: "fa-soap", titulo: "Higiene íntima",
    descripcion: "Cuidados básicos y sencillos para la zona genital.",
    contenido: "<p>La higiene íntima diaria puede hacerse con agua y, si se desea, jabón suave en la parte externa. No es necesario usar duchas vaginales ni productos perfumados, porque pueden irritar.</p><p>Usar ropa interior limpia y cambiar toallas, tampones o copas menstruales con la frecuencia indicada ayuda a prevenir molestias.</p>",
    recomendaciones: ["Evita duchas vaginales y perfumes íntimos.", "Si hay comezón, ardor, mal olor o flujo diferente, consulta a personal de salud: no te automediques."],
    fuentes: [F.ssa], revision: true, palabras: "limpieza aseo genitales menstrual toalla flujo"
  },
  {
    id: "tema-consentimiento", icono: "fa-handshake", titulo: "Consentimiento",
    descripcion: "Una decisión libre, informada, voluntaria y que se puede retirar.",
    contenido: "<p>El consentimiento es un acuerdo <strong>libre, informado, voluntario y entusiasta</strong> para participar en una actividad. Se puede retirar en cualquier momento.</p><p>No hay consentimiento si hay presión, amenazas, chantaje, engaño, o si la persona está dormida o bajo efectos de alcohol o drogas. El silencio no significa “sí”.</p>",
    recomendaciones: ["Pregunta y respeta la respuesta.", "Decir “no” o cambiar de opinión es válido.", "Si alguien te obligó o presionó, no es tu culpa: busca ayuda."],
    fuentes: [F.omsSalud, F.unfpa], revision: true, palabras: "permiso presion acuerdo decir no obligar"
  },
  {
    id: "tema-relaciones", icono: "fa-heart", titulo: "Relaciones respetuosas",
    descripcion: "Respeto, comunicación, confianza y límites personales.",
    contenido: "<p>Una relación saludable (de amistad o noviazgo) se basa en el respeto, la comunicación, la confianza, la igualdad y el cuidado mutuo. Cada persona conserva sus amistades, sus decisiones y su privacidad.</p><p>Los celos excesivos, el control del celular, las prohibiciones o las burlas no son muestras de amor.</p>",
    recomendaciones: ["Expresa tus límites con claridad.", "Observa si te sientes libre y en calma en tu relación.", "Si sientes miedo, busca apoyo."],
    fuentes: [F.omsViolencia, F.unfpa], revision: true, palabras: "noviazgo pareja amistad celos comunicacion respeto"
  },
  {
    id: "tema-its", icono: "fa-shield-virus", titulo: "Prevención de infecciones de transmisión sexual",
    descripcion: "Cómo reducir riesgos y cuándo hacerse pruebas.",
    contenido: "<p>Las infecciones de transmisión sexual (ITS), como VIH, virus del papiloma humano (VPH), clamidia, gonorrea, sífilis o herpes, se transmiten principalmente por contacto sexual. <strong>Muchas no presentan síntomas</strong>, por eso las pruebas son importantes.</p><p>El uso correcto y constante del condón reduce mucho el riesgo. Existen vacunas para algunas, como el VPH y la hepatitis B. Varias ITS tienen tratamiento y otras pueden controlarse.</p>",
    recomendaciones: ["Usa condón en cada relación sexual.", "Pregunta en tu centro de salud por pruebas y vacunas.", "No te automediques ni compartas medicamentos."],
    fuentes: [F.omsIts, F.omsVih, F.censida], revision: true, palabras: "its ets vih sida vph herpes sifilis clamidia gonorrea condon prueba vacuna"
  },
  {
    id: "tema-anticonceptivos", icono: "fa-pills", titulo: "Métodos anticonceptivos",
    descripcion: "Opciones para prevenir el embarazo y cuáles protegen de ITS.",
    contenido: "<p>Hay métodos de barrera (condón externo e interno), hormonales (pastillas, inyecciones, parche, implante subdérmico), dispositivo intrauterino (DIU) y métodos permanentes. Los métodos de larga duración, como el implante o el DIU, son muy eficaces.</p><p><strong>Solo el condón ayuda a prevenir embarazo e ITS a la vez.</strong> La anticoncepción de emergencia puede usarse después de una relación sin protección o si falló un método; funciona mejor mientras antes se tome, no es un método de uso regular y no protege de ITS.</p>",
    recomendaciones: ["Elige el método con orientación de personal de salud.", "Usa “doble protección”: condón + otro método.", "El coito interrumpido no es un método confiable."],
    fuentes: [F.omsAnticoncepcion, F.omsEmergencia, F.ssa], revision: true, palabras: "condon pastilla implante diu inyeccion emergencia anticonceptivo metodo"
  },
  {
    id: "tema-embarazo", icono: "fa-baby", titulo: "Prevención del embarazo no planificado",
    descripcion: "Decidir con información si y cuándo tener hijas o hijos.",
    contenido: "<p>El embarazo en la adolescencia puede tener riesgos para la salud y afectar estudios y proyectos de vida. Prevenirlo implica tener información, acceso a métodos anticonceptivos y poder decidir sin presiones.</p><p>Puede haber embarazo desde la primera relación sexual con penetración vaginal sin protección.</p>",
    recomendaciones: ["Conoce y usa métodos anticonceptivos con orientación profesional.", "Si crees que puedes estar embarazada, acude pronto a un servicio de salud."],
    fuentes: [F.omsEmbarazoAdol, F.unfpa], revision: true, palabras: "embarazo adolescente prevencion plan de vida"
  },
  {
    id: "tema-mitos", icono: "fa-lightbulb", titulo: "Mitos y realidades",
    descripcion: "Creencias falsas comunes y lo que dicen las fuentes de salud.",
    contenido: "<p>Muchas ideas que circulan entre amistades o en redes sociales no son ciertas. Revisa la sección <a href=\"#mitos\">Mitos y realidades</a> para conocer las más comunes y su explicación.</p>",
    recomendaciones: ["Verifica antes de compartir.", "Prefiere fuentes oficiales con fecha y autor."],
    fuentes: [F.omsSalud], revision: false, palabras: "mito creencia falso verdad"
  },
  {
    id: "tema-derechos", icono: "fa-scale-balanced", titulo: "Derechos sexuales y reproductivos",
    descripcion: "Lo que te corresponde por ser persona: información, decisión y respeto.",
    contenido: "<p>Las y los adolescentes tienen derecho a recibir información científica y educación sexual integral, a decidir sobre su cuerpo, a vivir libres de violencia y discriminación, a la privacidad y a acceder a servicios de salud amigables y confidenciales.</p>",
    recomendaciones: ["Conoce tus derechos y los de las demás personas.", "Si un servicio te niega información, puedes acudir a otra unidad o a instancias oficiales."],
    fuentes: [F.unfpa, F.omsSalud], revision: true, palabras: "derecho privacidad confidencial decidir educacion"
  },
  {
    id: "tema-violencia", icono: "fa-hand", titulo: "Prevención de la violencia",
    descripcion: "Reconocer señales de violencia y saber dónde pedir ayuda.",
    contenido: "<p>La violencia puede ser física, psicológica, sexual, económica o digital (por ejemplo, difundir fotos íntimas sin permiso). Algunas señales: control, aislamiento, amenazas, humillaciones, golpes o presión sexual.</p><p>Nunca es culpa de quien la vive. Existen servicios que pueden orientarte y protegerte.</p>",
    recomendaciones: ["En peligro inmediato llama al 911.", "Habla con una persona adulta de confianza.", "Guarda evidencias si es seguro hacerlo."],
    fuentes: [F.omsViolencia, F.unfpa], revision: true, palabras: "violencia abuso acoso golpes maltrato control digital sexting"
  }
];

/* Mitos y realidades */
const MITOS = [
  { mito: "En la primera relación sexual no hay embarazo.", realidad: "Sí puede haber embarazo desde la primera relación con penetración vaginal sin protección.", fuente: F.omsEmbarazoAdol },
  { mito: "Si una persona se ve sana, no tiene ITS.", realidad: "Muchas ITS no tienen síntomas visibles. Solo las pruebas indicadas por personal de salud pueden confirmarlo.", fuente: F.omsIts },
  { mito: "Usar dos condones a la vez protege más.", realidad: "No. La fricción entre ellos puede romperlos. Se usa un solo condón, nuevo, en cada relación.", fuente: F.omsAnticoncepcion },
  { mito: "Los celos son una prueba de amor.", realidad: "Los celos excesivos y el control son señales de una relación no saludable y pueden ser violencia.", fuente: F.omsViolencia },
  { mito: "Si ya dijiste que sí, no puedes cambiar de opinión.", realidad: "El consentimiento se puede retirar en cualquier momento.", fuente: F.omsSalud },
  { mito: "La pastilla de emergencia sirve como método regular.", realidad: "Es para situaciones de emergencia. No sustituye un método regular y no protege de ITS.", fuente: F.omsEmergencia }
];

/* Categorías del directorio */
const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "centros", nombre: "Centros de salud" },
  { id: "hospitales", nombre: "Hospitales y unidades médicas" },
  { id: "adolescentes", nombre: "Orientación para adolescentes" },
  { id: "psicologico", nombre: "Apoyo psicológico" },
  { id: "violencia", nombre: "Atención a la violencia" },
  { id: "juvenil", nombre: "Organizaciones de apoyo juvenil" }
];

/* Directorio local.
   Fuente principal: Catálogo CLUES, Secretaría de Salud (DGIS), cierre 2019, unidades "EN OPERACIÓN"
   del municipio de Villa Victoria (clave 15-114). Los datos no localizados en fuentes oficiales se marcan como PENDIENTE.
   tipo: "lugar" (tiene ubicación física) o "telefono" (servicio telefónico nacional). */
const FUENTE_CLUES = "Catálogo CLUES de la Secretaría de Salud (cierre 2019). Confirma que la unidad siga en operación.";
const DIRECTORIO = [
  {
    id: "hosp-gvb", tipo: "lugar", categoria: "hospitales",
    nombre: "Hospital Guadalupe Victoria Bicentenario",
    institucion: "Secretaría de Salud (servicios de salud pública)", clues: "MCSSA008320",
    localidad: "Villa Victoria", direccion: PENDIENTE,
    servicios: "Registrado en CLUES como hospital integral (comunitario), de hospitalización. Servicios específicos para adolescentes: " + PENDIENTE + ".",
    horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES
  },
  {
    id: "umf-243", tipo: "lugar", categoria: "hospitales",
    nombre: "Unidad de Medicina Familiar 243 Villa Victoria (IMSS)",
    institucion: "Instituto Mexicano del Seguro Social", clues: "MCIMS000932",
    localidad: "Villa Victoria", direccion: PENDIENTE,
    nota: "Referencia no oficial: Vialidad Lázaro Cárdenas s/n, Col. Jesús María, C.P. 50960. Confírmala en el directorio del IMSS.",
    servicios: "Registrada en CLUES como unidad de medicina familiar (consulta externa). Las UMF del IMSS atienden principalmente a personas derechohabientes; confirma requisitos.",
    horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES
  },
  {
    id: "cce-vv", tipo: "lugar", categoria: "hospitales",
    nombre: "Clínica de Consulta Externa Villa Victoria",
    institucion: "Servicios médicos estatales (según CLUES)", clues: "MCSME001365",
    localidad: "Villa Victoria", direccion: PENDIENTE,
    servicios: "Registrada en CLUES como unidad de consulta externa. Población que atiende y servicios: " + PENDIENTE + ".",
    horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES
  },
  {
    id: "umr-gavia", tipo: "lugar", categoria: "hospitales",
    nombre: "Unidad Médica Rural San Luis (IMSS-Bienestar)",
    institucion: "IMSS Régimen Bienestar", clues: "MCIMO000204",
    localidad: "San Luis La Gavia", direccion: PENDIENTE,
    servicios: "Registrada en CLUES como unidad médica rural de consulta externa.",
    horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES
  },
  {
    id: "umr-loma", tipo: "lugar", categoria: "hospitales",
    nombre: "Unidad Médica Rural Loma de San José (IMSS-Bienestar)",
    institucion: "IMSS Régimen Bienestar", clues: "MCIMO000233",
    localidad: "Loma de San José", direccion: PENDIENTE,
    servicios: "Registrada en CLUES como unidad médica rural de consulta externa.",
    horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES
  },
  { id: "cs-palizada", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud Palizada", institucion: "Secretaría de Salud", clues: "MCSSA008390", localidad: "Palizada", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  { id: "cs-suchitepec", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud San Diego Suchitepec", institucion: "Secretaría de Salud", clues: "MCSSA008426", localidad: "San Diego Suchitepec", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  { id: "cs-altamirano", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud San Agustín Altamirano", institucion: "Secretaría de Salud", clues: "MCSSA008501", localidad: "San Agustín Altamirano Primera Sección", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  { id: "cs-sanmarcos", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud San Marcos de la Loma", institucion: "Secretaría de Salud", clues: "MCSSA008443", localidad: "San Marcos de la Loma", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  { id: "cs-santiago", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud Santiago del Monte", institucion: "Secretaría de Salud", clues: "MCSSA008455", localidad: "Santiago del Monte", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  { id: "cs-casas", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud Casas Coloradas", institucion: "Secretaría de Salud", clues: "MCSSA008332", localidad: "Casas Coloradas", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  { id: "cs-turcio", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud Turcio", institucion: "Secretaría de Salud", clues: "MCSSA008472", localidad: "Turcio Segunda Sección", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  { id: "cs-capulin", tipo: "lugar", categoria: "centros", nombre: "Centro de Salud El Capulín", institucion: "Secretaría de Salud", clues: "MCSSA016930", localidad: "El Capulín", direccion: PENDIENTE, servicios: "Registrado en CLUES como unidad rural de consulta externa (2 núcleos básicos).", horario: PENDIENTE, telefono: PENDIENTE, fuente: FUENTE_CLUES },
  {
    id: "dif-vv", tipo: "lugar", categoria: "psicologico",
    nombre: "Sistema Municipal DIF Villa Victoria",
    institucion: "Sistema para el Desarrollo Integral de la Familia (municipal)", clues: "MCDIF000391",
    localidad: "Villa Victoria", direccion: PENDIENTE,
    servicios: "Registrado en CLUES como establecimiento de asistencia social. Su Manual de Políticas y Procedimientos 2022-2024 (publicado en villavictoria.edomex.gob.mx) incluye un apartado de Psicología. Requisitos y disponibilidad actual: " + PENDIENTE + ".",
    horario: PENDIENTE, telefono: PENDIENTE,
    fuente: "CLUES 2019 y Manual de Políticas y Procedimientos del SMDIF Villa Victoria 2022-2024."
  },
  {
    id: "linea-vida", tipo: "telefono", categoria: "psicologico",
    nombre: "Línea de la Vida (servicio telefónico nacional)",
    institucion: "Secretaría de Salud — Comisión Nacional de Salud Mental y Adicciones",
    localidad: "Nacional (atiende también a Villa Victoria)", direccion: "No aplica: servicio telefónico",
    servicios: "Orientación telefónica en salud mental, crisis emocionales, consumo de sustancias e ideación suicida; puede canalizar a servicios especializados.",
    horario: "24 horas, todos los días", telefono: "800 911 2000",
    fuente: "Secretaría de Salud (difusión oficial de la Línea de la Vida)."
  },
  {
    id: "emergencias-911", tipo: "telefono", categoria: "violencia",
    nombre: "Número de emergencias 911",
    institucion: "Sistema Nacional de Atención de Llamadas de Emergencia",
    localidad: "Nacional (atiende también a Villa Victoria)", direccion: "No aplica: servicio telefónico",
    servicios: "Atención de emergencias, incluidas situaciones de violencia o riesgo inmediato.",
    horario: "24 horas, todos los días", telefono: "911",
    fuente: "Número único de emergencias en México."
  }
];

/* Preguntas del examen (respuesta = índice de la opción correcta) */
const PREGUNTAS = [
  { tema: "Consentimiento", texto: "¿Qué significa el consentimiento?",
    opciones: ["Aceptar por presión.", "Una decisión libre, informada y voluntaria.", "Hacer siempre lo que otra persona pide.", "No poder cambiar de opinión."],
    respuesta: 1, explicacion: "El consentimiento es libre, informado y voluntario, y se puede retirar en cualquier momento." },
  { tema: "Fuentes confiables", texto: "¿Dónde es recomendable consultar información sobre salud?",
    opciones: ["Publicaciones sin verificar.", "Únicamente con amigos.", "Fuentes sanitarias oficiales y profesionales.", "Mensajes anónimos sin referencias."],
    respuesta: 2, explicacion: "Las fuentes oficiales (Secretaría de Salud, OMS, CENSIDA, UNFPA) y el personal de salud ofrecen información verificada." },
  { tema: "Relaciones saludables", texto: "¿Qué caracteriza una relación saludable?",
    opciones: ["Control constante.", "Presión.", "Respeto, comunicación y límites personales.", "Prohibir amistades."],
    respuesta: 2, explicacion: "El respeto, la comunicación y los límites son la base; el control y la presión son señales de alerta." },
  { tema: "Salud sexual", texto: "¿Qué hacer ante una duda médica?",
    opciones: ["Confiar en cualquier consejo de internet.", "Ignorar síntomas.", "Consultar personal de salud capacitado.", "Seguir recomendaciones sin verificar."],
    respuesta: 2, explicacion: "Solo el personal de salud puede valorar síntomas y dar indicaciones adecuadas." },
  { tema: "Prevención de infecciones", texto: "¿Qué afirmación sobre las infecciones de transmisión sexual es correcta?",
    opciones: ["Todas se identifican solo por apariencia.", "Algunas pueden no presentar síntomas.", "Nunca requieren atención.", "No hay formas de reducir el riesgo."],
    respuesta: 1, explicacion: "Muchas ITS no tienen síntomas; por eso existen las pruebas. El condón reduce el riesgo." },
  { tema: "Anticonceptivos", texto: "¿Qué método ayuda a prevenir tanto el embarazo como las infecciones de transmisión sexual?",
    opciones: ["Pastillas anticonceptivas.", "Implante subdérmico.", "Condón usado correctamente en cada relación.", "Coito interrumpido."],
    respuesta: 2, explicacion: "Según la OMS, el condón es el método que ofrece doble protección: embarazo e ITS. Los métodos hormonales no protegen de ITS." },
  { tema: "Adolescencia", texto: "¿Cuál afirmación sobre la pubertad es correcta?",
    opciones: ["Ocurre igual y a la misma edad en todas las personas.", "Es una enfermedad que requiere tratamiento.", "Es una etapa de cambios físicos y emocionales que avanza a ritmos distintos en cada persona.", "Solo implica cambios emocionales."],
    respuesta: 2, explicacion: "La pubertad es una etapa normal del desarrollo; su inicio y ritmo varían entre personas." },
  { tema: "Derechos sexuales", texto: "¿Cuál es un derecho sexual y reproductivo de las y los adolescentes?",
    opciones: ["Recibir información científica y servicios de salud con respeto y confidencialidad.", "Solo recibir información cuando cumplan 21 años.", "Que otras personas decidan sobre su cuerpo.", "Ser atendidos solo si nadie se entera de su duda."],
    respuesta: 0, explicacion: "Las y los adolescentes tienen derecho a información y servicios de salud de calidad, con privacidad y sin discriminación." },
  { tema: "Prevención de violencia", texto: "¿Cuál de estas conductas es una señal de violencia en el noviazgo?",
    opciones: ["Respetar las decisiones de la otra persona.", "Revisar el celular sin permiso y controlar con quién hablas.", "Platicar sobre lo que les molesta.", "Pasar tiempo con sus propias amistades."],
    respuesta: 1, explicacion: "El control y la vigilancia son formas de violencia psicológica o digital. Ante peligro, llama al 911." },
  { tema: "Lugares de orientación", texto: "En Villa Victoria, ¿dónde puedes solicitar información y atención sobre salud sexual?",
    opciones: ["En redes sociales anónimas.", "En un centro de salud o unidad médica pública.", "En ningún lugar, debo resolverlo sola o solo.", "Solo con personas desconocidas en internet."],
    respuesta: 1, explicacion: "Los centros de salud y unidades médicas públicas son lugares adecuados para pedir orientación. Consulta el directorio local." }
];

/* Plan de pruebas de usabilidad. Todas inician como "Pendiente": no se inventan resultados. */
const PRUEBAS = [
  ["Menú de navegación", "Pulsar cada opción del menú en computadora y celular.", "Lleva a la sección correcta y marca la opción activa."],
  ["Enlaces internos", "Pulsar “Explorar temas”, “Buscar orientación” y tarjetas de inicio.", "Desplaza a la sección o tema indicado."],
  ["Buscador de temas", "Escribir “condón” y luego “xyz”.", "Filtra tarjetas; con “xyz” muestra mensaje de sin coincidencias."],
  ["Formularios", "Enviar vacíos, con correo inválido y con datos válidos.", "Muestra errores con texto e icono; con datos válidos aclara que es demostrativo."],
  ["Acordeones y mitos", "Abrir y cerrar preguntas frecuentes; revelar mitos.", "Se expanden/colapsan y actualizan aria-expanded."],
  ["Contraste", "Revisar textos y botones con un verificador de contraste (WCAG AA).", "Relación de contraste mínima 4.5:1 en texto normal."],
  ["Navegación por teclado", "Recorrer la página solo con Tab, Shift+Tab, Enter y Espacio.", "Todo es alcanzable y el foco es visible."],
  ["Lector de pantalla", "Recorrer con NVDA, VoiceOver o TalkBack.", "Se anuncian títulos, etiquetas, estados y mensajes."],
  ["Diseño móvil", "Abrir en celular (360 px) y tableta.", "Sin desplazamiento horizontal; menú colapsable funcional."],
  ["Directorio: tarjetas e imágenes", "Revisar tarjetas; bloquear una imagen para probar respaldo.", "Muestra datos, texto alternativo e imagen de respaldo."],
  ["Directorio: filtros y buscador", "Filtrar por categoría y buscar “Palizada”.", "Filtra sin recargar; muestra aviso si no hay resultados."],
  ["Directorio: mapas", "Pulsar “Ver ubicación” en varias tarjetas.", "Abre una búsqueda del establecimiento en un mapa en pestaña nueva."],
  ["Directorio: verificación de datos", "Comparar datos con fuentes oficiales o por llamada.", "Datos confirmados; los no confirmados dicen “pendiente de verificación”."],
  ["Asistente: preguntas sugeridas", "Pulsar cada pregunta rápida.", "Responde según la categoría."],
  ["Asistente: envío de mensajes", "Escribir una pregunta y pulsar Enter.", "Se muestra el mensaje y la respuesta."],
  ["Asistente: servicios locales", "Preguntar “¿dónde hay un centro de salud?”.", "Muestra tarjetas pertinentes del directorio."],
  ["Asistente: cierre y móvil", "Cerrar con el botón y con Esc; abrir en celular.", "Se cierra y regresa el foco; ocupa la pantalla en celular."],
  ["Asistente: privacidad", "Recargar la página tras conversar; revisar almacenamiento del navegador.", "La conversación no se conserva ni se guarda."],
  ["Examen: preguntas pendientes", "Finalizar dejando preguntas sin contestar.", "Avisa cuáles faltan y permite volver a ellas."],
  ["Examen: cálculo de puntuación", "Contestar con un número conocido de aciertos.", "Porcentaje y calificación correctos; cambiar respuesta no cuenta doble."],
  ["Examen: revisión y mensajes", "Revisar resultados en los 4 rangos.", "Muestra mensaje correcto y explicación de preguntas falladas."],
  ["Examen: repetir intento", "Pulsar “Volver a intentarlo”.", "El examen inicia desde cero."]
];

/* ---------- 3. Temas y buscador ---------- */

function renderizarTemas() {
  const contenedor = document.getElementById("contenedorTemas");
  contenedor.innerHTML = TEMAS.map((tema) => {
    const idDetalle = tema.id + "-detalle";
    const fuentes = tema.fuentes.map((f) =>
      `<li><a href="${f.url}" target="_blank" rel="noopener noreferrer">${f.nombre}<span class="visually-hidden"> (abre en pestaña nueva)</span></a></li>`).join("");
    const recomendaciones = tema.recomendaciones.map((r) => `<li>${r}</li>`).join("");
    const insignia = tema.revision
      ? `<span class="badge insignia-revision"><i class="fa-solid fa-user-doctor" aria-hidden="true"></i> Requiere revisión</span>` : "";
    return `
      <div class="col-md-6 col-lg-4 tema-item">
        <article class="tarjeta-neon tarjeta-tema h-100" id="${tema.id}" aria-labelledby="${tema.id}-titulo">
          <div class="d-flex align-items-center gap-3 mb-2">
            <span class="icono-tema" aria-hidden="true"><i class="fa-solid ${tema.icono}"></i></span>
            <h3 id="${tema.id}-titulo">${tema.titulo}</h3>
          </div>
          ${insignia}
          <p class="mt-2">${tema.descripcion}</p>
          <button type="button" class="btn btn-sm btn-neon-azul btn-leer-mas" aria-expanded="false" aria-controls="${idDetalle}">
            <i class="fa-solid fa-plus" aria-hidden="true"></i> Leer más<span class="visually-hidden"> sobre ${tema.titulo}</span>
          </button>
          <div class="detalle-tema" id="${idDetalle}" hidden>
            ${tema.contenido}
            <h4>Recomendaciones responsables</h4>
            <ul>${recomendaciones}</ul>
            <h4>Fuentes de información</h4>
            <ul class="fuentes-tema">${fuentes}</ul>
          </div>
        </article>
      </div>`;
  }).join("");

  // Botones "Leer más" / "Ver menos"
  contenedor.querySelectorAll(".btn-leer-mas").forEach((boton) => {
    boton.addEventListener("click", () => alternarDetalle(boton));
  });
}

function alternarDetalle(boton, forzarAbrir = false) {
  const detalle = document.getElementById(boton.getAttribute("aria-controls"));
  const abrir = forzarAbrir || boton.getAttribute("aria-expanded") !== "true";
  detalle.hidden = !abrir;
  boton.setAttribute("aria-expanded", String(abrir));
  const titulo = boton.querySelector(".visually-hidden").outerHTML;
  boton.innerHTML = abrir
    ? `<i class="fa-solid fa-minus" aria-hidden="true"></i> Ver menos${titulo}`
    : `<i class="fa-solid fa-plus" aria-hidden="true"></i> Leer más${titulo}`;
}

/** Filtra tarjetas de temas y de mitos según las palabras escritas. */
function filtrarTemas() {
  const consulta = normalizar(document.getElementById("campoBusqueda").value);
  const estado = document.getElementById("estadoBusqueda");
  const estadoMitos = document.getElementById("estadoMitos");
  let visiblesTemas = 0;
  let visiblesMitos = 0;

  document.querySelectorAll("#contenedorTemas .tema-item").forEach((item, i) => {
    const t = TEMAS[i];
    const texto = normalizar([t.titulo, t.descripcion, t.contenido, t.palabras, t.recomendaciones.join(" ")].join(" "));
    const coincide = !consulta || consulta.split(/\s+/).every((p) => texto.includes(p));
    item.hidden = !coincide;
    if (coincide) visiblesTemas++;
  });

  document.querySelectorAll("#contenedorMitos .mito-item").forEach((item, i) => {
    const texto = normalizar(MITOS[i].mito + " " + MITOS[i].realidad);
    const coincide = !consulta || consulta.split(/\s+/).every((p) => texto.includes(p));
    item.hidden = !coincide;
    if (coincide) visiblesMitos++;
  });

  if (!consulta) {
    estado.textContent = "";
    estadoMitos.textContent = "";
  } else if (visiblesTemas + visiblesMitos === 0) {
    estado.textContent = `No encontramos coincidencias para “${document.getElementById("campoBusqueda").value}”. Prueba con otra palabra o consulta al asistente EduSex AI.`;
    estadoMitos.textContent = "Ningún mito coincide con la búsqueda.";
  } else {
    estado.textContent = `Se encontraron ${visiblesTemas} tema(s) y ${visiblesMitos} mito(s).`;
    estadoMitos.textContent = visiblesMitos === 0 ? "Ningún mito coincide con la búsqueda." : "";
  }
}

/* ---------- 4. Mitos y realidades ---------- */

function renderizarMitos() {
  const contenedor = document.getElementById("contenedorMitos");
  contenedor.innerHTML = MITOS.map((m, i) => `
    <div class="col-md-6 col-lg-4 mito-item">
      <article class="tarjeta-neon tarjeta-mito h-100">
        <span class="etiqueta-mito">MITO</span>
        <p class="fw-semibold mt-2">${m.mito}</p>
        <button type="button" class="btn btn-sm btn-neon-verde" aria-expanded="false" aria-controls="realidad-${i}">
          <i class="fa-solid fa-eye" aria-hidden="true"></i> Revelar explicación
        </button>
        <div class="realidad" id="realidad-${i}" hidden>
          <span class="etiqueta-realidad">REALIDAD</span>
          <p class="mb-1 mt-2">${m.realidad}</p>
          <p class="small mb-0">Fuente: <a href="${m.fuente.url}" target="_blank" rel="noopener noreferrer">${m.fuente.nombre}</a></p>
        </div>
      </article>
    </div>`).join("");

  contenedor.querySelectorAll("button[aria-controls]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const panel = document.getElementById(boton.getAttribute("aria-controls"));
      const abrir = panel.hidden;
      panel.hidden = !abrir;
      boton.setAttribute("aria-expanded", String(abrir));
      boton.innerHTML = abrir
        ? '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i> Ocultar explicación'
        : '<i class="fa-solid fa-eye" aria-hidden="true"></i> Revelar explicación';
    });
  });
}

/* ---------- 5. Directorio local ---------- */

let categoriaActiva = "todos";

/** Ilustraciones SVG por categoría (no son fotografías de los establecimientos). */
function ilustracion(categoria) {
  const colores = {
    centros: ["#22d3ff", "#0d1424"], hospitales: ["#3dff9a", "#0d1424"],
    psicologico: ["#b98cff", "#0d1424"], violencia: ["#ff6b9d", "#0d1424"],
    adolescentes: ["#ffc83c", "#0d1424"], juvenil: ["#ffc83c", "#0d1424"]
  };
  const [c1, c2] = colores[categoria] || ["#22d3ff", "#0d1424"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="#1a2540"/></linearGradient></defs>
    <rect width="400" height="160" fill="url(#g)"/>
    <rect x="150" y="45" width="100" height="80" rx="8" fill="none" stroke="${c1}" stroke-width="5"/>
    <rect x="190" y="60" width="20" height="50" fill="${c1}"/><rect x="175" y="75" width="50" height="20" fill="${c1}"/>
    <circle cx="70" cy="40" r="18" fill="${c1}" opacity=".25"/><circle cx="340" cy="120" r="26" fill="${c1}" opacity=".2"/>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const IMAGEN_RESPALDO = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160"><rect width="400" height="160" fill="#1a2540"/><text x="200" y="88" font-family="sans-serif" font-size="18" fill="#b9c4d8" text-anchor="middle">Imagen no disponible</text></svg>');

function nombreCategoria(id) {
  const c = CATEGORIAS.find((x) => x.id === id);
  return c ? c.nombre : id;
}

function urlMapa(lugar) {
  const q = `${lugar.nombre}, ${lugar.localidad}, Villa Victoria, Estado de México`;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}

function textoDato(valor) {
  return valor === PENDIENTE ? `<span class="pendiente">${PENDIENTE}</span>` : escaparHTML(valor);
}

function enlaceTelefono(lugar) {
  if (lugar.telefono === PENDIENTE) return textoDato(PENDIENTE);
  return `<a href="tel:${lugar.telefono.replace(/\s/g, "")}">${lugar.telefono}</a>`;
}

/** Crea el HTML de una tarjeta del directorio. compacta = versión para el chat. */
function tarjetaLugar(lugar) {
  const botonUbicacion = lugar.tipo === "lugar"
    ? `<a class="btn btn-sm btn-neon-azul" href="${urlMapa(lugar)}" target="_blank" rel="noopener noreferrer">
         <i class="fa-solid fa-map-pin" aria-hidden="true"></i> Ver ubicación<span class="visually-hidden"> de ${lugar.nombre} (abre mapa en pestaña nueva)</span></a>`
    : `<a class="btn btn-sm btn-neon-azul" href="tel:${lugar.telefono.replace(/\s/g, "")}">
         <i class="fa-solid fa-phone" aria-hidden="true"></i> Llamar<span class="visually-hidden"> a ${lugar.nombre}</span></a>`;
  return `
    <div class="col-md-6 col-lg-4">
      <article class="tarjeta-neon tarjeta-lugar">
        <figure>
          <img src="${ilustracion(lugar.categoria)}" alt="Ilustración genérica de ${nombreCategoria(lugar.categoria).toLowerCase()}; no es una fotografía de ${lugar.nombre}" loading="lazy" onerror="this.onerror=null;this.src=IMAGEN_RESPALDO;">
          <figcaption>Ilustración, no fotografía</figcaption>
        </figure>
        <div class="cuerpo-lugar">
          <span class="categoria-lugar">${nombreCategoria(lugar.categoria)}</span>
          <h3>${lugar.nombre}</h3>
          <p class="dato-lugar"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> <strong>Localidad:</strong> ${escaparHTML(lugar.localidad)}</p>
          <p class="dato-lugar"><i class="fa-solid fa-road" aria-hidden="true"></i> <strong>Dirección:</strong> ${textoDato(lugar.direccion)}</p>
          <p class="dato-lugar"><i class="fa-solid fa-stethoscope" aria-hidden="true"></i> ${escaparHTML(lugar.servicios)}</p>
          <p class="dato-lugar"><i class="fa-solid fa-clock" aria-hidden="true"></i> <strong>Horario:</strong> ${textoDato(lugar.horario)}</p>
          <p class="dato-lugar"><i class="fa-solid fa-phone" aria-hidden="true"></i> <strong>Teléfono:</strong> ${enlaceTelefono(lugar)}</p>
          <div class="acciones-lugar">
            ${botonUbicacion}
            <button type="button" class="btn btn-sm btn-outline-light btn-mas-info" data-id="${lugar.id}">
              <i class="fa-solid fa-circle-info" aria-hidden="true"></i> Más información<span class="visually-hidden"> sobre ${lugar.nombre}</span>
            </button>
          </div>
        </div>
      </article>
    </div>`;
}

function renderizarFiltros() {
  const contenedor = document.getElementById("filtrosDirectorio");
  contenedor.innerHTML = CATEGORIAS.map((c) =>
    `<button type="button" class="btn btn-filtro" data-categoria="${c.id}" aria-pressed="${c.id === categoriaActiva}">${c.nombre}</button>`).join("");
  contenedor.querySelectorAll(".btn-filtro").forEach((b) => {
    b.addEventListener("click", () => {
      categoriaActiva = b.dataset.categoria;
      contenedor.querySelectorAll(".btn-filtro").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      renderizarDirectorio();
    });
  });
}

function renderizarDirectorio() {
  const consulta = normalizar(document.getElementById("buscadorDirectorio").value);
  const contenedor = document.getElementById("contenedorDirectorio");
  const estado = document.getElementById("estadoDirectorio");

  const resultados = DIRECTORIO.filter((l) => {
    const enCategoria = categoriaActiva === "todos" || l.categoria === categoriaActiva;
    const texto = normalizar([l.nombre, nombreCategoria(l.categoria), l.localidad, l.institucion, l.servicios].join(" "));
    return enCategoria && (!consulta || consulta.split(/\s+/).every((p) => texto.includes(p)));
  });

  if (resultados.length === 0) {
    const sinRegistros = !consulta && categoriaActiva !== "todos";
    contenedor.innerHTML = `
      <div class="col-12"><div class="categoria-vacia">
        <p class="fw-bold mb-1"><i class="fa-solid fa-circle-info" aria-hidden="true"></i>
          ${sinRegistros ? "Aún no hay lugares verificados en esta categoría." : "No hay lugares que coincidan con tu búsqueda."}</p>
        <p class="mb-0">${sinRegistros
          ? "No encontramos en fuentes oficiales un servicio de esta categoría con datos comprobables en Villa Victoria. Puedes preguntar en tu centro de salud más cercano o consultar los recursos oficiales."
          : "Prueba con otra palabra (por ejemplo, el nombre de tu localidad) o elige “Todos”."}</p>
      </div></div>`;
    estado.textContent = sinRegistros ? "0 lugares verificados en esta categoría." : "Sin coincidencias.";
  } else {
    contenedor.innerHTML = resultados.map(tarjetaLugar).join("");
    estado.textContent = `Mostrando ${resultados.length} lugar(es).`;
  }
}

/** Abre el panel de detalles de un lugar. */
function mostrarDetalleLugar(id) {
  const l = DIRECTORIO.find((x) => x.id === id);
  if (!l) return;
  document.getElementById("modalDirectorioTitulo").textContent = l.nombre;
  document.getElementById("modalDirectorioCuerpo").innerHTML = `
    <dl>
      <dt>Categoría</dt><dd>${nombreCategoria(l.categoria)}</dd>
      <dt>Institución</dt><dd>${escaparHTML(l.institucion)}</dd>
      ${l.clues ? `<dt>Clave CLUES</dt><dd>${l.clues}</dd>` : ""}
      <dt>Localidad</dt><dd>${escaparHTML(l.localidad)}, municipio de Villa Victoria, Estado de México</dd>
      <dt>Dirección</dt><dd>${textoDato(l.direccion)}${l.nota ? `<br><small>${escaparHTML(l.nota)}</small>` : ""}</dd>
      <dt>Servicios</dt><dd>${escaparHTML(l.servicios)}</dd>
      <dt>Horario</dt><dd>${textoDato(l.horario)}</dd>
      <dt>Teléfono</dt><dd>${enlaceTelefono(l)}</dd>
      <dt>Fuente</dt><dd>${escaparHTML(l.fuente)}</dd>
    </dl>
    <p class="small mb-0"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      No aseguramos que este lugar ofrezca un servicio específico. Confirma antes de acudir.</p>`;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("modalDirectorio")).show();
}

/* ---------- 6. Asistente EduSex AI ---------- */

const PREGUNTAS_RAPIDAS = [
  ["Cambios de la adolescencia", "adolescencia"],
  ["Infecciones de transmisión sexual", "its"],
  ["Métodos anticonceptivos", "anticonceptivos"],
  ["Consentimiento", "consentimiento"],
  ["Relaciones saludables", "relaciones"],
  ["Centros de salud", "servicios"],
  ["Derechos sexuales y reproductivos", "derechos"],
  ["Orientación psicológica", "psicologico"]
];

/* Base de respuestas: palabras clave (sin acentos) y respuesta preparada. */
const RESPUESTAS = {
  crisis: {
    claves: ["suicid", "matarme", "quitarme la vida", "no quiero vivir", "hacerme dano", "lastimarme"],
    texto: "Lamento que estés pasando por esto. No estás solo, sola ni sole. <strong>Si estás en peligro ahora, llama al <a href=\"tel:911\">911</a>.</strong> Puedes hablar gratis las 24 horas con la Línea de la Vida: <a href=\"tel:8009112000\">800 911 2000</a>. También busca a una persona adulta de confianza.",
    categoriaLugares: "psicologico"
  },
  violencia: {
    claves: ["violencia", "golpe", "abuso", "abusa", "acoso", "maltrat", "amenaza", "me obligo", "me obligan", "violacion"],
    texto: "Nadie tiene derecho a lastimarte y no es tu culpa. <strong>Si estás en peligro inmediato, llama al <a href=\"tel:911\">911</a>.</strong> Habla con una persona adulta de confianza. Estos servicios pueden orientarte:",
    categoriaLugares: "violencia", extraCategoria: "psicologico", tema: "tema-violencia"
  },
  psicologico: {
    claves: ["psicolog", "ansiedad", "triste", "depres", "emocion", "estres", "angustia", "llorar", "salud mental"],
    texto: "Cuidar tu salud emocional es importante. Puedes llamar gratis a la Línea de la Vida (<a href=\"tel:8009112000\">800 911 2000</a>, 24 horas) y acercarte a servicios locales:",
    categoriaLugares: "psicologico", tema: "tema-adolescencia"
  },
  servicios: {
    claves: ["centro de salud", "hospital", "clinica", "donde", "lugar", "cerca", "servicio", "imss", "dif", "ubicacion", "doctor", "medico", "consulta", "unidad"],
    texto: "Estos son algunos lugares públicos de salud en Villa Victoria registrados en fuentes oficiales. Algunos datos están pendientes de verificación; confirma antes de acudir:",
    categoriaLugares: "centros", extraCategoria: "hospitales", limite: 4
  },
  its: {
    claves: ["its", "ets", "infeccion", "vih", "sida", "vph", "papiloma", "herpes", "sifilis", "clamidia", "gonorrea", "contagi", "prueba"],
    texto: "Las infecciones de transmisión sexual (ITS) se transmiten principalmente por contacto sexual. <strong>Muchas no tienen síntomas.</strong><ul><li>El condón, usado bien en cada relación, reduce mucho el riesgo.</li><li>Existen vacunas para algunas, como el VPH.</li><li>Pide pruebas en tu centro de salud.</li></ul>No puedo hacer diagnósticos: si tienes síntomas o dudas, acude a personal de salud.",
    tema: "tema-its"
  },
  anticonceptivos: {
    claves: ["anticoncep", "metodo", "pastilla", "condon", "preservativo", "implante", "diu", "inyeccion", "embaraz", "emergencia", "cuidarme"],
    texto: "Hay métodos de barrera (condón), hormonales (pastillas, inyección, parche, implante), DIU y otros. <ul><li><strong>Solo el condón</strong> ayuda a prevenir embarazo e ITS a la vez.</li><li>La anticoncepción de emergencia funciona mejor mientras antes se use y no es un método regular.</li></ul>Personal de salud puede ayudarte a elegir el método adecuado para ti.",
    tema: "tema-anticonceptivos"
  },
  consentimiento: {
    claves: ["consentim", "permiso", "presion", "obligar", "decir que no", "no quiero", "aceptar"],
    texto: "El consentimiento es una decisión <strong>libre, informada y voluntaria</strong>, y puedes retirarlo en cualquier momento. Si hay presión, amenazas, alcohol o drogas, no hay consentimiento. Tu “no” siempre es válido.",
    tema: "tema-consentimiento"
  },
  relaciones: {
    claves: ["relacion", "novi", "pareja", "celos", "amistad", "amigo", "amiga", "control", "celular"],
    texto: "Una relación saludable se basa en respeto, comunicación, confianza y límites. Los celos excesivos, revisar tu celular o prohibirte amistades son señales de alerta.",
    tema: "tema-relaciones"
  },
  derechos: {
    claves: ["derecho", "confidencial", "privacidad", "decidir", "discrimin"],
    texto: "Tienes derecho a recibir información científica, a decidir sobre tu cuerpo, a la privacidad, a vivir sin violencia ni discriminación y a servicios de salud que te traten con respeto.",
    tema: "tema-derechos"
  },
  adolescencia: {
    claves: ["adolescen", "pubertad", "cambio", "menstrua", "regla", "periodo", "vello", "acne", "voz", "crecer", "cuerpo"],
    texto: "En la adolescencia hay cambios físicos (crecimiento, vello, menstruación, cambios de voz, acné) y emocionales. Cada persona tiene su propio ritmo. Si algo te preocupa, consulta a personal de salud.",
    tema: "tema-pubertad"
  },
  higiene: {
    claves: ["higiene", "limpi", "aseo", "olor", "flujo", "comezon", "ardor"],
    texto: "Para la higiene íntima basta agua y, si quieres, jabón suave en la parte externa. Evita duchas vaginales y perfumes. Si hay comezón, ardor, mal olor o flujo diferente, acude a consulta: no te automediques.",
    tema: "tema-higiene"
  }
};

/* Orden de evaluación: primero situaciones de riesgo. */
const ORDEN_CATEGORIAS = ["crisis", "violencia", "psicologico", "servicios", "its", "anticonceptivos", "consentimiento", "relaciones", "derechos", "adolescencia", "higiene"];

let ultimoFocoAntesDeChat = null;

function abrirChat() {
  const ventana = document.getElementById("ventanaChat");
  const boton = document.getElementById("btnChatFlotante");
  if (ventana.hidden) ultimoFocoAntesDeChat = document.activeElement;
  ventana.hidden = false;
  boton.setAttribute("aria-expanded", "true");
  if (!document.getElementById("chatMensajes").children.length) saludoInicial();
  document.getElementById("campoChat").focus();
}

function cerrarChat() {
  const ventana = document.getElementById("ventanaChat");
  ventana.hidden = true;
  document.getElementById("btnChatFlotante").setAttribute("aria-expanded", "false");
  (ultimoFocoAntesDeChat && document.body.contains(ultimoFocoAntesDeChat)
    ? ultimoFocoAntesDeChat : document.getElementById("btnChatFlotante")).focus();
}

function agregarMensaje(html, autor) {
  const lista = document.getElementById("chatMensajes");
  const burbuja = document.createElement("div");
  burbuja.className = "burbuja aparecer-suave " + (autor === "usuario" ? "burbuja-usuario" : "burbuja-bot");
  burbuja.innerHTML = (autor === "usuario" ? '<span class="visually-hidden">Tú: </span>' : '<span class="visually-hidden">EduSex AI: </span>') + html;
  lista.appendChild(burbuja);
  lista.scrollTop = lista.scrollHeight;
}

function saludoInicial() {
  agregarMensaje("¡Hola! Soy <strong>EduSex AI</strong>. Respondo dudas generales con información educativa preparada a partir de fuentes oficiales. No necesitas darme tu nombre ni datos personales. Elige una pregunta rápida o escribe la tuya.", "bot");
}

/** Mini tarjetas del directorio para mostrar dentro del chat. */
function lugaresParaChat(categoria, extra, limite) {
  const lista = DIRECTORIO.filter((l) => l.categoria === categoria || (extra && l.categoria === extra)).slice(0, limite || 6);
  if (!lista.length) return "";
  return lista.map((l) => `
    <div class="mini-lugar">
      <strong>${l.nombre}</strong><br>
      ${escaparHTML(l.localidad)} · Tel.: ${enlaceTelefono(l)}<br>
      ${l.tipo === "lugar" ? `<a href="${urlMapa(l)}" target="_blank" rel="noopener noreferrer">Ver ubicación</a> · ` : ""}
      <a href="#directorio" class="enlace-detalle-chat" data-id="${l.id}">Más información</a>
    </div>`).join("") + '<p class="mt-2 mb-0"><a href="#directorio">Ver el directorio completo</a></p>';
}

function responder(categoria) {
  const r = RESPUESTAS[categoria];
  let html = r.texto;
  if (r.categoriaLugares) html += lugaresParaChat(r.categoriaLugares, r.extraCategoria, r.limite);
  if (r.tema) html += `<p class="mt-2 mb-0"><a href="#${r.tema}" class="enlace-tema-chat" data-tema="${r.tema}">Leer el tema completo</a></p>`;
  agregarMensaje(html, "bot");
}

/** Busca la categoría según palabras clave. */
function clasificar(texto) {
  const t = " " + normalizar(texto) + " ";
  return ORDEN_CATEGORIAS.find((cat) => RESPUESTAS[cat].claves.some((clave) => {
    // Claves cortas (its, ets, diu, vih) deben coincidir como palabra completa
    if (clave.length <= 3) return new RegExp("[^a-z]" + clave + "[^a-z]").test(t);
    return t.includes(clave);
  }));
}

function procesarMensaje(texto) {
  const limpio = texto.trim();
  if (!limpio) return;
  agregarMensaje(escaparHTML(limpio), "usuario");
  const categoria = clasificar(limpio);
  window.setTimeout(() => {
    if (categoria) {
      responder(categoria);
    } else {
      agregarMensaje('No tengo una respuesta preparada para eso. Te recomiendo consultar <a href="#recursos">fuentes oficiales</a> o acudir a personal de salud en tu <a href="#directorio">centro de salud</a>. También puedes elegir una pregunta rápida.', "bot");
    }
  }, 250);
}

function iniciarChat() {
  const rapidas = document.getElementById("chatRapidas");
  rapidas.innerHTML = PREGUNTAS_RAPIDAS.map(([texto, cat]) =>
    `<button type="button" class="btn btn-outline-light" data-cat="${cat}">${texto}</button>`).join("");
  rapidas.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      agregarMensaje(escaparHTML(b.textContent), "usuario");
      window.setTimeout(() => responder(b.dataset.cat), 250);
    });
  });

  // Enviar con el botón o con Enter (el formulario maneja ambos)
  document.getElementById("formChat").addEventListener("submit", (e) => {
    e.preventDefault();
    const campo = document.getElementById("campoChat");
    procesarMensaje(campo.value);
    campo.value = "";
  });

  document.getElementById("btnChatFlotante").addEventListener("click", () => {
    document.getElementById("ventanaChat").hidden ? abrirChat() : cerrarChat();
  });
  document.getElementById("btnCerrarChat").addEventListener("click", cerrarChat);
  document.getElementById("btnBorrarChat").addEventListener("click", () => {
    document.getElementById("chatMensajes").innerHTML = "";
    saludoInicial();
  });
  document.getElementById("btnRecursosChat").addEventListener("click", () => {
    if (window.innerWidth <= 576) cerrarChat();
  });
  document.getElementById("btnAbrirAsistenteSeccion").addEventListener("click", abrirChat);
  document.getElementById("btnAyudaServicio").addEventListener("click", () => {
    abrirChat();
    agregarMensaje("¿Necesitas ayuda para encontrar un servicio?", "usuario");
    window.setTimeout(() => responder("servicios"), 250);
  });

  // Cerrar con Escape
  document.getElementById("ventanaChat").addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarChat();
  });

  // Enlaces dentro del chat (delegación de eventos)
  document.getElementById("chatMensajes").addEventListener("click", (e) => {
    const detalle = e.target.closest(".enlace-detalle-chat");
    if (detalle) {
      e.preventDefault();
      mostrarDetalleLugar(detalle.dataset.id);
      return;
    }
    const tema = e.target.closest(".enlace-tema-chat");
    if (tema) {
      const boton = document.querySelector(`#${tema.dataset.tema} .btn-leer-mas`);
      if (boton) alternarDetalle(boton, true);
    }
    if (window.innerWidth <= 576 && e.target.closest("a[href^='#']")) cerrarChat();
  });
}

/* ---------- 7. Examen interactivo ---------- */

const examen = {
  actual: 0,
  respuestas: new Array(PREGUNTAS.length).fill(null) // índice elegido o null
};

function reiniciarExamen() {
  examen.actual = 0;
  examen.respuestas = new Array(PREGUNTAS.length).fill(null);
  document.getElementById("zonaResultados").classList.add("d-none");
  document.getElementById("zonaResultados").innerHTML = "";
  document.getElementById("zonaExamen").classList.remove("d-none");
  document.getElementById("avisoPendientes").classList.add("d-none");
  mostrarPregunta();
}

function mostrarPregunta() {
  const p = PREGUNTAS[examen.actual];
  const n = examen.actual;
  document.getElementById("contenedorPregunta").innerHTML = `
    <fieldset class="pregunta-examen aparecer-suave">
      <legend>${n + 1}. ${p.texto}</legend>
      ${p.opciones.map((op, i) => `
        <label class="opcion-examen" for="op-${n}-${i}">
          <input type="radio" name="pregunta-${n}" id="op-${n}-${i}" value="${i}" ${examen.respuestas[n] === i ? "checked" : ""}>
          <span><strong>${"ABCD"[i]})</strong> ${op}</span>
        </label>`).join("")}
    </fieldset>`;

  // Guardar respuesta (reemplaza la anterior: nunca se cuenta dos veces)
  document.querySelectorAll(`input[name="pregunta-${n}"]`).forEach((input) => {
    input.addEventListener("change", () => {
      examen.respuestas[n] = Number(input.value);
      actualizarProgreso();
    });
  });

  document.getElementById("btnAnterior").disabled = n === 0;
  document.getElementById("btnSiguiente").disabled = n === PREGUNTAS.length - 1;
  actualizarProgreso();
}

function actualizarProgreso() {
  const total = PREGUNTAS.length;
  const contestadas = examen.respuestas.filter((r) => r !== null).length;
  const porcentaje = Math.round((contestadas / total) * 100);
  document.getElementById("indicadorPregunta").textContent = `Pregunta ${examen.actual + 1} de ${total}`;
  document.getElementById("indicadorContestadas").textContent = `Contestadas: ${contestadas} de ${total}`;
  const barra = document.getElementById("barraExamen");
  barra.setAttribute("aria-valuenow", String(porcentaje));
  barra.setAttribute("aria-valuetext", `${contestadas} de ${total} preguntas contestadas`);
  document.getElementById("barraExamenRelleno").style.width = porcentaje + "%";
}

function irAPregunta(indice) {
  examen.actual = indice;
  mostrarPregunta();
  const primera = document.querySelector("#contenedorPregunta input");
  if (primera) primera.focus();
}

function finalizarExamen(forzar = false) {
  const pendientes = examen.respuestas.map((r, i) => (r === null ? i : -1)).filter((i) => i >= 0);
  const aviso = document.getElementById("avisoPendientes");

  if (pendientes.length && !forzar) {
    aviso.innerHTML = `
      <p class="fw-bold mb-2"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        Te faltan ${pendientes.length} pregunta(s) por contestar:</p>
      <div class="d-flex flex-wrap gap-2 mb-2">
        ${pendientes.map((i) => `<button type="button" class="btn btn-sm btn-outline-light btn-ir" data-i="${i}">Ir a la pregunta ${i + 1}</button>`).join("")}
      </div>
      <button type="button" class="btn btn-sm btn-neon-verde" id="btnFinalizarIgual">Finalizar de todos modos (las no contestadas cuentan como incorrectas)</button>`;
    aviso.classList.remove("d-none");
    aviso.focus();
    aviso.querySelectorAll(".btn-ir").forEach((b) => b.addEventListener("click", () => {
      aviso.classList.add("d-none");
      irAPregunta(Number(b.dataset.i));
    }));
    document.getElementById("btnFinalizarIgual").addEventListener("click", () => finalizarExamen(true));
    return;
  }
  aviso.classList.add("d-none");
  mostrarResultados();
}

/** Calcula y muestra resultados. Se calcula desde cero en cada intento. */
function mostrarResultados() {
  const total = PREGUNTAS.length;
  const correctas = examen.respuestas.filter((r, i) => r === PREGUNTAS[i].respuesta).length;
  const incorrectas = total - correctas;
  const porcentaje = (correctas / total) * 100;
  const calificacion = correctas; // calificación sobre 10 = número de aciertos

  let titulo, mensaje;
  if (correctas <= 3) {
    titulo = "Puedes seguir aprendiendo";
    mensaje = "Te sugerimos repasar los temas de consentimiento, prevención de ITS y anticonceptivos, y volver a intentarlo.";
  } else if (correctas <= 6) {
    titulo = "Vas por buen camino";
    mensaje = "Revisa las explicaciones de las preguntas falladas y lee los temas relacionados para mejorar.";
  } else if (correctas <= 8) {
    titulo = "¡Buen trabajo!";
    mensaje = "Refuerza tus conocimientos con las explicaciones de abajo y la sección de mitos y realidades.";
  } else {
    titulo = "¡Excelente resultado!";
    mensaje = "Sigue consultando información confiable y comparte fuentes oficiales con tus amistades.";
  }

  const revision = PREGUNTAS.map((p, i) => {
    const elegida = examen.respuestas[i];
    const ok = elegida === p.respuesta;
    if (ok) return "";
    return `
      <div class="revision-pregunta incorrecta">
        <p class="mb-1 fw-bold">${i + 1}. ${p.texto} <span class="badge bg-secondary">${p.tema}</span></p>
        <p class="mb-1"><span class="marca-incorrecta"><i class="fa-solid fa-xmark" aria-hidden="true"></i> Tu respuesta:</span>
          ${elegida === null ? "Sin contestar" : `${"ABCD"[elegida]}) ${p.opciones[elegida]}`}</p>
        <p class="mb-1"><span class="marca-correcta"><i class="fa-solid fa-check" aria-hidden="true"></i> Respuesta correcta:</span>
          ${"ABCD"[p.respuesta]}) ${p.opciones[p.respuesta]}</p>
        <p class="mb-0"><strong>Explicación:</strong> ${p.explicacion}</p>
      </div>`;
  }).join("");

  const zona = document.getElementById("zonaResultados");
  zona.innerHTML = `
    <div class="tarjeta-neon tarjeta-resultado aparecer-suave">
      <h3 class="h4">${titulo}</h3>
      <p class="calificacion-grande">${calificacion}<span class="fs-4">/10</span></p>
      <div class="progress barra-progreso my-3" role="progressbar" aria-label="Porcentaje de aciertos"
           aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width:${porcentaje}%"></div>
      </div>
      <div class="estadisticas">
        <div class="estadistica"><strong class="marca-correcta">${correctas}</strong> Correctas</div>
        <div class="estadistica"><strong class="marca-incorrecta">${incorrectas}</strong> Incorrectas</div>
        <div class="estadistica"><strong>${porcentaje}%</strong> Aciertos</div>
        <div class="estadistica"><strong>${calificacion}</strong> Calificación</div>
      </div>
      <p>${mensaje}</p>
      <p class="small">Este resultado es solo una actividad educativa; no evalúa conocimientos médicos profesionales y no se guarda.</p>
      <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button type="button" class="btn btn-neon-verde" id="btnReintentar"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i> Volver a intentarlo</button>
        <a href="#salud" class="btn btn-neon-azul"><i class="fa-solid fa-book" aria-hidden="true"></i> Repasar temas</a>
        <a href="#inicio" class="btn btn-outline-light"><i class="fa-solid fa-house" aria-hidden="true"></i> Volver al inicio</a>
      </div>
      ${revision ? `<h4 class="h5 text-start">Preguntas para repasar</h4>${revision}` : '<p class="marca-correcta">¡Contestaste todas correctamente!</p>'}
    </div>`;

  document.getElementById("zonaExamen").classList.add("d-none");
  zona.classList.remove("d-none");
  zona.focus();
  document.getElementById("btnReintentar").addEventListener("click", () => {
    reiniciarExamen();
    document.getElementById("examen").scrollIntoView();
    document.querySelector("#contenedorPregunta input").focus();
  });
}

function iniciarExamen() {
  document.getElementById("btnAnterior").addEventListener("click", () => {
    if (examen.actual > 0) irAPregunta(examen.actual - 1);
  });
  document.getElementById("btnSiguiente").addEventListener("click", () => {
    if (examen.actual < PREGUNTAS.length - 1) irAPregunta(examen.actual + 1);
  });
  document.getElementById("btnFinalizar").addEventListener("click", () => finalizarExamen(false));
  reiniciarExamen();
}

/* ---------- 8. Formularios (demostrativos, sin envío ni almacenamiento) ---------- */

function marcarCampo(campo, valido) {
  campo.classList.toggle("is-invalid", !valido);
  campo.setAttribute("aria-invalid", String(!valido));
  return valido;
}

function iniciarFormularios() {
  const formOri = document.getElementById("formOrientacion");
  formOri.addEventListener("submit", (e) => {
    e.preventDefault();
    const categoria = document.getElementById("oriCategoria");
    const duda = document.getElementById("oriDuda");
    const v1 = marcarCampo(categoria, categoria.value !== "");
    const v2 = marcarCampo(duda, duda.value.trim().length >= 10);
    const salida = document.getElementById("resultadoOrientacion");
    if (!v1 || !v2) {
      salida.innerHTML = '<p class="marca-incorrecta mb-0"><i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> Revisa los campos marcados.</p>';
      (v1 ? duda : categoria).focus();
      return;
    }
    // Se sugiere un tema según la categoría. La duda NO se envía ni se guarda.
    const mapa = {
      "Información general": "tema-salud-sexual", "Salud sexual": "tema-salud-sexual", "Anticonceptivos": "tema-anticonceptivos",
      "Prevención de infecciones": "tema-its", "Relaciones saludables": "tema-relaciones", "Derechos sexuales": "tema-derechos", "Otro tema": "faq"
    };
    salida.innerHTML = `<div class="alerta-neon"><strong>Formulario demostrativo:</strong> tu duda no se envió ni se guardó.
      Te sugerimos leer <a href="#${mapa[categoria.value]}">este tema relacionado</a>, preguntar a <strong>EduSex AI</strong>
      o acudir a un lugar del <a href="#directorio">directorio local</a>.</div>`;
    formOri.reset();
    [categoria, duda].forEach((c) => c.classList.remove("is-invalid"));
  });

  const formCon = document.getElementById("formContacto");
  formCon.addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("conCorreo");
    const tema = document.getElementById("conTema");
    const mensaje = document.getElementById("conMensaje");
    const privacidad = document.getElementById("conPrivacidad");
    const correoValor = correo.value.trim();
    const correoOk = correoValor === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correoValor);
    const v = [
      marcarCampo(correo, correoOk),
      marcarCampo(tema, tema.value !== ""),
      marcarCampo(mensaje, mensaje.value.trim().length >= 10),
      marcarCampo(privacidad, correoValor === "" || privacidad.checked)
    ];
    const salida = document.getElementById("resultadoContacto");
    if (v.includes(false)) {
      salida.innerHTML = '<p class="marca-incorrecta mb-0"><i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> Revisa los campos marcados.</p>';
      formCon.querySelector(".is-invalid").focus();
      return;
    }
    salida.innerHTML = `<div class="alerta-neon"><strong>Validación correcta.</strong> Este formulario es demostrativo:
      <strong>no se envió ningún mensaje</strong> porque el proyecto no tiene servidor.</div>`;
    formCon.reset();
  });
}

/* ---------- 9. Tabla de pruebas ---------- */

function renderizarPruebas() {
  document.getElementById("cuerpoPruebas").innerHTML = PRUEBAS.map(([func, proc, esperado], i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${func}</td>
      <td>${proc}</td>
      <td>${esperado}</td>
      <td>Sin ejecutar</td>
      <td><span class="estado-prueba estado-pendiente">Pendiente</span></td>
      <td>Registrar tras la prueba con usuarios.</td>
    </tr>`).join("");
}

/* ---------- 10. Inicialización ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderizarTemas();
  renderizarMitos();
  renderizarFiltros();
  renderizarDirectorio();
  renderizarPruebas();
  iniciarChat();
  iniciarExamen();
  iniciarFormularios();

  // Buscador de temas
  const campo = document.getElementById("campoBusqueda");
  campo.addEventListener("input", filtrarTemas);
  document.getElementById("formBuscador").addEventListener("submit", (e) => e.preventDefault());
  document.getElementById("btnLimpiarBusqueda").addEventListener("click", () => {
    campo.value = "";
    filtrarTemas();
    campo.focus();
  });

  // Buscador del directorio
  document.getElementById("buscadorDirectorio").addEventListener("input", renderizarDirectorio);

  // "Más información" en el directorio (delegación de eventos)
  document.getElementById("contenedorDirectorio").addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-mas-info");
    if (boton) mostrarDetalleLugar(boton.dataset.id);
  });

  // Tarjetas de inicio: abrir el tema al que llevan
  document.querySelectorAll("#tarjetasInicio a").forEach((a) => {
    a.addEventListener("click", () => {
      const boton = document.querySelector(`${a.getAttribute("href")} .btn-leer-mas`);
      if (boton) alternarDetalle(boton, true);
    });
  });

  // Cerrar el menú colapsable en móvil al elegir una sección
  document.querySelectorAll("#menuPrincipal .nav-link").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      const menu = document.getElementById("menuColapsable");
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
});
