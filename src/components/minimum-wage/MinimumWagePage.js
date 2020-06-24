import React, { useEffect, useState } from "react";
import * as minimumWageApi from "../../api/minimumWageApi";
import * as dateUtility from "../../utility/dateUtility";
import PaginationControls from "../common/PaginationControls";

function MinimumWagePage() {
	const [wages, setWages] = useState([]);
	const [pagination, setPagination] = useState({
		offset: 0,
		limit: 20,
		total: 0,
	});

	useEffect(() => {
		minimumWageApi
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

		minimumWageApi.getWages(offset, pagination.limit).then((_wages) => {
			setWages(_wages.data);
			setPagination(_wages.pagination);
		});
	};

	function renderRow(wage) {
		return (
			<tr key={wage.id}>
				<td>{wage.id}</td>
				<td>{dateUtility.formatDate(wage.effectiveDate)}</td>
				<td>{wage.wage.toFixed(2)}</td>
			</tr>
		);
	}

	return (
		<>
			<p>
				Minimum wage is determined by using this table to select the
				effective minimum wage on any given date. Do not delete old
				records from this table as they are used when calculating
				adjustments. To set a new minimum wage value simply create a new
				record and set the effective date to the date that wage goes
				into effect.
			</p>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Effective Date</th>
						<th>Wage</th>
					</tr>
				</thead>
				<tbody>{wages && wages.map(renderRow)}</tbody>
			</table>
			<PaginationControls
				pagination={pagination}
				label="Minimum wage pages"
				onClick={handleClick}
			/>
		</>
	);
}

export default MinimumWagePage;
