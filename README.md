# Projek UAS Pemsik A11.4703

- Firdaus Youichi Yamamoto
- A11.2022.14607

Aplikasi Tema Kebencanaan pada Tanah Longsor menggunakan Reactjs dengan menerapkan beberapa konsep seperti CSS framework Tailwind, Konsep Props, Konsep State, Konsep Route, Konsep Axios, Konsep Redux, Login, Register, dan CRUD.

# API yang digunakan

- https://github.com/ardiansetya/Disasters-Report-React-Express
- https://api-disasters-reports.vercel.app/

# Cara menjalankan Projek

- Install
  <pre>npm create vite@latest my-project -- --template react</pre>
  <pre>cd my-project</pre>
  <pre>npm install -D tailwindcss postcss autoprefixer</pre>
  <pre>npx tailwindcss init -p</pre>
- Tambahkan di tailwind.config.js
<pre>/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}</pre>
- Tambahkan di index.css
<pre>@tailwind base;
@tailwind components;
@tailwind utilities;</pre>
- Install dependencies
  <pre>npm install sweetalert2</pre>
  <pre>npm install react-router-dom</pre>
  <pre>npm install axios</pre>
  <pre>npm install redux react-redux</pre>
  <pre>npm install @reduxjs/toolkit</pre>
- Menjalankan Projek
<pre>npm run dev</pre>
