# Système de Gestion des Équipements Informatiques

## Objectif du Système

L'objectif de ce système est de faciliter la gestion des équipements informatiques au sein d'une organisation, ainsi que de fournir un suivi efficace des pannes et des tickets de support. Le système permet également la génération de rapports et de statistiques pour évaluer les performances et l'état des équipements.

## Contexte du Projet

En tant que développeur full stack Java/Angular dans la société ITSolutions, vous êtes chargé de concevoir et de développer un système de gestion des équipements informatiques.

## User Stories

### Gestion des Équipements Informatiques

- **En tant qu'administrateur IT**, je veux pouvoir ajouter de nouveaux équipements informatiques au système afin de suivre leur état et leur utilisation.
- **En tant qu'administrateur IT**, je veux pouvoir modifier les informations des équipements existants pour maintenir des données à jour.
- **En tant qu'administrateur IT**, je veux pouvoir supprimer des équipements obsolètes ou hors service pour garder le système organisé.
- **En tant qu'administrateur IT**, je veux pouvoir voir une liste de tous les équipements avec leur état actuel pour une gestion efficace.

### Gestion et Suivi des Pannes

- **En tant qu'administrateur IT**, je veux pouvoir gérer (ajouter, modifier, supprimer) les pannes.
- **En tant qu'administrateur IT**, je veux pouvoir consulter l'historique des pannes pour chaque équipement afin d'identifier les équipements problématiques.

### Gestion des Tickets de Support

- **En tant qu'utilisateur**, je veux pouvoir créer un ticket de support pour signaler une panne afin de recevoir de l'aide.
- **En tant qu'administrateur IT**, je veux pouvoir attribuer les tickets de support aux techniciens disponibles pour une résolution rapide.
- **En tant que technicien IT**, je veux pouvoir voir les tickets qui me sont attribués pour les traiter efficacement.
- **En tant qu'utilisateur**, je veux pouvoir suivre l'état de mon ticket de support pour savoir quand mon problème sera résolu.
- 
### Rapports et Statistiques

- **En tant qu'administrateur IT**, je veux recevoir des notifications pour les tickets en attente afin de ne pas manquer de demandes importantes.
- **En tant qu'administrateur IT**, je veux pouvoir voir des statistiques sur les pannes pour identifier les tendances et les problèmes récurrents.
- **En tant qu'administrateur IT**, je veux pouvoir générer des rapports sur l'état des équipements pour une meilleure gestion.
- **En tant qu'administrateur IT**, je veux pouvoir générer des rapports sur les performances du service de support pour améliorer l'efficacité.

## Fonctionnement

- **Historique des Pannes :** Conserve un enregistrement détaillé de toutes les pannes passées pour chaque équipement, permettant ainsi de garder une trace des problèmes rencontrés et des réparations effectuées.
- **Tickets de Support :** Créés par les utilisateurs lorsqu'ils rencontrent des problèmes avec les équipements. Chaque ticket est lié à un utilisateur spécifique, facilitant ainsi le suivi des problèmes signalés et la communication efficace.
- **Attribution des Tickets :** Une fois un ticket de support créé, il est attribué à un technicien pour résolution, permettant de suivre les responsabilités et d'évaluer les performances des techniciens en fonction des tickets résolus.

## Technologies Utilisées

- **Backend :** Spring Boot, Spring Data JPA, Spring Security
- **Frontend :** Angular 16
- **Base de données :** PostgreSQL / MySQL
- **Tests unitaires :** JUnit
- **Conteneurisation :** Docker
