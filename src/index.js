import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import 'antd/dist/antd.css'

import RenderHeaderComponent from './components/Header'
import RenderCampaignList from './components/Table'
import mock from './components/__mocks__/index.mock'

var campaigns = []
const Layout = styled.div`
  max-width: 1560px
  position: relative;
  margin: 10em;
  padding: 1em;
  border: 0.2em solid black;
`


function App ({campaignList}) {
	const [state, updateState] = useState({
		dateRange: [],
		searchValue: ''
	})

	const handleOnChange = ({ field, value }) => {
		let updatedState = {...state}
		switch(field) {
		case 'search': 
			updatedState.searchValue = value
			break 
		case 'dateRange': 
			updatedState.dateRange = value
			break
		default:
			//no default 
		}
		updateState(updatedState)
	}

	return (
		<Layout>
			<RenderHeaderComponent onChange={handleOnChange} />
			<RenderCampaignList campaignList={campaignList} filters={state} />
		</Layout>
	)
}

App.propTypes = {
	campaignList: PropTypes.array
}

App.defaultProps = {
	campaignList: mock
}

window.AddCampaigns = (moreCampaigns=[]) => {
	campaigns = [...campaigns, ...moreCampaigns.length ? moreCampaigns: []]
	ReactDOM.render(
		<App campaignList={campaigns} />,
		document.getElementById('root')
	)
}

ReactDOM.render(
	<App campaignList={campaigns} />,
	document.getElementById('root'))





