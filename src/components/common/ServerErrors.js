import React from "react";
import PropTypes from "prop-types";

function ServerErrors(props) {
	function listError(error) {
		return <li>{error}</li>;
	}

	function listServerErrors() {
		if (Object.keys(props.errors).length !== 0) {
			return (
				<div className="alert alert-danger">
					<p>The following errors occured:</p>
					{Object.entries(props.errors).map((error) => {
						return (
							<>
								<p>{error[0]}</p>
								<ul>{error[1].map(listError)}</ul>
							</>
						);
					})}
				</div>
			);
		}
	}

	return <>{listServerErrors()}</>;
}

ServerErrors.propTypes = {
	errors: PropTypes.object.isRequired,
};

export default ServerErrors;
