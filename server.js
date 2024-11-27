const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "data.json");

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return { total: 0, results: [] };
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const sendJSON = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  
    try{
        const method = req.method;
        const url = req.url;
      
        if (url === "/users" && method === "GET") {
          const data = readData();
          sendJSON(res, 200, data);
        } 
        else if (url.startsWith("/users/") && method === "GET") {
          const id = parseInt(url.split("/")[2], 10);
          const data = readData();
          const user = data.results.find((u) => u.id === id);
          if (user) {
            sendJSON(res, 200, user);
          } else {
            sendJSON(res, 404, { status: 404, message: "User not found" });
          }
        } 
        else if (url === "/users" && method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            const newUser = JSON.parse(body);
            const data = readData();
            newUser.id = data.results.length
              ? data.results[data.results.length - 1].id + 1
              : 1;
            data.results.push(newUser);
            data.total = data.results.length;
            writeData(data);
            sendJSON(res, 201, newUser);
          });
        }
         else if (url.startsWith("/users/") && method === "PATCH") {
          const id = parseInt(url.split("/")[2], 10);
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            const updates = JSON.parse(body);
            const data = readData();
            const userIndex = data.results.findIndex((u) => u.id === id);
            if (userIndex === -1) {
              sendJSON(res, 404, { status: 404, message: "User not found" });
            } else {
              data.results[userIndex] = { ...data.results[userIndex], ...updates };
              writeData(data);
              sendJSON(res, 200, data.results[userIndex]);
            }
          });
        } 
        else if (url.startsWith("/users/") && method === "DELETE") {
          const id = parseInt(url.split("/")[2], 10);
          const data = readData();
          const userIndex = data.results.findIndex((u) => u.id === id);
          if (userIndex === -1) {
            sendJSON(res, 404, { status: 404, message: "User not found" });
          } else {
            const deletedUser = data.results.splice(userIndex, 1);
            data.total = data.results.length;
            writeData(data);
            sendJSON(res, 200, deletedUser);
          }
        } 
        else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Route not found");
        }

    }
    catch(error){
        sendJSON(res, 500, { status: 500, message: "Internal Server Error" });
    }
 
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
