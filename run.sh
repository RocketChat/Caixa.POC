#!/bin/sh

# export ROOT_URL=http://192.168.0.12:5000
export MONGO_URL=mongodb://localhost:27017/demo
export MONGO_OPLOG_URL=mongodb://localhost:27017/local
export DDP_DEFAULT_CONNECTION_URL=http://192.168.0.12:3000
# export MOBILE_DDP_URL=http://192.168.0.12:3000
# export MOBILE_ROOT_URL=http://192.168.0.12:3000

meteor run android-device -p 5000 --mobile-server=http://192.168.1.19:3000
