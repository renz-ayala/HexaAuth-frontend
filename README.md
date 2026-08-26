# Corenz Frontend

Cliente web desarrollado en Angular para la gestión de usuarios, autenticación y ciclo de vida de sesiones. El proyecto implementa manejo de rutas protegidas mediante Guards, interceptores HTTP y estrategia de consumo de API a través de reescritura de peticiones en el borde (Edge Rewrites) para el manejo de cookies en el mismo origen (Same-Origin).

## Demo en Producción

La aplicación se encuentra desplegada en Vercel:
* URL: https://corenz.vercel.app/
* Para hacer uso del sistema ingrese aquí https://ms-corenz.onrender.com/, iniciará el servicio de render. Esto puede tomar varios unos minutos hasta que cargue la siguiente pantalla. Hecho esto podrá hacer uso de la demo sin problemas.
  <img width="805" height="312" alt="image" src="https://github.com/user-attachments/assets/3e2fd1a2-de79-4e8a-8b0c-24a73396b879" />


Nota: Para validar el flujo completo de activación de cuenta y recuperación de credenciales, se puede realizar el registro utilizando una dirección de correo real.

## Stack Tecnológico

* Framework: Angular 17+
* Lenguaje: TypeScript 5+
* Estilos: Tailwind CSS
* HTTP & Control de Estado: RxJS / HttpClient
* Despliegue & Edge Routing: Vercel (Edge Rewrites & Hosting)

## Aspectos Técnicos e Infraestructura

* Arquitectura de Componentes: Estructura modular orientada a la separación de vistas de autenticación, administración de perfil y componentes compartidos.
* Manejo de Sesión y CORS: Las peticiones dirigidas a /v1/api/* son desviadas hacia el backend mediante la configuración de rewrites en Vercel. Esto permite que el navegador gestione las cookies HttpOnly (Refresh Token) en el contexto de un mismo origen, evitando restricciones por políticas Cross-Site.
* Intercepción y Control:
  - Inyección automática de cabeceras de autorización (Bearer Access Token).
  - CanActivateFn para la restricción de vistas según el estado de la sesión.

## Despliegue Local

### Requisitos
* Node.js (v18 o superior)
* Angular CLI

### Pasos de Configuración

1. Clonar el repositorio:
git clone https://github.com/renz-ayala/HexaAuth-frontend.git
cd HexaAuth-frontend

2. Instalar dependencias:
npm install

3. Iniciar en entorno de desarrollo:
ng serve

El servidor local utilizará proxy.conf.json para redirigir el tráfico hacia la API en ejecución local (localhost:10102).
