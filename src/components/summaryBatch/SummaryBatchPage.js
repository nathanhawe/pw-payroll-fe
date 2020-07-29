import React, { useEffect, useState, useContext } from "react";
import * as summaryBatchApi from "../../api/summaryBatchApi";
import * as summaryBatchProcessingStatusApi from "../../api/summaryBatchProcessingStatusApi";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { ENTITY } from "../../utility/entityConst";
import SummaryBatchList from "./SummaryBatchList";
import SummaryBatchForm from "./SummaryBatchForm";
import ServerErrors from "../common/ServerErrors";
import SummaryBatchProcessingStatus from "./SummaryBatchProcessingStatus";
import PaginationControls from "../common/PaginationControls";

function SummaryBatchPage() {
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
	const [pagination, setPagination] = useState({
		offset: 0,
		limit: 10,
		total: 0,
	});
	const [processingBatch, setProcessingBatch] = useState({});

	useEffect(() => {
		summaryBatchApi
			.getBatches(pagination.offset, pagination.limit)
			.then((_batches) => {
				setBatches(_batches.data);
				setPagination(_batches.pagination);
			});

		const interval = setInterval(() => {
			getStatus();
		}, 20000);
		getStatus();

		return () => clearInterval(interval);
		// eslint-disable-next-line
	}, []);

	const handleClick = (e) => {
		let offset = e.target.name;
		setPagination({
			offset: offset,
			limit: pagination.limit,
			total: pagination.total,
		});

		summaryBatchApi
			.getBatches(offset, pagination.limit)
			.then((_batches) => {
				setBatches(_batches.data);
				setPagination(_batches.pagination);
			});
	};

	const getStatus = async () => {
		let status = await summaryBatchProcessingStatusApi.getCurrentStatus();
		if (status.data) setProcessingBatch(status.data);
	};

	function handleSubmit(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		summaryBatchApi.saveBatch(batch).then((response) => {
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

	return (
		<>
			<SummaryBatchProcessingStatus batch={processingBatch} />
			<br />
			<ServerErrors errors={serverErrors} />
			{authContext.userCanManage(ENTITY.batch) ? (
				<SummaryBatchForm
					batch={batch}
					errors={errors}
					onChange={handleChange}
					onSubmit={handleSubmit}
				/>
			) : (
				""
			)}
			<br /> <br />
			<SummaryBatchList batches={batches} />
			<PaginationControls
				pagination={pagination}
				label="Batch pages"
				onClick={handleClick}
			/>
		</>
	);
}

export default SummaryBatchPage;
