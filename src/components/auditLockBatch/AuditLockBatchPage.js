import React, { useEffect, useState, useContext } from "react";
import * as auditLockBatchApi from "../../api/auditLockBatchApi";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { ENTITY } from "../../utility/entityConst";
import AuditLockBatchList from "./AuditLockBatchList";
import AuditLockBatchForm from "./AuditLockBatchForm";
import ServerErrors from "../common/ServerErrors";

function AuditLockBatchPage() {
	const authContext = useContext(AuthenticationContext);
	const [errors, setErrors] = useState({});
	const [serverErrors, setServerErrors] = useState({});
	const [batches, setBatches] = useState([]);
	const [batch, setBatch] = useState({
		id: null,
		weekEndDate: "",
		company: "",
		layoffId: "",
		lock: true,
	});
	const [pagination, setPagination] = useState({
		offset: 0,
		limit: 10,
		total: 0,
	});

	useEffect(() => {
		auditLockBatchApi
			.getBatches(pagination.offset, pagination.limit)
			.then((_batches) => {
				setBatches(_batches.data);
				setPagination(_batches.pagination);
			});

		const interval = setInterval(() => {
			auditLockBatchApi
				.getBatches(pagination.offset, pagination.limit)
				.then((_batches) => {
					setBatches(_batches.data);
					setPagination(_batches.pagination);
				});
		}, 20000);

		return () => clearInterval(interval);
		// eslint-disable-next-line
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		auditLockBatchApi.saveBatch(batch).then((response) => {
			if (response.errors) {
				setServerErrors(response.errors);
			} else {
				// update states
				setBatches([response.data, ...batches]);
				setServerErrors({});

				setBatch({
					id: null,
					weekEndDate: "",
					company: "",
					layoffId: "",
					lock: true,
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

	function handleLock(e) {
		e.preventDefault();
		setBatch({
			...batch,
			lock: true,
		});
		console.log(batch);
	}

	function handleUnlock(e) {
		e.preventDefault();
		setBatch({
			...batch,
			lock: false,
		});
		console.log(batch);
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

	return (
		<>
			<br />
			<ServerErrors errors={serverErrors} />
			{authContext.userCanManage(ENTITY.batch) ? (
				<AuditLockBatchForm
					batch={batch}
					errors={errors}
					onChange={handleChange}
					onSubmit={handleSubmit}
					lock={handleLock}
					unlock={handleUnlock}
				/>
			) : (
				""
			)}
			<br /> <br />
			<AuditLockBatchList batches={batches} />
		</>
	);
}

export default AuditLockBatchPage;
