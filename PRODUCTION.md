# 1. Requirements

This tutorial assumes you are using Ubuntu 18.04 or newer.

It will follow this structure:

```
https://mydomain.com/            // Web
https://admin.mydomain.com/      // Administration panel
https://api.mydomain.com/        // API server
```

1. Copy and paste ReaderFront files under `/var/www/readerfront/`
2. [NodeJS 13 or newer.](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
3. [MariaDB and create a Database](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-18-04)
4. [NGINX](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
5. A Domain with the follow subdomains: `api` and `admin`

# 2. Configure the settings

Before proceeding, there are some settings you will need to configure. To configure them, copy the `.env.example` files to `.env` and edit them on every project.
Remember to modify:

```
NODE_ENV=development
APP_URL=http://localhost:3000/
API_URL=http://localhost:8000/

REACT_APP_APP_URL=http://localhost:3000
REACT_APP_READER_PATH=http://localhost:8000
```

to

```
NODE_ENV=production
APP_URL=https://mydomain.com/
API_URL=https://api.mydomain.com/

REACT_APP_APP_URL=https://mydomain.com
REACT_APP_READER_PATH=https://api.mydomain.com
```

# 3. Install the dependencies

Because it's pretty tedious to install the dependencies for each project individually we've created a script that goes through and runs `npm install` for project for you:

```sh
node shared/install-dependencies.js
```

# 4. Build Projects

Build project run:

```sh
npm run build:all
```

# 4. Migrate database

To migrate database and create the schema run:

```sh
npm run db:migrate
```

# 5. Daemonize Applications

PM2 is a process manager for Node.js applications. PM2 makes it possible to daemonize applications so that they will run in the background as a service.

Use npm to install the latest version of PM2 on your server:

```sh
npm install pm2@latest -g
```

The `-g` option tells npm to install the module globally, so that it’s available system-wide.

## Daemonize `api`:

```sh
cd api/
pm2 start index.js --name "readerfront-api"
```

Check that the API is running at `http://YOUR_SERVER_IP:8000/`

## Daemonize `web`:

```sh
cd ../
pm2 start npm --name "readerfront-web" -- start
```

Check that the API is running at `http://YOUR_SERVER_IP:3000/`

# Serve admin static file and reverse proxy

Your application is running and listening on localhost, but you need to set up a way for your users to access it. We will set up the Nginx web server as a reverse proxy for this purpose.

Configure NGINX to serve `admin` static files and reverse proxy `api` and `web`. Using [this tool](https://www.digitalocean.com/community/tools/nginx) you should have a similar configuration like this:

## Web

![alt text](./assets/conf_web_server.JPG 'web server tab')

![alt text](./assets/conf_web_reverseproxy.JPG 'web reverse proxy tab')

## Api

![alt text](./assets/conf_api_server.JPG 'api server tab')

![alt text](./assets/conf_api_reverseproxy.JPG 'api reverse proxy tab')

## Admin

![alt text](./assets/conf_admin_server.JPG 'admin server tab')

![alt text](./assets/conf_admin_routing.JPG 'admin routing tab')

## Configure Nginx

Follow the `Setup and Files` steps to configure Nginx and SSL (with certbot).

## Serve admin static files

To move the static files to nginx run:

```sh
mv /var/www/readerfront/admin/build/* /var/www/admin.mydomain.com/
sudo systemctl reload nginx
```

**remember to rename the domain name**

# Create admin account

To create the admin account go to `https://admin.mydomain.com/auth/signup` and the account will be automatically activated. Then you can login `https://admin.mydomain.com/auth/login`.
