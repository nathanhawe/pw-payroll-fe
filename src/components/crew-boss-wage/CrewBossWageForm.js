import React from "react";
import PropTypes from "prop-types";

function CrewBossWageForm(props) {
	const deleteWage = (e) => {
		e.preventDefault();
		let performDelete = window.confirm(
			"Are you sure you want to delete this record?  Deleting a historical wage will affect any adjustments made in the future for the deleted wage's timeframe.  Only delete a crew boss wage record if it has never been used in processing payroll or it is the incorrect amount for its effective period."
		);
		if (performDelete) {
			props.onDelete();
		}
	};

	return (
		<>
			{props.wage.id === "" ? (
				<h2>Add New Crew Boss Wage</h2>
			) : (
				<h2>Edit Crew Boss Wage</h2>
			)}
			<form onSubmit={props.onSubmit} className="border p-4">
				<p>
					During calculations the correct crew boss wage is determined
					by a combination of the worker count threshold and the
					effective date. The crew boss wage that meets the following
					two criteria is used:
				</p>
				<ul>
					<li>
						Has the most recent Effective Date that is on or before
						the shift date.
					</li>
					<li>
						Has the largest Worker Count Threshold that is at or
						below the crew for that shift date.
					</li>
				</ul>
				<p>
					The list of crew boss wages includes historical values in
					order to properly calculate adjustments for past dates. It
					is important to not edit or delete valid past crew boss
					wages. Instead, when wages change create a new crew boss
					wage record with the appropriate worker count threshold and
					effective date and the calculations will select the
					appropriate record.
				</p>
				<div className="form-group">
					<label htmlFor="id">ID</label>
					<div className="field">
						<input
							type="number"
							id="id"
							name="id"
							className="form-control"
							value={props.wage.id}
							onChange={props.onChange}
							readOnly
						/>
					</div>
					{props.errors.id && (
						<div className="alert alert-danger">
							{props.errors.id}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="wage">Worker Count Threshold</label>
					<div className="field">
						<input
							type="number"
							min="0"
							max="100"
							step="1"
							id="workerCountThreshold"
							name="workerCountThreshold"
							className="form-control"
							value={props.wage.workerCountThreshold}
							onChange={props.onChange}
						/>
					</div>
					{props.errors.workerCountThreshold && (
						<div className="alert alert-danger">
							{props.errors.workerCountThreshold}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="wage">Wage</label>
					<div className="field">
						<input
							type="number"
							min="0"
							max="50"
							step=".01"
							id="wage"
							name="wage"
							className="form-control"
							value={props.wage.wage}
							onChange={props.onChange}
						/>
					</div>
					{props.errors.wage && (
						<div className="alert alert-danger">
							{props.errors.wage}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="effectiveDate">Effective Date</label>
					<div className="field">
						<input
							type="date"
							id="effectiveDate"
							name="effectiveDate"
							className="form-control"
							value={props.wage.effectiveDate}
							onChange={props.onChange}
						/>
					</div>
					{props.errors.effectiveDate && (
						<div className="alert alert-danger">
							{props.errors.effectiveDate}
						</div>
					)}
				</div>
				<input type="submit" value="Save" className="btn btn-primary" />{" "}
				<button className="btn btn-secondary" onClick={props.onCancel}>
					Cancel
				</button>{" "}
				<button className="btn btn-danger" onClick={deleteWage}>
					Delete
				</button>
			</form>
		</>
	);
}

CrewBossWageForm.propTypes = {
	wage: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default CrewBossWageForm;
