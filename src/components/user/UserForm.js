import React from "react";
import PropTypes from "prop-types";

function UserForm(props) {
	return (
		<>
			<h2>Update User</h2>
			<form onSubmit={props.onSubmit} className="border p-4">
				<p>
					Users are automatically created with the access level of
					'Viewer'. Choose a different access level to change how this
					user uses the time and attendance calculations.
				</p>
				<ul>
					<li>
						None - User cannot see or modify any data and cannot
						start batches.
					</li>
					<li>
						Viewer - Can see all tabs except users but cannot start
						batches (default).
					</li>
					<li>
						Batch Creator - Can see all tables except users and can
						start batches.
					</li>
					<li>
						Administrator - Can see all tables including users and
						can start batches.
					</li>
				</ul>
				<p>
					Changing a user's access level will take effect immediately
					on the server but the user may need to log out and then back
					in again to see new features. For example, a 'Batch Creator'
					downgraded to 'None' will immediately lose access to
					creating batches or refreshing the page but a user upgraded
					from 'Viewer' to 'Batch Creator' will need to log out and
					back in again to see the forms to create batches.
				</p>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<div className="field">
						<input
							type="text"
							id="name"
							name="name"
							className="form-control"
							value={props.user.name}
							onChange={props.onChange}
							readOnly
						/>
					</div>
					{props.errors.name && (
						<div className="alert alert-danger">
							{props.errors.name}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<div className="field">
						<input
							type="text"
							id="email"
							name="email"
							className="form-control"
							value={props.user.email}
							onChange={props.onChange}
							readOnly
						/>
					</div>
					{props.errors.email && (
						<div className="alert alert-danger">
							{props.errors.email}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="id">ID</label>
					<div className="field">
						<input
							type="text"
							id="id"
							name="id"
							className="form-control"
							value={props.user.id}
							onChange={props.onChange}
							readOnly
						/>
					</div>
					{props.errors.id && (
						<div className="alert alert-danger">
							{props.errors.id}
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="accessLevel">Access Level</label>
					<div className="field">
						<select
							id="accessLevel"
							name="accessLevel"
							className="form-control"
							value={props.user.accessLevel}
							onChange={props.onChange}
						>
							<option value="None">None</option>
							<option value="Viewer">Viewer</option>
							<option value="BatchCreator">Batch Creator</option>
							<option value="Administrator">Administrator</option>
						</select>
					</div>
					{props.errors.accessLevel && (
						<div className="alert alert-danger">
							{props.errors.accessLevel}
						</div>
					)}
				</div>
				<input type="submit" value="Save" className="btn btn-primary" />{" "}
				<button
					className="btn btn-secondary"
					onClick={props.handleCancel}
				>
					Cancel
				</button>
			</form>
		</>
	);
}

UserForm.propTypes = {
	user: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};

export default UserForm;
