import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Icon } from 'antd'

import { isDateInRange } from '../utils'
import { active, inactive, dateFormat } from '../constants'

export default function StatusComponent({startDate, endDate}) {
	let status = inactive
    
	if(isDateInRange(moment().format(dateFormat),startDate,endDate)) {
		status= active
	}

	return (
		<React.Fragment>
			<Icon
				type={status !== active ? 'minus-circle': 'check-circle'}
				style={{color: status !== active? '#ff0000' : '#008000'}} />
			{`\u00A0${status}`}
		</React.Fragment>
	)  
}

StatusComponent.propTypes = {
	/**
     * The start date used to determine the status of the campaign
     */
	startDate: PropTypes.string.isRequired,
	/**
     * The end date used to determine the status of the campaign
     */
	endDate: PropTypes.string.isRequired
}

