#
# IMPORTAÇÕES
#

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

#
# VARIÁVEIS E CONFIGURAÇÕES
#

app = Flask(__name__)

# configurações específicas para o SQLite
caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, 'musica.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + arquivobd

db = SQLAlchemy(app)

#
# CLASSES
#

class Musica(db.Model):
    # atributos da musica
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.Text)
    cantor = db.Column(db.Text)
    estilo = db.Column(db.Text)

    # expressar a classe em formato texto
    def __str__(self):
        return f'{self.nome}, ' +\
               f'{self.cantor}, {self.estilo}'

    # expressar a classe em formato json
    def json(self):
        return {
            "nome": self.nome,
            "cantor": self.cantor,
            "estilo": self.estilo
        }

#
# ROTAS
#

@app.route("/")
def ola():
    return "backend operante"

# curl localhost:5000/incluir_musica -X POST -d '{"nome":"Habla", "cantor":"Valeria Almeida", "estilo":"Pop"}' -H "Content-Type:application/json"
@app.route("/incluir_musica", methods=['POST'])
def incluir():
    dados = request.get_json()
    try:
        # cria a pessoa
        nova = Musica(**dados)
        # realiza a persistência da nova pessoa
        db.session.add(nova)
        db.session.commit()
        # tudo certo :-) resposta de sucesso
        return jsonify({"resultado": "ok", "detalhes": "ok"})
    except Exception as e:
        # informar mensagem de erro
        return jsonify({"resultado": "erro", "detalhes": str(e)})

@app.route("/listar_musica")
def listar_musica():
    try:
        # obter as musicas
        lista = db.session.query(Musica).all()
        # converter musicas pra json
        lista_retorno = [x.json() for x in lista]
        # preparar uma parte da resposta: resultado ok
        meujson = {"resultado": "ok"}
        meujson.update({"detalhes": lista_retorno})
        # retornar a lista de músicas json, com resultado ok
        resposta = jsonify(meujson)
        return resposta
    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})

#
# INICIO DA APLICAÇÃO
#

with app.app_context():

    # criar o banco de dados, caso não esteja criado
    db.create_all()

    # provendo o CORS ao sistema
    CORS(app)

    '''
      iniciar o servidor

      $ flask run

    '''
    
app.run()