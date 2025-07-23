# 🌟 Project Akasha - Mental Health Platform

**"Saat Korban Menjadi Pahlawan"** - Platform kesehatan mental yang aman dan terpercaya untuk mendukung perjalanan pemulihan dari perundungan dan tekanan emosional.

---

## 📋 Daftar Isi

- [🎯 Tentang Proyek](#-tentang-proyek)
- [✨ Fitur Utama](#-fitur-utama)
- [🛠️ Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- [🏗️ Arsitektur](#️-arsitektur)
- [🚀 Instalasi & Menjalankan](#-instalasi--menjalankan)
- [📚 API Documentation](#-api-documentation)
- [🗄️ Database Schema](#️-database-schema)
- [🔐 Keamanan](#-keamanan)
- [📱 Mobile Client](#-mobile-client)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Tentang Proyek

**Project Akasha** adalah ekosistem digital yang dirancang khusus untuk menyediakan dukungan kesehatan mental yang aman dan suportif. Platform ini fokus pada pemulihan dari perundungan dan tekanan emosional melalui pendekatan yang holistik dan berbasis teknologi modern.

### Visi & Misi

**Visi**: Menyediakan sebuah ekosistem digital yang aman dan suportif bagi individu untuk mengelola kesehatan mental.

**Misi**: Mengembangkan platform terintegrasi yang menyediakan dukungan melalui:
- 🤖 Interaksi dengan AI yang empatis
- 👥 Komunitas pengguna yang suportif  
- 📚 Konten edukasi berkualitas
- 🛠️ Alat bantu mandiri untuk pertumbuhan diri

---

## ✨ Fitur Utama

### 🏠 Landing Page Publik
- Halaman informasi tentang platform
- Halaman legal (Privacy Policy, Terms of Service, Disclaimer)
- Halaman kontak dan bantuan
- Responsive design dengan tema gelap/terang

### 🤖 AI Chat Assistant
- Chat interaktif dengan AI menggunakan Google Gemini
- Riwayat percakapan tersimpan
- Respons yang empatis dan mendukung

### 👥 Forum Komunitas  
- Diskusi publik antar pengguna
- Sistem posting dan reply
- Moderasi konten

### 📖 Jurnal Pribadi
- Pencatatan jurnal harian
- Tracking mood dan emosi
- Data privat untuk setiap pengguna

### 📚 Konten Edukasi
- Artikel kesehatan mental
- Tips dan strategi coping
- Resource untuk pemulihan

### 🔧 Panel Admin
- Manajemen pengguna
- Moderasi konten
- Analytics dan reporting
- Manajemen artikel dan tools

---

## 🛠️ Teknologi yang Digunakan

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.5.3** - Framework utama
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database access layer
- **Hibernate** - ORM
- **JWT (JSON Web Token)** - API authentication
- **Maven** - Dependency management

### Frontend Web
- **Thymeleaf** - Template engine untuk web pages
- **HTML5/CSS3/JavaScript** - Frontend technologies
- **Bootstrap** - UI framework

### Database
- **MySQL** - Database utama (Aiven Cloud)
- **JPA/Hibernate** - ORM layer

### External Services
- **Google Gemini API** - AI chat functionality
- **Aiven MySQL** - Cloud database service

### Development Tools
- **Lombok** - Boilerplate code reduction
- **Spring Boot DevTools** - Development utilities
- **JUnit 5** - Testing framework

---

## 🏗️ Arsitektur

### Arsitektur Backend (Layered Architecture)

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  @RestController          │         @Controller             │
│  (API Endpoints)          │      (Web Pages)               │
│  /api/**                  │      /, /admin/**              │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                    @Service Classes                        │
│              (Business Logic & Rules)                      │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                  PERSISTENCE LAYER                         │
├─────────────────────────────────────────────────────────────┤
│     @Repository (JPA)     │         @Entity                │
│   (Data Access Layer)     │      (Domain Models)           │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                   MySQL Database                           │
│                  (Aiven Cloud)                             │
└─────────────────────────────────────────────────────────────┘
```

### Modul Fungsional

1. **Authentication & User Management** (`@Entity User`)
   - User registration & login
   - JWT token management untuk API
   - Session management untuk web admin

2. **AI Chat Module** (`@Entity ChatMessage`)
   - Google Gemini integration
   - Chat history storage
   - Real-time messaging

3. **Community Forum** (`@Entity ForumPost`, `ForumReply`)
   - Public discussions
   - CRUD operations
   - User permissions

4. **Self Growth** (`@Entity JournalEntry`, `MoodEntry`)
   - Private journaling
   - Mood tracking
   - Personal analytics

5. **Content Management** (`@Entity Article`, `CopingTool`)
   - Educational content
   - Admin-managed resources
   - Public content access

---

## 🚀 Instalasi & Menjalankan

### Prerequisites

- **Java 21** atau lebih tinggi
- **Maven 3.8+**
- **MySQL 8.0+** (atau akses ke Aiven MySQL)
- **Git**

### Setup Database

1. **Jika menggunakan local MySQL:**
   ```sql
   CREATE DATABASE mental_health_app;
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON mental_health_app.* TO 'app_user'@'localhost';
   ```

2. **Jika menggunakan Aiven (recommended):**
   - Setup sudah dikonfigurasi di `application.properties`
   - Pastikan file `aiven_truststore.jks` ada di `src/main/resources/`

### Environment Setup

1. **Clone repository:**
   ```bash
   git clone https://github.com/Hanzamas/project-akasha.git
   cd project-akasha
   ```

2. **Configure environment variables:**
   ```bash
   # Copy dan edit application.properties
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```

3. **Set environment variables:**
   ```bash
   # Windows (PowerShell)
   $env:GEMINI_API_KEY="your_gemini_api_key_here"
   $env:JWT_SECRET="your_jwt_secret_here"
   
   # Linux/Mac
   export GEMINI_API_KEY="your_gemini_api_key_here"
   export JWT_SECRET="your_jwt_secret_here"
   ```

### Build & Run

1. **Build aplikasi:**
   ```bash
   ./mvnw clean compile
   ```

2. **Run tests:**
   ```bash
   ./mvnw test
   ```

3. **Start aplikasi:**
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Akses aplikasi:**
   - **Landing Page:** http://localhost:8080
   - **Admin Panel:** http://localhost:8080/admin/dashboard
   - **API Base URL:** http://localhost:8080/api

---

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### User Profile Endpoints

```http
GET    /api/me/profile
PUT    /api/me/profile
DELETE /api/me/account
```

### Self Growth Endpoints

```http
GET    /api/me/journals
POST   /api/me/journals
PUT    /api/me/journals/{id}
DELETE /api/me/journals/{id}

GET    /api/me/moods
POST   /api/me/moods
```

### Chat Endpoints

```http
GET    /api/chat/history
POST   /api/chat/send
```

### Forum Endpoints

```http
GET    /api/forum/posts
POST   /api/forum/posts
GET    /api/forum/posts/{id}
PUT    /api/forum/posts/{id}
DELETE /api/forum/posts/{id}

POST   /api/forum/posts/{id}/replies
PUT    /api/forum/replies/{id}
DELETE /api/forum/replies/{id}
```

### Content Endpoints

```http
GET    /api/content/articles
GET    /api/content/articles/{id}
GET    /api/content/coping-tools
GET    /api/content/coping-tools/{id}
```

### Request/Response Examples

#### User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com", 
    "password": "securePassword123",
    "fullName": "John Doe"
  }'
```

#### JWT Authentication
```bash
curl -X GET http://localhost:8080/api/me/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🗄️ Database Schema

### Core Entities

#### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(255),
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Chat Messages Table
```sql
CREATE TABLE chat_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    response TEXT,
    is_from_user BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Journal Entries Table
```sql
CREATE TABLE journal_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Mood Entries Table
```sql
CREATE TABLE mood_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    mood_type ENUM('VERY_SAD', 'SAD', 'NEUTRAL', 'HAPPY', 'VERY_HAPPY') NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Relationships

- **User** → **ChatMessage** (1:N)
- **User** → **JournalEntry** (1:N)  
- **User** → **MoodEntry** (1:N)
- **User** → **ForumPost** (1:N)
- **ForumPost** → **ForumReply** (1:N)

---

## 🔐 Keamanan

### Dual Authentication System

**1. JWT Authentication untuk API (/api/**)**
- Stateless authentication
- Token expiration: 24 hours
- Refresh token support

**2. Session-based Authentication untuk Admin Panel (/admin/**)**
- Traditional form login
- Session management
- CSRF protection

### Security Configuration

```java
// API endpoints menggunakan JWT
http.requestMatchers("/api/**")
    .authenticated()
    .and()
    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

// Admin panel menggunakan form login
http.requestMatchers("/admin/**")
    .hasRole("ADMIN")
    .and()
    .formLogin()
    .loginPage("/admin/login");
```

### Password Security

- BCrypt password hashing
- Minimum password requirements
- Account lockout after failed attempts

### Data Protection

- Personal data encryption
- HTTPS enforcement
- Input validation & sanitization
- SQL injection prevention

---

## 📱 Mobile Client

Aplikasi mobile dikembangkan menggunakan **Kotlin** dengan arsitektur **MVVM**.

### Architecture Components

- **Retrofit** - HTTP client untuk API calls
- **Room Database** - Local caching
- **ViewModel** - UI state management
- **LiveData** - Reactive data observation

### Features

- Offline support dengan local caching
- Real-time chat dengan AI
- Secure authentication
- Material Design UI

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=UserServiceTest

# Run with coverage
./mvnw test jacoco:report
```

### Test Structure

```
src/test/java/
├── com/hanzama/mental_health_app/
│   ├── controller/          # Controller tests
│   ├── service/            # Service layer tests  
│   ├── repository/         # Repository tests
│   └── integration/        # Integration tests
```

### Test Categories

- **Unit Tests** - Service layer testing
- **Integration Tests** - End-to-end API testing
- **Security Tests** - Authentication & authorization
- **Performance Tests** - Load testing

---

## 🚀 Deployment

### Docker Deployment

1. **Build Docker image:**
   ```bash
   docker build -t mental-health-app .
   ```

2. **Run container:**
   ```bash
   docker run -p 8080:8080 \
     -e GEMINI_API_KEY=your_key \
     -e JWT_SECRET=your_secret \
     mental-health-app
   ```

### Cloud Deployment Options

#### **Heroku**
```bash
heroku create project-akasha-app
git push heroku main
```

#### **AWS ECS**
- Deploy menggunakan Docker container
- Setup RDS untuk database
- Configure ALB untuk load balancing

#### **Google Cloud Platform**
- Deploy ke App Engine
- Gunakan Cloud SQL untuk database
- Configure Cloud CDN

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring & logging setup
- [ ] Backup strategy implemented
- [ ] Security headers configured

---

## 🤝 Contributing

Kami menyambut kontribusi dari komunitas! Berikut cara untuk berkontribusi:

### Development Setup

1. **Fork repository**
2. **Create feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes and commit:**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Create Pull Request**

### Code Standards

- Java coding conventions
- Comprehensive unit tests
- Documentation untuk public APIs
- Security best practices

### Issue Reporting

Gunakan GitHub Issues untuk:
- Bug reports
- Feature requests  
- Security vulnerabilities
- Documentation improvements

---

## 📞 Support & Contact

- **Email:** hanzama.dev@gmail.com
- **GitHub Issues:** [Project Issues](https://github.com/Hanzamas/project-akasha/issues)
- **Documentation:** [Wiki](https://github.com/Hanzamas/project-akasha/wiki)

---

## 📄 License

Project ini dilisensikan di bawah MIT License. Lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

## 🙏 Acknowledgments

- **Spring Boot Team** - Framework yang luar biasa
- **Google Gemini** - AI capabilities
- **Aiven** - Database cloud service
- **Mental Health Community** - Inspirasi dan feedback

---

**Project Akasha** - Mengubah luka menjadi kekuatan, satu langkah pada satu waktu. 💪✨
