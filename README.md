```markdown
# Aplikasi Kebencanaan Tanah Longsor 🌍⛑️  
**Proyek UAS Pemsik A11.4703**  
- **Nama**: Firdaus Youichi Yamamoto  
- **NIM**: A11.2022.14607  

Aplikasi berbasis ReactJS yang dirancang untuk memonitor dan mengelola data bencana tanah longsor. Mengintegrasikan API eksternal dan menerapkan berbagai konsep modern dalam pengembangan aplikasi web.  

---

## 🎯 **Fitur Utama**  
- **Login & Register**: Fitur autentikasi pengguna.  
- **CRUD**: Kelola data bencana (Create, Read, Update, Delete).  
- **Integrasi API**: Menggunakan data dari API eksternal.  
- **Visualisasi Data**: Data bencana yang interaktif.  
- **Navigasi Dinamis**: Dengan `React Router`.  
- **State Management**: Menggunakan `Redux` untuk pengelolaan state global.  
- **Desain Responsif**: Dengan CSS framework Tailwind.  

---

## 🚀 **Teknologi yang Digunakan**  
- **Frontend**: ReactJS, Tailwind CSS  
- **State Management**: Redux, @reduxjs/toolkit  
- **Library Pendukung**:  
  - Axios (HTTP request)  
  - SweetAlert2 (notifikasi)  
  - React Router DOM (routing)  

---

## 🔗 **API yang Digunakan**  
- [API Disasters Report (Express)](https://github.com/ardiansetya/Disasters-Report-React-Express)  
- [API Endpoint](https://api-disasters-reports.vercel.app/)  

---

## 🛠️ **Cara Instalasi dan Menjalankan Proyek**  

### 1. **Buat Proyek Baru dengan Vite**  
```bash
npm create vite@latest my-project -- --template react
cd my-project
```

### 2. **Install Tailwind CSS**  
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Tambahkan di `tailwind.config.js`:  
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Tambahkan di `src/index.css`:  
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. **Install Dependencies**  
```bash
npm install sweetalert2
npm install react-router-dom
npm install axios
npm install redux react-redux
npm install @reduxjs/toolkit
```

### 4. **Menjalankan Proyek**  
```bash
npm run dev
```

---
