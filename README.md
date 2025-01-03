# 🚀 Secrets API

## 🪪 Descripción

La **Secrets API** es una API segura diseñada para almacenar configuraciones sensibles para aplicaciones. Implementa una arquitectura limpia con características avanzadas de seguridad, como:

- Autenticación mediante certificados.
- Restricción por direcciones IP permitidas.
- Cifrado de datos sensibles en la base de datos.

## ✅ Características

- **Seguridad Avanzada**: Restringe el acceso utilizando IPs permitidas y autenticación mediante certificados.
- **Gestión de Secretos**: Permite crear y recuperar configuraciones sensibles.
- **Documentación Swagger**: Integración con Swagger para probar las rutas de la API.

---

## 📑 Requisitos Previos

- **Node.js**: Versión 14 o superior.
- **MongoDB**: Configurado y en ejecución.
- **Certificados**: Generar un certificado válido para las solicitudes HTTPS.

### 🔖 Generación de Certificados

Para generar un certificado de prueba:

```bash
openssl req -nodes -new -x509 -keyout cert.pem -out cert.pem
```

---

## 🛠️ Instalación

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` basado en el archivo de ejemplo `.env.example`:

```bash
cp .env.example .env
```

4. Configura las variables de entorno en `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/secrets
ALLOWED_IPS=127.0.0.1
CERT_PATH=./cert.pem
SECRET_ENCRYPTION_KEY=your-encryption-key
```

---

## 🔧 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

---

## 🔓 Rutas Disponibles

### 1. Crear un Secreto

**POST** `/api/secrets`

#### Headers:
- `Authorization`: Bearer token

#### Body:
```json
{
  "key": "test-key",
  "value": "test-value"
}
```

#### Respuesta:
```json
{
  "message": "Secreto creado exitosamente"
}
```

---

### 2. Obtener un Secreto

**GET** `/api/secrets/:key`

#### Headers:
- `Authorization`: Bearer token

#### Respuesta:
```json
{
  "key": "test-key",
  "value": "test-value"
}
```

---

## Documentación Swagger

Accede a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

---

## 🧪Pruebas

### Colección de Postman

1. Importa la colección `SecretsAPI.postman_collection.json`.
2. Configura las variables:
   - `baseUrl`: URL base de la API.
   - `token`: Token de autenticación válido.

### Scripts de Prueba

Ejecuta los tests usando Jest:

```bash
npm test
```

---

## 🔐 Seguridad

1. **Restricción de IP**:
   Solo las IPs configuradas en la variable de entorno `ALLOWED_IPS` podrán acceder a las rutas.

2. **Cifrado de Secretos**:
   Los valores de los secretos se almacenan cifrados en la base de datos.

3. **Certificados**:
   Las solicitudes requieren un certificado válido configurado en el servidor.

---

## 👨‍💻 Contribución

1. Realiza un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad o corrección de errores.
3. Envía un pull request describiendo tus cambios.

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.
