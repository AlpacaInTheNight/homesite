import * as React from "react";
import * as ReactDOM from "react-dom";
import { Application } from './components/Application';
import { HashRouter } from 'react-router-dom';

ReactDOM.render((
	<HashRouter>
		<Application />
	</HashRouter>
), document.getElementById('wrapper'));