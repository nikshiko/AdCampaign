import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'

import Header from './components/Header'
import CampaignList from './components/CampaignList'
import { StyledLayout } from './styled'
import mock from './components/__mocks__/index.mock'



function App ({ campaignList }) {
	const [state, updateState] = useState({
		startValue: null,
		endValue: null,
		searchValue: ''
	})

	const handleOnChange = ({ field, value }) => {
		let updatedState = {...state}
		switch(field) {
		case 'search': 
			updatedState.searchValue = value
			break 

		case 'startValue': 
			updatedState.startValue = value
			break

		case 'endValue': 
			updatedState.endValue = value
			break

		default:
			//no default 
		}
		updateState(updatedState)
	}

	return (
		<StyledLayout>
			<Header
				onChange={handleOnChange}
				selectedRange={{startValue: state.startValue, endValue: state.endValue}} />
			<CampaignList
				list={campaignList}
				filters={state} />
		</StyledLayout>
	)
}

App.defaultProps = {
	campaignList: mock
}

App.propTypes = {
	/**
	 * A list of campaigns that can be passed down by the window object
	 */
	campaignList: PropTypes.array
}




function renderApp (list) {
	ReactDOM.render(
		<App campaignList={list} />,
		document.getElementById('root')
	)
}
var campaigns = mock.correctFormat

window.AddCampaigns = (moreCampaigns=[]) => {
	campaigns = [...campaigns, ...moreCampaigns.length ? moreCampaigns: []]
	renderApp(campaigns)
}

renderApp(campaigns)





