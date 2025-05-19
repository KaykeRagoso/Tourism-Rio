import json
from google.cloud import firestore

# Caminho para o arquivo de credenciais do Firebase
# Exemplo: 'C:/Users/SEU_USUARIO/Downloads/seu-projeto-firebase-adminsdk.json'
cred_path = 'C:/Users/16380127763/Documents/Tourism-Rio/tourism-rio-firebase-adminsdk-fbsvc-b738040b8b.json'

# Inicializa o Firestore
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
db = firestore.Client()

# Carrega os dados do arquivo JSON
with open('planilha.json', encoding='utf-8') as f:
    spots = json.load(f)

# Adiciona cada spot ao Firestore
for spot in spots:
    # Opcional: pode usar o nome como ID, mas cuidado com duplicidade
    doc_ref = db.collection('spots').document()
    doc_ref.set(spot)

print("Importação concluída!")