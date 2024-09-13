import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ label, type, value, onChange, id }) => {
	return (
		<div>
			<label
				htmlFor={id}
				className='block text-sm font-medium text-gray-700'
			>
				{label}
			</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				required
				className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
			/>
		</div>
	);
};

FormInput.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};

export default FormInput;
