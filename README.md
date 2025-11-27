# MB-CRM

MB-CRM es un sistema interno desarrollado para MB Smart. Su objetivo es centralizar información de clientes, tickets, agentes y operaciones internas en una plataforma moderna construida con SvelteKit y TailwindCSS.

## Tecnologías utilizadas

- SvelteKit
- TailwindCSS
- TypeScript
- Vite

## Estructura del proyecto

- src/routes/+layout.svelte  
  Layout global donde se cargan estilos y configuración base.
- src/routes/(crm)/+layout.svelte  
  Layout interno del CRM que contiene el sidebar y la navegación.
- src/routes/login/+page.svelte  
  Pantalla de login conectada al API nuevo de MB Smart.
- src/routes/(crm)/dashboard  
  Vista principal del CRM.
- src/routes/(crm)/clients  
  Gestión de clientes.
- src/routes/(crm)/tickets  
  Gestión de tickets.
- src/routes/(crm)/agents  
  Administración de agentes.

## Desarrollo local

1. Instalar dependencias  
   `npm install`

2. Ejecutar ambiente de desarrollo  
   `npm run dev`

3. Abrir en el navegador  
   `http://localhost:5173` (o el puerto que indique Vite)

## Objetivo del proyecto

Crear un CRM interno rápido, moderno y funcional que permita:

- Consultar datos clave
- Llevar control de tickets
- Administrar usuarios y agentes
- Integrarse con el backend oficial de MB Smart

## Estructura futura

Las siguientes funciones se planean agregar:

- Dashboard dinámico con estadísticas reales
- Manejo completo de tickets
- Gestión avanzada de clientes
- Roles y permisos
- Integración con sistemas internos
