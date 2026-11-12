# 🚀 Angular Task Manager

A modern, enriched Todo application built with the latest version of **Angular** and **NG-ZORRO (Ant Design)**, featuring task prioritization, dynamic filtering, and a clean enterprise-grade UI.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NG-ZORRO](https://img.shields.io/badge/NG--ZORRO-1890FF?style=for-the-badge&logo=ant-design&logoColor=white)

---

## ✨ Features

- **Task Management:** Add, complete, edit, and delete tasks seamlessly.
- **Priority Levels:** Assign visual priority tags (High, Medium, Low) using Ant Design tags.
- **Dynamic Filtering:** Instant filtering by status (All, Active, Completed) and priority levels.
- **Modern Angular Architecture:** Built with Standalone Components and Angular Signals for reactive state management.
- **Clean UI/UX:** Responsive interface powered by NG-ZORRO components (`nz-table`, `nz-tag`, `nz-select`, `nz-input`).
- **Local Persistence:** Tasks are automatically saved in the browser's `localStorage`.

---

## 🛠️ Tech Stack

- **Framework:** Angular (Latest version)
- **Language:** TypeScript
- **UI Library:** NG-ZORRO (`ng-zorro-antd` / Ant Design)
- **State Management:** Angular Signals & Computed properties

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have Node.js and the Angular CLI installed:
```bash
node -v
npm install -g @angular/cli
```

### Version

- **npm:** 12.2
- **angular/cli:** 22.2.6
- **ng-zorro:** Latest

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/steevemocopro/angular-task-manager.git
   ```

2. **Navigate to the project folder:**
   ```bash
   cd angular-task-manager
   ```

3. **Initialize the Angular project:**
   ```bash
   npx @angular/cli@latest new angular-task-manager --directory=. --routing=true --style=css --skip-git
   ```
   ```text
   ✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
   ✔ Which AI tools should Angular integrate with? https://angular.dev/ai/develop-with-ai None
   ```

   **Here is what each option does:**
  - `npx @angular/cli@latest`: uses the very latest version of the Angular CLI without needing to install it globally.
  - `new angular-task-manager`: sets the project name.
  - `--directory=.`: installs the files directly at the root of your current folder (instead of creating a subfolder).
  - `--routing=true`: enables Angular's navigation system (routing).
  - `--style=css`: configures standard CSS for stylesheets.
  - `--skip-git`: skips initializing a new Git repository if you already have one.

4. **Install `ng-zorro-antd` library:**
   ```bash
   npx ng add ng-zorro-antd
   ```
   ```text
   ✔ Enable icon dynamic loading [ Detail: https://ng.ant.design/components/icon/en ] No
   ✔ Set up custom theme file [ Detail: https://ng.ant.design/docs/customize-theme/en ] No
   ✔ Choose your locale code: en_US
   ✔ Choose template to create project: blank
   ✔ Choose date adapter for date/time components: date-fns (Recommended)
   ```
