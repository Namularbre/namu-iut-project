<h1>
Projet à rendre pour le module de nodeJs de la licence pro LPDWBD
</h1>

<h2>Dépendance du projet</h2>
<ul>
<li>
    NodeJS 18.12.1 ou plus récent
</li>
<li>
    Docker (mysql) ou une base de données MySql en local, cela n'a aucune importance.
</li>
</ul>

<h2>Installation</h2>
Voici les étapes à suivre :
<ol>
<li>Télécharger le code source en .zip, ou faites un git pull du projet</li>
<li>Prenez une image docker mysql et lancer là, ou juste mysql en local sur votre machine </li>
<li>
    Créez-vous un compte sur etherial mail <a href="https://ethereal.email/">ici</a>
    Gardez bien vos identifiant, on en aura besoins pour la suite.
</li>
<li>
    Dans le dossier /server créez un fichier .env
</li>
<li>
    Remplissez le comme suit :

    # nodeJS hosting variables
    PORT=80
    DB_HOST= l'adresse IPv4 de la base de données
    DB_USER= le nom d'utilisateur de votre base
    DB_PASSWORD=le mot de passe de la base de données mysql
    DB_DATABASE= le nom de la base
    HOST=localhost
    
    # etherial/nodemailer variables
    MAIL_HOST=smtp.ethereal.email
    MAIL_PORT=587
    MAIL_USER=votre adresse mail etherial
    MAIL_PASSWORD= votre mot de passe etherial
    MAIL_SITE_EMAIL=superapinode@email.tld
</li>
<li>
    Lancer l'application dans un prompt en vous plaçant dans le dossier `namu-iut-project` et
    en entrant la commande `node server`.
</li>
<li>
    Entrez l'adresse suivante dans un navigateur : votre_hôte:votre_port/documentation
</li>
</ol>
