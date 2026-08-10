#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

: "${SPACEWEB_FTP_HOST:?Set SPACEWEB_FTP_HOST (e.g. ftp.sweb.ru)}"
: "${SPACEWEB_FTP_USER:?Set SPACEWEB_FTP_USER}"
: "${SPACEWEB_FTP_PASSWORD:?Set SPACEWEB_FTP_PASSWORD}"
SPACEWEB_FTP_DIR="${SPACEWEB_FTP_DIR:-/home/r/ruslanmeht/public_html}"

echo "Building static export..."
npm run build

if [[ ! -d out ]]; then
  echo "Missing out/ after build" >&2
  exit 1
fi

echo "Uploading to ${SPACEWEB_FTP_HOST}${SPACEWEB_FTP_DIR} ..."

if command -v lftp >/dev/null 2>&1; then
  lftp -u "${SPACEWEB_FTP_USER},${SPACEWEB_FTP_PASSWORD}" "${SPACEWEB_FTP_HOST}" <<EOF
set ssl:verify-certificate no
set ftp:ssl-force true
set ftp:ssl-protect-data true
cd ${SPACEWEB_FTP_DIR}
mirror -R --delete --verbose out/ .
bye
EOF
elif command -v ncftpput >/dev/null 2>&1; then
  ncftpput -R -u "${SPACEWEB_FTP_USER}" -p "${SPACEWEB_FTP_PASSWORD}" \
    "${SPACEWEB_FTP_HOST}" "${SPACEWEB_FTP_DIR}" out/*
else
  echo "Install lftp or ncftp to upload. Files are ready in out/" >&2
  exit 1
fi

echo "Done. Open https://ruslanmekhtiev.ru"
