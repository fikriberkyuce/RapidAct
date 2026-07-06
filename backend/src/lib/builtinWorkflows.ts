export const BUILTIN_WORKFLOWS: { id: string; title: string; prompt_md: string }[] = [
    {
        id: "builtin-cp-checklist",
        title: "Ön Koşullar (CP) Kontrol Listesi Oluştur",
        prompt_md:
            "## Ön Koşullar (Conditions Precedent) Kontrol Listesi Oluştur\n\n" +
            "Yüklenen kredi sözleşmesini veya finansman belgesini incele ve kapsamlı bir " +
            "Ön Koşullar (CP) kontrol listesi oluştur.\n\n" +
            "Kontrol listesini indirilebilir bir Word belgesi olarak üretmek için MUTLAKA generate_docx aracını kullan. " +
            "generate_docx aracına MUTLAKA landscape: true geç — belge yatay (yatay yönlendirme) olmalıdır. " +
            "Kontrol listesini satır içinde gösterme — .docx dosyasını üret ve indirme bağlantısını sun.\n\n" +
            "Belgeyi şu şekilde yapılandır:\n" +
            "- Her koşul kategorisi için (ör. Kurumsal, Finansal, Hukuki, Teminat) başlıklı bir bölüm ekle\n" +
            "- Her kategori başlığının altına, tam olarak şu dört sütunu bu sırayla içeren bir tablo koy:\n" +
            "  1. Sıra No — kategori içindeki sıra numarası (1, 2, 3…)\n" +
            "  2. Madde No — sözleşmedeki madde veya ek (çizelge) referansı\n" +
            "  3. Koşul — ön koşulun kısa ve öz açıklaması\n" +
            "  4. Durum — kullanıcının dolduracağı boş alan (boş dize)\n\n" +
            "Her kategorinin satırları için bölüm nesnesindeki table alanını (content değil) kullan.\n\n" +
            "Tamamlamadan önce her tablonun doğru biçimlendirildiğini iki kez kontrol et: her tabloda yukarıdaki dört sütun aynı sırayla bulunmalı, başlıklar tam olarak eşleşmeli (Sıra No, Madde No, Koşul, Durum), her satırda başlıklarla aynı sayıda hücre olmalı, Sıra No sütunu her kategoride 1'den başlayarak sıralı olmalı ve hiçbir hücrede başıboş markdown, satır sonu veya yer tutucu metin olmamalı (Durum için boş dize kullan).",
    },
    {
        id: "builtin-credit-summary",
        title: "Kredi Sözleşmesi Özeti",
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
            "16. **Temerrüt Halleri** — Her temerrüt hali; varsa ek süreler (grace period), önemlilik eşikleri veya çapraz temerrüt hükümleri belirtilerek\n" +
            "17. **Devir/Temlik** — Devir veya temlik üzerindeki kısıtlamalar ya da izinler (ör. izinli/yasaklı liste, kredi veren devirlerinde kredi alan onayı; kredi alanın temlikine ilişkin kısıtlamalar)\n" +
            "18. **Kontrol Değişikliği (Change of Control)** — Kontrol değişikliği sayılan haller, tetiklediği yükümlülükler (ör. zorunlu erken ödeme, iptal, kredi veren onayı) ve varsa düzeltme süresi\n" +
            "19. **Erken Ödeme Bedeli** — Varsa erken ödeme bedelleri, make-whole primleri veya soft-call korumaları; uygulanan bedel, uygulandığı dönem ve istisnalar (ör. sigorta tazminatı veya varlık satışı gelirinden erken ödeme)\n" +
            "20. **Uygulanacak Hukuk** — Sözleşmeye uygulanacak hukuk\n" +
            "21. **Uyuşmazlık Çözümü** — Uyuşmazlıkların mahkemeye mi yoksa tahkime mi gideceği, seçilen yetkili mahkeme veya tahkim yeri ve yetki şartına ilişkin hükümler\n\n" +
            "Özeti sohbet yanıtında satır içinde sun — generate_docx ÇAĞIRMA. Yalnızca kullanıcı açıkça isterse indirilebilir bir Word belgesi üret.",
    },
    {
        id: "builtin-sha-summary",
        title: "Pay Sahipleri Sözleşmesi Özeti",
        prompt_md:
            "## Pay Sahipleri Sözleşmesi Özeti\n\n" +
            "Yüklenen pay sahipleri (ortaklar) sözleşmesini incele ve aşağıdaki başlıkları kapsayan kapsamlı bir hukuki özet hazırla. " +
            "Her bölüm için temel hükümleri belirle, ilgili madde referanslarını alıntıla ve olağandışı, ağır ya da piyasa standardından sapan şartları işaretle. Türk Ticaret Kanunu (TTK) çerçevesini esas al.\n\n" +
            "1. **Taraflar ve Pay Durumu** — Tam ticaret unvanları/ad-soyadları, rolleri, sahip oldukları pay grupları ve (belirtilmişse tam sulandırılmış esasta) yüzde oranları\n" +
            "2. **Pay Grupları ve Hakları** — Her grup için: oy hakları, kâr payı hakları, tasfiye payı önceliği, dönüştürme veya geri alım özellikleri\n" +
            "3. **Yönetim Kurulu Yapısı ve Yönetişim** — Kurul büyüklüğü, üye atama hakları (ve bunları korumak için gereken pay eşikleri), toplantı/karar nisapları ve üstün oy (kazandıran oy)\n" +
            "4. **Önemli Kararlar (İmtiyazlı/Ağırlaştırılmış Nisaplı)** — Özel çoğunluk, oybirliği veya belirli bir pay sahibinin onayını gerektiren kararlar; her biri için eşik ve kimin onayının gerektiği belirtilerek\n" +
            "5. **Yeni Paylarda Rüçhan (Önalım)** — Rüçhan hakkı kime ait, prosedür, süre ve istisnalar (ör. çalışan pay opsiyon programları)\n" +
            "6. **Devir Kısıtlamaları** — Devir yasağı süreleri (lock-up), yasaklı devirler, izinli devirler (ör. iştiraklere) ve gereken kurul veya pay sahibi onayları\n" +
            "7. **Önalım / Pay Devrinde Öncelikli Alım Hakkı** — Tetikleyici hal, prosedür, fiyatlama mekaniği ve istisnalar\n" +
            "8. **Sürükleme Hakkı (Drag-Along)** — Hak kime ait, tetikleyici eşik, koşullar (ör. asgari fiyat, bağımsız değerleme) ve azınlık korumaları\n" +
            "9. **Birlikte Satış Hakkı (Tag-Along)** — Hak kime ait, tetikleyici eşik, kullanım prosedürü ve fiyat şartları\n" +
            "10. **Sulandırma Karşıtı Korumalar (Anti-Dilution)** — Türü (tam ratchet, ağırlıklı ortalama), tetikleyici haller, hesaplama mekaniği ve istisnalar\n" +
            "11. **Kâr Payı Politikası** — Kâr payı dağıtımına ilişkin yükümlülük veya hedef, imtiyazlı kâr payı hakları ve dağıtım kısıtlamaları\n" +
            "12. **Çıkış ve Likidite** — Üzerinde anlaşılan çıkış yolları (ticari satış, halka arz, sürükleme yoluyla satış), süreler ve çıkışta tasfiye payı öncelikleri\n" +
            "13. **Kilitlenme (Deadlock)** — Kilitlenme tanımı, tırmandırma ve çözüm mekanizmaları (ör. Rus ruleti, al/sat opsiyonları) ve çözülememesi halinde sonuçları\n" +
            "14. **Rekabet Etmeme ve Ayartmama (Non-Solicitation)** — Kimleri bağladığı, faaliyet ve coğrafi kapsamı, süresi ve istisnaları\n" +
            "15. **Uygulanacak Hukuk ve Uyuşmazlık Çözümü** — Uygulanacak hukuk, yetkili mahkeme veya tahkim, ve varsa zorunlu tırmandırma/uzlaşma adımları\n\n" +
            "Özeti indirilebilir bir Word belgesi olarak üret.",
    },

    // ─── Dilekçeler (Dava/Uyuşmazlık) ────────────────────────────────────────────
    {
        id: "builtin-bilirkisi-itiraz",
        title: "Bilirkişi Raporuna İtiraz Dilekçesi",
        prompt_md:
            "## Bilirkişi Raporuna İtiraz Dilekçesi Hazırla\n\n" +
            "Yüklenen bilirkişi raporunu ve (varsa) dava dosyasındaki diğer belgeleri read_document / fetch_documents ile incele. Amaç, HMK m. 281 uyarınca rapora karşı gerekçeli bir itiraz dilekçesi hazırlamaktır. Rapor tebliğinden itibaren iki haftalık itiraz süresi bulunduğunu kullanıcıya hatırlat.\n\n" +
            "Önce raporu çözümle ve şu zayıf noktaları ara: (a) bilirkişinin görev/uzmanlık alanını veya mahkemenin tevdi ettiği soruları aşması, (b) hukuki niteleme yapması (bu hâkimin işidir), (c) dosyadaki delillerin göz ardı edilmesi veya yanlış değerlendirilmesi, (d) hesap/ölçüm/yöntem hataları, (e) rapor içi çelişkiler, (f) varsayıma veya eksik incelemeye dayanması, (g) ek araştırma/keşif gerektiren hususların atlanması.\n\n" +
            "Her itiraz noktasını rapordaki ilgili sayfa/bölüme atıfla, somut ve madde madde gerekçelendir; rapordan birebir alıntı yaparak çelişkiyi göster. Hukuki dayanakları (HMK ilgili maddeleri ve varsa emsal Yargıtay kararları) bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde veya karar numarası uydurma.\n\n" +
            "Dilekçeyi şu yapıda kur: mahkeme adı ve dosya (Esas) numarası başlığı; TARAFLAR (Davacı/Davalı ve vekilleri); KONU (… tarihli bilirkişi raporuna karşı itirazlarımızın sunulmasıdır); AÇIKLAMALAR (itirazlar sıra numarasıyla); HUKUKİ NEDENLER; SONUÇ VE İSTEM (rapora itibar edilmemesi, ek rapor veya yeni bilirkişi/heyetten rapor alınması talebi). Dosya numarası, taraf bilgileri veya tarih gibi bilinmeyen alanlar için köşeli parantezli yer tutucu kullan (ör. [Esas No]).\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıaları uydurma; yalnızca dosyadaki belgelere ve kullanıcının verdiği bilgilere dayan.",
    },
    {
        id: "builtin-dava-dilekcesi",
        title: "Dava Dilekçesi",
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
    },
    {
        id: "builtin-istinaf-dilekcesi",
        title: "İstinaf Başvuru Dilekçesi",
        prompt_md:
            "## İstinaf Başvuru Dilekçesi Hazırla\n\n" +
            "Yüklenen ilk derece mahkemesi kararını ve dosyadaki diğer belgeleri read_document / fetch_documents ile incele; HMK m. 342 vd. uyarınca Bölge Adliye Mahkemesi'ne (BAM) sunulacak bir istinaf başvuru dilekçesi hazırla. Kararın tebliğinden itibaren iki haftalık istinaf süresini kullanıcıya hatırlat.\n\n" +
            "Önce kararı çözümle ve istinaf sebeplerini belirle: (a) maddi vakıanın hatalı/eksik tespiti, (b) delillerin hatalı değerlendirilmesi veya toplanmayan deliller, (c) hukukun yanlış uygulanması/yorumlanması, (d) usul hataları (HMK'ya aykırılık, hak ihlali), (e) gerekçe yetersizliği veya çelişkisi, (f) talep aşımı veya talebin karşılanmaması.\n\n" +
            "Dilekçeyi şu yapıda kur: BAM ilgili Hukuk Dairesi'ne hitap; KARARI VEREN MAHKEME ve dosya bilgileri (Esas/Karar No, karar tarihi); TARAFLAR (İstinaf Eden / Karşı Taraf ve vekilleri); KONU; İSTİNAF SEBEPLERİ VE GEREKÇELERİ (her sebep sıra numaralı ve karara/dosyaya atıfla); HUKUKİ NEDENLER; SONUÇ VE İSTEM (kararın kaldırılması ve davanın kabulü / yeniden yargılama / dosyanın iadesi yönünde açık talep).\n\n" +
            "İstinaf sebeplerini ilgili HMK hükümleri ve emsal kararlarla, bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrulayarak destekle; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Bilinmeyen bilgiler için köşeli parantezli yer tutucu kullan.",
    },
    {
        id: "builtin-temyiz-dilekcesi",
        title: "Temyiz Başvuru Dilekçesi",
        prompt_md:
            "## Temyiz Başvuru Dilekçesi Hazırla\n\n" +
            "Yüklenen Bölge Adliye Mahkemesi (istinaf) kararını ve dosyadaki belgeleri read_document / fetch_documents ile incele; HMK m. 361 vd. uyarınca Yargıtay'a sunulacak bir temyiz başvuru dilekçesi hazırla. Kararın tebliğinden itibaren iki haftalık temyiz süresini ve uyuşmazlığın temyiz (kesinlik) sınırı bakımından temyiz edilebilir olup olmadığını kullanıcıya hatırlat.\n\n" +
            "Temyiz, kural olarak hukuka aykırılık denetimidir; vakıa incelemesi sınırlıdır. Temyiz sebeplerini buna göre belirle: (a) maddi hukukun yanlış uygulanması, (b) usul hükümlerine aykırılık, (c) gerekçe yokluğu/çelişkisi, (d) delillerin değerlendirilmesinde hukuka aykırılık, (e) BAM'ın istinaf incelemesini gereği gibi yapmaması.\n\n" +
            "Dilekçeyi şu yapıda kur: Yargıtay ilgili Hukuk Dairesi'ne hitap; KARARI VEREN BAM ve dosya bilgileri (Esas/Karar No, tarih) ile ilk derece dosya bilgileri; TARAFLAR (Temyiz Eden / Karşı Taraf ve vekilleri); KONU; TEMYİZ SEBEPLERİ VE GEREKÇELERİ (her sebep sıra numaralı, karara ve hukuka aykırılığa atıfla); HUKUKİ NEDENLER; SONUÇ VE İSTEM (kararın bozulması talebi).\n\n" +
            "Temyiz sebeplerini ilgili mevzuat ve emsal Yargıtay kararlarıyla, bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrulayarak destekle; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Bilinmeyen bilgiler için köşeli parantezli yer tutucu kullan.",
    },
    {
        id: "builtin-cevap-dilekcesi",
        title: "Cevap Dilekçesi",
        prompt_md:
            "## Cevap Dilekçesi Hazırla\n\n" +
            "Yüklenen dava dilekçesini ve dosyadaki belgeleri read_document / fetch_documents ile incele; HMK m. 126-129 uyarınca davalı vekili olarak bir cevap dilekçesi hazırla. Cevap süresinin (dava dilekçesinin tebliğinden itibaren iki hafta, gerektiğinde ek süre) kaçırılmaması gerektiğini kullanıcıya hatırlat.\n\n" +
            "Cevabı şu mantıkla kur: önce VARSA İLK İTİRAZLAR (HMK m. 116 — yetki, derdestlik, iş bölümü vb.) ile usule ilişkin itirazlar (görev, husumet, zamanaşımı, hak düşürücü süre); ardından ESASA CEVAP (davacının vakıalarına tek tek; kabul edilenler, inkâr edilenler ve karşı vakıalar açıkça ayrılır); KARŞI DELİLLER; HUKUKİ NEDENLER.\n\n" +
            "Dilekçe yapısı: mahkeme adı ve dosya (Esas) numarası; TARAFLAR (Davalı/vekili ve Davacı); KONU; İLK İTİRAZLAR VE USULE İLİŞKİN İTİRAZLAR; ESASA CEVAP (AÇIKLAMALAR, sıra numaralı); HUKUKİ NEDENLER; HUKUKİ DELİLLER; SONUÇ VE İSTEM (davanın usulden ve/veya esastan reddi, yargılama gideri ve vekâlet ücreti).\n\n" +
            "Zamanaşımı/hak düşürücü süre def'i ileri sürülebilecekse açıkça belirt ve hatırlat. Hukuki nedenleri ve emsal kararları bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıa uydurma; bilinmeyen alanlar için köşeli parantezli yer tutucu kullan.",
    },
    {
        id: "builtin-cevaba-cevap-dilekcesi",
        title: "Cevaba Cevap (Replik) Dilekçesi",
        prompt_md:
            "## Cevaba Cevap (Replik) Dilekçesi Hazırla\n\n" +
            "Bu, dilekçeler aşamasının ÜÇÜNCÜ dilekçesidir: DAVACI'nın, davalının cevap dilekçesine karşı verdiği cevaptır (replik — HMK m. 136). Yüklenen dava dilekçesini ve davalının cevap dilekçesini read_document / fetch_documents ile incele; davalının cevabının davacının iddialarını çürütmediğini ortaya koyan bir replik hazırla.\n\n" +
            "Yöntem: davalının cevap dilekçesini madde madde ele al; her bir savunma ve def'i için davacının karşı açıklamasını ve dosyadaki delillere dayalı çürütmeyi yaz. Davalının kabul ettiği vakıaları lehe vurgula; inkâr ettiği vakıalar için delil göster; ileri sürdüğü zamanaşımı/usul itirazlarına hukuki gerekçeyle karşı çık. Dava dilekçesindeki iddiaları tekrar etmek yerine, yalnızca cevaba yanıt veren yeni açıklamalara odaklan.\n\n" +
            "Dilekçe yapısı: mahkeme adı ve dosya (Esas) numarası; TARAFLAR (Davacı/vekili ve Davalı); KONU (davalının … tarihli cevap dilekçesine karşı beyanlarımız); AÇIKLAMALAR (davalının savunmalarına sıra numaralı yanıtlar); HUKUKİ NEDENLER; HUKUKİ DELİLLER; SONUÇ VE İSTEM (davanın kabulü yönündeki talebin yinelenmesi).\n\n" +
            "Hukuki nedenleri ve emsal kararları bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıa uydurma; bilinmeyen alanlar için köşeli parantezli yer tutucu kullan.",
    },
    {
        id: "builtin-ikinci-cevap-dilekcesi",
        title: "İkinci Cevap (Düplik) Dilekçesi",
        prompt_md:
            "## İkinci Cevap (Düplik) Dilekçesi Hazırla\n\n" +
            "Bu, dilekçeler aşamasının DÖRDÜNCÜ ve son dilekçesidir: DAVALI'nın, davacının cevaba cevap (replik) dilekçesine karşı verdiği ikinci cevaptır (düplik — HMK m. 136). Yüklenen dava dilekçesi, cevap dilekçesi ve davacının replik dilekçesini read_document / fetch_documents ile incele; davalının savunmalarını pekiştiren bir düplik hazırla.\n\n" +
            "Yöntem: davacının replik dilekçesinde öne sürdüğü yeni açıklama ve çürütmeleri madde madde ele al; her biri için davalının karşı beyanını ve dosyadaki delillere dayalı yanıtını yaz. Cevap dilekçesindeki savunmaları gereksiz yere tekrar etme; yalnızca replikte gündeme gelen hususlara odaklan. İlk itirazlar ve esasa ilişkin savunmaların (zamanaşımı, hak düşürücü süre, husumet vb.) saklı tutulduğunu belirt.\n\n" +
            "Dilekçe yapısı: mahkeme adı ve dosya (Esas) numarası; TARAFLAR (Davalı/vekili ve Davacı); KONU (davacının … tarihli cevaba cevap dilekçesine karşı beyanlarımız); AÇIKLAMALAR (replikteki hususlara sıra numaralı yanıtlar); HUKUKİ NEDENLER; HUKUKİ DELİLLER; SONUÇ VE İSTEM (davanın reddi yönündeki talebin yinelenmesi).\n\n" +
            "Hukuki nedenleri ve emsal kararları bağlı MCP araçlarıyla (mevzuat_ara, ictihat_ara) doğrula; madde/karar numarası uydurma.\n\n" +
            "Dilekçeyi generate_docx ile indirilebilir bir Word belgesi olarak üret. Vakıa uydurma; bilinmeyen alanlar için köşeli parantezli yer tutucu kullan.",
    },
];
