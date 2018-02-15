from geventwebsocket.handler import WebSocketHandler
from gevent.wsgi import WSGIServer
from server import app

http_server = WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
http_server.serve_forever()
