const ncWoCorsBtn = document.querySelector("#nc-wo-cors");
const ncWCorsBtn = document.querySelector("#nc-w-cors");
const ncWoCorsSRBtn = document.querySelector("#nc-wo-cors-sr");
const ncWCorsProxyBtn = document.querySelector("#nc-w-cors-proxy");

const cWCorsUsualBtn = document.querySelector("#c-w-cors-usual");
const cWCorsWoOpBtn = document.querySelector("#c-w-cors-wo-option");
const cWCorsWOpBtn = document.querySelectorAll(".c-w-cors-w-option");

const setCookieBtn = document.querySelector("#set-cookie");
const removeCookieBtn = document.querySelector("#remove-cookie");

const ncResult = document.querySelector("#nc-result");
const cookieResult = document.querySelector("#cookie-result");
const cResult = document.querySelectorAll(".c-result");

// Non-credentialed request without CORS
ncWoCorsBtn.addEventListener("click", () => {
	fetch("http://localhost:5000/noCredentialsFail", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({ data: "json-data-in-request-body" })
	})
		.then((res) => res.json())
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
		.then((res) => res.json())
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
		.then((res) => res.json())
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

// Non-credentialed request through CORS proxy
ncWCorsProxyBtn.addEventListener("click", () => {
	const requestUrl = encodeURIComponent(
		"http://localhost:5000/noCredentials"
	);

	fetch(`http://localhost:8000/makeRequestTo?url=${requestUrl}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({ data: "json-data-in-request-body" })
	})
		.then((res) => res.json())
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
		.then((res) => res.json())
		.then((data) => {
			cResult[0].innerText = JSON.stringify(data);
			cResult[0].style.color = "green";
		})
		.catch((err) => {
			cResult[0].innerText = "Check browser console for error(s).";
			cResult[0].style.color = "red";
			console.error("Fetch error: ", err);
		});
});

// Credentialed CORS request without { credentials: "include" }
cWCorsWoOpBtn.addEventListener("click", () => {
	fetch("http://localhost:5000/credentials", {
		method: "POST",
		mode: "cors",
		headers: {
			"Authorization": "Bearer <auth-token>",
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({ data: "json-data-in-request-body" })
	})
		.then((res) => res.json())
		.then((data) => {
			cResult[1].innerText = JSON.stringify(data);
			cResult[1].style.color = "green";
		})
		.catch((err) => {
			cResult[1].innerText = "Check browser console for error(s).";
			cResult[1].style.color = "red";
			console.error("Fetch error: ", err);
		});
});

// Credentialed CORS request with { credentials: "include" }
for (let i = 0; i < 2; i++)
	cWCorsWOpBtn[i].addEventListener("click", makeCredentialedRequest);

function makeCredentialedRequest() {
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
		.then((res) => res.json())
		.then((data) => {
			cResult[0].innerText = JSON.stringify(data);
			cResult[0].style.color = "green";
			cResult[1].innerText = JSON.stringify(data);
			cResult[1].style.color = "green";
		})
		.catch((err) => {
			cResult[0].innerText = "Check browser console for error(s).";
			cResult[0].style.color = "red";
			cResult[1].innerText = "Check browser console for error(s).";
			cResult[1].style.color = "red";
			console.error("Fetch error: ", err);
		});
}

// Set Cookie (Set on the client for demo purposes.)
setCookieBtn.addEventListener("click", () => {
	document.cookie = "corsDemo=sensitive-cookie-data;Max-Age=120;";
	cookieResult.innerText =
		"Cookie 'corsDemo=sensitive-cookie-data' is set for 120 seconds.";
	cookieResult.style.color = "green";
});

// Remove Cookie (Removed on the client for demo purposes.)
removeCookieBtn.addEventListener("click", () => {
	document.cookie = "corsDemo=sensitive-cookie-data;Max-Age=0;";
	cookieResult.innerText =
		"Cookie 'corsDemo=sensitive-cookie-data' is removed.";
	cookieResult.style.color = "red";
});

// Check if Cookie already exists
window.addEventListener("load", () => {
	if (document.cookie.indexOf("corsDemo=sensitive-cookie-data") >= 0) {
		cookieResult.innerText =
			"Cookie 'corsDemo=sensitive-cookie-data' is present.";
		cookieResult.style.color = "green";
	} else {
		cookieResult.innerText =
			"Cookie 'corsDemo=sensitive-cookie-data' is NOT present.";
		cookieResult.style.color = "red";
	}
});
