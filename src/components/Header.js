
import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

import DateRange from '../components/DateRange'
import { StyledHeader } from '../styled'
import { placeholders } from '../constants'



export default function Header ({ onChange, selectedRange }) {

	const handleSearchChange = (e) => {
		onChange({ field: 'search', value: e.target.value })
	}
	return (
		<StyledHeader>
			<DateRange
				selectedRange={selectedRange}
				handleRangeChange={onChange} />
			<Input.Search
				id="searchInput"
				placeholder={placeholders.searchText}
				onChange={handleSearchChange}
				style={{width: '200px'}} />
		</StyledHeader>
	)
}

Header.propTypes = {
	onChange: PropTypes.func.isRequired,
	selectedRange: PropTypes.shape({
		startValue: PropTypes.object,
		endValue: PropTypes.object
	})
}
