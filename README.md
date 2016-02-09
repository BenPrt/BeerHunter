# BeerHunter (Client side)

## Description du projet

BeerHunter est une application mobile ludique dont le principe tourne autour de la chasse de bières développé par Benjamin PARANT, Sufiane SOUISSI et Jonathan SANTONI.
Elle est rendue disponible sur tous les types de mobiles grâce à Ionic, une plateforme logicielle permettant d'exporter des applications 
mobiles natives en les développant en AngularJS, donc via une technologie récente du web.

Ce repository fait suite au repository "BeerHunterClient" dans mon profil, il intègre une version plus récente d'Ionic, est bien plus abouti, et fonctionne totalement.

Pour plus de détails sur l'application, vous pouvez visiter notre blog de développement à cette adresse :
http://beerhunterdev.blogspot.fr/


## Procédure d'installation et d'exécution

Pour exécuter le projet, il vous faut installer Ionic via NPM (Node Package Manager, il est installé si vous avez installé NodeJS pour 
exécuter le Projet 1 de cette archive). Pour cela, exécutez cette commande :

```shell
npm install -g cordova ionic
```

### Tester sur navigateur

Pour exécuter BeerHunter sur navigateur, placez-vous à la racine du projet, et tapez cette commande : 

```shell
ionic serve
```

L'application est alors disponible à l'adresse suivante :

```shell
http://localhost:8100/#/
```

(pour un rendu optimal, utilisez l'émulateur de terminal mobile chrome et sélectionnez la visualisation d'un Galaxy SIII, par exemple)
Vous pouvez vous identifier avec l'identifiant "user" et le mot de passe "secret".

### Construire et exécuter l'application sur plate-forme mobile

Pour construire BeerHunter sur téléphone Android, il vous faut d'abord ajouter la plate-forme au projet grâce à cette commande :

```shell
ionic platform add android
```

Puis branchez le téléphone en déboggage USB, puis tapez :

```shell
ionic run android
```

L'application s'installe et s'exécute sur le termial, et un apk signé (selon les informations de config.xml) est généré dans 'platform/android/builds/output/apk/android-debug.apk'.


Pour tout renseignement supplémentaire, rendez-vous sur http://beerhunterdev.blogspot.fr ou contactez-nous via Github





