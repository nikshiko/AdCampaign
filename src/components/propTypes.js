import PropTypes from 'prop-types'

export default {
	campaignList: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string.isRequired,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		budget: PropTypes.number
    })),
}