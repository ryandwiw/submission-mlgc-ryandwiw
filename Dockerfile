# Menggunakan image Node.js sebagai base image
FROM node:18

# Menentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstall dependencies
RUN npm install 

# Menyalin seluruh kode sumber ke dalam container
COPY . .

# Mengatur variabel lingkungan untuk port
ENV PORT=5000

# Mengekspos port yang digunakan oleh aplikasi
EXPOSE 5000

# Menjalankan aplikasi
CMD ["node", "./backend/src/main/server.js"]
