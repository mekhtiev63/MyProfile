# Деплой на SpaceWeb (для России)

Сайт собирается как **статический экспорт** (`out/`) и заливается на хостинг SpaceWeb.

## 1. SpaceWeb (cp.sweb.ru)

1. Сайт **ruslanmeht** → **Домены** → добавь `ruslanmekhtiev.ru` и `www.ruslanmekhtiev.ru`
2. Включи **SSL** (Let's Encrypt) для обоих доменов

## 2. Webnames — убрать Cloudflare

**DNS-серверы** → Задать самостоятельно:

- `ns1.spaceweb.ru`
- `ns2.spaceweb.ru`

(Не Cloudflare, не Vercel, не gohost.)

## 3. Загрузка файлов

### Вариант А — GitHub Actions (автоматически)

В GitHub → Settings → Secrets → Actions добавь:

| Secret | Пример |
|--------|--------|
| `SPACEWEB_FTP_HOST` | IP сервера из панели SpaceWeb или `vh328.sweb.ru` |
| `SPACEWEB_FTP_USER` | `ruslanmeht` |
| `SPACEWEB_FTP_PASSWORD` | пароль от панели |
| `SPACEWEB_FTP_DIR` | `/home/r/ruslanmeht/public_html/` |

После push в `main` workflow зальёт `out/` на хостинг.

### Вариант Б — вручную

```bash
npm run build
# Залей содержимое папки out/ в public_html через FTP или файловый менеджер SpaceWeb
```

### Вариант В — скрипт

```bash
export SPACEWEB_FTP_HOST=...
export SPACEWEB_FTP_USER=ruslanmeht
export SPACEWEB_FTP_PASSWORD=...
export SPACEWEB_FTP_DIR=/home/r/ruslanmeht/public_html/
./scripts/deploy-spaceweb.sh
```

## Пока DNS не переключён

`https://ruslanmekhtiev.vercel.app`
