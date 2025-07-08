---
mode: 'agent'
tools: ['codebase', 'githubRepo', 'runCommands', 'search', 'searchResults', 'terminalLastCommand', 'usages']
description: 'Documentação completa do backend em português'
---

# 📝 Instructions for Generating Front-End Documentation (`instruction.md`)

This file serves as a guide for GitHub Copilot (or any other AI assistant) to generate project documentation for a front-end built with Next.js. The documentation **must be written in Portuguese (pt-BR)** and should follow the structure and topics described below.

---

## 📌 Technologies Used

Describe the main technologies adopted in the project and their purposes:

* **Next.js**: A framework that enables hybrid rendering (SSR/SSG) and optimized configurations for React projects.
* **React.js**: A library for building user interfaces through reusable components.
* **TypeScript**: A typed superset of JavaScript that improves code safety and readability.
* **Additional libraries**:

  * `react-hook-form`: Efficient form state management.
  * `tailwindcss`: Utility-first CSS framework for fast and consistent styling.
  * `phosphor-react`: Lightweight and customizable icon set.
  * `chatGPT`: Used for generating custom images in the system (e.g., plants).
  * `@radix-ui/react-*`: Pre-built accessible UI components.

---

## 📂 Folder Structure

Explain the use of **FSD (Feature-Sliced Design)** pattern:

* Project is structured by **features/domains**, not by file types.
* Facilitates scalability and modularization.
* Components, hooks, actions, and other files are grouped by context.
* Especially beneficial for React projects by avoiding tight coupling and improving reusability.

---

## 🏗 Architecture (Layers)

Describe the code structure and data flow from back-end to UI:

* `HttpCli`: Handles HTTP communication with external APIs.
* `Repository`: Abstracts data access logic, isolating specific rules.
* `actions`: Client-side actions and UI-triggered functions.
* `hooks`: Shared state management and business logic.
* `components`: Reusable and encapsulated UI elements.

---

## 🔐 Social Authentication

Describe the front-end's social login flow:

* Use of OAuth providers (e.g., Google) for authentication.
* Login and authorization processes on the front-end.
* Secure storage of access tokens (e.g., HTTP-only cookies or sessionStorage).
* Mapping of logged-in user data (e.g., name, email, avatar).

---

## 🖥 Application Screens

List and briefly describe the main screens/components of the system:

* **Login Social**: Social login screen with authentication button.
* **Catálogo**: Plant catalog/list view.
* **Detalhe de Planta**: Detailed view of a selected plant.
* **Jardim**: User's garden with planted items.
* **Detalhe do Plantio**: Detailed view of a specific planting.
* **Formulário de Plantio**: Form screen for creating a new planting.

---

## 🛡 Availability and Security

Explain how the front-end ensures security and high availability:

* **Multi back-end support**: Handles multiple data sources in an articulated way.
* **Client-side vs Server-side in Next.js**:

  * *Client-side*: Runs in the user's browser; ideal for dynamic and fast interactions.
  * *Server-side*: Runs in the Next.js server before page delivery; ideal for security and SEO.
* **Security enhancements**:

  * Server-side access control prevents data leakage between users.
  * Avoids unauthorized global state manipulation.
* **Resilience**:

  * The app remains usable even if one of the back-ends is offline.
  * Server-side caching and pre-rendering ensure speed and reliability.
* **User experience**:

  * Reduced latency through smart caching.
  * Improved perceived performance with SSR and preloading.

---
## ❗ Output Requirements
- Return everything **in Portuguese**
- Use **títulos organizados e exemplos reais**
- Não invente tecnologias — use somente o que estiver realmente presente no código
- Seja **completo e técnico**, como se fosse para um time de devs experientes ou documentação oficial

---

### 🧠 Reminder

**Scan minuciosamente todo o código-fonte** antes de escrever qualquer coisa.  
A documentação deve refletir **exatamente o que foi implementado** no projeto.

