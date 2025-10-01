# 🚀 Curso de Desarrollo Backend con JS/TS

[![Licencia ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Este repositorio contiene el **código de referencia** desarrollado durante el **Curso de Desarrollo Backend con JS y TS** impartido en la gestión 2025 por la **Sociedad Científica de Estudiantes de Sistemas e Informática (SCESI)** de la UMSS.

---

## 📢 Propósito Académico y Advertencia

Este proyecto se comparte con el propósito **meramente educativo y académico**.

**IMPORTANTE:**
* **No se ofrece garantía o soporte:** El código se proporciona "tal cual". SCESI o sus instructores no se hacen responsables por daños o fallos derivados del uso de este código.
* **Código de Referencia:** Está optimizado para la enseñanza; puede que requiera ajustes para un entorno de producción real.

---

## ⚙️ Guía de Inicio Rápido

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado:
* [Node.js](https://nodejs.org/): Versión 18 o superior.
* [⚠️ Docker](https://www.docker.com/): Necesario para levantar la base de datos (PostgreSQL y Redis).

### Pasos

1.  **⚠️ Clonar el repositorio:**

| ⚠️ Esta sección esta en construccion

    ```bash
    git clone [URL-DE-TU-REPOSITORIO]
    cd [nombre-del-repositorio]
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea tu archivo de configuración secreto **copiando** la plantilla pública:
    
    ```bash
    cp .env.example .env
    ```
    
    Luego, **edita el nuevo archivo `.env`** y reemplaza los valores de ejemplo por tus datos reales (contraseñas, secretos, etc.).

4.  **⚠️ Levantar la Base de Datos con Docker Compose:**
    ```bash
    docker-compose up -d
    # o
    docker compose up -d
    ```

5.  **⚠️ Ejecutar Migraciones:**

  | ⚠️ Esta sección esta en construccion

  ```sh
  $ npm run migrate
  ```


6.  **Iniciar el Servidor en modo desarrollo:**
    ```bash
    npm run start:dev
    ```

El servidor estará activo en `http://localhost:3000` (o el puerto que hayas configurado).

---

## 📜 Licencia

Este proyecto está distribuido bajo la **Licencia ISC**.

Puedes leer el texto completo de la licencia aquí: [LICENCIA ISC](./LICENSE)