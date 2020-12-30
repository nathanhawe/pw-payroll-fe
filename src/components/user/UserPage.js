import React, { useEffect, useState, useContext } from "react";
import * as applicationUserApi from "../../api/applicationUserProfileApi";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { ENTITY } from "../../utility/entityConst";
import UserList from "./UserList";
import ServerErrors from "../common/ServerErrors";
import PaginationControls from "../common/PaginationControls";
import UserForm from "./UserForm";

function UserPage() {
	const generateEmptyUser = () => {
		return {
			id: "",
			name: "",
			email: "",
			subject: "",
			accessLevel: "",
		};
	};
	const authContext = useContext(AuthenticationContext);
	const [errors, setErrors] = useState({});
	const [serverErrors, setServerErrors] = useState({});
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(generateEmptyUser());
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

	const handleEdit = (u, e) => {
		setUser(u);
	};

	function handleSubmit(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		applicationUserApi.saveApplicationUserProfile(user).then((response) => {
			if (response.errors) {
				setServerErrors(response.errors);
			} else {
				// update states
				setUsers((_users) => {
					for (let i = 0; i < users.length; i++) {
						if (_users[i].id === response.data.id)
							_users[i] = response.data;
					}
					return _users;
				});
				setServerErrors({});

				setUser(generateEmptyUser());
			}
		});
	}
	const cancelForm = (e) => {
		setUser(generateEmptyUser);
		setServerErrors({});
	};

	function handleChange({ target }) {
		setUser({
			...user,
			[target.name]: target.value,
		});

		setErrors({
			...errors,
			[target.name]: "",
		});
	}

	function formIsValid() {
		const _errors = {};
		return Object.keys(_errors).length === 0;
	}

	return (
		<>
			<br />
			<ServerErrors errors={serverErrors} />

			{user.id !== "" ? (
				<UserForm
					user={user}
					errors={errors}
					onChange={handleChange}
					onSubmit={handleSubmit}
					handleCancel={cancelForm}
				/>
			) : (
				<>
					<UserList
						users={users}
						canEdit={authContext.userCanManage(ENTITY.user)}
						handleEdit={handleEdit}
					/>
					<PaginationControls
						pagination={pagination}
						label="Batch pages"
						onClick={handleClick}
					/>
				</>
			)}
		</>
	);
}

export default UserPage;
