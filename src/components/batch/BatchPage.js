import React, { useEffect, useState, useContext } from "react";
import * as batchApi from "../../api/batchApi";
import * as dateUtility from "../../utility/dateUtility";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { ENTITY } from "../../utility/entityConst";

function BatchPage() {
	const authContext = useContext(AuthenticationContext);
	const [errors, setErrors] = useState({});
	const [serverErrors, setServerErrors] = useState({});
	const [batches, setBatches] = useState([]);
	const [batch, setBatch] = useState({
		id: null,
		weekEndDate: "",
		company: "",
		layoffId: "",
	});

	useEffect(() => {
		batchApi.getBatches().then((_batches) => {
			setBatches(_batches.data);
		});
	}, []);

	function renderRow(batch) {
		return (
			<tr key={batch.id}>
				<td>{batch.id}</td>
				<td>
					{batch.company === "P"
						? "Plants"
						: batch.company === "R"
						? "Ranches"
						: ""}
				</td>
				<td>{dateUtility.formatDate(batch.weekEndDate)}</td>
				<td>
					<a
						target="_new"
						href={
							"https://gerawan.quickbase.com/db/bk9rc7cxs?a=dr&rid=" +
							batch.layoffId
						}
					>
						{batch.layoffId}
					</a>
				</td>
				<td>{dateUtility.formatDateAndTime(batch.dateCreated)}</td>
				<td>{batch.owner}</td>
				<td>{batch.isComplete}</td>
			</tr>
		);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		batchApi.saveBatch(batch).then((response) => {
			if (response.errors) {
				setServerErrors(response.errors);
			} else {
				// update states
				setBatches([...batches, response.data]);
				setServerErrors({});

				setBatch({
					id: null,
					weekEndDate: "",
					company: "",
					layoffId: "",
				});
			}
		});
	}

	function handleChange({ target }) {
		setBatch({
			...batch,
			[target.name]: target.value,
		});

		setErrors({
			...errors,
			[target.name]: "",
		});
	}

	function formIsValid() {
		const _errors = {};
		if (!batch.weekEndDate)
			_errors.weekEndDate = "Week End Date is required.";
		if (batch.weekEndDate && new Date(batch.weekEndDate).getUTCDay() !== 0)
			_errors.weekEndDate = "Week End Date must be a Sunday.";
		if (!batch.company) _errors.company = "Company is required.";
		if (batch.layoffId && (isNaN(batch.layoffId) || batch.layoffId <= 0))
			_errors.layoffId = "Layoff ID must be a number greater than 0";
		setErrors(_errors);
		console.log(_errors);
		// From is valid if the errors object has no values
		return Object.keys(_errors).length === 0;
	}

	function listServerErrors() {
		if (Object.keys(serverErrors).length !== 0) {
			return (
				<div className="alert alert-danger">
					<p>The following errors occured:</p>
					{Object.entries(serverErrors).map((set) => {
						return (
							<>
								<p>{set[0]}</p>
								<ul>{set[1].map(listError)}</ul>
							</>
						);
					})}
				</div>
			);
		}
	}

	function listError(error) {
		return <li>{error}</li>;
	}
	return (
		<>
			<p>{listServerErrors()}</p>
			<p>
				Time and attendance calculations are performed in batches. Each
				batch is a combination of a company ('Plants', or 'Ranches'), a
				week end date, and an optional layoff ID number. You can create
				a new batch below to trigger calculations.
			</p>
			<h2>Current Status: Ready!</h2>
			{authContext.userCanManage(ENTITY.batch) ? (
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="company">Company</label>
						<div className="field">
							<select
								id="company"
								name="company"
								className="form-control"
								value={batch.company}
								onChange={handleChange}
							>
								<option value="" />
								<option value="P">Plants</option>
								<option value="R">Ranches</option>
							</select>
						</div>
						{(errors.company || errors.Company) && (
							<div className="alert alert-danger">
								{errors.company}
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
								value={batch.weekEndDate}
								onChange={handleChange}
							/>
						</div>
						{errors.weekEndDate && (
							<div className="alert alert-danger">
								{errors.weekEndDate}
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
								value={batch.layoffId}
								onChange={handleChange}
							/>
						</div>
						{errors.layoffId && (
							<div className="alert alert-danger">
								{errors.layoffId}
							</div>
						)}
					</div>
					<input
						type="submit"
						value="Save"
						className="btn btn-primary"
					/>
				</form>
			) : (
				""
			)}
			<br /> <br />
			<h2>Batch History</h2>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Company</th>
						<th>Week End Date</th>
						<th>Layoff ID</th>
						<th>Date Created</th>
						<th>Owner</th>
						<th>Is Complete</th>
					</tr>
				</thead>
				<tbody>{batches.map(renderRow)}</tbody>
			</table>
		</>
	);
}

export default BatchPage;
