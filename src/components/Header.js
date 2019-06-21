
import React from 'react'
import PropTypes from 'prop-types';
import propTypes from './propTypes'
import { Input } from 'antd'
import styled from 'styled-components'
import { DatePicker } from 'antd'

const noOp = ()=> {}

const StyledHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 2em 0;
`



export default function RenderHeaderComponent (props) {
	const { campaignList, onChange } = props
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
			   style={{width: "200px"}}
            />
		</StyledHeader>
	)
}

RenderHeaderComponent.propTypes = {
	...propTypes,
	onChange: PropTypes.func.isRequired
}

RenderHeaderComponent.defaultProps = {
	campaignList: []
}