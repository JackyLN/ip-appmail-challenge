# AppMail Challenge

## Demo
[Link to demo https://appmail.slidegate.xyz](https://appmail.slidegate.xyz)

## Architecture Overview

```mermaid
graph TD
  subgraph User
    A["Frontend UI (Vite + React)"]
  end

  subgraph NGINX
    B["Nginx (Host-level TLS & Routing)"]
  end

  subgraph DockerApp
    C["Frontend Container (Nginx)"]
    D["Backend API (Express.js)"]
    E["(MongoDB)"]
  end

  subgraph OpenAI
    F[GPT-4 API]
  end

  A -->|Request: Generate Campaigns| B
  B -->|/api/campaigns/generate| D
  D -->|"Check DB for (month, year, url)"| E

  E -->|Exists| D -->|Return existing campaign set| A
  E -->|Not Found| D -->|Generate prompt & call OpenAI| F
  F -->|Response: JSON campaigns| D -->|Save to DB| E
  D -->|Return new campaign set| A

  style A fill:#E6F4F1,stroke:#999
  style B fill:#FFF9E6,stroke:#999
  style C fill:#F9FAFB,stroke:#ccc
  style D fill:#F0F9FF,stroke:#7BA9D6
  style E fill:#EAEAFF,stroke:#aaa
  style F fill:#FDEFEF,stroke:#EF4E4E

```

## Campaign Backend
[Campaign Backend README](/campaign-backend/README.md)

## Campaign Frontend
[Campaign Frontend README](/campaign-frontend/README.md)

## Installation & Setup
### Requirement:
- Local machine should have Docker to build the Docker container

### Installation
1. Clone the code base to your local.

2. Create a `.env` following the `.env.example` for backend

``` bash
cd campaign-backend
cat .env.example >> .env
```

3. Build the docker container:

``` bash
cd .. # incase you are still inside ./campaign-backend
docker compose up --build -d
```

- Once the container completed building up, access the UI via http://localhost:3000

## Further enhancement
1. Add in jwt and/or oauth for all sort of authentications. Via combination of url / month / year / user account, we can restrict the number of times per user per month/year can generate for each url.
2. CI/CD via Github Action to automate the deployment to my test server. (I will do it if I have spare time)
3. Enhance the flow in UI.