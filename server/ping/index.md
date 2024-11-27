# curl http://node2       ok      from node1
# curl http://node2:80    ok      from node1
# curl node2              ok      from node1
# curl node2:80           ok      from node1
# curl node2:81           not ok  from node1  curl: (7) Failed to connect to node2 port 81: Connection refused
# curl node1              not ok  from node2  because node1 is not a webserver curl: (7) Failed to connect to node1 port 80: Connection refused

# ping node1              ok      from node1
# ping node1              ok      from node2  Ping is ok but curl is not ok because there isn't a nginx webserver
# ping node1:80           not ok  from node1  Name or service not known
# ping http://node1:80    not ok  from node1  Name or service not known


# docker exec -it node1 curl http://node2  ok     from node1
# docker exec -it node2 curl http://node1  not ok from node2
