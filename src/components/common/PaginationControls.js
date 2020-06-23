import React from "react";
import PropTypes from "prop-types";

function PaginationControls(props) {
	const renderPreviousLink = () => {
		return renderLink(
			Math.max(0, props.pagination.offset - 1),
			"Previous",
			false,
			props.pagination.offset === 0
		);
	};

	const renderNextLink = () => {
		let totalPages = Math.ceil(
			props.pagination.total / props.pagination.limit
		);
		return renderLink(
			Math.min(totalPages - 1, props.pagination.offset + 1),
			"Next",
			false,
			props.pagination.offset === totalPages - 1
		);
	};

	const renderNumberedLinks = () => {
		let currentPage = props.pagination.offset;
		let totalPages =
			Math.ceil(props.pagination.total / props.pagination.limit) - 1;
		let firstPage = currentPage - 2;
		let lastPage = currentPage + 2;

		if (firstPage < 0) {
			lastPage += Math.abs(firstPage);
			firstPage = 0;
		}

		if (lastPage > totalPages) {
			firstPage = Math.max(firstPage + totalPages - lastPage, 0);
			lastPage = totalPages;
		}

		let returnArray = [];
		for (let i = firstPage; i <= lastPage; i++) {
			returnArray.push(renderLink(i, i + 1, currentPage === i, false));
		}
		return returnArray;
	};

	const renderLink = (offset, pageLabel, isActive, isDisabled) => {
		return (
			<li
				className={
					"page-item" +
					(isDisabled ? " disabled" : "") +
					(isActive ? " active" : "")
				}
			>
				<button
					className="btn page-link"
					name={offset}
					onClick={props.onClick}
				>
					{pageLabel}
				</button>
			</li>
		);
	};

	return (
		<nav aria-label={props.label}>
			<ul className="pagination">
				{renderPreviousLink()}
				{renderNumberedLinks()}
				{renderNextLink()}
			</ul>
		</nav>
	);
}

PaginationControls.propTypes = {
	pagination: PropTypes.shape({
		offset: PropTypes.number.isRequired,
		limit: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
	}).isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

PaginationControls.defaultProps = {
	pagination: {
		offset: 0,
		limit: 0,
		total: 0,
	},
	label: "Page navigation",
};

export default PaginationControls;
