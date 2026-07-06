# RapidAct

**Türk Hukuku için Yapay Zeka Destekli Belge Asistanı** — Açık kaynaklı [willchen96/mike](https://github.com/willchen96/mike) projesinin, Türk hukuk pratiği için özelleştirilmiş bir fork'udur.

RapidAct; Next.js frontend, Express backend, Supabase (Auth/Postgres) ve Cloudflare R2 uyumlu nesne depolama üzerine kurulu bir hukuki belge asistanıdır. Türk avukatların dilekçe üretimi, sözleşme incelemesi ve mevzuat/içtihat araştırması iş akışları için uyarlanmıştır.

> **Lisans notu:** Bu proje, upstream ile aynı lisans olan **GNU AGPL-3.0** altındadır (bkz. [`LICENSE`](./LICENSE)). AGPL-3.0 §13 gereği, bu yazılımın değiştirilmiş bir sürümünü ağ üzerinden kullanıcılara sunuyorsanız, kaynak koda erişim imkânı sağlamak zorundasınız.

## Özellikler

### 1. Türk Hukuku Odaklı Asistan
- System prompt, Türk mevzuat kısaltmaları (TBK, TMK, TTK, HMK, İİK vb.), mahkeme hiyerarşisi (ilk derece, BAM, Yargıtay, Danıştay, AYM) ve zamanaşımı farkındalığı ile Türk hukukuna göre yeniden yazılmıştır.
- Asistan, Yargı PRO MCP Connector (https://yargi.betaspacestudio.com/mcp) üzerinden sağlanan Türk hukuki araştırma araçlarıyla (`mevzuat_ara`, `ictihat_ara`, `semantik_ictihat_ara`, `aym_ictihat_ara`) doğrulamadığı madde veya karar numarasını **atıf olarak kullanmaz** (halüsinasyon kontrolü).
- ABD içtihat araştırması (CourtListener) mevcuttur ancak kullanıcı bazında **varsayılan olarak kapalıdır**.

### 2. Türk Usul Hukuku İş Akışları
- HMK'ya dayalı yedi dilekçe iş akışı: dava, cevap, replik, düplik, istinaf, temyiz ve bilirkişi raporuna itiraz dilekçeleri.
- Türk mahkeme dilekçesi formatına uygun `petition` çıktı düzeni (numarasız başlıklar, sağa yaslı tarih/imza bloğu).
- Bilirkişi raporu incelemesi dahil, TBK / TTK / İş Kanunu / Av.K. maddelerine bağlanmış tablolu inceleme şablonları.

### 3. Türkçe Kullanıcı Arayüzü
Arayüz (yaklaşık 90 bileşen) Türkçeye çevrilmiş; tarih/para formatları `tr-TR` yereline, hukuki atıf terminolojisi Türk kullanımına ("a.g.e." vb.) uyarlanmıştır.

## Upstream'den Farklar (AGPL-3.0 §5 Bildirimi)

Bu yazılım, `willchen96/mike` projesinden değiştirilmiştir (son değişiklik: **2026-07-02**). Değişikliklerin dosya bazında tam dökümü için [`CHANGELOG.md`](./CHANGELOG.md) dosyasına bakın. Ana başlıklar: Türk hukuk pratiği adaptasyonu, marka değişikliği (Mike → RapidAct) ve tam Türkçe yerelleştirme.

## İçindekiler

- `frontend/` — Next.js uygulaması (React, TypeScript, Tailwind CSS)
- `backend/` — Express API, Supabase entegrasyonu, belge işleme
- `backend/schema.sql` — Yeni Supabase veritabanları için tam şema
- `backend/migrations/` — Tarihli artımlı migrationlar (mevcut veritabanına yalnızca deploy ettiğin sürümden sonraki tarihlileri uygula)

## Kurulum

### 1. Bağımlılıkları yükle

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 2. Ortam değişkenlerini hazırla

`backend/.env` ve `frontend/.env.local` dosyalarını oluştur ve doldur:
- Supabase URL ve anahtarları (backend: service role, frontend: anon key)
- R2/S3 depolama kimlik bilgileri
- Model sağlayıcı API anahtarları (Anthropic, Gemini veya OpenAI — en az biri)
- Opsiyonel: `COURTLISTENER_API_TOKEN` (ABD içtihadı için)

### 3. Veritabanını hazırla

Supabase SQL editöründe `backend/schema.sql` dosyasını çalıştır. (Mevcut/canlı bir veritabanında tam şemayı çalıştırma; `backend/migrations/` içindeki tarihli dosyaları sırayla uygula.)

### 4. Backend ve frontend'i başlat

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

Tarayıcıda `http://localhost:3000` adresini aç, uygulamada kayıt ol. Model anahtarını `.env` yerine **Hesap > Modeller & API Anahtarları** ekranından da girebilirsin.

## Gerekli Hizmetler

- **Node.js 20+**, npm, git
- **Supabase** — Veritabanı (PostgreSQL) ve kimlik doğrulama
- **S3-Uyumlu Depolama** — Cloudflare R2, MinIO, AWS S3 vb.
- **Model Sağlayıcı Anahtarı** — Anthropic, Gemini veya OpenAI
- **LibreOffice** — DOC/DOCX → PDF dönüşümü için (opsiyonel)

## Kontroller ve Derleme

```bash
npm run build --prefix backend
npm run build --prefix frontend
npm run lint --prefix frontend
```

## Lisans

**AGPL-3.0-only.** Detaylar için [`LICENSE`](./LICENSE) dosyasına bak. Bu projeyi fork'layıp değiştirirseniz: aynı lisansı korumak, telif bildirimlerini muhafaza etmek, değişikliklerinizi belirtmek ve (ağ üzerinden sunuyorsanız) kaynak kodu erişilebilir tutmak zorundasınız.

---

# RapidAct (English)

**AI-Powered Legal Document Assistant for Turkish Law** — a fork of the open-source [willchen96/mike](https://github.com/willchen96/mike) project, adapted for Turkish legal practice.

RapidAct is a legal document assistant built on a Next.js frontend, an Express backend, Supabase (Auth/Postgres), and Cloudflare R2-compatible object storage.

> **License note:** Licensed under **GNU AGPL-3.0** (see [`LICENSE`](./LICENSE)), same as upstream. Under AGPL-3.0 §13, if you run a modified version and let users interact with it over a network, you must offer them access to the corresponding source.

## Features

### 1. Turkish-Law-Focused Assistant
- System prompt rewritten around Turkish statutes (TBK, TMK, TTK, HMK, İİK, etc.), the Turkish court hierarchy, and statute-of-limitations awareness.
- Hallucination control: the assistant will not cite a statute article or case number it has not verified via the Yargı PRO MCP Connector (`mevzuat_ara`, `ictihat_ara`, `semantik_ictihat_ara`, `aym_ictihat_ara`).
- US case-law research (CourtListener) exists but is **off by default per user**.

### 2. Turkish Civil-Procedure Workflows
- Seven petition workflows grounded in HMK: statement of claim, answer, replik, düplik, appeal (istinaf), cassation (temyiz), and objection to expert report.
- A `petition` output layout matching Turkish court-filing conventions.
- Tabular review templates bound to TBK / TTK / Labor Code / Attorneyship Act provisions, including an expert-report review template.

### 3. Turkish UI
Full Turkish localization (~90 components), `tr-TR` date/currency formatting, and Turkish legal citation terminology.

## Changes from Upstream (AGPL-3.0 §5 Notice)

This software has been modified from `willchen96/mike` (last modified: **2026-07-02**). See [`CHANGELOG.md`](./CHANGELOG.md) for the full per-file record. Main themes: Turkish legal-practice adaptation, rebrand (Mike → RapidAct), full Turkish localization, and license-compliance fixes.

## Contents

- `frontend/` — Next.js application (React, TypeScript, Tailwind CSS)
- `backend/` — Express API, Supabase integration, document processing
- `backend/schema.sql` — Full schema for fresh Supabase databases
- `backend/migrations/` — Dated incremental migrations (on an existing database, apply only those dated after your deployed version)

## Setup

### 1. Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure environment

Create and fill `backend/.env` and `frontend/.env.local`:
- Supabase URL and keys (backend: service role, frontend: anon key)
- R2/S3 storage credentials
- Model provider API keys (Anthropic, Gemini, or OpenAI — at least one)
- Optional: `COURTLISTENER_API_TOKEN` for US case law

### 3. Initialize the database

Run `backend/schema.sql` in the Supabase SQL editor. (On an existing/production database, apply the dated files in `backend/migrations/` instead of the full schema.)

### 4. Run backend and frontend

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

Open `http://localhost:3000` and sign up. Model keys can also be added per user in **Account > Models & API Keys**.

## Required Services

- **Node.js 20+**, npm, git
- **Supabase** — Database (PostgreSQL) and Authentication
- **S3-Compatible Storage** — Cloudflare R2, MinIO, AWS S3, etc.
- **Model Provider API Key** — Anthropic, Gemini, or OpenAI
- **LibreOffice** — for DOC/DOCX → PDF conversion (optional)

## Build and Checks

```bash
npm run build --prefix backend
npm run build --prefix frontend
npm run lint --prefix frontend
```

## License

**AGPL-3.0-only.** See [`LICENSE`](./LICENSE). If you fork and modify this project you must: keep the same license, preserve copyright notices, state your changes, and (if serving it over a network) keep the corresponding source accessible.
