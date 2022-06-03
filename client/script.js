const ncWoCorsBtn = document.querySelector("#nc-wo-cors");
const ncWCorsBtn = document.querySelector("#nc-w-cors");
const ncWoCorsSRBtn = document.querySelector("#nc-wo-cors-sr");
const cWCorsUsualBtn = document.querySelector("#c-w-cors-usual");
const cWCorsBtn = document.querySelector("#c-w-cors");

const ncResult = document.querySelector("#nc-result");
const cResult = document.querySelector("#c-result");

// Non-credentialed request without CORS
ncWoCorsBtn.addEventListener("click", () => {
	fetch("http://localhost:5000/noCredentialsFail", {
		method: "POST",
		mode: "cors", // Default value
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({ data: "json-data-in-request-body" })
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			ncResult.innerText = JSON.stringify(data);
			ncResult.style.color = "green";
		})
		.catch((err) => {
			ncResult.innerText = "Check browser console for error(s).";
			ncResult.style.color = "red";
			console.error("Fetch error: ", err);
		});
});

// Non-credentialed request with CORS
ncWCorsBtn.addEventListener("click", () => {
	fetch("http://localhost:5000/noCredentials", {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({ data: "json-data-in-request-body" })
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			ncResult.innerText = JSON.stringify(data);
			ncResult.style.color = "green";
		})
		.catch((err) => {
			ncResult.innerText = "Check browser console for error(s).";
			ncResult.style.color = "red";
			console.error("Fetch error: ", err);
		});
});

// Non-credentialed CORS request not requiring a preflight request (Simple Request)
ncWoCorsSRBtn.addEventListener("click", () => {
	fetch("http://localhost:5000/noCredentialsPlaintext", {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "text/plain",
			"Accept": "application/json"
		},
		body: "plain-text-data-in-request-body"
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			ncResult.innerText = JSON.stringify(data);
			ncResult.style.color = "green";
		})
		.catch((err) => {
			ncResult.innerText = "Check browser console for error(s).";
			ncResult.style.color = "red";
			console.error("Fetch error: ", err);
		});
});

// Credentialed request with CORS, but without credential headers
cWCorsUsualBtn.addEventListener("click", () => {
	fetch("http://localhost:5000/noCredentials", {
		method: "POST",
		mode: "cors",
		credentials: "include",
		headers: {
			"Authorization": "Bearer <auth-token>",
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({ data: "json-data-in-request-body" })
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			cResult.innerText = JSON.stringify(data);
			cResult.style.color = "green";
		})
		.catch((err) => {
			cResult.innerText = "Check browser console for error(s).";
			cResult.style.color = "red";
			console.error("Fetch error: ", err);
		});
});

// Credentialed request with CORS
cWCorsBtn.addEventListener("click", () => {
	fetch("http://localhost:5000/credentials", {
		method: "POST",
		mode: "cors",
		credentials: "include",
		headers: {
			"Authorization": "Bearer <auth-token>",
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({ data: "json-data-in-request-body" })
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			cResult.innerText = JSON.stringify(data);
			cResult.style.color = "green";
		})
		.catch((err) => {
			cResult.innerText = "Check browser console for error(s).";
			cResult.style.color = "red";
			console.error("Fetch error: ", err);
		});
});
