import React from "react";
import PropTypes from "prop-types";

function AuditLockBatchForm(props) {
	return (
		<>
			<h2>Audit Lock</h2>
			<form onSubmit={props.onSubmit} className="border p-4">
				<p>
					This form allows the user to lock and unlock plant and ranch
					pay lines for audit. Each action is a combination of a
					company ('Plants', or 'Ranches'), a week end date, and an
					optional layoff ID number. You can create a new audit
					lock/unlock request below. Please note that batches and
					summaries share the same resources so if a batch is
					currently processing or summaries are being created, audit
					lock actions will wait until those complete before running.
				</p>
				<div className="form-group">
					<button
						className={
							props.batch.lock
								? "btn btn-primary"
								: "btn btn-secondary"
						}
						onClick={props.lock}
					>
						Lock
					</button>{" "}
					or{" "}
					<button
						className={
							props.batch.lock
								? "btn btn-secondary"
								: "btn btn-primary"
						}
						onClick={props.unlock}
					>
						Unlock
					</button>
				</div>
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

AuditLockBatchForm.propTypes = {
	batch: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	lock: PropTypes.func.isRequired,
	unlock: PropTypes.func.isRequired,
};

export default AuditLockBatchForm;
