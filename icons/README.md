# Favicon ve Icon Dosyaları

## Mevcut Dosyalar
- `favicon.svg` - Ana SVG favicon (64x64)
- `og-image.svg` - Open Graph görseli için SVG kaynak (1200x630)

## Oluşturulması Gereken Dosyalar

### PNG İkonlar (favicon.svg'den oluştur)
Aşağıdaki boyutlarda PNG dosyaları oluşturun:

1. **favicon-16x16.png** (16x16 piksel)
2. **favicon-32x32.png** (32x32 piksel)
3. **favicon-48x48.png** (48x48 piksel)
4. **favicon-180x180.png** (180x180 piksel - Apple touch icon)
5. **favicon-192.png** (192x192 piksel - PWA)
6. **favicon-512.png** (512x512 piksel - PWA)

### ICO Dosyası
**favicon.ico** - Çoklu boyutlu ICO dosyası (16x16, 32x32, 48x48 içermeli)

### Open Graph Görseli
**og-image.jpg** (1200x630 piksel) - `og-image.svg` dosyasından JPG'ye dönüştürün

## Nasıl Oluşturulur?

### Online Araçlar
1. **SVG to PNG**: https://convertio.co/svg-png/ veya https://cloudconvert.com/svg-to-png
2. **SVG to ICO**: https://convertio.co/svg-ico/ veya https://realfavicongenerator.net/
3. **SVG to JPG**: https://convertio.co/svg-jpg/

### Desktop Araçlar
- **Inkscape** (Ücretsiz): SVG dosyalarını PNG/JPG'ye export edebilir
- **ImageMagick** (Komut satırı): `magick favicon.svg -resize 32x32 favicon-32x32.png`
- **GIMP** (Ücretsiz): SVG import edip PNG/ICO export edebilir

### Hızlı Komut Satırı (ImageMagick ile)
```bash
# PNG dosyaları oluştur
magick favicon.svg -resize 16x16 icons/favicon-16x16.png
magick favicon.svg -resize 32x32 icons/favicon-32x32.png
magick favicon.svg -resize 48x48 icons/favicon-48x48.png
magick favicon.svg -resize 180x180 icons/favicon-180x180.png
magick favicon.svg -resize 192x192 icons/favicon-192.png
magick favicon.svg -resize 512x512 icons/favicon-512.png

# ICO dosyası oluştur
magick favicon.svg -define icon:auto-resize=16,32,48 icons/favicon.ico

# OG Image JPG oluştur
magick og-image.svg -quality 90 -resize 1200x630 icons/og-image.jpg
```

### Alternatif: Favicon Generator
https://realfavicongenerator.net/ kullanarak `favicon.svg` dosyanızı yükleyip tüm formatları otomatik oluşturabilirsiniz.

## Notlar
- Tüm dosyalar bu klasörde (`/icons/`) olmalı
- Dosya yolları HTML'de `/icons/` ile başlıyor (root-relative)
- PWA için 192x192 ve 512x512 PNG dosyaları zorunlu

