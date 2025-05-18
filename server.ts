import { createServer } from "node:http";
import next from "next";
import { Server, Socket } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on('connection', (socket: Socket) => {
        console.log(`Socket connected: ${socket.id}`);
    
        socket.on('join_conversation', (conversationId: string) => {
          socket.join(conversationId);
        });
    
        socket.on('send_message', (data: { conversationId: string; message: unknown }) => {            
          io.to(data.conversationId).emit('new_message', data.message);
        });
    
        socket.on('disconnect', () => {
          console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    httpServer
        .once("error", (err) => {
        console.error(err);
        process.exit(1);
    })
        .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});