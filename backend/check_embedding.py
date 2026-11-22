import sqlite3, os
db_path = os.path.abspath('nexus_ai.db')
conn = sqlite3.connect(db_path)
cur = conn.cursor()
cur.execute('PRAGMA table_info(memories)')
rows = cur.fetchall()
print(rows)
