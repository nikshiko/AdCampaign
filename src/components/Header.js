
import React from 'react'
import propTypes from './propTypes';
import { Select } from 'antd'
import styled from 'styled-components'
import { DatePicker } from 'antd'

const noOp = ()=> {}

const StyledHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
position: relative;
margin: 0 auto;
`


const renderSelectComponent = (list = []) => {  
	return (
		<Select
			showSearch
			style={{ width: 200 }}
			placeholder="Select a person"
			optionFilterProp="children"
			onChange={noOp}
			onFocus={noOp}
			onBlur={noOp}
			onSearch={noOp}
			filterOption={(input, option) =>
				option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		>
			{list.map(({ name }) => 
				<Select.Option key={name} value={name}>
					{name}
				</Select.Option>)}
		</Select>
	)
    
}


export default function RenderHeaderComponent (props) {
	const { campaignList } = props

	return (
		<StyledHeader>
			<DatePicker />
			{renderSelectComponent(campaignList)}
		</StyledHeader>
	)
}

RenderHeaderComponent.propTypes = propTypes

RenderHeaderComponent.defaultProps = {
   campaignList: []
};