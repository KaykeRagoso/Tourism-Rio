import os
import unicodedata
from google.cloud import firestore

# Caminho para o arquivo de credenciais do Firebase
cred_path = 'C:/Users/Administrator/Documents/Tourism-Rio/tourism-rio-firebase-adminsdk-fbsvc-b738040b8b.json'
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
db = firestore.Client()

def normaliza_nome(nome):
    nome = nome.strip().lower()
    nome = unicodedata.normalize('NFKD', nome).encode('ASCII', 'ignore').decode('ASCII')
    nome = nome.replace('/', '_').replace('\\', '_').replace(' ', '_')
    return nome

# Lê todos os documentos da coleção
docs = list(db.collection('spots').stream())

nomes_vistos = {}
duplicados = []

for doc in docs:
    data = doc.to_dict()
    nome_norm = normaliza_nome(data.get('nome', ''))
    if nome_norm in nomes_vistos:
        # Encontrou duplicado, marca para exclusão
        duplicados.append(doc.id)
    else:
        nomes_vistos[nome_norm] = doc.id

# Exclui os duplicados
for doc_id in duplicados:
    db.collection('spots').document(doc_id).delete()
    print(f'Documento duplicado removido: {doc_id}')

print(f"Remoção concluída! {len(duplicados)} duplicados excluídos.")