# BetterCalendar-Front
  
To run:  
1. Login to ghcr:
    `docker login ghcr.io -u [github username] -p [github personal access token]`
2. Pull image
    `docker pull ghcr.io/szade-organization/bettercalendar-front:latest`
3. Run container
    `docker run -p 3500:80 bettercalendar-front`
4. Application will be avaible on http://localhost:3500/
