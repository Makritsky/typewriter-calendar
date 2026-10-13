# Машинописный календарь

Генератор сторис-календаря свободных дат в стиле печатной машинки (PWA, работает офлайн).

## Публикация на GitHub Pages
1. github.com → New repository → имя, например `calendar`, Public → Create.
2. «uploading an existing file» → перетащи ВСЁ содержимое этой папки (index.html, sw.js, manifest.webmanifest, fonts.css, папки fonts и icons) → Commit changes.
3. Settings → Pages → Source: «Deploy from a branch», Branch: `main`, папка `/ (root)` → Save.
4. Через 1–2 минуты сайт будет по адресу `https://<логин>.github.io/calendar/`.

## Обновление
Загрузи изменённые файлы так же, и в `sw.js` увеличь номер версии (например `tw-calendar-v2` → `v3`).
