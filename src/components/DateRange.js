import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import { StyledDateRange } from '../styled'

import { dateFormat,placeholders } from '../constants'

export default function DateRange({ handleRangeChange, selectedRange }) {
	const { startValue, endValue } = selectedRange
	const [endOpen, toggleEndOpen] = useState(false)

	const disabledStartDate = startValue => {
		if (!startValue || !endValue) {
			return false
		}
		return startValue.valueOf() > endValue.valueOf()
	}

	const disabledEndDate = endValue => {
		if (!endValue || !startValue) {
			return false
		}
		return endValue.valueOf() <= startValue.valueOf()
	}

	const onStartChange = value => {
		handleRangeChange({field:'startValue', value})
	}

	const onEndChange = value => {
		handleRangeChange({field:'endValue', value})
	}

	const handleStartOpenChange = open => {
		!open && toggleEndOpen(true)
	}

	const handleEndOpenChange = open => {
		toggleEndOpen(open)
	}

	return (
		<StyledDateRange>
			<DatePicker
				disabledDate={disabledStartDate}
				format={dateFormat}
				value={startValue}
				placeholder={placeholders.startDate}
				onChange={onStartChange}
				onOpenChange={handleStartOpenChange}
				style={{paddingRight: '0.5em'}}
			/>
			<DatePicker
				disabledDate={disabledEndDate}
				format={dateFormat}
				value={endValue}
				placeholder={placeholders.endDate}
				onChange={onEndChange}
				open={endOpen}
				onOpenChange={handleEndOpenChange}
				style={{paddingRight: '0.5em'}}
			/>
		</StyledDateRange>
	)
}

DateRange.propTypes = {
	handleRangeChange: PropTypes.func.isRequired,
	selectedRange: PropTypes.shape({
		startValue: PropTypes.object,
		endValue: PropTypes.object
	})
}

DateRange.defaultProps = {
	selectedRange: {
		startValue: null,
		endValue: null
	}
}
