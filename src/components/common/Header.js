import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { ENTITY } from "../../utility/entityConst";

const Header = () => {
	const activeStyle = { color: "orange" };
	const authContext = useContext(AuthenticationContext);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink to="/" className="navbar-brand" exact>
				Time/Attendance Calculations
			</NavLink>
			{authContext.isAuthenticated() ? (
				<>
					{authContext.userCanView(ENTITY.batch) ? (
						<NavLink
							to="/batch"
							className="nav-link"
							activeStyle={activeStyle}
						>
							Batch
						</NavLink>
					) : (
						""
					)}

					{authContext.userCanView(ENTITY.batch) ? (
						<NavLink
							to="/summary"
							className="nav-link"
							activeStyle={activeStyle}
						>
							Create Summaries
						</NavLink>
					) : (
						""
					)}

					{authContext.userCanView(ENTITY.crewBossWage) ? (
						<NavLink
							to="/crew-boss-wage"
							className="nav-link"
							activeStyle={activeStyle}
						>
							Crew Boss Wage
						</NavLink>
					) : (
						""
					)}

					{authContext.userCanView(ENTITY.crewLaborWage) ? (
						<NavLink
							to="crew-labor-wage"
							className="nav-link"
							activeStyle={activeStyle}
						>
							Crew Labor Wage
						</NavLink>
					) : (
						""
					)}

					{authContext.userCanView(ENTITY.minimumWage) ? (
						<NavLink
							to="minimum-wage"
							className="nav-link"
							activeStyle={activeStyle}
						>
							Minimum Wage
						</NavLink>
					) : (
						""
					)}

					<NavLink to="logout" className="nav-link">
						Logout
					</NavLink>

					<NavLink to="/" className="nav-link disabled">
						{authContext.getFullName()} (
						{authContext.getUserAccessLevel()})
					</NavLink>
				</>
			) : (
				<NavLink to="login" className="nav-link">
					Login
				</NavLink>
			)}
		</nav>
	);
};

export default Header;
