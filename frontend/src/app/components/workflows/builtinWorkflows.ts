import type { Workflow } from "../shared/types";

export const BUILT_IN_WORKFLOWS: Workflow[] = [
    {
        id: "builtin-cp-checklist",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Ön Koşullar (CP) Kontrol Listesi Oluştur",
        type: "assistant",
        practice: "Genel İşlemler",
        prompt_md:
            "## Ön Koşullar (Conditions Precedent) Kontrol Listesi Oluştur\n\n" +
            "Yüklenen kredi sözleşmesini veya finansman belgesini incele ve kapsamlı bir " +
            "Ön Koşullar (CP) kontrol listesi oluştur.\n\n" +
            "Kontrol listesini indirilebilir bir Word belgesi olarak üretmek için MUTLAKA generate_docx aracını kullan. " +
            "generate_docx aracına MUTLAKA landscape: true geç — belge yatay yönlendirmede olmalıdır. " +
            "Kontrol listesini satır içinde gösterme — .docx dosyasını üret ve indirme bağlantısını sun.\n\n" +
            "Belgeyi şu şekilde yapılandır:\n" +
            "- Her koşul kategorisi için (ör. Kurumsal, Finansal, Hukuki, Teminat) başlıklı bir bölüm ekle\n" +
            "- Her kategori başlığının altına, tam olarak şu dört sütunu bu sırayla içeren bir tablo koy:\n" +
            "  1. Sıra No — kategori içindeki sıra numarası (1, 2, 3…)\n" +
            "  2. Madde No — sözleşmedeki madde veya ek (çizelge) referansı\n" +
            "  3. Koşul — ön koşulun kısa ve öz açıklaması\n" +
            "  4. Durum — kullanıcının dolduracağı boş alan (boş dize)\n\n" +
            "Her kategorinin satırları için bölüm nesnesindeki table alanını (content değil) kullan.",
        columns_config: null,
    },
    {
        id: "builtin-coc-dd",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Kontrol Değişikliği İncelemesi",
        type: "tabular",
        practice: "Şirketler Hukuku",
        prompt_md:
            "## Kontrol Değişikliği Durum Tespiti İncelemesi\n\n" +
            "Bu iş akışı, seçilen belgeler genelinde bir kontrol değişikliği durum tespiti (due diligence) incelemesi yapar.",
        columns_config: [
            {
                index: 0,
                name: "Taraflar",
                format: "bulleted_list",
                prompt: "Bu sözleşmenin tüm taraflarını belirle. Her taraf için tam ticaret unvanını ve rolünü belirt (ör. karşı taraf, lisans veren, kredi veren, tedarikçi).",
            },
            {
                index: 1,
                name: "Tarih",
                format: "date",
                prompt: "Bu sözleşmenin tarihi nedir? Başlangıç (yürürlük) tarihi imza tarihinden farklıysa her ikisini de belirt.",
            },
            {
                index: 2,
                name: "Süre",
                format: "text",
                prompt: "Bu sözleşmenin süresi nedir? Başlangıç ve bitiş tarihlerini ya da sürenin uzunluğunu belirt.",
            },
            {
                index: 3,
                name: "Kontrol Değişikliği Maddesi",
                prompt: "Bu belgedeki kontrol değişikliği madde(ler)ini belirle ve özetle. Tetikleyici ifadeyi birebir alıntıla ve 'kontrol değişikliği'nin neyi ifade ettiğini belirt.",
            },
            {
                index: 4,
                name: "Onay Gerekli mi",
                prompt: "Kontrol değişikliği herhangi bir tarafın önceden onayını gerektiriyor mu? Kimin onay vermesi gerektiğini, ihbar süresini ve koşulları belirle.",
            },
            {
                index: 5,
                name: "Fesih Hakları",
                prompt: "Kontrol değişikliği halinde hangi fesih hakları doğar? Kim feshedebilir ve ihbar gereklilikleri nelerdir?",
            },
            {
                index: 6,
                name: "Alım/Satım (Put/Call) Opsiyonları",
                prompt: "Kontrol değişikliğiyle tetiklenen herhangi bir alım (call) veya satım (put) opsiyonu var mı? Şartları, fiyatlamayı ve kullanım süresini özetle.",
            },
            {
                index: 7,
                name: "Finansal Sonuçlar",
                prompt: "Kontrol değişikliğinin finansal sonuçları nelerdir? Komisyonları, ödemeleri, muaccel hale gelen yükümlülükleri veya fiyat düzeltmelerini dahil et.",
            },
        ],
    },
    {
        id: "builtin-credit-summary",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Kredi Sözleşmesi Özeti",
        type: "assistant",
        practice: "Finans",
        prompt_md:
            "## Kredi Sözleşmesi Özeti\n\n" +
            "Yüklenen kredi sözleşmesini incele ve aşağıdaki başlıkları kapsayan kapsamlı bir hukuki özet hazırla. " +
            "Her bölüm için temel hükümleri belirle, ilgili madde veya ek (çizelge) referanslarını alıntıla ve olağandışı, ağır ya da piyasa standardı dışı şartları işaretle.\n\n" +
            "1. **Kredi Verenler** — Tüm kredi verenler veya kredi konsorsiyumu üyeleri; tam ticaret unvanı ve rolü (ör. yetkili lider düzenleyici, asıl kredi veren, agent banka) dahil\n" +
            "2. **Kredi Alanlar** — Tüm kredi alanlar; tam ticaret unvanı ve kuruluş yeri (merkez) dahil\n" +
            "3. **Kefiller/Garantörler** — Tüm kefil veya garantörler; tam ticaret unvanı ve kefalet/garanti yükümlülüğünün kapsamı dahil\n" +
            "4. **Diğer Taraflar** — Diğer önemli taraflar (ör. kredi agent'ı, teminat agent'ı, türev işlem karşı tarafları, akreditif bankası) ve rolleri\n" +
            "5. **Sözleşme Tarihi** — Kredi sözleşmesinin tarihi\n" +
            "6. **Krediler/Tahsisler** — Kullanılabilir her kredi (ör. Rotatif Kredi, Vadeli Kredi A, Vadeli Kredi B), kredi türü, dilim adı ve temel yapısal özellikler\n" +
            "7. **Tutar** — Tüm kredilerin toplam taahhüt tutarı, para birimi ve varsa dilim bazında dağılım\n" +
            "8. **Kullanım Amacı** — Kredinin kullanılabileceği belirtilen amaç ve kaynakların kullanımına ilişkin kısıtlamalar\n" +
            "9. **Faiz** — Uygulanacak referans oran (ör. TLREF, EURIBOR, SOFR), marj, varsa marj kademe (ratchet) mekanizması ve faiz dönemlerinin yapısı\n" +
            "10. **Taahhüt Komisyonu** — Taahhüt veya kullandırım komisyonları, uygulanan oran, hesaplanma biçimi ve esası (ör. kullanılmayan taahhüt, ortalama kullanım)\n" +
            "11. **Geri Ödeme Planı** — Her kredi için geri ödeme profili, taksitli mi yoksa tek seferde (balon) mi olduğu, geri ödeme tarihleri ve tutarları\n" +
            "12. **Vade** — Her kredi için nihai vade tarihi\n" +
            "13. **Teminatlar** — Verilen veya verilmesi gereken her teminat türü (ör. pay/hisse rehni, ticari işletme rehni, ipotek, hesap rehni) ve teminatın tesis edildiği varlık veya kuruluşlar\n" +
            "14. **Kefalet/Garantiler** — Kefalet/garanti yükümlülükleri, kefiller, kapsamı ve sınırlamaları (ör. üst kuruluş kefalet sınırlamaları, kefil kapsama testi)\n" +
            "15. **Finansal Taahhütler (Covenants)** — Her finansal taahhüt, ölçüt (ör. kaldıraç oranı, faiz karşılama, nakit akışı karşılama), uygulanan test, test sıklığı ve varsa sermaye ile düzeltme (equity cure) hakları\n" +
            "16. **Temerrüt Halleri** — Her temerrüt hali; varsa ek süreler, önemlilik eşikleri veya çapraz temerrüt hükümleri belirtilerek\n" +
            "17. **Devir/Temlik** — Devir veya temlik üzerindeki kısıtlamalar ya da izinler (ör. izinli/yasaklı liste, kredi veren devirlerinde kredi alan onayı; kredi alanın temlikine ilişkin kısıtlamalar)\n" +
            "18. **Kontrol Değişikliği** — Kontrol değişikliği sayılan haller, tetiklediği yükümlülükler (ör. zorunlu erken ödeme, iptal, kredi veren onayı) ve varsa düzeltme süresi\n" +
            "19. **Erken Ödeme Bedeli** — Varsa erken ödeme bedelleri, make-whole primleri veya soft-call korumaları; uygulanan bedel, uygulandığı dönem ve istisnalar (ör. sigorta tazminatı veya varlık satışı gelirinden erken ödeme)\n" +
            "20. **Uygulanacak Hukuk** — Sözleşmeye uygulanacak hukuk\n" +
            "21. **Uyuşmazlık Çözümü** — Uyuşmazlıkların mahkemeye mi yoksa tahkime mi gideceği, seçilen yetkili mahkeme veya tahkim yeri ve yetki şartına ilişkin hükümler\n\n" +
            "Özeti sohbet yanıtında satır içinde sun — generate_docx ÇAĞIRMA. Yalnızca kullanıcı açıkça isterse indirilebilir bir Word belgesi üret.",
        columns_config: null,
    },

    // ─── Ticari Sözleşme ─────────────────────────────────────────────────────────
    {
        id: "builtin-commercial-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Ticari Sözleşme İncelemesi",
        type: "tabular",
        practice: "Genel İşlemler",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Taraflar",
                format: "bulleted_list",
                prompt: "Bu sözleşmenin tüm taraflarını belirle. Her taraf için tam ticaret unvanını, kuruluş yerini (belirtilmişse) ve sözleşmedeki rolünü belirt (ör. tedarikçi, müşteri, lisans veren).",
            },
            {
                index: 1,
                name: "İşin Kapsamı",
                format: "text",
                prompt: "Bu sözleşme kapsamında sağlanacak işin veya hizmetlerin kapsamını özetle. Temel teslimatlar, yükümlülükler veya hizmetler nelerdir? Kapsama ilişkin sınırlamaları veya istisnaları belirle.",
            },
            {
                index: 2,
                name: "Önceki Sözleşmeyi Değiştiriyor mu",
                format: "yes_no",
                prompt: "Bu sözleşme daha önceki bir sözleşmeyi tadil ediyor, yeniden düzenliyor, tamamlıyor veya değiştiriyor mu? Evet ise önceki sözleşmeyi adı ve tarihiyle belirle.",
            },
            {
                index: 3,
                name: "Yürürlük Tarihi",
                format: "date",
                prompt: "Bu sözleşmenin yürürlük (başlangıç) tarihi nedir? Açık bir tarih belirtilmemişse ne zaman yürürlüğe girmiş sayıldığını not et.",
            },
            {
                index: 4,
                name: "Süre",
                format: "text",
                prompt: "Bu sözleşmenin süresi nedir? İlk dönem uzunluğunu ve süreyi etkileyen koşulları belirt.",
            },
            {
                index: 5,
                name: "Yenileme",
                format: "text",
                prompt: "Hangi yenileme hükümleri uygulanır? Yenilemenin otomatik mi yoksa ihbar gerektirip gerektirmediğini, yenileme süresini ve otomatik yenilemeyi önlemek için gereken koşul veya ihbar sürelerini belirt.",
            },
            {
                index: 6,
                name: "Fiyatlandırma",
                format: "text",
                prompt: "Bu sözleşmedeki fiyatlandırma yapısı nedir? Para birimi, ödeme planı ve fatura gereklilikleri dahil tüm ücretleri, oranları, bedelleri ve ödeme şartlarını belirle.",
            },
            {
                index: 7,
                name: "Fiyat Düzeltmeleri",
                format: "text",
                prompt: "Bu sözleşmede herhangi bir fiyat düzeltme mekanizması var mı? Endeksleme, ÜFE/TÜFE bağlantısı, kıyaslama (benchmarking), hacme dayalı düzeltmeler veya fiyatların süre boyunca değişmesine izin veren diğer mekanizmaları belirle.",
            },
            {
                index: 8,
                name: "Gecikme Faizi/Cezaları",
                format: "text",
                prompt: "Geç ödeme için hangi cezalar veya sonuçlar uygulanır? Vadesi geçen tutarlara uygulanan faiz oranlarını, askıya alma haklarını veya alacaklının başvurabileceği diğer yaptırımları dahil et.",
            },
            {
                index: 9,
                name: "Tahmini Sözleşme Değeri",
                format: "monetary_amount",
                prompt: "Toplam tahmini veya belirtilen sözleşme değeri nedir? Tek bir rakam verilmemişse belirtilen oranlara ve süreye göre hesapla veya tahmin et. Para birimini ve yapılan varsayımları belirt.",
            },
            {
                index: 10,
                name: "Sorumluluğun Sınırlandırılması",
                format: "text",
                prompt: "Hangi sorumluluk sınırlamaları uygulanır? Sorumluluk üst sınırlarını (nasıl hesaplandığı dahil), dolaylı veya netice kabilinden zararların hariç tutulmasını ve üst sınırdan istisnaları (ör. hile/kasıt, ölüm, fikrî mülkiyet ihlali) belirle.",
            },
            {
                index: 11,
                name: "Fikrî Mülkiyet Sahipliği ve Lisanslama",
                format: "text",
                prompt: "Fikrî mülkiyet sahipliği ve lisanslama nasıl düzenlenmiş? Mevcut fikrî mülkiyetin kime ait olduğunu, yeni oluşturulan fikrî mülkiyetin kime ait olduğunu ve her tarafa verilen lisansları belirle. Kullanıma ilişkin kısıtlamaları not et.",
            },
            {
                index: 12,
                name: "Kontrol Değişikliği",
                format: "text",
                prompt: "Bir kontrol değişikliği hükmü var mı? Varsa kontrol değişikliğinin neyi ifade ettiğini, onay gerekip gerekmediğini ve tetiklenen hakları (ör. fesih, devir) açıkla.",
            },
            {
                index: 13,
                name: "Mücbir Sebep",
                format: "text",
                prompt: "Mücbir sebep maddesini özetle. Hangi olaylar mücbir sebep sayılır, hangi yükümlülükler askıya alınır, fesih mümkün olmadan önce olayın ne kadar sürmesi gerekir ve hangi ihbar gereklidir?",
            },
            {
                index: 14,
                name: "Fesih Hakları",
                format: "text",
                prompt: "Her tarafın fesih hakları nelerdir? Sebepsiz fesih (ihbar süresi dahil), haklı sebeple fesih (düzeltme süreleri dahil) ve feshin sonuçlarını (ör. ödeme yükümlülükleri, hükümlerin yürürlükte kalması) belirle.",
            },
            {
                index: 15,
                name: "Cezai Şart (Götürü Tazminat)",
                format: "text",
                prompt: "Herhangi bir cezai şart (götürü tazminat) hükmü var mı? Varsa neyi tetiklediğini, uygulanan oran veya formülü, toplam cezai şart üzerinde bir üst sınır olup olmadığını ve bunun münhasır yaptırım olup olmadığını belirle.",
            },
            {
                index: 16,
                name: "Uygulanacak Hukuk",
                format: "text",
                prompt: "Bu sözleşmeye hangi hukuk uygulanır? Yargı bölgesini ve atıf yapılan özel hukuk sistemini belirt.",
            },
            {
                index: 17,
                name: "Uyuşmazlık Çözümü",
                format: "text",
                prompt: "Bu sözleşmede uyuşmazlıklar nasıl çözülür? Uyuşmazlıkların mahkemeye mi yoksa tahkime mi gideceğini, seçilen yetkili mahkeme veya tahkim yerini, resmi süreçten önce gereken tırmandırma veya arabuluculuk adımlarını ve yargılamanın dilini belirle.",
            },
        ],
    },

    // ─── Kredi Sözleşmesi ────────────────────────────────────────────────────────
    {
        id: "builtin-credit-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Kredi Sözleşmesi İncelemesi",
        type: "tabular",
        practice: "Finans",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Kredi Verenler",
                format: "bulleted_list",
                prompt: "Bu sözleşmede adı geçen tüm kredi verenleri (veya kredi konsorsiyumunu) belirle. Her biri için tam ticaret unvanını ve rolünü belirt (ör. yetkili lider düzenleyici, asıl kredi veren, agent banka).",
            },
            {
                index: 1,
                name: "Kredi Alanlar",
                format: "bulleted_list",
                prompt: "Bu sözleşmede adı geçen tüm kredi alanları, tam ticaret unvanı ve kuruluş yeri (merkez) dahil belirle.",
            },
            {
                index: 2,
                name: "Kefiller/Garantörler",
                format: "bulleted_list",
                prompt: "Bu sözleşmede adı geçen tüm kefil veya garantörleri, tam ticaret unvanı ve kefalet/garanti yükümlülüğünün kapsamı dahil belirle.",
            },
            {
                index: 3,
                name: "Diğer Taraflar",
                format: "bulleted_list",
                prompt: "Bu sözleşmenin diğer önemli taraflarını (ör. kredi agent'ı, teminat agent'ı, türev işlem karşı tarafları, akreditif bankası) belirle. Adlarını ve rollerini belirt.",
            },
            {
                index: 4,
                name: "Sözleşme Tarihi",
                format: "date",
                prompt: "Bu kredi sözleşmesinin tarihi nedir?",
            },
            {
                index: 5,
                name: "Kredi/Tahsis",
                format: "bulleted_list",
                prompt: "Bu sözleşme kapsamında kullanılabilir her krediyi listele (ör. Rotatif Kredi, Vadeli Kredi A, Vadeli Kredi B). Her biri için kredi türünü, dilim adını ve temel yapısal özellikleri belirt.",
            },
            {
                index: 6,
                name: "Tutar",
                format: "monetary_amount",
                prompt: "Bu sözleşme kapsamında tüm kredilerde kullanılabilir toplam taahhüt tutarı nedir? Tutarı, para birimini ve varsa dilim bazında dağılımı belirt.",
            },
            {
                index: 7,
                name: "Kullanım Amacı",
                format: "text",
                prompt: "Bu sözleşme kapsamında kredilerin kullanılabileceği belirtilen amaç nedir? Kaynakların kullanımına ilişkin kısıtlamaları belirle.",
            },
            {
                index: 8,
                name: "Faiz",
                format: "text",
                prompt: "Bu sözleşme kapsamındaki kredilere hangi faiz oranı uygulanır? Uygulanacak oranı (ör. TLREF, EURIBOR, SOFR), marjı, varsa marj kademe (ratchet) mekanizmasını ve faiz dönemlerinin yapısını belirle. Kredi alan bir tacir ve kredi ticari iş niteliğindeyse TTK m. 8 uyarınca faiz oranı serbestçe kararlaştırılabilir; taraflardan biri tacir değilse veya ilişki ticari nitelikte sayılmazsa TBK m. 88 uyarınca sözleşme faizi Merkez Bankası'nın belirlediği yıllık azami orandan yüksek olamaz — kredi alanın niteliğine göre bu sınırın uygulanıp uygulanmadığını belirt.",
            },
            {
                index: 9,
                name: "Taahhüt Komisyonu",
                format: "text",
                prompt: "Taahhüt komisyonu veya kullandırım komisyonu var mı? Varsa uygulanan oranı, hesaplanma biçimini ve esasını (ör. kullanılmayan taahhüt, ortalama kullanım) belirt.",
            },
            {
                index: 10,
                name: "Geri Ödeme Planı",
                format: "text",
                prompt: "Her kredi için geri ödeme planını özetle. Geri ödemenin taksitli mi yoksa tek seferde (balon) mi olduğunu belirle ve belirtilmişse geri ödeme tarihlerini ve tutarlarını ver.",
            },
            {
                index: 11,
                name: "Vade",
                format: "date",
                prompt: "Bu sözleşme kapsamındaki kredilerin nihai vade tarihi nedir? Farklı kredilerin farklı vadeleri varsa her birini belirt.",
            },
            {
                index: 12,
                name: "Teminatlar",
                format: "bulleted_list",
                prompt: "Bu sözleşme kapsamında hangi teminatlar verilir veya verilmesi gerekir? Her teminat türünü (ör. pay/hisse rehni, ticari işletme rehni, ipotek, hesap rehni) ve teminatın tesis edildiği varlık veya kuruluşları listele.",
            },
            {
                index: 13,
                name: "Kefalet/Garantiler",
                format: "bulleted_list",
                prompt: "Bu sözleşme kapsamında veya bağlantılı olarak hangi kefalet/garanti yükümlülükleri verilir? Kefilleri, kefaletin kapsamını ve sınırlamaları (ör. üst kuruluş kefalet sınırlamaları, kefil kapsama testi) belirle.",
            },
            {
                index: 14,
                name: "Finansal Taahhütler",
                format: "bulleted_list",
                prompt: "Bu sözleşmede hangi finansal taahhütler (covenants) yer alır? Her taahhüt için ölçütü (ör. kaldıraç oranı, faiz karşılama, nakit akışı karşılama), uygulanan testi, test sıklığını ve varsa sermaye ile düzeltme haklarını belirle.",
            },
            {
                index: 15,
                name: "Temerrüt Halleri",
                format: "bulleted_list",
                prompt: "Bu sözleşme kapsamındaki temerrüt hallerini listele. Her biri için varsa ek süreleri, önemlilik eşiklerini veya çapraz temerrüt hükümlerini not et. Muacceliyet (erken talep) hakkının ihtara bağlı olup olmadığını belirt — TBK m. 117 vd. uyarınca kural olarak borçlunun temerrüde düşürülmesi ihtar çekilmesini gerektirir; sözleşmede ihtarsız muacceliyet (otomatik temerrüt) kararlaştırılmışsa bunu ayrıca işaretle.",
            },
            {
                index: 16,
                name: "Devir/Temlik",
                format: "text",
                prompt: "Bu sözleşme kapsamındaki hakların devri veya temlikine hangi kısıtlamalar ya da izinler uygulanır? Kredi veren devirlerine (ör. izinli/yasaklı liste, kredi alan onayı) ve kredi alanın temlikine ilişkin kısıtlamaları belirle.",
            },
            {
                index: 17,
                name: "Kontrol Değişikliği",
                format: "text",
                prompt: "Bir kontrol değişikliği hükmü var mı? Varsa neyin kontrol değişikliği sayıldığını, hangi yükümlülükleri tetiklediğini (ör. zorunlu erken ödeme, iptal, kredi veren onayı) ve bir düzeltme süresi olup olmadığını belirt.",
            },
            {
                index: 18,
                name: "Erken Ödeme Bedeli",
                format: "text",
                prompt: "Herhangi bir erken ödeme bedeli, make-whole primi veya soft-call koruması var mı? Varsa uygulanan bedeli, uygulandığı dönemi ve istisnaları (ör. sigorta tazminatı veya varlık satışından erken ödeme) belirt. Bu bir ticari kredi ise erken ödeme bedeli sözleşme serbestisi kapsamında kararlaştırılabilir; kredi alan tüketici sıfatıyla borçlanmışsa 6502 sayılı TKHK m. 34 uyarınca erken ödemede faiz indirimi zorunludur ve erken ödeme tazminatı üst sınırlara tabidir — kredi alanın sıfatına göre bunu belirt.",
            },
            {
                index: 19,
                name: "Uygulanacak Hukuk",
                format: "text",
                prompt: "Bu sözleşmeye hangi hukuk uygulanır? Yargı bölgesini ve atıf yapılan özel hukuk sistemini belirt. Kredi alan Türkiye'de kuruluysa, Bankacılık Kanunu ve BDDK düzenlemelerinden doğan emredici gözetim/lisans kurallarının yabancı hukuk seçimiyle bertaraf edilemeyeceğini not et (MÖHUK m. 24).",
            },
            {
                index: 20,
                name: "Uyuşmazlık Çözümü",
                format: "text",
                prompt: "Bu sözleşmede uyuşmazlıklar nasıl çözülür? Uyuşmazlıkların mahkemeye mi yoksa tahkime mi gideceğini, seçilen yetkili mahkeme veya tahkim yerini ve yetki şartına ilişkin hükümleri belirle.",
            },
        ],
    },

    // ─── E-Keşif (Elektronik Delil İncelemesi) ───────────────────────────────────
    {
        id: "builtin-ediscovery",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Elektronik Delil İncelemesi",
        type: "tabular",
        practice: "Dava/Uyuşmazlık",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Tarih",
                format: "date",
                prompt: "Bu belgenin tarihi nedir? E-postalar veya yazışmalar için gönderim tarihini kullan. Diğer belgeler için oluşturma, imza veya en belirgin tarihi kullan.",
            },
            {
                index: 1,
                name: "Belge Türü",
                format: "text",
                prompt: "Bu belge ne tür bir belgedir? (ör. e-posta, yazışma/muhtıra, mektup, sözleşme, rapor, toplantı tutanağı, kısa mesaj, fatura, sunum). Açık ve belirli ol.",
            },
            {
                index: 2,
                name: "Gönderen",
                format: "text",
                prompt: "Bu belgenin göndereni veya yazarı kimdir? Belirlenebiliyorsa tam adını, unvanını ve kurumunu belirt.",
            },
            {
                index: 3,
                name: "Alıcı(lar)",
                format: "bulleted_list",
                prompt: "Bu belgenin alıcıları kimlerdir? Belirlenebildiği ölçüde tüm Kime, Bilgi (CC) ve Gizli (BCC) alıcılarını listele. Her biri için tam adı, unvanı ve kurumu belirt. Kime/CC/BCC alanlarından hangisinde göründüklerini not et.",
            },
            {
                index: 4,
                name: "Özet",
                format: "text",
                prompt: "Bu belgenin içeriğine ilişkin 2–4 cümlelik öz ve olgusal bir özet sun. Temel konuya, alınan kararlara, talep edilen işlemlere veya iletilen bilgilere odaklan. Hukuki sonuç/değerlendirme ekleme.",
            },
            {
                index: 5,
                name: "Adı Geçen Kişiler",
                format: "bulleted_list",
                prompt: "Bu belgede adı geçen tüm kişileri (zaten belirlenen gönderen ve alıcılar dışında) listele. Her kişi için adını ve, anlaşılabiliyorsa, rolünü veya kurumunu belirt.",
            },
            {
                index: 6,
                name: "Meslek Sırrı Kapsamında mı?",
                format: "yes_no",
                prompt: "Bu belge, avukatın mesleki sır saklama yükümlülüğü (Avukatlık Kanunu m. 36) kapsamında korunan bir iletişim mi görünüyor? Belge, ağırlıklı olarak hukuki danışmanlık almak/vermek amacıyla avukat ile müvekkil arasında yapılmış bir yazışma niteliğindeyse Evet yanıtla; aksi halde Hayır. Not: Türk hukukunda ABD tarzı kapsamlı 'discovery' süreci ve buna bağlı 'privilege log' uygulaması yoktur; mahkemenin HMK m. 219 vd. uyarınca somut ve sınırlı bir belge ibrazı talebinde bulunması hâlinde, avukat-müvekkil yazışmaları Avukatlık Kanunu m. 36 ve HMK m. 400 (meslek sırrı nedeniyle tanıklıktan/ibrazdan çekinme hakkı) kapsamında ibrazdan kaçınma gerekçesi oluşturabilir. Emin değilsen belirsizliğin gerekçesini not et.",
            },
        ],
    },

    // ─── Tedarik Sözleşmesi ──────────────────────────────────────────────────────
    {
        id: "builtin-supply-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Tedarik Sözleşmesi İncelemesi",
        type: "tabular",
        practice: "Genel İşlemler",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Taraflar",
                format: "bulleted_list",
                prompt: "Bu tedarik sözleşmesinin tüm taraflarını belirle. Her biri için tam ticaret unvanını, kuruluş yerini (belirtilmişse) ve rolünü (ör. tedarikçi, alıcı, distribütör) belirt.",
            },
            {
                index: 1,
                name: "Yürürlük Tarihi",
                format: "date",
                prompt: "Bu sözleşmenin yürürlük (başlangıç) tarihi nedir? Açık bir tarih belirtilmemişse yürürlüğe girmiş sayıldığı tarihi not et.",
            },
            {
                index: 2,
                name: "Ürünler",
                format: "bulleted_list",
                prompt: "Bu sözleşme kapsamında hangi ürünler tedarik edilecek? Her ürünü veya ürün kategorisini, atıf yapılan ilgili teknik özellikler, parça numaraları veya standartlar dahil listele.",
            },
            {
                index: 3,
                name: "Süre",
                format: "text",
                prompt: "Bu sözleşmenin ilk dönemi veya süresi nedir? Başlangıç tarihini (veya ne zaman başladığına ilişkin atfı) ve bitiş tarihini ya da süreyi belirt.",
            },
            {
                index: 4,
                name: "Yenileme",
                format: "text",
                prompt: "Hangi yenileme hükümleri uygulanır? Yenileme otomatik mi yoksa anlaşmayla mı olur? Yenileme süresini, yenilemeyi önlemek için gereken ihbar gerekliliklerini ve yenileme koşullarını belirt.",
            },
            {
                index: 5,
                name: "Teslimat",
                format: "text",
                prompt: "Hangi teslimat yükümlülükleri ve şartları uygulanır? Teslim şartlarını (ör. Incoterms), teslim sürelerini, teslim yerlerini, hasarın geçişini (yarar ve hasarın intikali) ve geç ya da başarısız teslimatın sonuçlarını belirle.",
            },
            {
                index: 6,
                name: "Kalite",
                format: "text",
                prompt: "Ürünlere hangi kalite standartları veya teknik özellikler uygulanır? Uygulanabilir standartları (ör. ISO, mevzuat gereklilikleri), muayene haklarını, kabul prosedürlerini ve uygunsuzluğun sonuçlarını belirle.",
            },
            {
                index: 7,
                name: "Garanti/Ayıba Karşı Tekeffül",
                format: "text",
                prompt: "Tedarikçi ürünlere ilişkin hangi garantileri (ayıba karşı tekeffül) verir? Garanti süresini, kapsamını (ör. ayıpsızlık, teknik özelliklere uygunluk), ihlal halinde yaptırımı (ör. onarım, değişim, bedel iadesi) ve istisnaları belirt. Bu, TBK m. 219 vd. (satıştan doğan ayıba karşı tekeffül) veya sözleşme bir imalat/üretim ilişkisiyse TBK m. 470 vd. (eser sözleşmesi) çerçevesinde değerlendirilir. Sözleşmede alıcının teslim aldığı malı gecikmeksizin muayene edip ayıbı süratle bildirme yükümlülüğü (TBK m. 223) düzenlenmiş mi, düzenlenmişse bildirim süresini belirt — bu yükümlülüğe uyulmaması alıcının tekeffül haklarını kaybetmesine yol açabilir.",
            },
            {
                index: 8,
                name: "Cezai Şart (Götürü Tazminat)",
                format: "text",
                prompt: "Herhangi bir cezai şart (götürü tazminat) hükmü var mı? Varsa neyi tetiklediğini (ör. geç teslimat, kalite standartlarının karşılanmaması), uygulanan oran veya formülü, toplam üst sınırı ve bunun münhasır yaptırım olarak belirtilip belirtilmediğini belirle. TBK m. 179-182 çerçevesinde değerlendir: cezai şart hem ifayı hem cezayı birlikte talep imkânı tanıyor mu, yoksa ifa yerine mi kararlaştırılmış? TBK m. 182/f.3 uyarınca hâkimin aşırı gördüğü cezai şartı resen indirme yetkisi bulunduğunu not et — özellikle oran/tavan piyasa pratiğine göre aşırı yüksekse bunu işaretle.",
            },
            {
                index: 9,
                name: "Sorumluluğun Sınırlandırılması",
                format: "text",
                prompt: "Hangi sorumluluk sınırlamaları uygulanır? Sorumluluk üst sınırlarını (ve nasıl hesaplandıklarını, ör. sözleşme değeri, ödenen bedel), dolaylı veya netice kabilinden zararların hariç tutulmasını ve sınırlamadan istisnaları (ör. hile/kasıt, ağır kusur, ölüm veya bedensel zarar) belirle. ÖNEMLİ: TBK m. 115 uyarınca borçlunun ağır kusurundan (kast veya ağır ihmal) doğan sorumluluğunu önceden kaldıran veya sınırlayan kayıtlar kesin hükümsüzdür — sözleşmedeki üst sınırın hile/kasıt veya ağır ihmal hallerini açıkça istisna tutup tutmadığını kontrol et.",
            },
            {
                index: 10,
                name: "Mücbir Sebep",
                format: "text",
                prompt: "Mücbir sebep maddesini özetle. Hangi olaylar mücbir sebep sayılır, hangi yükümlülükler askıya alınır, hangi ihbar verilmelidir, taraflardan biri feshedebilmeden önce olayın ne kadar sürmesi gerekir ve mücbir sebeple feshin sonuçları nelerdir?",
            },
            {
                index: 11,
                name: "Fesih Hakları",
                format: "text",
                prompt: "Her tarafın fesih hakları nelerdir? Sebepsiz fesih (ihbar süresi dahil) ile haklı sebeple fesih (düzeltme süreleri ve tetikleyiciler dahil) arasında ayrım yap. Fesih halinde, açık siparişler veya ödeme yükümlülükleri dahil ne olacağını not et.",
            },
            {
                index: 12,
                name: "Uygulanacak Hukuk",
                format: "text",
                prompt: "Bu sözleşmeye hangi hukuk uygulanır? Yargı bölgesini ve atıf yapılan özel hukuk sistemini belirt. Taraflar farklı ülkelerdeyse ve sözleşme mal satımına ilişkinse, Türkiye'nin taraf olduğu Milletlerarası Mal Satımına İlişkin Sözleşmeler Hakkında BM Antlaşması'nın (CISG) açıkça hariç tutulup tutulmadığını kontrol et — hariç tutulmamışsa ve karşı taraf da bir CISG üyesi ülkedeyse, seçilen ulusal hukuğun yanı sıra CISG hükümleri de uygulanabilir.",
            },
            {
                index: 13,
                name: "Uyuşmazlık Çözümü",
                format: "text",
                prompt: "Bu sözleşmede uyuşmazlıklar nasıl çözülür? Uyuşmazlıkların mahkemeye mi yoksa tahkime mi gideceğini, seçilen yetkili mahkeme veya tahkim yerini ve resmi süreçten önce gereken zorunlu tırmandırma adımlarını (ör. müzakere, arabuluculuk) belirle.",
            },
        ],
    },

    // ─── Pay Devir Sözleşmesi (SPA) ──────────────────────────────────────────────
    {
        id: "builtin-spa",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Pay Devir Sözleşmesi (SPA) İncelemesi",
        type: "tabular",
        practice: "Şirketler Hukuku",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Taraflar",
                format: "bulleted_list",
                prompt: "Bu pay devir sözleşmesinin tüm taraflarını belirle. Her biri için tam ticaret unvanını, kuruluş yerini (belirtilmişse) ve rolünü (ör. satıcı, alıcı, hedef şirket, garanti veren, kefil) belirt.",
            },
            {
                index: 1,
                name: "Tarih",
                format: "date",
                prompt: "Bu pay devir sözleşmesinin tarihi nedir?",
            },
            {
                index: 2,
                name: "İşlem",
                format: "text",
                prompt: "İşlemi özetle. Hangi paylar veya menfaatler, hangi hedef şirket(ler)de devralınıyor ve işlemin niteliği nedir (ör. %100 devralma, çoğunluk payı, azınlık yatırımı)?",
            },
            {
                index: 3,
                name: "Bedel (Satış Bedeli)",
                format: "monetary_amount",
                prompt: "Bu sözleşme kapsamında ödenecek bedel nedir? Toplam görünür fiyatı, para birimini ve yapıyı (ör. nakit, pay, tahvil/borç senedi, vadeli bedel, kazanç bağlı ödeme/earnout) belirt. Fiyat düzeltmeye tabiyse (ör. locked box, kapanış hesapları) mekanizmayı açıkla.",
            },
            {
                index: 4,
                name: "Temel Ön Koşullar (CP)",
                format: "bulleted_list",
                prompt: "Kapanışa ilişkin temel ön koşulları (CP) listele. Her CP için neyin, kim tarafından yerine getirilmesi veya feragat edilmesi gerektiğini belirt. CP'lerin yerine getirilmesi gereken son tarihi (long-stop date) belirle.",
            },
            {
                index: 5,
                name: "Kapanış Tarihi",
                format: "text",
                prompt: "Kapanış ne zaman gerçekleşir? Tüm CP'lerin yerine getirilmesi veya feragatinden kaç iş günü sonra kapanışın olması gerektiğini ve/veya kapanış için sabit bir nihai tarih olup olmadığını belirt. İmzadan sonra belirli bir tarihe kadar kapanma yükümlülüğü olup olmadığını not et.",
            },
            {
                index: 6,
                name: "Beyan ve Taahhütler",
                format: "text",
                prompt: "Beyan ve taahhüt (garanti) paketini özetle. Garantileri kim verir (ör. satıcı, yönetim, tüm satıcılar müteselsilen)? İşletme garantileri ve/veya mülkiyet (pay sahipliği) garantileri var mı? Açıklama (disclosure) sürecinin kapsamını ve garanti taleplerine ilişkin sınırlamaları (ör. süre sınırları, asgari talep eşikleri, toplam üst sınır) belirle. Türk hukukunda common law'daki 'misrepresentation' doktrininin doğrudan karşılığı yoktur; bu beyanlar genellikle TBK m. 30 vd. (hata/hile ile sözleşmenin iptali) ve TBK m. 112 vd. (sözleşmeye aykırılıktan doğan tazminat) çerçevesinde değerlendirilir — sözleşmenin beyan ihlalini ayrı ve doğrudan bir tazminat sebebi olarak açıkça düzenleyip düzenlemediğini kontrol et.",
            },
            {
                index: 7,
                name: "Tazminatlar (Indemnities)",
                format: "text",
                prompt: "Bu sözleşmede özel tazminat (indemnity) hükümleri var mı? Varsa verilen temel tazminatları, kim tarafından ve hangi olası sorumluluklar için verildiğini (ör. vergi tazminatı, çevresel tazminat, dava tazminatı) listele. Tazminat taleplerine uygulanan süre sınırlarını veya üst sınırları not et. Türk hukukunda 'indemnity' kurumunun doğrudan karşılığı yoktur; bu hükümler genellikle ya bağımsız bir garanti taahhüdü (TBK m. 128 — kusur veya zarar ispatı aranmaksızın sonuç taahhüdü) ya da adi tazminat yükümlülüğü (kusur ve zarar ispatı gerekir) olarak kurgulanır. Sözleşmedeki ifadenin hangi yapıyı kurduğunu belirle; bu, ispat yükünü kökten değiştirir.",
            },
            {
                index: 8,
                name: "Sorumluluğun Sınırlandırılması",
                format: "text",
                prompt: "Garanti ve tazminat taleplerine hangi sorumluluk sınırlamaları uygulanır? Toplam üst sınırı (ve nasıl hesaplandığını, ör. bedelin yüzdesi), temel garantiler veya tazminatlar için ayrı bir üst sınırı, asgari talep eşiklerini (de minimis ve sepet/muafiyet) ve talep süresi sınırlarını belirle. ÖNEMLİ: TBK m. 115 uyarınca borçlunun ağır kusurundan (kast veya ağır ihmal) doğan sorumluluğunu önceden kaldıran veya sınırlayan kayıtlar kesin hükümsüzdür. Sözleşmedeki üst sınırın hile/kasıt veya ağır ihmal hallerini açıkça istisna tutup tutmadığını kontrol et; tutmuyorsa bu bir geçersizlik riski olarak işaretle.",
            },
            {
                index: 9,
                name: "Taahhütler (Covenants)",
                format: "text",
                prompt: "Satıcı veya yönetim tarafından hangi kısıtlayıcı veya diğer taahhütler verilir? Rekabet etmeme, ayartmama ve müşteri/iş yapmama taahhütlerini, her birinin kapsamını (faaliyetler ve coğrafya) ve süresini belirterek dahil et. Rekabet etmeme taahhüdünü TBK m. 444-447 çerçevesinde değerlendir: taahhüdün süresi, konusu, yeri ve kapsamı bakımından satıcının ekonomik geleceğini hakkaniyete aykırı biçimde tehlikeye düşürüp düşürmediğini belirt — aşırı geniş kapsam TBK m. 445 uyarınca mahkemece resen sınırlandırılabilir.",
            },
            {
                index: 10,
                name: "Münhasırlık",
                format: "text",
                prompt: "Bu sözleşmede bir münhasırlık (no-shop) hükmü var mı? Varsa münhasırlık süresini, hangi faaliyetlerin kısıtlandığını (ör. rakip teklif arayışı, üçüncü kişilerle görüşme) ve istisnaları veya cayma bedeli (break fee) düzenlemelerini belirt.",
            },
            {
                index: 11,
                name: "Uygulanacak Hukuk ve Yetki",
                format: "text",
                prompt: "Bu sözleşmeye hangi hukuk uygulanır ve hangi mahkemeler veya tahkim heyetleri yetkilidir? Seçilen hukuku, uyuşmazlık için yetkili mercii ve yetkinin münhasır mı yoksa münhasır olmayan mı olduğunu belirt. Hedef şirket Türkiye'de kuruluysa: pay devrine ilişkin TTK'nın emredici hükümlerinin (ör. limited şirkette pay devrinin genel kurul onayına ve noter tasdikine tabi olması, pay defterine kayıt) yabancı hukuk seçimiyle bertaraf edilemeyeceğini not et (MÖHUK m. 24).",
            },
            {
                index: 12,
                name: "Uyuşmazlık Çözümü",
                format: "text",
                prompt: "Bu sözleşmede uyuşmazlıklar nasıl çözülür? Uyuşmazlıkların mahkemeye mi yoksa tahkime mi gideceğini, seçilen tahkim yeri veya yetkili mercii, (tahkimse) uygulanacak kuralları ve zorunlu ön uyuşmazlık tırmandırma adımlarını belirle.",
            },
        ],
    },

    // ─── Gizlilik Sözleşmesi (NDA) ───────────────────────────────────────────────
    {
        id: "builtin-nda",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Gizlilik Sözleşmesi (NDA) İncelemesi",
        type: "tabular",
        practice: "Genel İşlemler",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Yön",
                format: "tag",
                tags: ["Karşılıklı", "Tek Taraflı"],
                prompt: "Bu gizlilik sözleşmesi karşılıklı mı (her iki taraf da birbirine karşı gizlilik yükümlülüğü altında) yoksa tek taraflı mı (yalnızca bir taraf gizlilik yükümlülüğü altında)? Yönü belirle ve açıklayan (ifşa eden) ile alan tarafı/tarafları adlandır.",
            },
            {
                index: 1,
                name: "Gizli Bilgi Tanımı",
                format: "text",
                prompt: "Bu sözleşmede 'Gizli Bilgi' nasıl tanımlanmış? Geniş mi yoksa dar mı düzenlenmiş? Bilginin gizli olarak işaretlenmesini mi gerektiriyor, yoksa amaçla bağlantılı paylaşılan tüm bilgi otomatik olarak mı kapsanıyor? Açık dahil etmeleri veya istisnaları not et.",
            },
            {
                index: 2,
                name: "Alan Tarafın Yükümlülükleri",
                format: "bulleted_list",
                prompt: "Gizli bilgiye ilişkin olarak alan tarafın temel yükümlülükleri nelerdir? Her yükümlülüğü listele (ör. gizli tutma, üçüncü kişilere açıklamama, yalnızca izin verilen amaçla kullanma, belirli bir özen standardı uygulama, erişimi bilmesi gereken personelle sınırlama).",
            },
            {
                index: 3,
                name: "Standart İstisnalar Var mı?",
                format: "yes_no",
                prompt: "Sözleşme gizlilik yükümlülüklerine ilişkin standart istisnaları içeriyor mu? Sözleşme şu bilgileri hariç tutuyorsa Evet yanıtla: (a) ihlal olmaksızın kamuya açık olan veya olan bilgi; (b) alan tarafın zaten bildiği bilgi; (c) bağımsız olarak geliştirilen bilgi; ve (d) kısıtlama olmaksızın bir üçüncü kişiden alınan bilgi. Eksik olan veya standart formülasyondan farklı düzenlenen istisnaları not et.",
            },
            {
                index: 4,
                name: "İzin Verilen Açıklamalar",
                format: "bulleted_list",
                prompt: "Alan taraf gizli bilgiyi kime açıklayabilir? Her izin verilen alıcı kategorisini listele (ör. çalışanlar, profesyonel danışmanlar, iştirakler, finansman tarafları, düzenleyici/idari merciler). Sonraki açıklamanın, alıcının eşdeğer yükümlülüklerle bağlı olmasını gerektirip gerektirmediğini not et.",
            },
            {
                index: 5,
                name: "Süre",
                format: "text",
                prompt: "Bu gizlilik sözleşmesinin süresi nedir ve gizlilik yükümlülükleri ne kadar sürer? Sözleşmenin ilk dönemini ve gizlilik yükümlülüklerinin süresini (fesihten sonra devam edip etmediği ve ne kadar süre dahil) belirt.",
            },
            {
                index: 6,
                name: "İade ve İmha",
                format: "text",
                prompt: "Sürenin sona ermesi veya fesih halinde gizli bilginin iadesi veya imhasına ilişkin hangi yükümlülükler uygulanır? İade ile imha arasında bir seçim var mı? İmha belgelenmeli mi? Herhangi bir saklama istisnası var mı (ör. mevzuat amaçları, BT yedekleme sistemleri)?",
            },
            {
                index: 7,
                name: "Yaptırımlar",
                format: "text",
                prompt: "Gizlilik yükümlülüklerinin ihlali için hangi yaptırımlar mevcut? Sözleşme, tazminatın yetersiz kalabileceğini ve ihtiyati tedbir veya aynen ifanın mümkün olduğunu kabul ediyor mu? İhlal için kararlaştırılmış cezai şart veya tazminatlar var mı?",
            },
            {
                index: 8,
                name: "Uygulanacak Hukuk ve Yetki",
                format: "text",
                prompt: "Bu sözleşmeye hangi hukuk uygulanır ve hangi mahkemeler yetkilidir? Seçilen hukuku, yetkili mercii ve yetkinin münhasır mı yoksa münhasır olmayan mı olduğunu belirt.",
            },
        ],
    },

    // ─── Ticari Kira Sözleşmesi ──────────────────────────────────────────────────
    {
        id: "builtin-commercial-lease",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Ticari Kira Sözleşmesi İncelemesi",
        type: "tabular",
        practice: "Gayrimenkul",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Kiraya Veren",
                format: "text",
                prompt: "Bu kira sözleşmesinde kiraya veren kimdir? Tam ticaret unvanını/adını, kuruluş veya tescil yerini (varsa) ve belirtilmişse tescilli adresi veya tapu/ada-parsel bilgisini belirt.",
            },
            {
                index: 1,
                name: "Kiracı",
                format: "text",
                prompt: "Bu kira sözleşmesinde kiracı kimdir? Tam ticaret unvanını/adını, kuruluş veya tescil yerini (varsa) ve belirtilmişse tescilli adresi belirt.",
            },
            {
                index: 2,
                name: "Kefil",
                format: "text",
                prompt: "Bu kira sözleşmesinde bir kefil var mı? Varsa kefilin tam adını ve kefaletin kapsamını (ör. kiracının yükümlülüklerinin tam kefaleti veya belirli yükümlülüklerle sınırlı) belirt. Kefil yoksa bunu açıkça belirt.",
            },
            {
                index: 3,
                name: "Kiralanan (Mecur)",
                format: "text",
                prompt: "Bu kira sözleşmesiyle kiralanan yeri (mecuru) tanımla. Adresi, kat(lar)ı, bağımsız bölüm numarasını, net kullanım alanını (belirtilmişse) ve kiralamaya dahil veya hariç alanları (ör. ortak alanlar, çatı, taşıyıcı yapı, otopark) dahil et.",
            },
            {
                index: 4,
                name: "Kira Sözleşmesi Tarihi",
                format: "date",
                prompt: "Bu kira sözleşmesinin tarihi nedir? Sözleşme tarihsizse veya kira başlangıç tarihi imza tarihinden farklıysa her ikisini de not et.",
            },
            {
                index: 5,
                name: "Süre",
                format: "text",
                prompt: "Bu kira sözleşmesinin süresi nedir? Sürenin uzunluğunu ve başlangıç ile bitiş tarihlerini belirt.",
            },
            {
                index: 6,
                name: "Kira Bedeli",
                format: "monetary_amount",
                prompt: "Bu kira sözleşmesi kapsamında ödenecek ilk yıllık kira bedeli nedir? Tutarı, para birimini, ödeme sıklığını (ör. üç aylık peşin) ve ödeme tarihlerini belirt. Kira bedelsiz dönem veya başlangıç indirimli kira varsa not et.",
            },
            {
                index: 7,
                name: "Kira Artışı/Güncellemesi",
                format: "text",
                prompt: "Kira artışı (güncelleme) hükümleri var mı? Varsa artış tarihlerini veya sıklığını, artış mekanizmasını (ör. TÜFE/ÜFE endeksleme, sabit artış, rayiç kira tespiti), artışın yalnızca yukarı yönlü olup olmadığını, varsayımları ve tarafların kira bedelinde anlaşamaması halinde uyuşmazlık çözüm mekanizmasını belirt.",
            },
            {
                index: 8,
                name: "Ortak Gider/Aidat",
                format: "text",
                prompt: "Kiracı bir ortak gider (aidat) ödemekle yükümlü mü? Varsa ortak gidere hangi masrafların dahil olduğunu, kiracının paylaştırma oranını veya yüzde payını, ortak gider üzerinde bir üst sınır olup olmadığını ve nasıl yönetilip mutabakata bağlandığını açıkla.",
            },
            {
                index: 9,
                name: "Sigorta",
                format: "text",
                prompt: "Bu kira sözleşmesi kapsamındaki sigorta yükümlülükleri nelerdir? Kimin sigorta yaptıracağını (kiraya veren mi kiracı mı), hangi risklerin sigortalanması gerektiğini, prim maliyetini kimin üstlendiğini ve kiracının kiraya verenin sigortasına ilişkin yükümlülüklerini (ör. poliçeyi geçersiz kılmama, primi ek kira olarak ödeme) belirt.",
            },
            {
                index: 10,
                name: "Kullanım Amacı",
                format: "text",
                prompt: "Bu kira sözleşmesi kapsamında kiralananın kullanım amacı nedir? İzin verilen kullanımı belirt ve kullanıma ilişkin kısıtlamaları tespit et. Kullanımı değiştirmek için kiraya verenin onayının gerekip gerekmediğini ve onayın hangi gerekçeyle reddedilebileceğini not et.",
            },
            {
                index: 11,
                name: "Onarım ve Bakım",
                format: "text",
                prompt: "Kiralananın onarım ve bakımından kim sorumludur? Kiracının onarım yükümlülüğünün kapsamını açıkla. Kiraya verenin taşıyıcı yapıya, dış cepheye veya ortak alanlara ilişkin onarım yükümlülüklerini (varsa) belirt.",
            },
            {
                index: 12,
                name: "Tadilatlar/Değişiklikler",
                format: "text",
                prompt: "Kiracı kiralananda hangi tadilatları yapabilir? Yapısal ve yapısal olmayan tadilatlar arasında ayrım yap. Kiraya verenin onayı gerekli mi ve hangi gerekçeyle reddedilebilir? Kiracı, süre sonunda tadilatları eski haline getirmek zorunda mı?",
            },
            {
                index: 13,
                name: "Devir ve Alt Kira",
                format: "text",
                prompt: "Kiracının kiralananı devretme veya alt kiraya verme hakları nelerdir? Devir ve alt kiranın kiraya verenin onayıyla mümkün olup olmadığını, onayın hangi gerekçelerle reddedilebileceğini, yerine getirilmesi gereken koşulları ve herhangi bir işlemin tamamen yasak olup olmadığını belirt.",
            },
            {
                index: 14,
                name: "Erken Fesih (Break) Hakları",
                format: "text",
                prompt: "Bu kira sözleşmesinde erken fesih (break) hakları var mı? Varsa hakkın kime ait olduğunu (kiraya veren, kiracı veya her ikisi), erken fesih tarih(ler)ini, kullanmak için gereken ihbar süresi ve şeklini ve geçerli kullanım için ön koşulları (ör. esaslı ihlal bulunmaması, tahliye, muaccel tutarların ödenmesi) belirle.",
            },
            {
                index: 15,
                name: "Kira İlişkisinin Korunması",
                format: "yes_no",
                prompt: "Kiracı, kira ilişkisinin sona ermesine karşı yasal bir korumaya sahip mi (ör. Türk Borçlar Kanunu kapsamında kiracının tahliyeye karşı korunması, sözleşmenin belirsiz süreye dönüşmesi)? Kiracı bu korumadan yararlanıyorsa Evet, korumadan feragat edilmişse veya koruma uygulanmıyorsa Hayır yanıtla. Yanıtının dayanağını belirt.",
            },
            {
                index: 16,
                name: "Tahliye Sonu Yükümlülükleri",
                format: "text",
                prompt: "Süre sonunda hangi tahliye/teslim yükümlülükleri uygulanır? Kiracının teslim yükümlülüklerini (ör. kiralananı onarımlı teslim etme, tadilatları eski haline getirme, boyama) açıkla. Kiracının sorumluluğunu sınırlayan bir durum tespit tutanağı var mı? Herhangi bir üst sınır veya sınırlamayı not et.",
            },
            {
                index: 17,
                name: "Güvence Bedeli (Depozito)",
                format: "monetary_amount",
                prompt: "Bir güvence bedeli (depozito) gerekli mi? Varsa tutarı, hangi süre boyunca tutulduğunu, kiraya verenin hangi koşullarda kullanabileceğini ve kiracıya hangi hallerde iade edildiğini belirt.",
            },
            {
                index: 18,
                name: "Fesih",
                format: "text",
                prompt: "Kiraya verenin fesih hakları nelerdir? Kiraya verene fesih hakkı veren halleri (ör. ihtardan sonra kira ödenmemesi, esaslı sözleşme ihlali, iflas) ve fesihten önceki ihbar gerekliliklerini belirle.",
            },
            {
                index: 19,
                name: "Uygulanacak Hukuk",
                format: "text",
                prompt: "Bu kira sözleşmesine hangi hukuk uygulanır ve uyuşmazlıklarda hangi mahkemeler yetkilidir?",
            },
        ],
    },

    // ─── Limited Ortaklık (Fon) Sözleşmesi ───────────────────────────────────────
    {
        id: "builtin-lpa",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Fon (Limited Ortaklık) Sözleşmesi İncelemesi",
        type: "tabular",
        practice: "Özel Sermaye",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Yönetici Ortak (GP)",
                format: "text",
                prompt: "Fonun Yönetici Ortak(lar)ını (GP) belirle. Tam ticaret unvanını, kuruluş yerini ve sözleşmede adı geçen bağlı yönetim kuruluşunu (ör. fon yöneticisi veya yatırım danışmanı) belirt.",
            },
            {
                index: 1,
                name: "Fon Adı ve Yargı Bölgesi",
                format: "text",
                prompt: "Fonun tam adı nedir ve limited ortaklık hangi yargı bölgesinde kurulmuş veya tescil edilmiştir? Not: Türk hukukunda 'limited ortaklık' (limited partnership/LP) kurumunun doğrudan karşılığı yoktur — bu tür fonlar genellikle Cayman, Delaware veya Lüksemburg gibi yargı bölgelerinde kurulur ve Türk yatırımcı bu belgeyi yabancı hukuka tabi bir araç olarak inceler; en yakın yerli muadiller SPK'nın III-52.4 sayılı Tebliği kapsamındaki Girişim Sermayesi Yatırım Fonu (GSYF) veya Girişim Sermayesi Yatırım Ortaklığı (GSYO), ya da gayriresmî ortaklıklar için TTK'daki komandit şirket (TTK m. 304 vd.) veya TBK'daki adi ortaklıktır (TBK m. 620 vd.) — ama bunlar yapısal olarak özdeş değildir.",
            },
            {
                index: 2,
                name: "Toplam Taahhüt Edilen Sermaye",
                format: "monetary_amount",
                prompt: "Fonun toplam taahhüt edilen sermayesi nedir? Hedef büyüklüğü, varsa kesin üst sınırı (hard cap), para birimini ve belirtilmişse kapanış tarih(ler)ini belirt.",
            },
            {
                index: 3,
                name: "Sermaye Çağrıları ve Kullandırımlar",
                format: "text",
                prompt: "GP, yatırımcılardan (LP) sermayeyi nasıl ve ne zaman çağırabilir? Sermaye çağrıları için ihbar süresini, çağrı bildirimi mekaniğini, çağrıların sıklığı veya büyüklüğüne ilişkin sınırları ve geri ödenen taahhütlerin yeniden çağrılıp çağrılamayacağını belirt.",
            },
            {
                index: 4,
                name: "Sermaye Koyma Temerrüdü Yaptırımları",
                format: "text",
                prompt: "Bir LP bir sermaye çağrısını karşılayamazsa sonuçları nelerdir? Yaptırımları açıkla (ör. eksik tutara faiz, payın sulandırılması, indirimle zorunlu devir, oy veya dağıtım haklarının kaybı, gelecekteki yatırımlardan hariç tutulma). Yaptırımlar uygulanmadan önce bir düzeltme süresi var mı?",
            },
            {
                index: 5,
                name: "Yatırım Kapsamı ve Kısıtlamaları",
                format: "text",
                prompt: "Fonun belirtilen yatırım stratejisi, kapsamı ve kısıtlamaları nelerdir? İzin verilen sektörleri, coğrafyaları, yatırım aşamalarını, araç türlerini ve yoğunlaşma sınırlarını (ör. tek bir yatırımda taahhüt sermayesinin azami yüzdesi) dahil et. GP'nin belirtilen stratejiden ne ölçüde sapma yetkisi olduğunu not et.",
            },
            {
                index: 6,
                name: "Fon Süresi",
                format: "text",
                prompt: "Fonun süresi nedir? İlk süreyi (ör. nihai kapanıştan itibaren 10 yıl), izin verilen uzatma dönemlerini (ör. 2 × 1 yıllık uzatma), uzatmaları kimin onaylama hakkına sahip olduğunu (yalnızca GP mi yoksa LP/LPAC onayıyla mı) ve erken sona erme mekaniğini belirt.",
            },
            {
                index: 7,
                name: "Yönetim Ücreti",
                format: "text",
                prompt: "GP'ye veya yöneticiye hangi yönetim ücreti ödenir? Ücret oranını, hesaplandığı esası (ör. yatırım dönemi boyunca taahhüt sermayesi, sonrasında yatırılan tutar veya net varlık değeri), fon ömrü boyunca azalmaları (step-down) ve ödeme sıklığını belirt.",
            },
            {
                index: 8,
                name: "Taşınan Pay (Carry)",
                format: "text",
                prompt: "GP'ye hangi taşınan pay (carried interest) ödenir? Carry yüzdesini, yapısını (Avrupa/fon düzeyi şelale yapısı vs. Amerikan/işlem bazlı) ve dağıtım şelalesinin her adımını sırayla belirle (ör. sermaye iadesi, öncelikli getiri, GP yetişme/catch-up, ardından kâr paylaşımı).",
            },
            {
                index: 9,
                name: "Öncelikli Getiri (Hurdle Oranı)",
                format: "percentage",
                prompt: "GP carry kazanmadan önce LP'lerin alması gereken bir öncelikli getiri (hurdle oranı) var mı? Oranı, bileşik olup olmadığını (ve hangi esasta) ve nasıl hesaplandığını (ör. yatırılan sermaye, katkı sermayesi) belirt. Öncelikli getiri yoksa bunu açıkça belirt.",
            },
            {
                index: 10,
                name: "GP Yetişme (Catch-Up)",
                format: "text",
                prompt: "Öncelikli getiri karşılandıktan sonra bir GP yetişme (catch-up) mekanizması var mı? Varsa nasıl işlediğini açıkla: yetişme sırasında dağıtımların yüzde kaçı GP'ye gider ve yetişmenin amaçladığı ekonomik sonuç nedir (ör. GP, o ana kadarki tüm kârların %20'sini alır)?",
            },
            {
                index: 11,
                name: "Geri Alım (Clawback)",
                format: "text",
                prompt: "GP fazla carry alırsa bir geri alım (clawback) yükümlülüğü var mı? Geri alımın fon düzeyinde mi yoksa bireysel ortak düzeyinde mi hesaplandığını, ne zaman tetiklendiğini, üzerinde bir üst sınır olup olmadığını ve GP'nin geri alım yükümlülüğünü desteklemek için bir emanet (escrow) veya teminat düzenlemesi olup olmadığını belirt.",
            },
            {
                index: 12,
                name: "Ücretler ve Masraflar (Yönetim Ücreti Dışında)",
                format: "bulleted_list",
                prompt: "Yönetim ücreti dışında fona veya LP'lere hangi ücret ve masraflar yansıtılır? Her kategoriyi listele (ör. işlem ücretleri, izleme ücretleri, bozulan işlem maliyetleri, kuruluş masrafları, hukuki ücretler, fon idare masrafları). Her biri için maliyeti kimin üstlendiğini ve herhangi bir tutarın yönetim ücretinden mahsup edilip edilmediğini belirt.",
            },
            {
                index: 13,
                name: "Dağıtımlar",
                format: "text",
                prompt: "LP'lere dağıtımlar nasıl ve ne zaman yapılır? Dağıtımların zamanlamasını (ör. yatırımların nakde dönüşmesi üzerine veya GP'nin takdirine bağlı), GP'nin yatırım dönemi içinde gelirleri yeniden yatırıma yöneltip yöneltemeyeceğini ve dağıtımların ayni (nakit yerine menkul kıymet olarak) yapılıp yapılamayacağını açıkla.",
            },
            {
                index: 14,
                name: "Kilit Kişi (Key Person) Maddesi",
                format: "text",
                prompt: "Bir kilit kişi (key person) maddesi var mı? Belirlenen kilit kişileri tespit et. Kilit kişi olayını ne tetikler (ör. ayrılma, iş göremezlik, zaman taahhüdünün bir eşiğin altına düşmesi)? Sonuçları nelerdir (ör. yatırım döneminin askıya alınması)? LP'lerin kilit kişi olayını takiben fesih veya devam konusunda oy hakkı var mı?",
            },
            {
                index: 15,
                name: "GP'nin Görevden Alınması",
                format: "text",
                prompt: "GP hangi koşullarda görevden alınabilir? Haklı sebeple görevden alma (ör. hile, ağır ihmal, kasıt — gereken LP oy eşiğini belirt) ile sebepsiz görevden alma (LP oy eşiğini ve görevden almada taşınan payın akıbeti gibi ilgili sonuçları belirt) arasında ayrım yap.",
            },
            {
                index: 16,
                name: "Danışma Kurulu (LPAC)",
                format: "text",
                prompt: "Bir LP Danışma Kurulu (LPAC) veya benzeri bir yönetişim organı var mı? Varsa bileşimini, üyelerin nasıl seçildiğini, temel yetki ve sorumluluklarını (ör. menfaat çatışmalarını, değerlemeleri, uzatmaları, ilişkili taraf işlemlerini onaylama) ve onayının bağlayıcı mı yoksa yalnızca danışma niteliğinde mi olduğunu açıkla.",
            },
            {
                index: 17,
                name: "Devir Kısıtlamaları",
                format: "text",
                prompt: "Bir LP'nin fondaki payını devretmesine veya temlik etmesine hangi kısıtlamalar uygulanır? GP onayı gerekli mi? İzin verilen devir istisnaları (ör. iştiraklere) var mı? İkincil piyasa satışlarına izin veriliyor mu ve veriliyorsa hangi koşullara veya öncelikli alım haklarına tabi?",
            },
            {
                index: 18,
                name: "Menfaat Çatışmaları",
                format: "text",
                prompt: "Sözleşme menfaat çatışmalarını nasıl ele alıyor? Fonlar arası işlem tahsis politikasını, LP'lere tanınan eş-yatırım haklarını, ilişkili taraf işlemlerine ilişkin kısıtlamaları ve LPAC'nin çatışmaları inceleme veya onaylamadaki rolünü açıkla. Açıkça öngörülen özel çatışma senaryolarını not et.",
            },
            {
                index: 19,
                name: "Uygulanacak Hukuk",
                format: "text",
                prompt: "Bu sözleşmeye hangi hukuk uygulanır ve uyuşmazlıklarda hangi mahkemeler veya tahkim heyetleri yetkilidir?",
            },
            {
                index: 20,
                name: "Türk Yatırımcı İçin Vergi/CFC Etkisi",
                format: "text",
                prompt: "Bu fona bir Türk mukimi (kurum veya gerçek kişi) LP sıfatıyla yatırım yapıyorsa dikkat edilmesi gereken vergisel hususları belirle. Kurumlar Vergisi Kanunu m. 7 (Kontrol Edilen Yabancı Kurum/CFC hükümleri) uyarınca, Türk mukimi bir kurumun yurt dışı iştirakteki (doğrudan veya dolaylı) payı %50'yi aşıyorsa ve iştirakin faaliyet gelirinin %25'ten fazlası pasif nitelikteyse (faiz, kira, temettü, kâr payı vb.) ve iştirakin ticari bilanço kârı üzerindeki vergi yükü %10'un altındaysa, iştirakin dağıtılmamış kârı Türkiye'de kurum kazancına dahil edilerek vergilendirilebilir. Sözleşmedeki LP pay oranını ve fonun gelir yapısını (aktif yönetim ücreti mi, pasif getiri mi) bu eşikler açısından değerlendir; kesin bir vergi görüşü değil, dikkat çekilmesi gereken bir risk alanı olarak işaretle.",
            },
            {
                index: 21,
                name: "TPKKM Sermaye Hareketi Bildirimi",
                format: "text",
                prompt: "Bir Türk yatırımcının bu fona sermaye taahhüdünde bulunması, 32 sayılı Türk Parası Kıymetini Koruma Hakkında Karar ve ilgili Hazine ve Maliye Bakanlığı tebliğleri kapsamında yurt dışına sermaye çıkışı sayılabilir ve bankalar aracılığıyla yapılan transferlerde bildirim/belgeleme yükümlülüğü doğurabilir. Sözleşmedeki sermaye çağrısı mekanizmasının (tutar, döviz cinsi, ödeme sıklığı) bu tür bir transfer bildirimi gerektirip gerektirmediğini genel hatlarıyla işaretle; kesin uygulama bankanın ve transfer tutarının niteliğine göre değişir.",
            },
        ],
    },

    // ─── Pay Sahipleri Sözleşmesi (Asistan) ──────────────────────────────────────
    {
        id: "builtin-sha-summary",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Pay Sahipleri Sözleşmesi Özeti",
        type: "assistant",
        practice: "Şirketler Hukuku",
        prompt_md:
            "## Pay Sahipleri Sözleşmesi Özeti\n\n" +
            "Yüklenen pay sahipleri (ortaklar) sözleşmesini incele ve aşağıdaki başlıkları kapsayan kapsamlı bir hukuki özet hazırla. " +
            "Her bölüm için temel hükümleri belirle, ilgili madde referanslarını alıntıla ve olağandışı, ağır ya da piyasa standardından sapan şartları işaretle. Türk Ticaret Kanunu (TTK) çerçevesini esas al.\n\n" +
            "1. **Taraflar ve Pay Durumu** — Tam ticaret unvanları/ad-soyadları, rolleri, sahip oldukları pay grupları ve (belirtilmişse tam sulandırılmış esasta) yüzde oranları\n" +
            "2. **Pay Grupları ve Hakları** — Her grup için: oy hakları, kâr payı hakları, tasfiye payı önceliği, dönüştürme veya geri alım özellikleri\n" +
            "3. **Yönetim Kurulu Yapısı ve Yönetişim** — Kurul büyüklüğü, üye atama hakları (ve bunları korumak için gereken pay eşikleri), toplantı/karar nisapları ve üstün oy\n" +
            "4. **Önemli Kararlar** — Özel çoğunluk, oybirliği veya belirli bir pay sahibinin onayını gerektiren kararlar; her biri için eşik ve kimin onayının gerektiği belirtilerek\n" +
            "5. **Yeni Paylarda Rüçhan (Önalım)** — Rüçhan hakkı kime ait, prosedür, süre ve istisnalar (ör. çalışan pay opsiyon programları)\n" +
            "6. **Devir Kısıtlamaları** — Devir yasağı süreleri (lock-up), yasaklı devirler, izinli devirler (ör. iştiraklere) ve gereken kurul veya pay sahibi onayları\n" +
            "7. **Önalım / Pay Devrinde Öncelikli Alım Hakkı** — Tetikleyici hal, prosedür, fiyatlama mekaniği ve istisnalar\n" +
            "8. **Sürükleme Hakkı (Drag-Along)** — Hak kime ait, tetikleyici eşik, koşullar (ör. asgari fiyat, bağımsız değerleme) ve azınlık korumaları\n" +
            "9. **Birlikte Satış Hakkı (Tag-Along)** — Hak kime ait, tetikleyici eşik, kullanım prosedürü ve fiyat şartları\n" +
            "10. **Sulandırma Karşıtı Korumalar (Anti-Dilution)** — Türü (tam ratchet, ağırlıklı ortalama), tetikleyici haller, hesaplama mekaniği ve istisnalar\n" +
            "11. **Kâr Payı Politikası** — Kâr payı dağıtımına ilişkin yükümlülük veya hedef, imtiyazlı kâr payı hakları ve dağıtım kısıtlamaları\n" +
            "12. **Çıkış ve Likidite** — Üzerinde anlaşılan çıkış yolları (ticari satış, halka arz, sürükleme yoluyla satış), süreler ve çıkışta tasfiye payı öncelikleri\n" +
            "13. **Kilitlenme (Deadlock)** — Kilitlenme tanımı, tırmandırma ve çözüm mekanizmaları (ör. Rus ruleti, al/sat opsiyonları) ve çözülememesi halinde sonuçları\n" +
            "14. **Rekabet Etmeme ve Ayartmama** — Kimleri bağladığı, faaliyet ve coğrafi kapsamı, süresi ve istisnaları\n" +
            "15. **Uygulanacak Hukuk ve Uyuşmazlık Çözümü** — Uygulanacak hukuk, yetkili mercii, tahkim veya mahkeme ve varsa zorunlu tırmandırma adımları\n\n" +
            "Özeti indirilebilir bir Word belgesi olarak üret.",
        columns_config: null,
    },

    // ─── Pay Sahipleri Sözleşmesi (Tablo) ────────────────────────────────────────
    {
        id: "builtin-shareholder-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Pay Sahipleri Sözleşmesi İncelemesi",
        type: "tabular",
        practice: "Şirketler Hukuku",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Taraflar",
                format: "bulleted_list",
                prompt: "Bu pay sahipleri sözleşmesinin tüm taraflarını belirle. Her biri için tam ticaret unvanını, kuruluş yerini (belirtilmişse) ve rolünü (ör. şirket, çoğunluk pay sahibi, azınlık pay sahibi, yatırımcı, kurucu, yönetici pay sahibi) belirt.",
            },
            {
                index: 1,
                name: "Tarih",
                format: "date",
                prompt: "Bu pay sahipleri sözleşmesinin tarihi nedir?",
            },
            {
                index: 2,
                name: "Sermaye ve Pay Grupları",
                format: "bulleted_list",
                prompt: "Bu sözleşmede çıkarılmış veya öngörülen pay grupları nelerdir? Her grup için, oy hakları, kâr payı hakları, tasfiye payı önceliği (varsa) ve dönüştürme veya geri alım özellikleri dahil temel hakları açıkla.",
            },
            {
                index: 3,
                name: "Pay Durumu",
                format: "bulleted_list",
                prompt: "Bu sözleşmede belirtilen veya öngörülen her tarafın pay durumu nedir? Her pay sahibi için sahip olunan pay sayısını, grubunu ve toplam sermayedeki yüzdesini (belirtilmişse tam sulandırılmış esasta) belirt.",
            },
            {
                index: 4,
                name: "Yönetim Kurulu Yapısı",
                format: "text",
                prompt: "Bu sözleşme kapsamında yönetim kurulu nasıl oluşturulur? Toplam üye sayısını, her pay sahibinin veya pay grubunun üye atama/aday gösterme hakkını (ve bu hakkı korumak için gereken pay eşiğini) ve başkan veya üstün oy hükümlerini belirt.",
            },
            {
                index: 5,
                name: "Önemli Kararlar (Veto Hakları)",
                format: "bulleted_list",
                prompt: "Bu sözleşmede belirtilen önemli kararları veya veto haklarını listele. Adi çoğunluğun ötesinde pay sahibi veya yönetim kurulu onayı gerektiren her hususu (ör. özel çoğunluk, oybirliği veya belirli bir pay sahibinin onayı) listele. Her biri için uygulanan eşiği veya kimin onayının gerektiğini belirle.",
            },
            {
                index: 6,
                name: "Yeni Paylarda Rüçhan (Önalım)",
                format: "text",
                prompt: "Yeni pay ihracında hangi rüçhan (önalım) hakları uygulanır? Rüçhan hakkını kimin elinde tuttuğunu, yeni payların mevcut pay sahiplerine teklif edilme prosedürünü, kabul için süreyi ve istisnaları (ör. çalışan pay opsiyon programı kapsamında ihraç edilen paylar, izinli ihraçlar) açıkla.",
            },
            {
                index: 7,
                name: "Devir Kısıtlamaları",
                format: "text",
                prompt: "Pay devrine hangi kısıtlamalar uygulanır? Devir yasağı sürelerini (lock-up) ve süresini, tamamen yasak olan devirleri ve onaysız izin verilen devirleri (ör. iştiraklere veya aile tröstlerine) belirle. Devirler için kurul veya pay sahibi onay gerekliliklerini not et.",
            },
            {
                index: 8,
                name: "Önalım / Pay Devrinde Öncelikli Alım Hakkı",
                format: "text",
                prompt: "Önerilen bir pay devrinde önalım veya öncelikli alım hakkı var mı? Varsa hakkı kimin tuttuğunu, tetikleme ve kullanma prosedürünü (ihbar süreleri ve fiyatlama mekaniği dahil) ve istisnaları açıkla.",
            },
            {
                index: 9,
                name: "Sürükleme Hakkı (Drag-Along)",
                format: "text",
                prompt: "Sürükleme (drag-along) hakları var mı? Varsa sürükleme hakkını kimin tuttuğunu (ör. belirli bir eşiğin üzerindeki çoğunluk pay sahipleri), sürüklemeyi tetiklemek için gereken eşiği, sürüklenen pay sahiplerine yüklenen yükümlülükleri, koşulları (ör. asgari fiyat, bağımsız değerleme) ve azınlık pay sahipleri için korumaları belirle.",
            },
            {
                index: 10,
                name: "Birlikte Satış Hakkı (Tag-Along)",
                format: "text",
                prompt: "Birlikte satış (tag-along) hakları var mı? Varsa hakkı kimin tuttuğunu, hakkı tetikleyen eşik devri, hakkı kullanma prosedürünü (ihbar süreleri dahil), birlikte satan pay sahibinin satabileceği fiyat ve şartları ve istisnaları belirle.",
            },
            {
                index: 11,
                name: "Sulandırma Karşıtı Korumalar",
                format: "text",
                prompt: "Herhangi bir pay sahibi grubu için sulandırma karşıtı (anti-dilution) korumalar var mı? Varsa koruma türünü (ör. tam ratchet, ağırlıklı ortalama, geniş veya dar tabanlı), tetikleyici halleri, düzeltilmiş fiyatın veya hakkın nasıl hesaplandığını ve istisnaları (ör. hesaplamadan hariç tutulan izinli ihraçlar) açıkla.",
            },
            {
                index: 12,
                name: "Kâr Payı Politikası",
                format: "text",
                prompt: "Bu sözleşmede belirtilen kâr payı hükümleri nelerdir? Kâr payı dağıtımına ilişkin herhangi bir yükümlülüğü veya politikayı (ör. dağıtılabilir kârın asgari yüzdesi), belirli bir pay grubuna tanınan imtiyazlı kâr payı haklarını ve kâr payı ödemelerine ilişkin kısıtlamaları (ör. mevcut kâra, kurul veya genel kurul onayına, kredi veren onayına tabi) açıkla.",
            },
            {
                index: 13,
                name: "Çıkış ve Likidite Hükümleri",
                format: "text",
                prompt: "Hangi çıkış veya likidite hükümleri yer alır? Üzerinde anlaşılan çıkış mekanizmalarını (ör. ticari satış, halka arz, sürükleme yoluyla satış), bir çıkışın hedeflendiği süreleri veya kilometre taşlarını, belirli bir süreden sonra pay sahiplerinin bir çıkış sürecini başlatma veya zorlama haklarını ve belirli bir pay grubuna tanınan çıkış geliri önceliğini açıkla.",
            },
            {
                index: 14,
                name: "Kilitlenme (Deadlock)",
                format: "text",
                prompt: "Kilitlenme nasıl ele alınmış? Kilitlenme çözüm mekanizmalarını (ör. üst yönetime tırmandırma, arabuluculuk, Rus ruleti / shoot-out hükümleri, al/sat opsiyonları) açıkla. Her mekanizma için tetikleyici koşulları, prosedürü ve kilitlenmenin çözülememesi halinde sonuçları belirt.",
            },
            {
                index: 15,
                name: "Rekabet Etmeme ve Ayartmama",
                format: "text",
                prompt: "Herhangi bir pay sahibi rekabet etmeme veya ayartmama yükümlülüğüne tabi mi? Varsa hangi pay sahiplerinin bağlı olduğunu, kısıtlamanın kapsamını (faaliyetler ve coğrafya) ve süresini (sözleşme süresi boyunca ve/veya pay sahibinin payını elden çıkarmasından sonraki bir dönem için) belirle. İstisnaları not et.",
            },
            {
                index: 16,
                name: "Gizlilik",
                format: "text",
                prompt: "Pay sahiplerine hangi gizlilik yükümlülükleri yüklenmiş? Kapsanan gizli bilgilerin kapsamını, izin verilen açıklamaları (ör. profesyonel danışmanlara, iştiraklere, kredi verenlere) ve yükümlülüğün süresini belirt. Yükümlülüğün sözleşmenin feshinden sonra devam edip etmediğini not et.",
            },
            {
                index: 17,
                name: "Beyan ve Taahhütler",
                format: "text",
                prompt: "Bu sözleşme kapsamında pay sahipleri tarafından hangi beyan ve taahhütler (garantiler) verilir? Garantileri kimin verdiğini, konusunu (ör. paylar üzerinde mülkiyet, ehliyet, takyidat bulunmaması, çatışma bulunmaması), garanti taleplerine ilişkin sınırlamaları (ör. süre sınırları, üst sınırlar, bilgi kayıtları) ve garantilerle birlikte verilen tazminatları belirle.",
            },
            {
                index: 18,
                name: "Uygulanacak Hukuk",
                format: "text",
                prompt: "Bu sözleşmeye hangi hukuk uygulanır? Yargı bölgesini ve atıf yapılan özel hukuk sistemini belirt.",
            },
            {
                index: 19,
                name: "Uyuşmazlık Çözümü",
                format: "text",
                prompt: "Bu sözleşmede uyuşmazlıklar nasıl çözülür? Uyuşmazlıkların mahkemeye mi yoksa tahkime mi gideceğini, seçilen yetkili mercii veya tahkim yerini, zorunlu tırmandırma adımlarını ve yetkinin münhasır olup olmadığını belirle.",
            },
        ],
    },

    // ─── İş (Hizmet) Sözleşmesi ──────────────────────────────────────────────────
    {
        id: "builtin-employment-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "İş Sözleşmesi İncelemesi",
        type: "tabular",
        practice: "İş Hukuku",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "İşveren",
                format: "text",
                prompt: "Bu sözleşmede işveren kimdir? Tam ticaret unvanını ve kuruluş yerini belirt.",
            },
            {
                index: 1,
                name: "İşçi/Çalışan",
                format: "text",
                prompt: "Bu sözleşmede işçi (çalışan) kimdir? Tam adını ve sağlanmışsa adresini veya bulunduğu yeri belirt.",
            },
            {
                index: 2,
                name: "Tarih",
                format: "date",
                prompt: "Bu iş sözleşmesinin tarihi nedir? İşe başlama tarihi imza tarihinden farklıysa her ikisini de belirt.",
            },
            {
                index: 3,
                name: "Unvan/Pozisyon",
                format: "text",
                prompt: "Bu sözleşmede belirtilen çalışanın iş unvanı veya pozisyonu nedir? Belirtilmişse bağlı olduğu üst (raporlama hattı) bilgisini dahil et.",
            },
            {
                index: 4,
                name: "Ücret",
                format: "text",
                prompt: "Bu sözleşme kapsamında çalışanın ücreti nedir? Temel ücreti veya maaşı, para birimini ve ödeme sıklığını (ör. aylık) belirt. Garanti prim, komisyon veya diğer sabit ücret unsurlarını dahil et.",
            },
            {
                index: 5,
                name: "Tam/Yarı Zamanlı",
                format: "tag",
                tags: ["Tam Zamanlı", "Yarı Zamanlı"],
                prompt: "Bu tam zamanlı mı yoksa yarı zamanlı bir pozisyon mu? Yarı zamanlıysa belirtilmişse haftalık gün veya saat sayısını belirt.",
            },
            {
                index: 6,
                name: "Bağımsız Yüklenici mi?",
                format: "yes_no",
                prompt: "Sözleşme, çalışanı işçi yerine bağımsız bir yüklenici (hizmet sunan) olarak mı nitelendiriyor? Sözleşme yüklenici, danışman veya serbest meslek ifadeleri kullanıyorsa Evet yanıtla. İlişkinin niteliğini ele alan hükümleri not et. Türk hukukunda sözleşmenin başlığı değil fiili ilişkinin niteliği (bağımlılık, emir-talimat altında çalışma, mesai/yer bağımlılığı) esas alınır — sözleşme 'danışmanlık' veya 'hizmet' olarak adlandırılsa da fiilen İş K. m. 2 anlamında bir iş ilişkisi kurulmuşsa muvazaa (örtülü iş ilişkisi) riski doğar; bu riske işaret eden hükümler varsa (ör. sabit çalışma saati, tek işverene bağımlılık, işverenin doğrudan talimat yetkisi) belirt.",
            },
            {
                index: 7,
                name: "Yan Haklar",
                format: "bulleted_list",
                prompt: "Çalışan bu sözleşme kapsamında hangi yan haklara sahip? Her yan hakkı listele (ör. özel sağlık sigortası, bireysel emeklilik/BES katkısı, hayat sigortası, araç tahsisi, pay opsiyonları, masraf iadesi). Uygunluk koşullarını veya sınırlarını not et.",
            },
            {
                index: 8,
                name: "İhbar Süresi (İşverenden Çalışana)",
                format: "text",
                prompt: "İşveren, çalışanın iş sözleşmesini (haklı sebep dışında) feshetmek için ne kadar ihbarda bulunmalıdır? İhbar süresini ve ihbar yerine ödeme (ihbar tazminatı) hükümlerini belirt. İş K. m. 17 uyarınca kıdeme göre asgari ihbar süreleri emredicidir (6 aya kadar: 2 hafta; 6 ay-1,5 yıl: 4 hafta; 1,5-3 yıl: 6 hafta; 3 yıldan fazla: 8 hafta) ve yalnızca işçi lehine artırılabilir — sözleşmedeki süreleri bu asgari sürelerle karşılaştır, altındaysa geçersizlik riskini belirt.",
            },
            {
                index: 9,
                name: "İhbar Süresi (Çalışandan İşverene)",
                format: "text",
                prompt: "Çalışan istifa etmek için ne kadar ihbarda bulunmalıdır? İhbar süresini ve ihbar yerine ödeme veya muafiyet (garden leave) hükümlerini belirt. İş K. m. 17'deki kıdeme göre asgari süreler karşılıklı uygulanır; çalışan aleyhine işverene göre daha uzun bir ihbar süresi öngörülmüşse bunun eşitlik ilkesine aykırılık riski taşıdığını not et.",
            },
            {
                index: 10,
                name: "Fazla Çalışma",
                format: "text",
                prompt: "Fazla çalışmaya hangi hükümler uygulanır? Çalışan fazla çalışma ücretine hak kazanıyor mu ve kazanıyorsa hangi oranda? Yoksa sözleşme ücretin fazla çalışmayı içerdiğini mi belirtiyor? Yasal çalışma süresi sınırlarından muafiyeti not et. İş K. m. 41 uyarınca fazla çalışma saat başına normal ücretin %50 fazlasıyla (veya işçinin serbest zaman kullanma tercihiyle) ödenir ve yıllık 270 saat ile sınırlıdır; sözleşmede fazla çalışmanın ücrete dahil olduğu belirtiliyorsa bunun yasal asgari fazla mesai ücretini karşılayıp karşılamadığını değerlendir — açıkça hesaplanabilir değilse riski işaretle.",
            },
            {
                index: 11,
                name: "Çalışma Saatleri",
                format: "text",
                prompt: "Bu sözleşmede hangi çalışma saatleri belirtilmiş? Normal çalışma saatlerini, esneklik hükümlerini ve çalışanın gerektiğinde ek saatlerde çalışmasının beklenip beklenmediğini belirt.",
            },
            {
                index: 12,
                name: "Değişiklik (Tadil)",
                format: "text",
                prompt: "Bu sözleşmenin şartlarının değiştirilmesini hangi hükümler düzenler? İşveren şartları tek taraflı değiştirebilir mi yoksa çalışanın onayı gerekli mi? Onaysız değiştirilebilir olarak belirtilen özel şartları not et. İş K. m. 22 uyarınca çalışma koşullarında esaslı değişiklik yazılı olarak bildirilmelidir; çalışan değişikliği 6 iş günü içinde yazılı olarak kabul etmezse değişiklik onu bağlamaz — sözleşmede işverene bu prosedürü bertaraf eden tek taraflı ve koşulsuz bir değişiklik yetkisi tanınıyorsa bunu geçersizlik riski olarak işaretle.",
            },
            {
                index: 13,
                name: "Fikrî Mülkiyet Devri",
                format: "text",
                prompt: "Hangi fikrî mülkiyet devir hükümleri yer alıyor? Çalışan, iş ilişkisi sırasında oluşturulan tüm fikrî mülkiyeti işverene devrediyor mu? Mevcut fikrî mülkiyet veya çalışma saatleri dışında oluşturulan eserler için istisnalar var mı? Manevi hakların kullanımına ilişkin hükümleri not et.",
            },
            {
                index: 14,
                name: "Fesih (Haklı Sebep) Halleri",
                format: "bulleted_list",
                prompt: "Sözleşmede belirtilen derhal (haklı sebeple) fesih halleri nelerdir? Her halı listele (ör. ağır kusur/ahlak ve iyi niyet kurallarına aykırılık, gizlilik ihlali, iflas, mahkûmiyet). Haklı sebeple feshin ihbarsız veya ihbar tazminatı ödenmeksizin olup olmadığını not et. Sözleşmede sayılan haller İş K. m. 25 (işverenin haklı fesih sebepleri, ahlak ve iyi niyet kurallarına uymayan haller dahil) ile örtüşüyor mu, yoksa kanunda öngörülmeyen ek fesih sebepleri mi ekleniyor? İş K. m. 26 uyarınca haklı sebeple feshin, sebebin öğrenildiği günden başlayarak 6 iş günü ve her hâlde olayın gerçekleşmesinden itibaren 1 yıl içinde kullanılması gereken hak düşürücü bir süreye tabi olduğunu not et.",
            },
            {
                index: 15,
                name: "Yıllık İzin Hakkı",
                format: "text",
                prompt: "Çalışanın yıllık izin hakkı nedir? Yılda gün (veya hafta) sayısını, bunun resmi tatilleri içerip içermediğini veya bunlara ek olup olmadığını ve izin biriktirme, devretme veya fesihte kullanılmamış iznin ödenmesi hükümlerini belirt. İş K. m. 53 uyarınca kıdeme göre asgari yıllık izin süreleri emredicidir (1-5 yıl arası: 14 gün; 5-15 yıl arası: 20 gün; 15 yıl ve üzeri: 26 gün — 18 yaşından küçük ve 50 yaşından büyük işçilerde asgari 20 gün) ve sözleşmeyle azaltılamaz; sözleşmedeki süreyi bu asgari sürelerle karşılaştır.",
            },
            {
                index: 16,
                name: "Rekabet Etmeme (İş Sonrası)",
                format: "text",
                prompt: "Sözleşmede iş ilişkisi sona erdikten sonrası için bir rekabet etmeme taahhüdü var mı? Varsa süresini, konu ve coğrafi kapsamını, varsa karşılığında ödenecek tazminatı ve ihlal halindeki cezai şartı belirt. TBK m. 444-447 çerçevesinde değerlendir: taahhüt yazılı şekilde mi yapılmış (TBK m. 444/f.2 — aksi halde geçersizdir); süre, yer ve konu bakımından çalışanın ekonomik geleceğini hakkaniyete aykırı biçimde tehlikeye düşürecek ölçüde geniş mi (aşırı kapsam TBK m. 445 uyarınca mahkemece resen sınırlandırılabilir); ve TBK m. 447 uyarınca işçinin fiilen menfaati olmayan bir işten ayrılması hâlinde (ör. işverenin haksız feshi) rekabet yasağının sona erebileceğini not et. Böyle bir hüküm yoksa 'Belirtilmemiş' yanıtla.",
            },
        ],
    },

    // ─── Dilekçeler (Dava) ───────────────────────────────────────────────────────
    {
        id: "builtin-bilirkisi-itiraz",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Bilirkişi Raporuna İtiraz Dilekçesi",
        type: "assistant",
        practice: "Dava",
        prompt_md:
            "## Bilirkişi Raporuna İtiraz Dilekçesi Hazırla\n\n" +
            "Yüklenen bilirkişi raporunu ve (varsa) dava dosyasındaki diğer belgeleri read_document / fetch_documents ile incele. Amaç, HMK m. 281 uyarınca rapora karşı gerekçeli bir itiraz dilekçesi hazırlamaktır. Rapor tebliğinden itibaren iki haftalık itiraz süresi bulunduğunu kullanıcıya hatırlat.\n\n" +
            "Önce raporu çözümle ve şu zayıf noktaları ara: (a) bilirkişinin görev/uzmanlık alanını veya mahkemenin tevdi ettiği soruları aşması, (b) hukuki niteleme yapması (bu hâkimin işidir), (c) dosyadaki delillerin göz ardı edilmesi veya yanlış değerlendirilmesi, (d) hesap/ölçüm/yöntem hataları, (e) rapor içi çelişkiler, (f) varsayıma veya eksik incelemeye dayanması, (g) ek araştırma/keşif gerektiren hususların atlanması.\n\n" +
            "Her itiraz noktasını rapordaki ilgili sayfa/bölüme atıfla, somut ve madde madde gerekçelendir; rapordan birebir alıntı yaparak çelişkiyi göster. Hukuki dayanakları (HMK ilgili maddeleri ve varsa emsal Yargıtay kararları) bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde veya karar numarası uydurma.\n\n" +
            "Dilekçeyi şu yapıda kur: mahkeme adı ve dosya (Esas) numarası başlığı; TARAFLAR (Davacı/Davalı ve vekilleri); KONU (… tarihli bilirkişi raporuna karşı itirazlarımızın sunulmasıdır); AÇIKLAMALAR (itirazlar sıra numarasıyla); HUKUKİ NEDENLER; SONUÇ VE İSTEM (rapora itibar edilmemesi, ek rapor veya yeni bilirkişi/heyetten rapor alınması talebi). Dosya numarası, taraf bilgileri veya tarih gibi bilinmeyen alanlar için köşeli parantezli yer tutucu kullan (ör. [Esas No]).\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıaları uydurma; yalnızca dosyadaki belgelere ve kullanıcının verdiği bilgilere dayan.",
        columns_config: null,
    },
    {
        id: "builtin-dava-dilekcesi",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Dava Dilekçesi",
        type: "assistant",
        practice: "Dava",
        prompt_md:
            "## Dava Dilekçesi Hazırla\n\n" +
            "Kullanıcının anlatımını ve yüklenen belgeleri read_document / fetch_documents ile incele; HMK m. 119'da sayılan zorunlu unsurları taşıyan bir dava dilekçesi hazırla.\n\n" +
            "Dilekçeyi şu yapıda kur:\n" +
            "- Mahkeme adı (görevli ve yetkili mahkeme; emin değilsen uyuşmazlık türüne göre öner ve gerekçesini belirt, ör. Asliye Hukuk, Asliye Ticaret, İş, Aile, Tüketici)\n" +
            "- TARAFLAR — Davacı ve varsa vekili; Davalı; ad-soyad/unvan, TC/adres bilgileri (bilinmiyorsa yer tutucu)\n" +
            "- KONU — talebin özeti ve dava değeri (harca esas değer)\n" +
            "- AÇIKLAMALAR — vakıaları kronolojik ve sıra numaralı biçimde, dosyadaki belgelere atıfla anlat\n" +
            "- HUKUKİ NEDENLER — dayanılan kanun maddeleri (mevzuat_ara ile doğrula)\n" +
            "- HUKUKİ DELİLLER — sözleşme, fatura, tanık, bilirkişi, yemin, keşif vb.; karşı delil sunma hakkı saklı tutularak\n" +
            "- SONUÇ VE İSTEM — açık, sıra numaralı talepler (asıl alacak/talep, faiz ve başlangıcı, yargılama gideri ve vekâlet ücreti)\n\n" +
            "Hukuki nedenleri ve varsa emsal kararları bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde/karar numarası uydurma. Zamanaşımı veya hak düşürücü süre riski görürsen kullanıcıyı uyar.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Bilinmeyen bilgiler için köşeli parantezli yer tutucu kullan; vakıa uydurma.",
        columns_config: null,
    },
    {
        id: "builtin-istinaf-dilekcesi",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "İstinaf Başvuru Dilekçesi",
        type: "assistant",
        practice: "Dava",
        prompt_md:
            "## İstinaf Başvuru Dilekçesi Hazırla\n\n" +
            "Yüklenen ilk derece mahkemesi kararını ve dosyadaki diğer belgeleri read_document / fetch_documents ile incele; HMK m. 342 vd. uyarınca Bölge Adliye Mahkemesi'ne (BAM) sunulacak bir istinaf başvuru dilekçesi hazırla. Kararın tebliğinden itibaren iki haftalık istinaf süresini kullanıcıya hatırlat.\n\n" +
            "Önce kararı çözümle ve istinaf sebeplerini belirle: (a) maddi vakıanın hatalı/eksik tespiti, (b) delillerin hatalı değerlendirilmesi veya toplanmayan deliller, (c) hukukun yanlış uygulanması/yorumlanması, (d) usul hataları (HMK'ya aykırılık, hak ihlali), (e) gerekçe yetersizliği veya çelişkisi, (f) talep aşımı veya talebin karşılanmaması.\n\n" +
            "Dilekçeyi şu yapıda kur: BAM ilgili Hukuk Dairesi'ne hitap; KARARI VEREN MAHKEME ve dosya bilgileri (Esas/Karar No, karar tarihi); TARAFLAR (İstinaf Eden / Karşı Taraf ve vekilleri); KONU; İSTİNAF SEBEPLERİ VE GEREKÇELERİ (her sebep sıra numaralı ve karara/dosyaya atıfla); HUKUKİ NEDENLER; SONUÇ VE İSTEM (kararın kaldırılması ve davanın kabulü / yeniden yargılama / dosyanın iadesi yönünde açık talep).\n\n" +
            "İstinaf sebeplerini ilgili HMK hükümleri ve emsal kararlarla, bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrulayarak destekle; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Bilinmeyen bilgiler için köşeli parantezli yer tutucu kullan.",
        columns_config: null,
    },
    {
        id: "builtin-temyiz-dilekcesi",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Temyiz Başvuru Dilekçesi",
        type: "assistant",
        practice: "Dava",
        prompt_md:
            "## Temyiz Başvuru Dilekçesi Hazırla\n\n" +
            "Yüklenen Bölge Adliye Mahkemesi (istinaf) kararını ve dosyadaki belgeleri read_document / fetch_documents ile incele; HMK m. 361 vd. uyarınca Yargıtay'a sunulacak bir temyiz başvuru dilekçesi hazırla. Kararın tebliğinden itibaren iki haftalık temyiz süresini ve uyuşmazlığın temyiz (kesinlik) sınırı bakımından temyiz edilebilir olup olmadığını kullanıcıya hatırlat.\n\n" +
            "Temyiz, kural olarak hukuka aykırılık denetimidir; vakıa incelemesi sınırlıdır. Temyiz sebeplerini buna göre belirle: (a) maddi hukukun yanlış uygulanması, (b) usul hükümlerine aykırılık, (c) gerekçe yokluğu/çelişkisi, (d) delillerin değerlendirilmesinde hukuka aykırılık, (e) BAM'ın istinaf incelemesini gereği gibi yapmaması.\n\n" +
            "Dilekçeyi şu yapıda kur: Yargıtay ilgili Hukuk Dairesi'ne hitap; KARARI VEREN BAM ve dosya bilgileri (Esas/Karar No, tarih) ile ilk derece dosya bilgileri; TARAFLAR (Temyiz Eden / Karşı Taraf ve vekilleri); KONU; TEMYİZ SEBEPLERİ VE GEREKÇELERİ (her sebep sıra numaralı, karara ve hukuka aykırılığa atıfla); HUKUKİ NEDENLER; SONUÇ VE İSTEM (kararın bozulması talebi).\n\n" +
            "Temyiz sebeplerini ilgili mevzuat ve emsal Yargıtay kararlarıyla, bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrulayarak destekle; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Bilinmeyen bilgiler için köşeli parantezli yer tutucu kullan.",
        columns_config: null,
    },
    {
        id: "builtin-cevap-dilekcesi",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Cevap Dilekçesi",
        type: "assistant",
        practice: "Dava",
        prompt_md:
            "## Cevap Dilekçesi Hazırla\n\n" +
            "Yüklenen dava dilekçesini ve dosyadaki belgeleri read_document / fetch_documents ile incele; HMK m. 126-129 uyarınca davalı vekili olarak bir cevap dilekçesi hazırla. Cevap süresinin (dava dilekçesinin tebliğinden itibaren iki hafta, gerektiğinde ek süre) kaçırılmaması gerektiğini kullanıcıya hatırlat.\n\n" +
            "Cevabı şu mantıkla kur: önce VARSA İLK İTİRAZLAR (HMK m. 116 — yetki, derdestlik, iş bölümü vb.) ile usule ilişkin itirazlar (görev, husumet, zamanaşımı, hak düşürücü süre); ardından ESASA CEVAP (davacının vakıalarına tek tek; kabul edilenler, inkâr edilenler ve karşı vakıalar açıkça ayrılır); KARŞI DELİLLER; HUKUKİ NEDENLER.\n\n" +
            "Dilekçe yapısı: mahkeme adı ve dosya (Esas) numarası; TARAFLAR (Davalı/vekili ve Davacı); KONU; İLK İTİRAZLAR VE USULE İLİŞKİN İTİRAZLAR; ESASA CEVAP (AÇIKLAMALAR, sıra numaralı); HUKUKİ NEDENLER; HUKUKİ DELİLLER; SONUÇ VE İSTEM (davanın usulden ve/veya esastan reddi, yargılama gideri ve vekâlet ücreti).\n\n" +
            "Zamanaşımı/hak düşürücü süre def'i ileri sürülebilecekse açıkça belirt ve hatırlat. Hukuki nedenleri ve emsal kararları bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıa uydurma; bilinmeyen alanlar için köşeli parantezli yer tutucu kullan.",
        columns_config: null,
    },
    {
        id: "builtin-cevaba-cevap-dilekcesi",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Cevaba Cevap (Replik) Dilekçesi",
        type: "assistant",
        practice: "Dava",
        prompt_md:
            "## Cevaba Cevap (Replik) Dilekçesi Hazırla\n\n" +
            "Bu, dilekçeler aşamasının ÜÇÜNCÜ dilekçesidir: DAVACI'nın, davalının cevap dilekçesine karşı verdiği cevaptır (replik — HMK m. 136). Yüklenen dava dilekçesini ve davalının cevap dilekçesini read_document / fetch_documents ile incele; davalının cevabının davacının iddialarını çürütmediğini ortaya koyan bir replik hazırla.\n\n" +
            "Yöntem: davalının cevap dilekçesini madde madde ele al; her bir savunma ve def'i için davacının karşı açıklamasını ve dosyadaki delillere dayalı çürütmeyi yaz. Davalının kabul ettiği vakıaları lehe vurgula; inkâr ettiği vakıalar için delil göster; ileri sürdüğü zamanaşımı/usul itirazlarına hukuki gerekçeyle karşı çık. Dava dilekçesindeki iddiaları tekrar etmek yerine, yalnızca cevaba yanıt veren yeni açıklamalara odaklan.\n\n" +
            "Dilekçe yapısı: mahkeme adı ve dosya (Esas) numarası; TARAFLAR (Davacı/vekili ve Davalı); KONU (davalının … tarihli cevap dilekçesine karşı beyanlarımız); AÇIKLAMALAR (davalının savunmalarına sıra numaralı yanıtlar); HUKUKİ NEDENLER; HUKUKİ DELİLLER; SONUÇ VE İSTEM (davanın kabulü yönündeki talebin yinelenmesi).\n\n" +
            "Hukuki nedenleri ve emsal kararları bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıa uydurma; bilinmeyen alanlar için köşeli parantezli yer tutucu kullan.",
        columns_config: null,
    },
    {
        id: "builtin-ikinci-cevap-dilekcesi",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "İkinci Cevap (Düplik) Dilekçesi",
        type: "assistant",
        practice: "Dava",
        prompt_md:
            "## İkinci Cevap (Düplik) Dilekçesi Hazırla\n\n" +
            "Bu, dilekçeler aşamasının DÖRDÜNCÜ ve son dilekçesidir: DAVALI'nın, davacının cevaba cevap (replik) dilekçesine karşı verdiği ikinci cevaptır (düplik — HMK m. 136). Yüklenen dava dilekçesi, cevap dilekçesi ve davacının replik dilekçesini read_document / fetch_documents ile incele; davalının savunmalarını pekiştiren bir düplik hazırla.\n\n" +
            "Yöntem: davacının replik dilekçesinde öne sürdüğü yeni açıklama ve çürütmeleri madde madde ele al; her biri için davalının karşı beyanını ve dosyadaki delillere dayalı yanıtını yaz. Cevap dilekçesindeki savunmaları gereksiz yere tekrar etme; yalnızca replikte gündeme gelen hususlara odaklan. İlk itirazlar ve esasa ilişkin savunmaların (zamanaşımı, hak düşürücü süre, husumet vb.) saklı tutulduğunu belirt.\n\n" +
            "Dilekçe yapısı: mahkeme adı ve dosya (Esas) numarası; TARAFLAR (Davalı/vekili ve Davacı); KONU (davacının … tarihli cevaba cevap dilekçesine karşı beyanlarımız); AÇIKLAMALAR (replikteki hususlara sıra numaralı yanıtlar); HUKUKİ NEDENLER; HUKUKİ DELİLLER; SONUÇ VE İSTEM (davanın reddi yönündeki talebin yinelenmesi).\n\n" +
            "Hukuki nedenleri ve emsal kararları bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıa uydurma; bilinmeyen alanlar için köşeli parantezli yer tutucu kullan.",
        columns_config: null,
    },

    // ─── Bilirkişi Raporu ────────────────────────────────────────────────────────
    {
        id: "builtin-bilirkisi-raporu-incelemesi",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Bilirkişi Raporu İncelemesi",
        type: "tabular",
        practice: "Dava",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Bilirkişi(ler) ve Uzmanlık Alanı",
                format: "bulleted_list",
                prompt: "Bu raporu düzenleyen bilirkişi(ler)i belirle. Her biri için ad-soyadını ve mesleki uzmanlık/branş alanını belirt (ör. inşaat mühendisi, mali müşavir/YMM, doktor, aktüer, trafik bilirkişisi). Belirtilmişse bilirkişilik sicil numarasını da ekle.",
            },
            {
                index: 1,
                name: "Heyet mi, Tek Bilirkişi mi",
                format: "tag",
                tags: ["Tek Bilirkişi", "Heyet"],
                prompt: "Rapor tek bir bilirkişi tarafından mı yoksa bir bilirkişi heyeti tarafından mı düzenlenmiş? Heyetse üye sayısını reasoning alanında belirt.",
            },
            {
                index: 2,
                name: "Rapor Tarihi",
                format: "date",
                prompt: "Bu bilirkişi raporunun düzenlenme (imza) tarihi nedir?",
            },
            {
                index: 3,
                name: "Görev Alanı (Mahkemenin Sorduğu Hususlar)",
                format: "bulleted_list",
                prompt: "Mahkemenin bilirkişiye tevdi ettiği (yönelttiği) inceleme konularını/soruları listele. Genellikle raporun giriş veya 'görev' bölümünde yer alır. Her soruyu ayrı madde olarak yaz.",
            },
            {
                index: 4,
                name: "İncelenen Deliller ve Belgeler",
                format: "bulleted_list",
                prompt: "Bilirkişinin incelemesine esas aldığı dosya içeriği, belgeler, keşif tutanağı, taraf beyanları veya diğer delilleri listele.",
            },
            {
                index: 5,
                name: "Yöntem ve Hesaplama Esası",
                format: "text",
                prompt: "Bilirkişinin kullandığı inceleme yöntemini ve varsa hesaplama esasını açıkla (ör. hangi tabloya, formüle, emsal bedele veya teknik standarda dayandığı). Yapılan varsayımları da belirt.",
            },
            {
                index: 6,
                name: "Dayanılan Mevzuat ve Standartlar",
                format: "bulleted_list",
                prompt: "Raporda atıf yapılan kanun, yönetmelik, teknik şartname veya standartları (ör. TS, ISO, SGK tarifesi, Yargıtay içtihadı) listele.",
            },
            {
                index: 7,
                name: "Sonuç ve Kanaat",
                format: "text",
                prompt: "Bilirkişinin ulaştığı nihai sonucu/kanaati özetle. Raporun 'SONUÇ' veya 'KANAAT' başlıklı bölümünü esas al; birebir alıntı yaparak destekle.",
            },
            {
                index: 8,
                name: "Hesaplanan Tutar",
                format: "monetary_amount",
                prompt: "Raporda hesaplanan bir tazminat, alacak veya bedel tutarı varsa belirt. Birden fazla kalem varsa toplamı ve varsa kalem bazlı kısa dökümü ekle.",
            },
            {
                index: 9,
                name: "Görev Aşımı / Hukuki Nitelendirme Var mı",
                format: "yes_no",
                prompt: "Bilirkişi, mahkemenin görev alanını aşarak hukuki nitelendirme veya değerlendirme yapmış mı (HMK m. 266 uyarınca bilirkişi yalnızca özel veya teknik bilgi gerektiren konularda görüş bildirebilir; hukuki değerlendirme hâkimin yetkisindedir)? Evet ise ilgili ifadeyi alıntıla.",
            },
            {
                index: 10,
                name: "Rapor İçi Çelişki/Tutarsızlık Var mı",
                format: "yes_no",
                prompt: "Raporun kendi içinde çelişen veya tutarsız ifadeleri var mı (ör. metin ile sonuç tablosu arasında fark, farklı bölümlerde farklı rakamlar)?",
            },
            {
                index: 11,
                name: "Muhalefet Şerhi Var mı",
                format: "yes_no",
                prompt: "Heyet raporuysa, heyet üyelerinden biri veya birkaçı çoğunluk görüşüne katılmayıp muhalefet şerhi düşmüş mü? Tek bilirkişi raporuysa 'Hayır' yanıtla.",
            },
            {
                index: 12,
                name: "İtiraz Edilebilecek Zayıf Noktalar",
                format: "bulleted_list",
                prompt: "Rapora karşı bir itiraz dilekçesinde ileri sürülebilecek zayıf noktaları listele: eksik/hatalı inceleme, dayanaksız varsayım, dosyadaki delillerin göz ardı edilmesi, hesap hatası, yetersiz gerekçe veya çelişki. Her noktayı rapordaki ilgili bölüme atıfla kısaca gerekçelendir.",
            },
            {
                index: 13,
                name: "Ek Rapor/Yeni İnceleme Önerilir mi",
                format: "yes_no",
                prompt: "Yukarıdaki tespitler ışığında, bu rapora itiraz ederek ek rapor veya yeni bir bilirkişi/heyetten rapor alınmasının talep edilmesi önerilir mi?",
            },
        ],
    },
];

export const BUILT_IN_IDS = new Set(BUILT_IN_WORKFLOWS.map((wf) => wf.id));
