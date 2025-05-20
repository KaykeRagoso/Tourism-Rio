import json
import os
from google.cloud import firestore

# Caminho para o arquivo de credenciais do Firebase
cred_path = 'C:/Users/Administrator/Documents/Tourism-Rio/tourism-rio-firebase-adminsdk-fbsvc-b738040b8b.json'
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
db = firestore.Client()

# Lê todos os documentos da coleção 'spots'
spots = []
for doc in db.collection('spots').stream():
    data = doc.to_dict()
    data['id'] = doc.id
    spots.append(data)

# Salva em um arquivo JSON
with open('spots_exportados.json', 'w', encoding='utf-8') as f:
    json.dump(spots, f, ensure_ascii=False, indent=2)

print(f"Exportação concluída! {len(spots)} registros salvos em spots_exportados.json.")
