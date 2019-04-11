# about server-sent-events 
(cc https://medium.com/conectric-networks/a-look-at-server-sent-events-54a77f8d6ff7)

## what are sever-sent events?
Server Sent Events are a standard allowing browser clients to receive a stream of updates from a server over a HTTP connection without resorting to polling. Unlike WebSockets, Server Sent Events are a one way communications channel - events flow from server to client only.

## how do they work?
When working with Server Sent Events, communications between client and server are initiated by the client (browser). The client creates a new JavaScript EventSource object, passing it the URL of an endpoint which is expected to return a stream of events over time.

The server receives a regular HTTP request from the client (these should pass through firewalls etc like any other HTTP request which can make this method work in situations where WebSockets may be blocked). The client expects a response with a series of event messages at arbitrary times. The server needs to leave the HTTP response open until it has no more events to send, decides that the connection has been open long enough and can be considered stale, or until the client explicitly closes the initial request.

Every time that the server writes an event to the HTTP response, the client will receive it and process it in a listener callback function.

## message format:
id: A unique ID for this event (optional). The client can track these and request that the server stream events after the last one received in the event of the client becoming disconnected from the stream and reconnecting again.
event: Specifies the type of event in the case where one event stream may have distinctly different event types. This is optional, and can be helpful for processing events on the client.
data: The message body, there can be one or more data key/pairs in a single event message.

event: Specifies the type of event in the case where one event stream may have distinctly different event types. This is optional, and can be helpful for processing events on the client.

data: The message body, there can be one or more data key/pairs in a single event message.

# get things up an running

## start mongo
```
docker run --name mongodb  -p 27017:27017 -e ALLOW_EMPTY_PASSWORD=yes -e MONGODB_EXTRA_FLAGS='--wiredTigerCacheSizeGB=2' bitnami/mongodb:latest
```

## connect to mongo
```
docker exec -it mongodb mongo
```

## create capped messages collection 
```
db.createCollection("messages", { capped: true, size: 5000000, max: 10000 });
```

## start server-sent-events backend
```
./gradlew bootRun
```

## send messages
```
curl -X POST http://localhost:8080/messages -H "content-type:application/json" -d '{"text": "was geht ab in buxtehude?", "room": "developers"}'
```

## retrieve message stream
```
http://localhost:8080/messages?room=developers
```

## start frontend
```
cd frontend && yarn start
```

## visit the url and follow the stream
```
http://localhost:3000/
```
