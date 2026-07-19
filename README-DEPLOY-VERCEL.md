# Desplegar Puerto Hogar en la nube (sin instalar nada)

## 1. Sube el código a GitHub
1. Descomprime el zip que te dieron en una carpeta de tu PC.
2. Ve a https://github.com y crea una cuenta gratis si no tienes.
3. Haz clic en el "+" arriba a la derecha → "New repository".
4. Ponle un nombre (ej. `puerto-hogar`), déjalo en "Public" o "Private",
   NO marques "Add a README", y dale "Create repository".
5. En la página que aparece, busca el enlace "uploading an existing file"
   (o ve a "Add file" → "Upload files").
6. Abre la carpeta descomprimida en tu explorador de archivos, selecciona
   TODO su contenido (Ctrl+A) y arrástralo a la zona de carga de GitHub.
   Espera a que termine de subir todo.
7. Abajo, escribe un mensaje corto (ej. "primer commit") y dale
   "Commit changes".

## 2. Crea la base de datos gratis (Neon)
1. Ve a https://neon.tech y crea una cuenta gratis.
2. Crea un proyecto nuevo.
3. Copia el "Connection string" (empieza con `postgresql://...`).
4. Abre el "SQL Editor" de Neon, pega el contenido del archivo
   `sql/schema.sql` (está en tu repo) y ejecútalo. Esto crea las tablas.

## 3. Despliega en Vercel
1. Ve a https://vercel.com y entra con "Continue with GitHub"
   (autoriza el acceso).
2. Clic en "Add New" → "Project".
3. Busca y selecciona el repositorio que acabas de subir (`puerto-hogar`)
   → "Import".
4. Antes de darle a "Deploy", despliega la sección "Environment Variables"
   y agrega:
   - Name: `DATABASE_URL`
     Value: (pega aquí tu connection string de Neon)
5. Clic en "Deploy" y espera 1-2 minutos.
6. Cuando termine, Vercel te da una URL tipo
   `https://puerto-hogar-tuusuario.vercel.app` — esa es tu página
   pública, ya funcionando de verdad.

## 4. Prueba
1. Entra a tu URL de Vercel.
2. "Iniciar sesión" → "Regístrate gratis" → crea una cuenta.
3. "Publicar gratis", llena el formulario, sube una foto real, publica.
4. Debe aparecer en el listado con tu foto y datos reales.

## Si cambias el código después
Cada vez que subas cambios nuevos a ese repositorio de GitHub (por la web,
arrastrando archivos otra vez y haciendo commit), Vercel vuelve a
desplegar automáticamente en 1-2 minutos. No necesitas repetir los pasos
2 y 3.

## Problemas comunes
- Si el "Deploy" falla, revisa en Vercel la pestaña "Deployments" →
  clic en el que falló → "Build Logs", casi siempre dice si falta la
  variable `DATABASE_URL` o si está mal copiada (debe incluir
  `?sslmode=require` al final).
