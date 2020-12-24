import React, { useEffect, useState, useContext } from "react";
import * as applicationUserApi from "../../api/applicationUserProfileApi";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { ENTITY } from "../../utility/entityConst";
import UserList from "./UserList";
import ServerErrors from "../common/ServerErrors";
import PaginationControls from "../common/PaginationControls";

function UserPage() {
	const authContext = useContext(AuthenticationContext);
	const [errors, setErrors] = useState({});
	const [serverErrors, setServerErrors] = useState({});
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({
		id: null,
		name: "",
		email: "",
		subject: "",
		accessLevel: "",
	});
	const [pagination, setPagination] = useState({
		offset: 0,
		limit: 10,
		total: 0,
	});

	useEffect(() => {
		applicationUserApi
			.getApplicationUserProfiles(pagination.offset, pagination.limit)
			.then((_users) => {
				setUsers(_users.data);
				setPagination(_users.pagination);
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

		applicationUserApi
			.getApplicationUserProfiles(offset, pagination.limit)
			.then((_users) => {
				setUsers(_users.data);
				setPagination(_users.pagination);
			});
	};

	// function handleSubmit(event) {
	// 	event.preventDefault();
	// 	if (!formIsValid()) return;
	// 	batchApi.saveBatch(batch).then((response) => {
	// 		if (response.errors) {
	// 			setServerErrors(response.errors);
	// 		} else {
	// 			// update states
	// 			setBatches([response.data, ...batches]);
	// 			setServerErrors({});

	// 			setBatch({
	// 				id: null,
	// 				weekEndDate: "",
	// 				company: "",
	// 				layoffId: "",
	// 			});
	// 		}
	// 	});
	// }

	// function handleChange({ target }) {
	// 	setBatch({
	// 		...batch,
	// 		[target.name]: target.value,
	// 	});

	// 	setErrors({
	// 		...errors,
	// 		[target.name]: "",
	// 	});
	// }

	// function formIsValid() {
	// 	const _errors = {};
	// 	if (!batch.weekEndDate)
	// 		_errors.weekEndDate = "Week End Date is required.";
	// 	if (batch.weekEndDate && new Date(batch.weekEndDate).getUTCDay() !== 0)
	// 		_errors.weekEndDate = "Week End Date must be a Sunday.";
	// 	if (!batch.company) _errors.company = "Company is required.";
	// 	if (batch.layoffId && (isNaN(batch.layoffId) || batch.layoffId <= 0))
	// 		_errors.layoffId = "Layoff ID must be a number greater than 0";
	// 	setErrors(_errors);
	// 	console.log(_errors);
	// 	// From is valid if the errors object has no values
	// 	return Object.keys(_errors).length === 0;
	// }

	return (
		<>
			<br />
			<ServerErrors errors={serverErrors} />
			<UserList
				users={users}
				canEdit={authContext.userCanManage(ENTITY.user)}
			/>
			<PaginationControls
				pagination={pagination}
				label="Batch pages"
				onClick={handleClick}
			/>
		</>
	);
}

export default UserPage;
