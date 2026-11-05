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

Деплой идёт только по **FTPS** (TLS). Обычный FTP и клиенты вроде `ncftpput` в скрипте отключены.

### Вариант А — GitHub Actions (автоматически)

**Обязательно:** environment `spaceweb` (workflow уже ссылается на него).

1. GitHub → **Settings → Environments → New environment** → имя точно `spaceweb`.
2. В environment включи защиту по возможности:
   - **Required reviewers** (хотя бы ты сам) — деплой не уйдёт без подтверждения;
   - **Deployment branches**: только `main`.
3. В **Environment secrets** (не в обычных Repository secrets, если переносишь) добавь:

| Secret | Пример |
|--------|--------|
| `SPACEWEB_FTP_HOST` | hostname из панели SpaceWeb, напр. `vh328.sweb.ru` (не сырой IP, если сертификат выписан на имя) |
| `SPACEWEB_FTP_USER` | `ruslanmeht` |
| `SPACEWEB_FTP_PASSWORD` | пароль от панели |
| `SPACEWEB_FTP_DIR` | `/home/r/ruslanmeht/public_html/` |

4. Если секреты раньше лежали в Repository secrets — скопируй их в environment `spaceweb` и удали из repo-level, чтобы форки/чужие workflow их не видели.

Workflow `deploy-spaceweb.yml`: FTPS, `permissions: contents: read`, все actions (checkout / setup-node / FTP-Deploy) закреплены по полному SHA.

После push в `main` (или по cron) workflow зальёт `out/` на хостинг.

### Вариант Б — вручную

```bash
npm run build
# Залей содержимое папки out/ в public_html через файловый менеджер SpaceWeb (или FTPS-клиент с проверкой сертификата)
```

### Вариант В — скрипт

Нужен `lftp`. Пароль бери из env, не пиши в историю оболочки.

```bash
export SPACEWEB_FTP_HOST=vh328.sweb.ru
export SPACEWEB_FTP_USER=ruslanmeht
export SPACEWEB_FTP_PASSWORD='…'
export SPACEWEB_FTP_DIR=/home/r/ruslanmeht/public_html/
./scripts/deploy-spaceweb.sh
```

По умолчанию проверяется TLS-сертификат (`SPACEWEB_FTP_SSL_VERIFY=yes`). Если shared-хостинг отдаёт сертификат на другое имя — сначала попробуй hostname из панели; отключать проверку (`SPACEWEB_FTP_SSL_VERIFY=no`) только осознанно и на короткое время.

### Смена пароля FTP (обязательно при сомнении)

В панели SpaceWeb смени пароль FTP/аккаунта, если деплой когда-либо шёл по обычному FTP, с `SPACEWEB_FTP_SSL_VERIFY=no` в чужой сети, или пароль мог утечь. Затем обнови `SPACEWEB_FTP_PASSWORD` в Environment `spaceweb`.

`SPACEWEB_FTP_SSL_VERIFY=no` без `SPACEWEB_FTP_ALLOW_INSECURE=1` скрипт отклоняет.

См. также [SECURITY.md](./SECURITY.md) — чеклист перед релизом (`npm run security:check`, `/audit`).

## Канонический сайт

`https://ruslanmekhtiev.ru` (`www` и HTTP редиректятся в `.htaccess` на этот хост).

Для сборки с абсолютными ассетами: `SITE_URL=https://ruslanmekhtiev.ru npm run build:spaceweb`
