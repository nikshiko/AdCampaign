import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import 'antd/dist/antd.css'

import RenderHeaderComponent from './components/Header'

const Layout = styled.div`
  max-width: 1560px
  position: relative;
  padding: 10em;
`;

function App () {
	return (
		<Layout>
			<RenderHeaderComponent />
		</Layout>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)

