
import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { DatePicker } from 'antd'
import { StyledHeader } from './styled'



export default function RenderHeaderComponent (props) {
	const { onChange } = props
	const handleRangeChange = (data) => {
		onChange({ field: 'dateRange', value: data })
	}

	const handleSearchChange = (e) => {
		onChange({ field: 'search', value: e.target.value })
	}
	return (
		<StyledHeader>
			<DatePicker.RangePicker format='DD/MM/YYYY' onChange={handleRangeChange}/>
			<Input.Search
				placeholder="Search campaign"
				onChange={handleSearchChange}
				style={{width: '200px'}}
			/>
		</StyledHeader>
	)
}

RenderHeaderComponent.propTypes = {
	onChange: PropTypes.func.isRequired
}
