#!/bin/bash
#https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
sudo npm install pm2 -g
sudo env PATH=$PATH:/usr/local/bin pm2 startup -u ubuntu