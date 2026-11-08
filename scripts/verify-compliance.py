import json
import re
import os
import sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def verify_assetlinks():
    path = os.path.join('public', '.well-known', 'assetlinks.json')
    if not os.path.isfile(path):
        print(f"[ERROR] {path} no existe.")
        sys.exit(1)

    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if not isinstance(data, list) or len(data) == 0:
        print("[ERROR] assetlinks.json está vacío o no es una lista válida.")
        sys.exit(1)

    entry = data[0]
    relations = entry.get('relation', [])
    if 'delegate_permission/common.handle_all_urls' not in relations:
        print("[ERROR] Falta permiso 'delegate_permission/common.handle_all_urls'.")
        sys.exit(1)

    if 'delegate_permission/common.get_login_creds' not in relations:
        print("[ERROR] Falta permiso 'delegate_permission/common.get_login_creds'.")
        sys.exit(1)

    target = entry.get('target', {})
    if target.get('namespace') != 'android_app':
        print("[ERROR] Namespace debe ser 'android_app'.")
        sys.exit(1)

    if target.get('package_name') != 'sensus.com':
        print("[ERROR] Package name debe ser 'sensus.com'.")
        sys.exit(1)

    fingerprints = target.get('sha256_cert_fingerprints', [])
    if not isinstance(fingerprints, list) or len(fingerprints) == 0:
        print("[ERROR] Falta huella SHA-256 en assetlinks.json.")
        sys.exit(1)

    pattern = re.compile(r'^([0-9A-F]{2}:){31}[0-9A-F]{2}$')
    for fp in fingerprints:
        if not pattern.match(fp):
            print(f"[ERROR] Formato SHA-256 inválido: {fp}")
            sys.exit(1)

    print("OK: assetlinks.json validado formalmente con permisos y huellas criptograficas.")

def verify_legal_pages():
    pages = {
        os.path.join('public', 'index.html'): ['sensus', 'footer'],
        os.path.join('public', 'privacidad.html'): ['privacidad', 'arco'],
        os.path.join('public', 'eliminar-cuenta.html'): ['eliminar', 'cuenta'],
        os.path.join('public', 'contacto.html'): ['contacto', 'mensaje'],
        os.path.join('public', 'reset.html'): ['token'],
        os.path.join('public', 'reset', 'index.html'): ['reset.html']
    }

    for page_path, keywords in pages.items():
        if not os.path.isfile(page_path):
            print(f"[ERROR] Archivo legal obligatorio no encontrado: {page_path}")
            sys.exit(1)

        size = os.path.getsize(page_path)
        if size < 50:
            print(f"[ERROR] Archivo sospechosamente vacío ({size} bytes): {page_path}")
            sys.exit(1)

        with open(page_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read().lower()
            for kw in keywords:
                if kw not in content:
                    print(f"[ERROR] Falta contenido crítico '{kw}' en {page_path}")
                    sys.exit(1)

    print("OK: Integridad de páginas legales y críticas de Google Play verificada al 100%.")

if __name__ == '__main__':
    verify_assetlinks()
    verify_legal_pages()
