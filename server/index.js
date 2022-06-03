const express = require("express");

const app = express();

// Body Parser middleware
app.use(express.urlencoded({ extended: false }));
app.use("/noCredentialsPlaintext", express.text());
app.use("*", express.json());

// CORS preflight response middleware
app.use(
	["/noCredentials", "/noCredentialsPlaintext"],
	setNoCredentialsCorsHeaders
);
app.use("/credentials", setCredentialedCorsHeaders);

// Home route
app.get("/", (request, response) =>
	response.send(JSON.stringify({ message: "Success" }))
);

// Non-credentialed routes
app.post("/noCredentialsFail", (request, response) =>
	response.send(JSON.stringify({ message: "Success" }))
);

app.post("/noCredentials", (request, response) =>
	response.send(
		JSON.stringify({
			message: "Success",
			receivedBodyData: request.body.data
		})
	)
);

app.post("/noCredentialsPlaintext", (request, response) =>
	response.send(
		JSON.stringify({ message: "Success", receivedBodyData: request.body })
	)
);

// Credentialed route
app.post("/credentials", (request, response) =>
	response.send(
		JSON.stringify({
			message: "Success",
			receivedBodyData: request.body.data,
			receivedAuthorizationHeaderValue: request.headers.authorization
		})
	)
);

// CORS preflight responses
app.options("/noCredentials", (request, response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "*");
	response.setHeader("Access-Control-Allow-Headers", "*");
	// response.setHeader("Access-Control-Allow-Headers", "Content-Type");
	// response.setHeader("Access-Control-Max-Age", 60) // 60 seconds
	response.send();
});

app.options("/credentials", (request, response) => {
	response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	response.setHeader("Access-Control-Allow-Methods", "POST");
	response.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	response.setHeader("Access-Control-Allow-Credentials", "true");
	// response.setHeader("Access-Control-Max-Age", 60) // 60 seconds
	response.send();
});

// CORS middleware functions
function setNoCredentialsCorsHeaders(request, response, next) {
	response.setHeader("Access-Control-Allow-Origin", "*");
	next();
}

function setCredentialedCorsHeaders(request, response, next) {
	response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	next();
}

// Listening port
app.listen(5000, (err) => {
	if (err) console.log(err);
	else
		console.log(
			"Server started on port 5000...\nAccess the web app at http://localhost:5000"
		);
});
