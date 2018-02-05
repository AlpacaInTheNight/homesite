import * as React from 'react';

interface LangSwitcherProps {
	activeLanguage: Elerium.availableLanguages;
	changeLanguage: Function;
}

interface LangSwitcherState {
	
}

export class LangSwitcher extends React.Component<LangSwitcherProps, LangSwitcherState> {

	public constructor(props: LangSwitcherProps) {
		super(props);

		console.log("Creating instance of LangSwitcher");
	}

	private switchLanguage = (e: any) => {
		let event = e as Event;
		let target = event.target as HTMLElement;
		let lang = target.dataset.id;

		if(lang && lang != this.props.activeLanguage) {
			this.props.changeLanguage(lang);
		}
	}

	public render () {
		console.log(`rendering LangSwitcher with param ${this.props.activeLanguage}`);

		//English id
		const ENG = "eng";
		
		//Russian id
		const RUS = "rus";

		let addClass = {
			eng: this.props.activeLanguage == ENG ? "active" : "",
			rus: this.props.activeLanguage == RUS ? "active" : ""
		}
		
		return (
			<div className="lang_switcher">
				<div data-id={ENG} onClick={this.switchLanguage} className={`item eng ${addClass.eng}`}>Eng</div>
				<div data-id={RUS} onClick={this.switchLanguage} className={`item rus ${addClass.rus}`}>Рус</div>
			</div>
		);

	}

	public shouldComponentUpdate(nextProps: LangSwitcherProps, nextState: LangSwitcherState) {
		return this.props.activeLanguage != nextProps.activeLanguage;
	}

}
