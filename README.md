# Kusuma Bloom E-Ticket Platform

<!-- Badges -->
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 About

**Kusuma Bloom** adalah platform e-ticket modern untuk pemesanan tiket wisata secara online yang terinspirasi dari aplikasi seperti Traveloka. Platform ini memungkinkan pengunjung melakukan reservasi tiket untuk kunjungan di hari lain dengan pembayaran online yang aman dan mudah.

Sistem ini dirancang untuk memberikan pengalaman pengguna yang seamless dengan fitur-fitur lengkap mulai dari pemesanan tiket, manajemen member, hingga dashboard admin untuk pengelolaan operasional.

## ✨ Fitur Utama

### Untuk Pengunjung (User)
- 🎟️ **Pemesanan Tiket Online** - Pesan tiket untuk tanggal yang diinginkan dengan antarmuka yang user-friendly
- 📅 **Fleksibel Jadwal** - Reservasi untuk tanggal masa depan sesuai kebutuhan
- 💳 **Pembayaran Aman** - Integrasi Midtrans untuk berbagai metode pembayaran (transfer bank, e-wallet, kartu kredit)
- 👤 **Autentikasi Multi-Fitur** - Login dengan email/password dan verifikasi OTP
- 🎫 **QR Code Tracking** - Setiap tiket dilengkapi QR code untuk validasi entri
- 👥 **Member Program** - Sistem keanggotaan dengan diskon khusus hingga 30%
- 🏷️ **Voucher & Promo** - Dukungan penggunaan voucher untuk potongan harga
- 📱 **Responsive Design** - Tampilan optimal di semua ukuran perangkat (mobile, tablet, desktop)
- 📧 **Email Verification** - Verifikasi email otomatis untuk keamanan akun

### Admin Dashboard
- 📊 **Dashboard Analytics** - Visualisasi data penjualan dan statistik transaksi
- 🎟️ **Manajemen Tiket** - CRUD lengkap untuk tiket dengan periode berlaku
- 👥 **Manajemen Pengguna** - Kelola data pengguna dan verifikasi member baru
- 💰 **Manajemen Voucher** - Buat dan kelola voucher promo dengan kontrol diskon
- 🏢 **Manajemen Fasilitas** - Kelola detail fasilitas wisata (deskripsi, kapasitas, kategori umur)
- 📈 **Laporan Transaksi** - Export laporan transaksi dalam format Excel
- 🚫 **Scan QR Ticket** - Validasi tiket menggunakan pemindai QR code
- 📋 **Verifikasi Member** - Proses verifikasi dan approval member baru
- 📄 **Generate Report** - Generate laporan bulanan dan export ke Excel

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Frontend Framework** | Next.js 14 |
| **Language** | TypeScript 5 |
| **UI Framework** | React 18 |
| **Styling** | Tailwind CSS 3 |
| **UI Components** | Radix UI |
| **Authentication** | NextAuth.js 4 |
| **Database** | MySQL |
| **ORM** | Prisma 5 |
| **Payment Gateway** | Midtrans |
| **Email Service** | Nodemailer, Resend |
| **Data Visualization** | Recharts |
| **QR Code** | jsQR, qrcode |
| **Excel Export** | ExcelJS |
| **Form Validation** | React Hook Form, Zod |
| **Table Management** | TanStack React Table |
| **Icon Library** | Phosphor Icons |

## 📦 Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (v18 atau lebih tinggi)
- **npm**, **yarn**, atau **pnpm**
- **MySQL Server** (v5.7 atau lebih tinggi) atau gunakan Railway/Cloud MySQL
- **Git**

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/kusuma-bloom.git
cd kusuma-bloom
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Setup Environment Variables
Buat file `.env.local` di root directory dan tambahkan:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/kusuma_bloom"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_MAX_AGE_TOKEN=2592000

# Midtrans Payment Gateway
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_SERVER_KEY="your-midtrans-server-key"

# Image Upload (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email Service (Nodemailer)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Email Service (Resend) - Optional
RESEND_API_KEY="your-resend-api-key"
```

### 4. Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Create/Migrate Database
npx prisma migrate deploy

# (Optional) Seed data
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Project Structure

```
kusuma-bloom/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication pages (login, register, verify)
│   │   ├── (user)/                   # User dashboard & profile
│   │   ├── admin/                    # Admin dashboard & management
│   │   ├── api/                      # API routes
│   │   │   ├── auth/                 # NextAuth configuration
│   │   │   ├── product/              # Product/Ticket endpoints
│   │   │   └── v1/                   # API v1 endpoints
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   │
│   ├── components/                   # React Components
│   │   ├── Admin/                    # Admin-specific components
│   │   │   ├── Dashboard/
│   │   │   ├── Facility/
│   │   │   ├── ScanQRCode/
│   │   │   ├── Ticket/
│   │   │   ├── Transaction/
│   │   │   ├── User/
│   │   │   └── Voucher/
│   │   ├── Auth/                     # Login & Register forms
│   │   ├── DataTable/                # Table components
│   │   ├── Facility/                 # Facility display
│   │   ├── Hero/                     # Hero section
│   │   ├── Membership/               # Member program components
│   │   ├── Modal/                    # Modal dialogs
│   │   └── ui/                       # Reusable UI components
│   │
│   ├── lib/                          # Utilities & Services
│   │   ├── actions/                  # Server actions
│   │   │   ├── authAction/
│   │   │   ├── facilityAction/
│   │   │   ├── memberUserAction/
│   │   │   ├── ticketAction/
│   │   │   ├── transactionAction/
│   │   │   ├── userAction/
│   │   │   └── voucherAction/
│   │   ├── cloudinary/               # Image upload service
│   │   ├── midtrans/                 # Payment gateway integration
│   │   ├── nodemailer/               # Email service
│   │   ├── resend/                   # Resend email service
│   │   ├── auth.ts                   # NextAuth configuration
│   │   ├── prisma.ts                 # Prisma client
│   │   └── utils.ts                  # Helper functions
│   │
│   ├── types/                        # TypeScript types & interfaces
│   │   ├── authAction/
│   │   ├── ticketAction/
│   │   ├── transactionAction/
│   │   ├── scanTicketAction/
│   │   └── ...
│   │
│   ├── utils/                        # Utility functions
│   │   ├── bcryptPasswordHash.ts     # Password hashing
│   │   ├── qrcode.ts                 # QR code generation
│   │   ├── excel.ts                  # Excel export
│   │   ├── data.ts                   # Static data
│   │   └── ...
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useQrCode.ts
│   │   ├── useQueryString.ts
│   │   └── useSnap.ts
│   │
│   └── middleware.ts                 # Next.js middleware
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Database migrations
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── about/
│   │   ├── avatar/
│   │   ├── favicon/
│   │   └── sponsors/
│   └── report/
│
├── .env.local                        # Environment variables (local)
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 📊 Database Schema

### Main Models
- **User** - Pengguna platform (admin & regular user)
- **Ticket** - Tiket yang tersedia dengan periode berlaku
- **Transaction** - Transaksi pembelian tiket
- **MemberUser** - Data member dengan diskon khusus
- **Voucher** - Kode promo dan potongan harga
- **Facility** - Fasilitas wisata yang tersedia
- **ScanTicket** - Record validasi tiket saat entry
- **Report** - Laporan bulanan transaksi
- **VerificationToken** - Token verifikasi email

## 🔐 Authentication Flow

1. **Registrasi** - User mendaftar dengan email dan password
2. **Email Verification** - User menerima email verifikasi dengan OTP
3. **Login** - User login dengan email dan password yang sudah diverifikasi
4. **Session Management** - JWT token untuk session management
5. **Role-based Access** - Admin dan Regular user dengan hak akses berbeda

## 💳 Payment Integration

Platform menggunakan **Midtrans** sebagai payment gateway dengan dukungan:
- 💵 Transfer Bank (Virtual Account)
- 📱 E-wallet (GCash, OVO, LinkAja, Dana, dsb)
- 💳 Kartu Kredit/Debit
- 🏪 Cicilan Tanpa Kartu Kredit

## 🔧 Available Scripts

```bash
# Development
npm run dev           # Jalankan development server

# Production
npm run build         # Build untuk production
npm start             # Jalankan production server

# Linting
npm run lint          # Check linting errors

# Database
npm run prisma:generate  # Generate Prisma Client

# Deployment (Vercel)
npm run vercel-build      # Build untuk Vercel dengan DB migration
```

## 📱 User Journey

### Pengunjung
1. Buka homepage dan lihat informasi tiket
2. Pilih tanggal dan kuantitas tiket
3. Masuk atau daftar akun
4. Verifikasi email dengan OTP
5. Lanjut ke pembayaran
6. Pilih metode pembayaran via Midtrans
7. Selesaikan pembayaran
8. Dapatkan e-ticket dengan QR code
9. (Optional) Bergabung program member untuk diskon

### Admin
1. Login ke dashboard admin
2. Kelola tiket, pengguna, voucher, dan fasilitas
3. Lihat analytics dashboard
4. Verifikasi member baru
5. Validasi tiket saat entry dengan QR scanner
6. Generate laporan transaksi bulanan

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Pastikan DATABASE_URL sudah benar di .env.local
# Cek koneksi MySQL server
mysql -u username -p
```

### NextAuth Secret Missing
```bash
# Generate secret baru
openssl rand -base64 32
# Tambahkan ke NEXTAUTH_SECRET di .env.local
```

### Prisma Migration Issues
```bash
# Reset database (hati-hati: akan menghapus semua data)
npx prisma migrate reset

# Atau deploy migration yang pending
npx prisma migrate deploy
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
docker build -t kusuma-bloom .
docker run -p 3000:3000 kusuma-bloom
```

## 📝 Environment Variables Reference

| Variable | Deskripsi | Contoh |
|----------|-----------|---------|
| DATABASE_URL | MySQL connection string | mysql://user:pass@host:3306/db |
| NEXTAUTH_URL | NextAuth callback URL | http://localhost:3000 |
| NEXTAUTH_SECRET | Secret key untuk JWT | (generated by openssl) |
| NEXTAUTH_MAX_AGE_TOKEN | Token expiry time (seconds) | 2592000 (30 hari) |
| NEXT_PUBLIC_MIDTRANS_CLIENT_KEY | Midtrans client key (public) | - |
| MIDTRANS_SERVER_KEY | Midtrans server key (private) | - |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | - |
| EMAIL_USER | Email untuk nodemailer | your-email@gmail.com |
| EMAIL_PASS | App password untuk email | - |

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Midtrans Integration Guide](https://docs.midtrans.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 👥 Contributing

Kontribusi dan saran selalu diterima! Silakan buat issue atau pull request.

## 📄 License

Project ini tersedia di bawah lisensi MIT. Lihat [LICENSE](LICENSE) untuk detail lebih lanjut.

## 📞 Support

Jika Anda memiliki pertanyaan atau membutuhkan bantuan, silakan buka issue di repository ini.

---

**Made with ❤️ by Ardianto**
