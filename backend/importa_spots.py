import json
from google.cloud import firestore
import os
import unicodedata

# Caminho para o arquivo de credenciais do Firebase
cred_path = 'C:/Users/Administrator/Documents/tourism-Rio/backend/tourism-rio-firebase-adminsdk-fbsvc-b738040b8b.json'

# Inicializa o Firestore
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
db = firestore.Client()

def normaliza_nome(nome):
    # Remove acentos, espaços extras, deixa minúsculo e remove / e \
    nome = nome.strip().lower()
    nome = unicodedata.normalize('NFKD', nome).encode('ASCII', 'ignore').decode('ASCII')
    nome = nome.replace('/', '_').replace('\\', '_').replace(' ', '_')
    return nome

# Carrega os dados do arquivo JSON
with open('planilha.json', encoding='utf-8') as f:
    spots = json.load(f)

# Adiciona cada spot ao Firestore, sobrescrevendo se já existir
for spot in spots:
    doc_id = normaliza_nome(spot['nome'])
    doc_ref = db.collection('spots').document(doc_id)
    doc_ref.set(spot)

print("Importação concluída! Dados repetidos foram sobrescritos se necessário.")