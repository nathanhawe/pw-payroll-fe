import React, { useEffect, useState } from "react";
import * as crewBossWageApi from "../../api/crewBossWageApi";
import * as dateUtility from "../../utility/dateUtility";
import PaginationControls from "../common/PaginationControls";

function CrewBossWagePage() {
	const [wages, setWages] = useState([]);
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
				console.log(pagination);
			});
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
			console.log(pagination);
		});
	};

	function renderRow(wage) {
		return (
			<tr key={wage.id}>
				<td>{wage.id}</td>
				<td>{wage.workerCountThreshold}</td>
				<td>{dateUtility.formatDate(wage.effectiveDate)}</td>
				<td>{wage.wage.toFixed(2)}</td>
			</tr>
		);
	}

	return (
		<>
			<p>
				Crew boss wages are determined based on location and worker
				count. South crew bosses are paid a flat daily or hourly rate
				which is already programmed into the time and attendance
				calculations. Crew boss wages for East and West crews are based
				on worker count and configured using the table below. There may
				be multiple values per worker count representing multiple
				effective dates and old records should not be deleted to ensure
				that adjustments can be calculated accurately for historical
				time periods.
			</p>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Worker Count Threshold</th>
						<th>Effective Date</th>
						<th>Wage</th>
					</tr>
				</thead>
				<tbody>{wages && wages.map(renderRow)}</tbody>
			</table>
			<PaginationControls
				pagination={pagination}
				label="Crew boss pages"
				onClick={handleClick}
			/>
		</>
	);
}

export default CrewBossWagePage;
