---
name: new-store-onboarding
description: Asistente interactivo para generar la configuración visual base (Cores, Fuentes, UI) e inicialización SQL para un nuevo inquilino (tienda) en la plataforma multi-tenant.
---

# New Store Onboarding Assistant

## Propósito y Cuándo Usarlo

Esta habilidad automatiza y estandariza la recolección de los datos clave (contacto, SEO, tipografía, estética minimalista) para dar de alta una **nueva tienda** dentro del framework e-commerce multi-inquilino.

**Úsalo cuando:**
- Se te pida crear una nueva tienda o "tenant".
- Exista un nuevo documento PDF o Markdown de un cliente para configurar su tienda base.
- El desarrollador quiera preparar los scripts SQL y JSON de configuración para un nuevo comercio.

**Importante:** Esta habilidad **no devela interfaces web de forma directa ni impacta la base de datos**. Genera un conjunto de configuraciones base: un archivo temporal JSON para los estilos de la tienda, y un archivo temporal con las sentencias `SQL` necesarias para su inclusión a la base de datos de producción o entorno local.

---

## Inputs Críticos Necesarios

Si el usuario no te ha proporcionado en su prompt inicial o mediante un documento adjunto la siguiente información, **debes detenerte y preguntarla paso a paso (o todo a la vez si el usuario lo prefiere):**

1.  **Nombre de la tienda** y descripción breve (slogan).
2.  **Información Legal y Contacto:** E-mail de soporte, teléfono, y presencia de ubicación física. (Indagar si tienen manuales de política de privacidad/cookies propios o si se debe generar una versión estandar).
3.  **Fuentes (Tipografía):** Qué familia de fuentes usarán para encabezados (`font-heading`) y para el cuerpo de texto (`font-sans`). Preferiblemente nombres exactos o enlaces a Google Fonts.
4.  **Colores Base (Estética Minimalista):** Un color primario (acento principal). Un color secundario (opcional). El fondo siempre tenderá al blanco/negro puro para mantener el minimalismo.
5.  **Formas UI (Radios de Borde / Sombras):** Preferencia por el estilo de botones y tarjetas:
    *   *Sharp* (bordes cuadrados `0px`)
    *   *Rounded* (bordes sutiles `0.5rem`)
    *   *Pill* (bordes circulares `9999px`)
    *   (¿Desean uso intensivo de sombras o diseños flat?)

---

## Protocolo de Ejecución (Workflow)

Ejecuta el siguiente protocolo en orden. No te saltes pasos.

### 1) Fase de Recolección (Plan)
Analiza el input del usuario (texto plano o archivo referenciado).
- ¿Falta algún `Input Crítico` (especialmente tipografías o radios de bordes)?
- *Acción:* Pregunta por la información faltante. No avances hasta tener respuestas razonables o el permiso del usuario para usar "valores por defecto minimalistas".

### 2) Traducción Analítica
Transmite el lenguaje natural de diseño (ej. "quiero algo elegante y azul") a Tokens JSON basados en utilidades Tailwind / CSS puro:
- Define la paleta HSL para el color `--primary`.
- Calcula la familia de fuente de Google Fonts para la inyección.
- Determina los radios (`--radius`).

### 3) Fase de Generación (Ejecución)
Emplea tus herramientas nativas del sistema, como `run_command` (para manipulación simple) o escrituras de archivo para generar *únicamente dos archivos* en la carpeta temporal (ej: `/tmp/store-onboarding-[store_name]/`):

#### A. Archivo JSON (Themes)
Genera el archivo `store-theme.json` con una estructura similar a esta:
```json
{
  "tenant_id": "nombre-tienda-slug",
  "name": "Nombre de la Tienda",
  "fonts": {
    "heading": "Inter",
    "sans": "Roboto"
  },
  "css_tokens": {
    "--primary": "222.2 47.4% 11.2%",
    "--primary-foreground": "210 40% 98%",
    "--radius": "0.5rem"
  }
}
```

#### B. Script de Inicialización (SQL)
Genera un archivo `insert_store.sql` preparado con inserciones para inicializar al inquilino, asumiendo un esquema donde hay una tabla de `tenants` u `organizations` y una configuración de metadatos asociada a ese tenant para leer en frontend. Incluye sentencias SQL con *placeholders* razonables para los logos que se subirán posteriormente.

### 4) Fase de Revisión y Entrega
Detente. Presenta al desarrollador un mensaje claro confirmándole que los archivos `store-theme.json` e `insert_store.sql` han sido generados localmente.

Pregúntale:
> "He generado la configuración para la tienda en formato JSON y el esquema SQL base. Ambos pueden ser revisados. ¿Deseas hacer algún cambio a los colores, fuentes o prefieres revisar los archivos generados tú mismo para aplicarlos a Supabase?"

---

## Nivel de Libertad & Reglas

- **Libertad (Baja a Media):** Puedes ser creativo generando paletas derivadas del color primario dado, pero la estructura del JSON resultante debe ser estricta para ser procesada programáticamente y no puedes alterar código React u otros componentes de la aplicación.
- **Asunciones de Diseño:** Si el usuario es vago (ej. genera todo tú), usa fuentes populares limpias como `Inter` o `Geist` y esquemas HSL que respeten el alto contraste.
- **Idioma Obligatorio:** TODAS las descripciones sembradas en la Base de Datos, textos legales que sugieras generar o el JSON metadatos público DEBEN configurarse con el idioma Español (ES), acatando las reglas de globalización del repositorio.

---

## Output Esperado
El agente que adopte esta habilidad terminará su interacción proveyendo:
1. Una lista de lo que tradujo a nivel visual.
2. Rutas exactas locales donde se generó `store-theme.json` y `insert_store.sql`.
