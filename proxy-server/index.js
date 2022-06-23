import express, { request, response } from "express";
import fetch from "node-fetch";

const app = express();

// Body Parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS response middleware
app.use("/makeRequestTo", (request, response, next) => {
	response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	next();
});

// Home route
app.get("/", (request, response) =>
	response.send(JSON.stringify({ message: "Success" }))
);

// CORS proxy route
app.post("/makeRequestTo", (request, response) => {
	const url = decodeURIComponent(request.query.url);

	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(request.body)
	})
		.then((res) => res.json())
		.then((data) =>
			response.send(
				JSON.stringify({
					message: "Proxy success",
					receivedByProxyFromServer: data
				})
			)
		)
		.catch((err) => {
			console.error("Proxy Fetch error: ", err);
			response.send(JSON.stringify({ message: "Failure" }));
		});
});

// CORS preflight route
app.options("/makeRequestTo", (request, response) => {
	response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	// response.setHeader("Access-Control-Allow-Methods", "*");
	response.setHeader("Access-Control-Allow-Headers", "*");
	response.send();
});

// Listening port
app.listen(8000, (err) => {
	if (err) console.log(err);
	else
		console.log(
			"Server started on port 8000...\nAccess the web app at http://localhost:8000"
		);
});
