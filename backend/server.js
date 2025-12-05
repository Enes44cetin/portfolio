import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// .env dosyasını yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- TANI KOYMA (DEBUG) BAŞLANGIÇ ---
console.log("-------------------------------------------------");
console.log("Sunucu Başlatılıyor...");
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ HATA: GEMINI_API_KEY .env dosyasında bulunamadı veya okunamadı!");
  console.error("Lütfen .env dosyasını kontrol et ve kaydettiğinden emin ol.");
} else {
  console.log("✅ BAŞARILI: API Anahtarı yüklendi. (İlk 5 karakter: " + process.env.GEMINI_API_KEY.substring(0, 5) + "...)");
}
console.log("-------------------------------------------------");
// --- TANI KOYMA (DEBUG) BİTİŞ ---

app.post('/api/assistant', async (req, res) => {
  try {
    const { message } = req.body;

    // Doğru model ismi: gemini-1.5-flash
    const MODEL_NAME = "gemini-2.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

    console.log(`\n📩 Yeni İstek Geldi: "${message}"`);
    console.log(`📡 Google Gemini'ye Bağlanılıyor (${MODEL_NAME})...`);

    const response = await axios.post(
      API_URL,
      {
        contents: [{ parts: [{ text: message }] }],
        system_instruction: {
          parts: [{
            text: JSON.stringify({
              "role": "Enes Çetin'in Profesyonel Portfolyo Asistanı",
              "persona": {
                "tone": "Profesyonel, net, yardımsever, objektif ve dengeli.",
                "perspective": "Üçüncü şahıs (Enes/O) kullanımı.",
                "rules": [
                  "Abartılı övgülerden kaçın, gerçekçi ol.",
                  "Bilinmeyen konularda dürüst ol.",
                  "Kısa ve öz yanıtlar ver."
                ]
              },
              "profile": {
                "name": "Enes Çetin",
                "education": "Düzce Üniversitesi Yönetim Bilişim Sistemleri (YBS) Öğrencisi",
                "focus": "C#/.NET Geliştirme, SQL, Veritabanı Tasarımı, Teknoloji-İş Dünyası Entegrasyonu",
                "personality": "Öğrenmeye açık, araştırmacı, yenilikçi, disiplinli.",
                "strengths": ["Disiplin", "Teknik Temeller", "Araştırmacı Yaklaşım", "Öğrenme İsteği"],
                "development_areas": ["Zaman Yönetimi", "Multitasking", "Mükemmeliyetçilik", "Baskı Altında Motivasyon Düşüşü"]
              },
              "skills": {
                "programming": "C# (WinForms, Küçük Projeler), OOP Temelleri, Java (Orta)",
                "database": "SQL (CRUD, JOIN, İlişkisel Model), Entity Framework (CRUD)",
                "web": "HTML/CSS/JS (Temel)",
                "tools": "Git/GitHub, Azure Fundamentals, Unity 2D (Temel)"
              },
              "timeline": [
                "2024: YBS Lisans Başlangıcı",
                "2024: C# & SQL Projeleri (WinForms, EF)",
                "2024: Vaka Analizleri (SWOT/PESTEL)",
                "2025: Azure Fundamentals (MIUUL)",
                "2025: Kişisel Portfolyo Sitesi"
              ],
              "goals": [
                "Google Data Analytics Sertifikası",
                "Kurumsal Seviye C# & SQL Projeleri",
                "Veri Analitiği Stajı",
                "İleri SQL ve EF Core Uzmanlığı",
                "Azure Cloud Servisleri",
                "MIS Odaklı Karar Destek Sistemi Projesi"
              ]
            }, null, 2)
          }]
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("✅ Google Cevap Verdi!");
    res.json({ reply });

  } catch (error) {
    // Hatayı detaylıca terminale yazdır
    console.error("\n❌❌ BİR HATA OLUŞTU! ❌❌");
    if (error.response) {
      console.error("Google Hata Kodu:", error.response.status);
      console.error("Google Hata Mesajı:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Hata Mesajı:", error.message);
    }

    // Client tarafına da detay gönderelim ki verify_ai.js'de görebil
    res.status(500).json({
      reply: "Bir hata oluştu.",
      debug_error: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});