import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<>
			<p>
				To see the status of running calculations or to start a new set
				of calculations, click <Link to="/batch">Batch</Link>.
			</p>
			<p>
				To configure wage rates, click on{" "}
				<Link to="/crew-boss-wage">Crew Boss Wage</Link>,{" "}
				<Link to="/crew-labor-wage">Crew Labor Wage</Link>, or{" "}
				<Link to="/minimum-wage">Minimum Wage</Link>.
			</p>
		</>
	);
};

export default HomePage;
