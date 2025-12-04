# MB-CRM

MB-CRM is an internal system developed for MB Smart. Its goal is to centralize customer, ticket, agent, and internal operations data into a modern platform built with SvelteKit and TailwindCSS.

## Technologies Used

- SvelteKit
- TailwindCSS
- TypeScript
- Vite

## Project Structure

- **src/routes/+layout.svelte**  
  Global layout where base styles and configuration are loaded.

- **src/routes/(crm)/+layout.svelte**  
  Internal CRM layout containing the sidebar and navigation.

- **src/routes/login/+page.svelte**  
  Login screen connected to the new MB Smart API.

- **src/routes/(crm)/dashboard**  
  Main CRM dashboard view.

- **src/routes/(crm)/clients**  
  Client management.

- **src/routes/(crm)/tickets**  
  Ticket management.

- **src/routes/(crm)/agents**  
  Agent administration.

## Local Development

1. Install dependencies  
   `npm install`

2. Start development environment  
   `npm run dev`

3. Open in the browser  
   `http://localhost:5173` (or the port indicated by Vite)

## Project Objective

Create a fast, modern, and functional internal CRM that allows:

- Viewing key data
- Managing tickets
- Administering users and agents
- Integrating with the official MB Smart backend

## Future Roadmap

The following features are planned:

- Fully dynamic dashboard with real statistics
- Complete ticket workflow
- Advanced client management
- Roles and permissions system
- Integration with internal tools and services
