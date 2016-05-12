# Scalable Web Cache
Implementation of scalable web cache using consistent hashing on top of redis. The source code is only compatible with windows as their is some windows specific code. To test, you need a windows machine. You also need to install redis (https://github.com/MSOpenTech/redis/releases). 
 
Prerequisites

  1. Gorilla Toolkit mux package - http://www.gorillatoolkit.org/pkg/mux
  2. Emirpasic gods - https://github.com/emirpasic/gods
  3. Garybud redigo - https://github.com/garyburd/redigo
  4. Redis Windows distribution - https://github.com/MSOpenTech/redis/releases

The redis servers store more than 10000 dummy key value pairs. The keys are distributed in three nodes initially. The nodes can be added or removed from the frontend view (views directory). You can also add key value pair to redis. The server on which key will be stored will be determined by consistent hashing. The communication between different clients takes place through REST webservices.

#Installation

Follow these steps:
  
  1. go get github.com/shikher9/ScalableWebCache
  2. navigate to GOPATH\src\shikher9\ScalableWebCache\client_app_windows
  3. go build client_app_windows.go
  4. start two instances of client_app_windows with port number as command line argument - 
        1.  client_app_windows 8080
        2.  client_app_windows 8090
  5. If you need to change ports, change the ports in clients.txt as well.
  6. Navigate to views folder, and open index.html.

