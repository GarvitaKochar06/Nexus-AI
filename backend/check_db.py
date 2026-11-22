import os, sqlite3, sys, pathlib, json

backend_dir = r'C:\Users\GARVITA\Desktop\Nexus_AI\backend'
os.chdir(backend_dir)

live_db = os.path.abspath('nexus_ai.db')
print('Live DB path:', live_db)

# find latest backup matching pattern
backup = None
for f in sorted(os.listdir('.'), reverse=True):
    if f.startswith('nexus_ai.db.backup_'):
        backup = os.path.abspath(f)
        break
print('Backup path:', backup)

def integrity(path):
    conn = sqlite3.connect(path)
    res = conn.execute('PRAGMA integrity_check').fetchone()
    conn.close()
    return res[0]

print('Live DB integrity:', integrity(live_db))
if backup:
    print('Backup DB integrity:', integrity(backup))
else:
    print('No backup found')
