```
docker run -itd -p 5984:5984 -p 5986:5986 --name=couchdb0 -e NODENAME='couchdb-0.local.com' --mount 'source=volume-0,target=/opt/couchdb/data' couchdb:2.3.0
docker run -itd -p 15984:5984 -p 15986:5986 --name=couchdb1 -e  NODENAME='couchdb-1.local.com' --mount 'source=volume-1,target=/opt/couchdb/data' couchdb:2.3.0
docker run -itd -p 25984:5984 -p 25986:5986 --name=couchdb2 -e NODENAME='couchdb-2.local.com' --mount 'source=volume-2,target=/opt/couchdb/data' couchdb:2.3.0

curl -X PUT http://localhost:5984/_node/couchdb@couchdb-0.local.com/_config/admins/admin -d '"PASSWORD"
curl -X PUT http://localhost:15984/_node/couchdb@couchdb-1.local.com/_config/admins/admin -d '"PASSWORD"
curl -X PUT http://localhost:25984/_node/couchdb@couchdb-2.local.com/_config/admins/admin -d '"PASSWORD"''

docker network create -d bridge --subnet 172.25.0.0/16 isolated_nw

docker network connect --alias couchdb-0.local.com isolated_nw couchdb0
docker network connect --alias couchdb-1.local.com isolated_nw couchdb1
docker network connect --alias couchdb-2.local.com isolated_nw couchdb2
```


then:
Remote Host:  couchdb-1.local.com
port 5984
bind 0.0.0.0



```
docker run -itd -p 5984:5984 -p 5986:5986 --name=couchdb0 \
-e NODENAME="couchdb-0.local.com" \
--mount type=volume,source=$(pwd)/volume-0,target=/opt/couchdb/data \
couchdb:2.3.0
```
