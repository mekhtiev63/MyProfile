# Безопасность

Статический сайт (Next `output: "export"`). Главные риски — пайплайн сборки/деплоя и зависимости, не runtime API.

## Перед каждым релизом

```bash
npm run security:check   # npm audit --omit=dev --audit-level=high
npm run lint
npm run typecheck
npm run build
```

В чате Cursor: `/audit` (oktsec) или «сделай security-audit» (Cloudflare).

## Смена FTP-пароля (п.9)

Сделай в панели SpaceWeb **сейчас**, если когда-либо:

- заливал сайт обычным FTP / `ncftpput`;
- деплоил с `SPACEWEB_FTP_SSL_VERIFY=no` по чужой/кафе-сети;
- пароль светился в истории shell, скриншоте или незащищённом чате.

Шаги: cp.sweb.ru → пароль FTP/панели → обнови secret `SPACEWEB_FTP_PASSWORD` в GitHub Environment **`spaceweb`**.

Скрипт `deploy-spaceweb.sh` больше не принимает `SSL_VERIFY=no` без явного `SPACEWEB_FTP_ALLOW_INSECURE=1`.

## Environment `spaceweb`

GitHub → Settings → Environments → `spaceweb`: secrets FTP, ideally required reviewers, ветка только `main`.
