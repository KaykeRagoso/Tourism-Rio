import os
from google.cloud import firestore

# Caminho para o arquivo de credenciais do Firebase
cred_path = 'C:/Users/16380127763/Documents/Tourism-Rio/tourism-rio-firebase-adminsdk-fbsvc-b738040b8b.json'
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
db = firestore.Client()

# Descrição padrão (você pode personalizar por tipo, nome, etc)
descricao_padrao = "Descrição não disponível."

# Atualiza todos os documentos da coleção 'spots'
docs = db.collection('spots').stream()
for doc in docs:
    data = doc.to_dict()
    if 'descricao' not in data or not data['descricao']:
        db.collection('spots').document(doc.id).update({'descricao': descricao_padrao})
        print(f"Descrição adicionada ao ponto: {data.get('nome', doc.id)}")

print("Atualização concluída!")