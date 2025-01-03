# Generar certificados

## 1. Instalar OpenSSL (si no está instalado)

- En Linux/macOS: OpenSSL suele venir preinstalado. Verifica con `openssl version`.
- En Windows: Descarga OpenSSL desde [Win32 OpenSSL](https://slproweb.com/products/Win32OpenSSL.html) y sigue las instrucciones de instalación.

---

## 2. Generar el Certificado Autofirmado

Ejecuta los siguientes comandos en tu terminal:

### a) Generar una clave privada

```bash
openssl genrsa -out key.pem 2048
```

Este comando crea una clave privada de 2048 bits y la almacena en `key.pem`.

### b) Generar un archivo CSR (Certificate Signing Request)

```bash
openssl req -new -key key.pem -out csr.pem
```

- Durante este paso, te pedirá completar información como:

```plaintext
Country Name (2 letter code) [AU]: <Código de país, ej: US>
State or Province Name (full name) [Some-State]: <Estado/Provincia>
Locality Name (eg, city) []: <Ciudad>
Organization Name (eg, company) [Internet Widgits Pty Ltd]: <Organización>
Organizational Unit Name (eg, section) []: <Departamento/Unidad>
Common Name (e.g. server FQDN or YOUR name) []: <Nombre de dominio o localhost para pruebas>
Email Address []: <Correo electrónico>
```

## c) Generar un Certificado Autofirmado

```bash
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

Esto genera el archivo `cert.pem` (certificado) válido por **365 días**.

---

## 3. Archivos Generados

- **`key.pem`**: Clave privada.
- **`cert.pem`**: Certificado autofirmado.
- **`csr.pem`**: Solicitud de firma de certificado (opcional, no se usa en este caso).

---

## 4. Verificar el Certificado

Puedes verificar los detalles del certificado con el siguiente comando:

```bash
openssl x509 -in cert.pem -text -noout
```

---

## 5. Configuración en el Proyecto

Actualiza tu archivo `.env` con las rutas de los archivos generados:

```env
TLS_CERT_PATH=/ruta/a/cert.pem
TLS_KEY_PATH=/ruta/a/key.pem
```

Prueba reiniciando tu API para usar el nuevo certificado.
