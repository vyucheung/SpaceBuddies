Relevant server files:

	- app.js: handles all initialization, including global variables i use such as connectedUsers, and handles routing
	- chat/index.js: handles all of the socket.io calls including logins, messages, disconnects, etc.
	- views/index.ejs: renders a login view, chat/index.js will create the chat interface
	
Relevant client files:
	- public/chat.js - initiates client connection to server via io.sockets, handles UserArrivals, disconnects, and messages and updates the relevant lists