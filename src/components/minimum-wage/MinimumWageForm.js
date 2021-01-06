import React from "react";
import PropTypes from "prop-types";

function MinimumWageForm(props) {
	const deleteWage = (e) => {
		e.preventDefault();
		let performDelete = window.confirm(
			"Are you sure you want to delete this record?  Deleting a historical wage will affect any adjustments made in the future for the deleted wage's timeframe.  Only delete a minimum wage record if it has never been used in processing payroll or it is the incorrect amount for its effective period."
		);
		if (performDelete) {
			props.onDelete();
		}
	};

	return (
		<>
			{props.wage.id === "" ? (
				<h2>Add New Minimum Wage</h2>
			) : (
				<h2>Edit Minimum Wage</h2>
			)}
			<form onSubmit={props.onSubmit} className="border p-4">
				<p>
					During calculations the correct minimum wage is determined
					by the effective date. The record with the most recent
					Effective Date that is on or before the shift date is used.
				</p>
				<p>
					The list of minimum wages includes historical values in
					order to properly calculate adjustments for past dates. It
					is important to not edit or delete valid past minimum wages.
					Instead, when minimum wage changes create a new minimum wage
					record with the appropriate effective date and the
					calculations will select the appropriate record.
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

MinimumWageForm.propTypes = {
	wage: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default MinimumWageForm;
