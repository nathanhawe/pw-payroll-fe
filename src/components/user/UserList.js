import React from "react";
import PropTypes from "prop-types";

function UserList(props) {
	const renderRow = (user) => {
		return (
			<tr key={user.id}>
				<td>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.accessLevel}</td>
				<td>{user.id}</td>
				{/* <td>{props.canEdit ? <a href="">Edit</a> : ""}</td> */}
			</tr>
		);
	};

	return (
		<>
			<h2>Users</h2>
			<div className="mx-4">
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Access Level</th>
							<th>ID</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{props.users.map(renderRow)}</tbody>
				</table>
			</div>
		</>
	);
}

UserList.propTypes = {
	canEdit: PropTypes.bool.isRequired,
	users: PropTypes.array.isRequired,
};

export default UserList;
