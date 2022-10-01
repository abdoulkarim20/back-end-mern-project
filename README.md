![image](https://user-images.githubusercontent.com/85187164/190933698-7abf5f23-dc05-4516-ae18-1048b4ac69f2.png)

Ce projet est une mise en pratique sur les differentes notions et quelques concept que nous avons eu a apprendre lors de notre auto formation en nodejs express.
## Au cours de ce projet nous avons eu a travailler avec les modules suivants:
#### nodemon
- Pour la configuration du serveur et permettre a celui de s'auto actualiser.
#### body-parser et cookie-parser
- Pour pour le formatage de nos donnees et en sous format json.
#### mongoose
- Pour faire la communication avec notre base de donnees.
#### Securite jsonwebtoken
- Pour l'intergation de la securite nous avons utiliser le module jsonwebtoken.
#### bcrypt
- Pour assurer la securiter des mots de passe de nos utilisateurs nous avons utiliser le module bcrypt pour crypter les mot de passe de nos utilisateurs
## Bases de donnees
#### Mongodb
- Pour enregistrer les informations de nos utilisteurs.
- Pour creer votre propre base de donnees vous pouvez suivre ce lien et lire la documentation: https://www.mongodb.com
## Pour lancer ce projet depuis votre poste local veuillez clonner le projet avec ce lien: https://github.com/abdoulkarim20/back-end-mern-project
#### Etape a suivre:
- 1 git clone https://github.com/abdoulkarim20/back-end-mern-project
- 2 Se mettre dans la racine du projet et tapper la commande suivante: npm install 
- 3 dans le dossier config renommer le fichier.env.exemple en .envhttps://cloud.mongodb.com
- 3.1 Une fois que vous avez renommer le fichier veuillez modifier les lignes de codes ci-dessous: 
- DB_USER_PASSWORD='your_database_username:your_database_password'
- TOKEN_SECRET= 'votre_phrase_de_cle_secret'


