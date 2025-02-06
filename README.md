# API de Gestion de Réservation

## 📌 Contexte

Ce projet est une API REST développée avec AdonisJS v7 et PostgreSQL pour gérer des réservations. Il inclut un système d’authentification des administrateurs et l’envoi d’e-mails pour les confirmations.

## 🛠️ Technologies utilisées

- **Backend** : AdonisJS v7 (Node.js)
- **Base de données** : PostgreSQL
- **Service tiers** : SMTP pour l'envoi d'e-mails
- **CI/CD** : GitHub Actions

## 🚀 Installation et Configuration

### 1️⃣ Cloner le repository

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Configurer les variables d'environnement

Copier le fichier `.env.example` et le renommer en `.env`. Modifier les valeurs des variables d'environnement.

### 4️⃣ Exécuter les migrations

```bash
node ace migration:run
```

### 5️⃣ Démarrer le serveur

```bash
npm run dev
```

L'API est accessible à l’URL `http://localhost:3333`.

## 📖 Documentation API

La documentation OpenAPI est accessible à l’URL `/docs` après le lancement du serveur. Le fichier swagger est lui accessible à l'URL `/swagger`.

## 🧪 Tests

Une série de tests fonctionnels ont été développés à l'aide de la librairie [Japa](https://japa.dev/docs/introduction). Ces tests sont exécutés à chaque lors de chaque pull request ou merge grâce aux Github Actions.

## 🎯 Choix Techniques

### 🔹 Pourquoi AdonisJS ?

- Framework robuste avec gestion avancée de la validation et de l’authentification.
- Structure modulaire facilitant la maintenance.

### 🔹 Base de données : PostgreSQL

- Supporte les relations complexes (contraintes, transactions).
- Sécurisé et performant pour une API transactionnelle.

### 🔹 Service tiers : Envoi d’e-mails via SMTP

- Utilisation d'un serveur SMTP pour l’envoi des confirmations de réservation.
- Utilisation de Mailhog lors de la phase de développement afin de simuler la réception de mails.

### 🔹 CI/CD

- GitHub Actions pour exécuter les tests automatiquement et déployer après validation.

## Modèle de données

L'API a besoin de 4 tables pour fonctionner correctement (+ les tables générées automatiquement par AdonisJS lors de l'exécution des migrations). 

Voici le modèle de données utilisé : 
![image info](./static/EntityRelationshipDiagram.png)
