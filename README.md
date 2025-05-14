# GuOx

> **GuOx** — Modern, güvenlik odaklı Express.js uygulamaları için kolayca entegre edilebilir bir güvenlik kütüphanesi.
>
> ✅ "Plug-and-secure" mimarisi · ⚙️ İleri düzey yapılandırma desteği · 🚀 Performans dostu

## ✨ Özellikler

* ✅ **Tek satırla temel güvenlik** (Helmet, Rate Limit, XSS filter, CORS, HPP...)
* 🔧 **Gelişmiş yapılandırmalarla özelleştirilebilir**
* 🧩 **Modüler altyapı**: Sadece ihtiyacın olanı yükle
* ⚙️ **API-first tasarım**: REST & JSON projelerine özel
* 🛡️ **Middleware kontrollü akış**: Güvenliği rotaya göre ayarla
* 🔍 **Audit & debug araçları**: Ne yüklü, ne aktif, ne pasif anında görebil
* ⏱️ **Performans optimizasyonlu**: Gereksiz kontrol yok
* 🧪 **Test uyumlu**: Jest, Mocha, Supertest ile sorunsuz entegrasyon

---

## 🔧 Kurulum

```bash
npm install guox
```

---

## 🚀 Hızlı Başlangıç

```js
// server.js veya app.js
const express = require('express');
const { GuOx } = require('guox');

const app = express();
GuOx(app); // Tüm temel güvenlik önlemleri aktif

app.get('/', (req, res) => {
  res.send('GuOx güvende!');
});

app.listen(3000, () => console.log('Server 3000'de çalışıyor'));
```

---

## ⚙️ Yapılandırma

```js
GuOx(app, {
  helmet: true,
  cors: {
    origin: 'https://example.com',
    methods: ['GET', 'POST']
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100
  },
  xss: true,
  hpp: true,
  audit: true, // Konsola yüklenenleri loglar
});
```

Her özelliği devre dışı bırakabilir, ya da ayrıntılı yapılandırmalarla özelleştirebilirsiniz.

---

## 🧠 Desteklenen Modüller

| Özellik       | Açıklama                                 | Varsayılan |
| ------------- | ---------------------------------------- | ---------- |
| `helmet`      | HTTP header'larını güvenli hale getirir  | ✅          |
| `cors`        | CORS konfigürasyonu                      | ✅          |
| `rateLimit`   | IP başına istek limiti                   | ✅          |
| `xss`         | XSS filtreleme (xss-clean)               | ✅          |
| `hpp`         | HTTP parametre kirliliği önleme          | ✅          |
| `audit`       | Aktif modülleri loglar                   | ❌          |
| `debug`       | Konsol çıktısı olarak middleware logları | ❌          |
| `customRules` | İleri düzey kullanıcı kuralları          | ❌          |

---

## 🧩 Custom Middleware Desteği

GuOx modülerdir, isterseniz sadece kullanmak istediğiniz modülü çağırabilirsiniz:

```js
const { applyHelmet, applyRateLimit } = require('guox/modules');

applyHelmet(app);
applyRateLimit(app, {
  windowMs: 10 * 60 * 1000,
  max: 50,
});
```

---

## 💡 Sistem Gereksinimleri

* Node.js `>=14.x` (v18+ önerilir)
* Express `>=4.18`
* Unix tabanlı sistemlerde tam uyum (Linux/macOS)

---

## 🔍 Geliştiricilere Özel

GuOx ileri seviye kullanıcılar için tam kontrol sağlar:

```js
GuOx(app, {
  helmet: false,
  customRules: (req, res, next) => {
    if (req.ip.startsWith('192.168')) return res.status(403).send('Yerel erişim yasak.');
    next();
  },
  debug: true
});
```

### Kullanışlı Loglar:

* Aktif olan modülleri gösterir
* Middleware sıralamasını loglar
* Hata yakalama önerileri sunar

---

## ✅ Test Edildiği Ortamlar

* Node.js 16 / 18 / 20
* Express 4.18.x
* Jest / Mocha ile entegrasyon
* Docker + PM2 ile üretim ortamında test edildi

---

## 🌐 SSS / Sık Sorulanlar

**Q:** Hangi modüller zorunlu?

> Hiçbiri. Tüm modüller opsiyonel. `GuOx(app)` şeklinde çağırırsan tamamı aktif olur.

**Q:** Diğer güvenlik kütüphanelerine göre farkı ne?

> GuOx hepsini birleştirir ve tek noktadan kontrol etmeni sağlar. Hem yeni başlayanlara kolaylık, hem ileri seviyeye esneklik sunar.

**Q:** Performansa etkisi var mı?

> Tüm middleware'ler minimum etkili olacak şekilde ayarlanmıştır. Ağır loglama/dev mode yalnızca `debug` aktifse gerçekleşir.

---

## 📦 Yol Haritası

*

---

## 🛠️ Katkıda Bulun

Pull request'ler, öneriler, düzeltmeler ve test katkılarına açığız.

```bash
git clone https://github.com/GuOxJS/guox.git
cd guox
npm install
npm run dev
```

---

## 📄 Lisans

MIT © 2025 — GuOxJS

---

---

> **GuOx** ile güvenlik artık zahmet değil, sadece bir satır kod.
