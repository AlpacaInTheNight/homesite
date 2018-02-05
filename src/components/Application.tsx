import * as React from 'react';

import { BigPicture } from '../components/BigPicture';
import { LangSwitcher } from '../components/LangSwitcher';
import { Scroller } from '../components/Scroller';
import homepage from '../catalog/homepage';
import { Switch, Route, Link } from 'react-router-dom';

interface ApplicationProps {
	
}

interface ApplicationState {
	language: Elerium.availableLanguages;
	renderedBigPicture: boolean;
	contentContainer?: string;
}

export class Application extends React.Component<ApplicationProps, ApplicationState> {

	private readonly USER_LANGUAGE = "userLanguage";

	public constructor(props: ApplicationProps) {
		super(props);
		let lang: Elerium.availableLanguages = localStorage[this.USER_LANGUAGE] ? localStorage[this.USER_LANGUAGE] : "eng";


		let state: ApplicationState = {
			language: lang,
			renderedBigPicture: false
		}

		this.state = state;
	}

	private updateSelectedLanguage = (lang: Elerium.availableLanguages) => {
		if(!lang) return;

		this.setState({language: lang});
		localStorage[this.USER_LANGUAGE] = lang;
	}

	private setContainer = (newContainer: string) => {
		if(!newContainer) return;

		this.setState({contentContainer: newContainer});
	}

	public render() {

		const Home = () => {
			return <BigPicture setContainer={this.setContainer} source={homepage} language={this.state.language} />
		};

		const BigPictureDocument = (props: any) => {
			let path = props.location.pathname;
			let target = path.substr( path.lastIndexOf('/') + 1 );

			return <BigPicture setContainer={this.setContainer} source={homepage} language={this.state.language} showDetails={target} />
		};
		
		const Test = () => (
			<div style={{color: "black"}}>
				Test Page
			</div>
		);

		return (
			<div className="application">

				<div className="background" />

				
				
				<div className="top_menu">
					<LangSwitcher activeLanguage={this.state.language} changeLanguage={this.updateSelectedLanguage} />

					<div className="options">
						<Scroller contentContainer={this.state.contentContainer} />
					</div>
				</div>

				<div className='content'>
					<Switch>
						<Route exact path='/' render={Home}/>
						<Route path='/details/' render={BigPictureDocument}/>
						<Route path='/test' render={Test}/>
					</Switch>
				</div>

			</div>
		);
	}
}
