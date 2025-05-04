
# Projet Gestion de Livres – Microservices (Angular + Spring Boot + PostgreSQL + Kubernetes)

## Présentation

Ce projet illustre une architecture **microservices** pour la gestion de livres :
- **Microservice Frontend** : Angular servi par Nginx (indépendant)
- **Microservice Backend** : Spring Boot (Java, indépendant)
- **Base de données** : PostgreSQL (service dédié)
- **Déploiement** : Kubernetes (Minikube), prêt pour la production avec Ingress

Chaque composant est packagé, déployé et scalable indépendamment.

---

## Architecture
[Microservice Frontend: Angular/Nginx] <---> [Microservice Backend: Spring Boot] <---> [Service PostgreSQL]

                |                                  |                                          |

       frontend-service                      backend-service                            postgres-service

                                          |  Kubernetes Cluster |                                     


---

## Prérequis

- [Node.js](https://nodejs.org/) (pour builder le frontend)
- [Docker](https://www.docker.com/)
- [Minikube](https://minikube.sigs.k8s.io/docs/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Git](https://git-scm.com/)
- (Optionnel) [PostgreSQL client](https://www.postgresql.org/download/)

---


## Déploiement local (Minikube)

### 1. Démarrage du cluster et activation d'Ingress

minikube start --driver=docker

minikube addons enable ingress



### 2. Construction des images Docker dans l'environnement Minikube

eval $(minikube docker-env) # (Git Bash sous Windows)


Build backend (Spring Boot)
cd book-service
docker build -t yasmine0301/book-backend:latest .

Build frontend (Angular)
cd ../book-frontend
docker build -t book-frontend:final .

### 3. Déploiement des ressources Kubernetes

cd ../kubernetes

kubectl apply -f postgres-service.yaml

kubectl apply -f postgres-deployement.yaml

kubectl apply -f backend-service.yaml

kubectl apply -f backend-deployment.yaml

kubectl apply -f frontend-service.yaml

kubectl apply -f frontend-deployment.yaml

kubectl apply -f ingress.yaml


### 4. (Optionnel) Vérification des pods et services

kubectl get pods

kubectl get services

kubectl get ingress





### 5. Tunnel pour l’Ingress (Windows/Docker)

Dans un terminal séparé : 
minikube tunnel


### 6. Accès à l’application

- **Frontend** : [http://localhost/](http://localhost/) ou [http://bookapp.local/](http://bookapp.local/) (si configuré dans le fichier hosts)
- **API** : [http://localhost/api/books](http://localhost/api/books)

---

## Variables d'environnement importantes

### Backend (Spring Boot)
- `SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-service:5432/bookdb`
- `SPRING_DATASOURCE_USERNAME=postgres`
- `SPRING_DATASOURCE_PASSWORD=passwd`
- `SPRING_JPA_HIBERNATE_DDL_AUTO=update`

### PostgreSQL
- `POSTGRES_DB=bookdb`
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=passwd`

---

## Dépannage


- **Erreur 503 sur le frontend** : Vérifiez que l’image Docker frontend est bien buildée et que le pod est en état `Running`.
- **ErrImagePull** : Vérifiez l’utilisation de `imagePullPolicy: Never` et que l’image existe dans le Docker de Minikube.
- **Problème d’accès Ingress** : Assurez-vous d’avoir lancé `minikube tunnel` et que le fichier hosts pointe vers `127.0.0.1` ou l’IP de Minikube.


---

## Sécurité

- **Pensez à réactiver le pare-feu Windows** après vos tests pour garantir la sécurité de votre machine.
- **Ne stockez pas de mots de passe en clair** dans un projet public.

---

## Auteur

- Yasmine Alouache

---

## Licence

Ce projet est sous licence MIT (ou à adapter selon vos besoins).
