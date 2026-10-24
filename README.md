# PatiGang web sitesi

Tek sayfalık, sunucu gerektirmeyen bir site. `index.html` dosyasına çift tıklayınca tarayıcıda açılır.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Sayfanın tüm içeriği ve metinleri |
| `styles.css` | Renkler, yazı tipleri, yerleşim (renkler en üstte) |
| `script.js` | **Tüm linkler en üstteki `PATIGANG` bloğunda** + yatak bulucu |
| `favicon.svg` | Tarayıcı sekmesindeki pati simgesi |
| `images/` | Gerçek fotoğraflar buraya |

## Yayından önce yapılacaklar

1. **Linkler** (`script.js`, en üst): Instagram adresi ve kullanıcı adı, Trendyol ve Hepsiburada mağaza linkleri. Şu an mağaza linkleri "patigang" aramasına gidiyor; doğrudan mağaza linkiyle değiştir. İstersen e-posta da ekle. Boş bırakılan link sitede görünmez.
2. **Fotoğraflar**: Çizimler geçici. `index.html` içinde yorum satırı olan yerlere (`<!-- ... -->`) gerçek fotoğraflar `<img src="images/...">` ile girer:
   - 4 ürün kartı (Koleksiyon bölümü)
   - Simge'nin atölye fotoğrafı (Hikâyemiz bölümündeki polaroid)
   - 4 Instagram karesi (Bizi nerede bulursun bölümü)
3. **Simge'nin onayı gereken metinler**:
   - Hikâyemiz bölümü (kendi ağzından mı, üçüncü şahıs mı kalsın?)
   - Ürün kategorileri: Simit Yatak, Minder Yatak, Kenarlı Yatak, Battaniye & Örtü. Gerçek ürün yelpazesine göre düzenlenmeli.
   - SSS'deki "Farklı renk ya da ölçü yaptırabilir miyim?" cevabı (özel sipariş alıyor mu?)
4. **Logo**: Şu an geçici bir pati logosu var. Gerçek logo varsa `index.html` içindeki iki `.logo` bloğuna konur.

## Yayına alma (ücretsiz)

- En kolay yol: [app.netlify.com/drop](https://app.netlify.com/drop) sayfasına bu klasörü sürükle-bırak. Birkaç saniyede bir adres verir. Sonra `patigang.com` gibi bir alan adı bağlanabilir.
- Alternatifler: GitHub Pages, Vercel ya da Cloudflare Pages.
