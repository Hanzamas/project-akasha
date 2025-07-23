
---
## **Dokumen Spesifikasi Teknis: Proyek Aplikasi Kesehatan Mental**

### **1. Ringkasan Eksekutif**

* **1.1. Visi Proyek**: Menyediakan sebuah ekosistem digital yang aman dan suportif bagi individu untuk mengelola kesehatan mental, dengan fokus pada pemulihan dari perundungan dan tekanan emosional.
* **1.2. Tujuan Proyek**: Mengembangkan aplikasi monolitik berbasis web dan API yang melayani aplikasi mobile (klien). Aplikasi ini akan menyediakan dukungan melalui interaksi dengan AI, komunitas pengguna, konten edukasi, dan alat bantu mandiri.
* **1.3. Arsitektur Inti**: Sebuah aplikasi **Java Spring Boot** tunggal yang melayani tiga fungsi utama: **Landing Page Publik**, **REST API privat** untuk klien mobile, dan **Panel Admin berbasis web**.

---
### **2. Tumpukan Teknologi**

* **Backend**: Java 17+, Spring Boot 3+
* **Akses Data**: Spring Data JPA (Hibernate)
* **Keamanan**: Spring Security
* **Frontend Web (Admin & Landing Page)**: Thymeleaf
* **Database**: PostgreSQL atau MySQL
* **Klien Mobile**: Kotlin (Android), dengan arsitektur MVVM
* **Manajemen Proyek & Dependensi**: Maven atau Gradle



---
### **3. Arsitektur Backend (Spring Boot)**

Aplikasi backend akan mengikuti arsitektur berlapis untuk memastikan pemisahan tanggung jawab yang jelas.

* **3.1. Layer Controller (`@RestController` & `@Controller`)**: Lapisan terluar yang bertugas sebagai titik masuk permintaan HTTP.
    * **API Controllers**: Mengelola endpoint `/api/**`. Bertanggung jawab untuk validasi input dari klien mobile dan mengembalikan respons dalam format JSON.
    * **Web Controllers**: Mengelola endpoint untuk Landing Page dan Admin Panel (`/` dan `/admin/**`). Bertanggung jawab untuk menyiapkan data dan meneruskannya ke lapisan View (Thymeleaf).
* **3.2. Layer Service (`@Service`)**: Inti dari aplikasi yang berisi semua logika bisnis. Controller akan mendelegasikan semua pekerjaan ke Service. Lapisan ini tidak mengetahui detail tentang HTTP atau database.
* **3.3. Layer Repository (`JpaRepository`)**: Lapisan abstraksi data yang menangani semua komunikasi dengan database. Service akan menggunakan Repository untuk melakukan operasi CRUD.
* **3.4. Layer Domain (`@Entity`)**: Representasi objek dari tabel database. Ini adalah blueprint data untuk keseluruhan aplikasi.

---
### **4. Modul Fungsional & Komponennya**

#### **4.1. Modul Autentikasi & Pengguna**
* **Entitas**: `User`
* **Fungsi**: Registrasi pengguna, login, manajemen token (untuk API), manajemen sesi (untuk web admin), dan pengelolaan data profil.
* **Keamanan**: Implementasi Spring Security ganda: **Token JWT** untuk `/api/**` dan **Form Login berbasis Sesi** untuk `/admin/**`.

#### **4.2. Modul Interaksi AI**
* **Entitas**: `ChatMessage`
* **Fungsi**: Menerima pesan dari pengguna, meneruskan ke layanan LLM eksternal, dan menyimpan riwayat percakapan.

#### **4.3. Modul Komunitas & Forum**
* **Entitas**: `ForumPost`, `ForumReply`
* **Fungsi**: Menyediakan fungsionalitas CRUD penuh untuk postingan dan balasan. Mengelola hak akses (misalnya, hanya pemilik yang bisa mengedit/menghapus).

#### **4.4. Modul Pertumbuhan Diri**
* **Entitas**: `JournalEntry`, `MoodEntry`
* **Fungsi**: Menyediakan fungsionalitas CRUD untuk jurnal privat dan pencatatan mood harian pengguna.

#### **4.5. Modul Konten & Edukasi**
* **Entitas**: `Article`, `CopingTool`
* **Fungsi**: Menyajikan konten read-only kepada pengguna melalui API. Konten ini dikelola penuh oleh admin.

---
### **5. Arsitektur Klien & Antarmuka**

#### **5.1. Klien Mobile (Kotlin)**
* **Arsitektur**: Mengadopsi pola **MVVM (Model-View-ViewModel)** untuk pemisahan logika dan UI yang bersih.
* **Komunikasi API**: Menggunakan library **Retrofit** untuk interaksi yang efisien dengan REST API Spring Boot.
* **Penyimpanan Lokal (Caching)**: Mengimplementasikan **Room Database** untuk menyimpan data dari API. Ini krusial untuk performa, pengalaman pengguna yang responsif, dan fungsionalitas offline.

#### **5.2. Antarmuka Web (Thymeleaf)**
* **Landing Page**: Halaman statis dan informatif yang dirender oleh Spring MVC. Bertujuan sebagai gerbang utama proyek.
* **Panel Admin**: Antarmuka web dinamis untuk manajemen aplikasi. Menyediakan fungsionalitas CRUD penuh untuk modul-modul yang relevan (Pengguna, Konten, Moderasi). Halaman ini diamankan dan hanya bisa diakses oleh pengguna dengan peran 'ADMIN'.

---
### **6. Rencana Implementasi & Operasional**

* **Pengembangan**: Dimulai dengan setup proyek melalui **Spring Initializr**, diikuti pembuatan struktur entitas dan repository, lalu lapisan service dan controller.
* **Prioritas Fitur**: Alur autentikasi dan interaksi AI akan menjadi prioritas utama untuk divalidasi.
* **Deployment**: Aplikasi akan di-paket menjadi sebuah file `.jar` yang dapat dieksekusi. Disarankan untuk di-deploy menggunakan **Docker Container** pada platform cloud seperti AWS, Google Cloud, atau DigitalOcean untuk skalabilitas dan kemudahan manajemen.