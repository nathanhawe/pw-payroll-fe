/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
	// Display json-server's built in homepage when json-server starts.
	static: "node_modules/json-server/dist",
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
	setTimeout(next, 0);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

server.post("/api/batch/", function (req, res, next) {
	const errors = validateBatch(req.body);
	req.body.owner = "testUser";
	req.body.isComplete = 0;
	if (errors) {
		res.status(400).send({
			errors,
		});
	} else {
		next();
	}
});

server.post("/api/crewbosswage/", function (req, res, next) {
	const error = validateCrewBossWage(req.body);
	if (error) {
		res.status(400).send(error);
	} else {
		next();
	}
});

server.post("/api/crewlaborwage/", function (req, res, next) {
	const error = validateCrewLaborWage(req.body);
	if (error) {
		res.status(400).send(error);
	} else {
		next();
	}
});

server.post("/api/minimumwage/", function (req, res, next) {
	const error = validateMinimumWage(req.body);
	if (error) {
		res.status(400).send(error);
	} else {
		next();
	}
});

server.get("/api/applicationuserprofile/:subject", (req, res) => {
	res.jsonp({
		id: "e68d99a8-c6c0-44cb-ba20-08d814786c23",
		subject: req.params.subject,
		accessLevel: "Viewer",
	});
});

router.render = (req, res) => {
	res.jsonp({
		data: res.locals.data,
	});
};

// Use default router
server.use("/api", router);

// Start server
const port = 3001;
server.listen(port, () => {
	console.log(`JSON Server is running on port ${port}`);
});

// Validation methods
function validateBatch(batch) {
	let errors = {};

	if (!batch.weekEndDate)
		errors["WeekEndDate"] = ["Week End Date is required."];
	if (!batch.company) errors["Company"] = ["Company is required."];
	let temp = new Date(batch.weekEndDate);
	if (temp.getUTCDay() !== 0) {
		if (errors["WeekEndDate"]) {
			errors["WeekEndDate"].push("Week End Date must be a Sunday");
		} else {
			errors["WeekEndDate"] = ["Week End Date must be a Sunday"];
		}
	}
	return errors;
}

function validateCrewBossWage(wage) {
	let errors = {};

	if (!wage.effectiveDate)
		errors["EffectiveDate"] = ["Effective Date is required."];
	if (!wage.wage) errors["Wage"] = ["Wage is required."];
	if (!wage.workerCountThreshold)
		errors["WorkerCountThreshold"] = [
			"Worker Count Threshold is required.",
		];
	if (wage.wage && (wage.wage < 0 || wage.wage > 50))
		errors["Wage"] = "Wage must be a value between 0 and 50.";
	if (
		wage.workerCountThreshold &&
		(wage.workerCountThreshold < 0 || wage.workerCountThreshold > 100)
	)
		errors["WorkerCountThreshold"] = [
			"Worker Count Threshold must be a value between 0 and 100.",
		];

	return errors;
}

function validateCrewLaborWage(wage) {
	let errors = {};

	if (!wage.effectiveDate)
		errors["EffectiveDate"] = ["EffectiveDate is required."];
	if (!wage.wage) errors["Wage"] = ["Wage is required."];
	if (wage.wage && (wage.wage < 0 || wage.wage > 50))
		errors["Wage"] = ["Wage must be a value between 0 and 50."];

	return errors;
}

function validateMinimumWage(wage) {
	let errors = {};

	if (!wage.effectiveDate)
		errors["EffectiveDate"] = ["EffectiveDate is required."];
	if (!wage.wage) errors["Wage"] = ["Wage is required."];
	if (wage.wage && (wage.wage < 0 || wage.wage > 50))
		errors["Wage"] = ["Wage must be a value between 0 and 50."];

	return errors;
}
