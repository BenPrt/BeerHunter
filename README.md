# BeerHunter (Client mobile)


## Description du projet

BeerHunter est une application mobile ludique dont le principe tourne autour de la chasse de bières. Tout ceci a été développé par Benjamin PARANT, Sufiane SOUISSI et Jonathan SANTONI dans le cadre de l'UE Platine de notre master e-Services.
Elle est rendue disponible sur toutes les plate-formes mobiles grâce à Ionic, une technologie permettant d'exporter des applications 
mobiles natives en les développant en AngularJS, un framework JavaScript front-end.

Ce repository fait suite au repository "BeerHunterClient" de mon profil, il intègre une version plus récente d'Ionic, est bien plus abouti, et fonctionne totalement.

Pour consulter le repository de l'API de l'application, rendez-vous ici :
https://github.com/Sinjonathan/BeerHunterAPI


Pour plus de détails sur l'application, vous pouvez visiter notre blog de développement à cette adresse :
http://beerhunterdev.blogspot.fr/



## Procédure d'installation et d'exécution

Pré-requis : installer NPM (Node Package Manger), il est fourni lors de l'installation de NodeJS : https://nodejs.org/en/

Pour exécuter le projet, il vous faut installer Ionic via NPM. Pour cela, exécutez cette commande dans un terminal :

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

Note : pour un rendu optimal, utilisez l'émulateur de terminal mobile chrome et sélectionnez la visualisation d'un Galaxy Nexus, par exemple


### Construire et exécuter l'application sur plate-forme mobile


##### Android

Pour construire BeerHunter sur un téléphone Android, il vous faut d'abord ajouter la plate-forme au projet grâce à cette commande :

```shell
ionic platform add android
```

Branchez le téléphone en déboggage USB, puis tapez :

```shell
ionic run android
```

L'application s'installe s'exécute sur le téléphone, et un apk signé (selon les informations de config.xml) est généré à 'platform/android/builds/output/apk/android-debug.apk'.

##### iOS

Pré-requis : un Mac doté de xCode et d'une licence développeur

Pour tester BeerHunter sur iOs, tapez ces commandes :

```shell
ionic build ios
ionic emulate ios
```



Pour tout renseignement supplémentaire, rendez-vous sur http://beerhunterdev.blogspot.fr ou contactez-nous via Github

