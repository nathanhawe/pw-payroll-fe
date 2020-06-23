import React from "react";
import PropTypes from "prop-types";

function BatchForm(props) {
	return (
		<>
			<h2>Create a Batch</h2>
			<form onSubmit={props.onSubmit} className="border p-4">
				<p>
					Time and attendance calculations are performed in batches.
					Each batch is a combination of a company ('Plants', or
					'Ranches'), a week end date, and an optional layoff ID
					number. You can create a new batch below to trigger
					calculations.
				</p>
				<div className="form-group">
					<label htmlFor="company">Company</label>
					<div className="field">
						<select
							id="company"
							name="company"
							className="form-control"
							value={props.batch.company}
							onChange={props.onChange}
						>
							<option value="" />
							<option value="P">Plants</option>
							<option value="R">Ranches</option>
						</select>
					</div>
					{props.errors.company && (
						<div className="alert alert-danger">
							{props.errors.company}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="weekEndDate">Week End Date</label>
					<div className="field">
						<input
							type="date"
							id="weekEndDate"
							name="weekEndDate"
							className="form-control"
							value={props.batch.weekEndDate}
							onChange={props.onChange}
						/>
					</div>
					{props.errors.weekEndDate && (
						<div className="alert alert-danger">
							{props.errors.weekEndDate}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="layoffId">Layoff ID (optional)</label>
					<div className="field">
						<input
							type="number"
							id="layoffId"
							name="layoffId"
							className="form-control"
							value={props.batch.layoffId}
							onChange={props.onChange}
						/>
					</div>
					{props.errors.layoffId && (
						<div className="alert alert-danger">
							{props.errors.layoffId}
						</div>
					)}
				</div>
				<input type="submit" value="Save" className="btn btn-primary" />
			</form>
		</>
	);
}

BatchForm.propTypes = {
	batch: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default BatchForm;
