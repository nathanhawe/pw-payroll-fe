import React, { useContext, useEffect, useState } from "react";
import * as crewBossWageApi from "../../api/crewBossWageApi";
import * as dateUtility from "../../utility/dateUtility";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { ENTITY } from "../../utility/entityConst";
import PaginationControls from "../common/PaginationControls";
import CrewBossWageList from "./CrewBossWageList";
import ServerErrors from "../common/ServerErrors";
import CrewBossWageForm from "./CrewBossWageForm";

function CrewBossWagePage() {
	const generateEmptyWage = () => {
		return {
			id: "",
			dateCreated: "",
			dateModified: "",
			effectiveDate: "",
			isDeleted: "",
			wage: "",
			workerCountThreshold: "",
		};
	};
	const authContext = useContext(AuthenticationContext);
	const [wage, setWage] = useState(generateEmptyWage());
	const [wages, setWages] = useState([]);
	const [displayForm, setDisplayForm] = useState(false);
	const [errors, setErrors] = useState({});
	const [serverErrors, setServerErrors] = useState({});
	const [pagination, setPagination] = useState({
		offset: 0,
		limit: 50,
		total: 0,
	});

	useEffect(() => {
		crewBossWageApi
			.getWages(pagination.offset, pagination.limit)
			.then((_wages) => {
				setWages(_wages.data);
				setPagination(_wages.pagination);
			});
		// eslint-disable-next-line
	}, []);

	const handleClick = (e) => {
		let offset = e.target.name;
		setPagination({
			offset: offset,
			limit: pagination.limit,
			total: pagination.total,
		});

		crewBossWageApi.getWages(offset, pagination.limit).then((_wages) => {
			setWages(_wages.data);
			setPagination(_wages.pagination);
		});
	};

	const handleAdd = () => {
		setWage(generateEmptyWage);
		setErrors({});
		setDisplayForm(true);
	};

	const handleEdit = (wage, e) => {
		wage.effectiveDate = dateUtility.formatDateForInput(wage.effectiveDate);
		setWage(wage);
		setErrors({});
		setDisplayForm(true);
	};

	const handleCancel = () => {
		setWage(generateEmptyWage());
		setDisplayForm(false);
	};

	function handleChange({ target }) {
		setWage({
			...wage,
			[target.name]: target.value,
		});

		setErrors({
			...errors,
			[target.name]: "",
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		crewBossWageApi.saveCrewBossWage(wage).then((response) => {
			if (response.errors) {
				setServerErrors(response.errors);
			} else {
				// update states
				setWages((_wages) => {
					// For edits, update the existing record in the array
					for (let i = 0; i < wages.length; i++) {
						if (_wages[i].id === response.data.id) {
							_wages[i] = response.data;
							return _wages;
						}
					}

					// No record was updated, so the submission is for a new record.
					_wages.unshift(response.data);
					return _wages;
				});
				setServerErrors({});
				setWage(generateEmptyWage());
				setDisplayForm(false);
			}
		});
	}

	const handleDelete = (e) => {
		crewBossWageApi.deleteCrewBossWage(wage).then((response) => {
			if (response.errors) {
				setServerErrors(response.errors);
			} else {
				// Update states by removing the deleted record.
				setWages((_wages) => {
					for (let i = 0; i < wages.length; i++) {
						if (_wages[i].id === wage.id) {
							_wages.splice(i, 1);
							break;
						}
					}
					return _wages;
				});
				setServerErrors({});
				setWage(generateEmptyWage());
				setDisplayForm(false);
			}
		});
	};

	function formIsValid() {
		const _errors = {};
		if (
			isNaN(wage.workerCountThreshold) ||
			wage.workerCountThreshold === ""
		)
			_errors.workerCountThreshold =
				"Worker Count Threshold is required.";
		if (
			wage.workerCountThreshold &&
			(isNaN(wage.workerCountThreshold) || wage.workerCountThreshold < 0)
		)
			_errors.workerCountThreshold =
				"Worker Count Threshold must be a number value 0 or greater.";

		if (isNaN(wage.wage) || wage.wage === "")
			_errors.wage = "Wage is required.";
		if (wage.wage && (isNaN(wage.wage) || wage.wage < 0))
			_errors.wage = "Wage must be a number value 0 or greater.";

		if (!wage.effectiveDate)
			_errors.effectiveDate = "Effective Date is required.";

		setErrors(_errors);
		console.log(_errors);

		// From is valid if the errors object has no values
		return Object.keys(_errors).length === 0;
	}

	return (
		<>
			<br />
			<ServerErrors errors={serverErrors} />

			{displayForm ? (
				<CrewBossWageForm
					wage={wage}
					errors={errors}
					onSubmit={handleSubmit}
					onChange={handleChange}
					onCancel={handleCancel}
					onDelete={handleDelete}
				/>
			) : (
				<>
					<CrewBossWageList
						wages={wages}
						canEdit={authContext.userCanManage(ENTITY.crewBossWage)}
						handleEdit={handleEdit}
						handleAdd={handleAdd}
					/>
					<PaginationControls
						pagination={pagination}
						label="Crew boss wage pages"
						onClick={handleClick}
					/>
				</>
			)}
		</>
	);
}

export default CrewBossWagePage;
