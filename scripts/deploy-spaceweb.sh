#!/usr/bin/env bash
# Upload out/ to SpaceWeb over FTPS (TLS required, certificate verified).
# Plain FTP / ncftpput are intentionally unsupported — password must not travel cleartext.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

: "${SPACEWEB_FTP_HOST:?Set SPACEWEB_FTP_HOST (e.g. vh328.sweb.ru)}"
: "${SPACEWEB_FTP_USER:?Set SPACEWEB_FTP_USER}"
: "${SPACEWEB_FTP_PASSWORD:?Set SPACEWEB_FTP_PASSWORD}"
SPACEWEB_FTP_DIR="${SPACEWEB_FTP_DIR:-/home/r/ruslanmeht/public_html}"

# Opt-in only if the host presents a cert that does not match SPACEWEB_FTP_HOST
# (e.g. shared hosting wildcard). Prefer fixing the host name over disabling verify.
VERIFY_CERT="${SPACEWEB_FTP_SSL_VERIFY:-yes}"

if ! command -v lftp >/dev/null 2>&1; then
  echo "Install lftp (brew install lftp / apt install lftp). Plain FTP clients are not supported." >&2
  echo "Build output is ready in out/ — upload via SpaceWeb file manager if needed." >&2
  exit 1
fi

echo "Building static export..."
npm run build

if [[ ! -d out ]]; then
  echo "Missing out/ after build" >&2
  exit 1
fi

case "${VERIFY_CERT}" in
  yes|true|1) cert_setting="yes" ;;
  no|false|0)
    if [[ "${SPACEWEB_FTP_ALLOW_INSECURE:-}" != "1" ]]; then
      echo "Refusing SPACEWEB_FTP_SSL_VERIFY=no without SPACEWEB_FTP_ALLOW_INSECURE=1." >&2
      echo "Fix the FTPS hostname so the certificate matches, or set ALLOW_INSECURE only temporarily." >&2
      echo "If you previously deployed without verified TLS on an untrusted network — rotate the FTP password in SpaceWeb now." >&2
      exit 1
    fi
    echo "WARNING: insecure FTPS (cert not verified). Rotate SPACEWEB_FTP_PASSWORD after this session." >&2
    cert_setting="no"
    ;;
  *)
    echo "SPACEWEB_FTP_SSL_VERIFY must be yes or no (got: ${VERIFY_CERT})" >&2
    exit 1
    ;;
esac

# Prefer explicit ftps:// so plaintext FTP cannot be negotiated.
# Credentials go to lftp on stdin, not as process argv (-p / -e).
HOST="${SPACEWEB_FTP_HOST#ftps://}"
HOST="${HOST#ftp://}"
HOST="${HOST#sftp://}"

echo "Uploading via FTPS to ${HOST}${SPACEWEB_FTP_DIR} (ssl:verify-certificate ${cert_setting}) ..."

{
  cat <<CFG
set ssl:verify-certificate ${cert_setting}
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ftp:ssl-protect-list true
set net:max-retries 3
CFG
  # printf avoids shell expansion of $, `, \ inside the password
  printf 'open -u %s,%s ftps://%s\n' "$SPACEWEB_FTP_USER" "$SPACEWEB_FTP_PASSWORD" "$HOST"
  cat <<CFG
cd ${SPACEWEB_FTP_DIR}
mirror -R --delete --verbose out/ .
bye
CFG
} | lftp

echo "Done. Open https://ruslanmekhtiev.ru"
