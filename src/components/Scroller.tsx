import * as React from 'react';

interface ScrollerProps {
	contentContainer?: string;
}

interface ScrollerState {
	showButton: boolean;
}

export class Scroller extends React.Component<ScrollerProps, ScrollerState> {

	private container: HTMLElement;

	/**
	 * Need this to mark if specific crossbrowser support is needed (in case "body" is used as container).
	 * Chrome uses as highest level scrolling container a <body> element, while firefox - <html> 
	 * (edit: I guess Mozilla here is right, since after I digged in it seems html is highest visual level container, not body).
	 */
	private isRoot: boolean = false;

	public constructor(props: ScrollerProps) {
		super();

		this.state = {
			showButton: false
		}

		props.contentContainer && this.setContainer(props.contentContainer);
		console.log("Creating instance of Scroller");
	}

	private setContainer(containerQuery: string) {
		let container = document.querySelector(containerQuery) as HTMLElement;
		this.isRoot = containerQuery == "body" ? true : false;

		if(!container) {
			//TODO: manage error here
			return;
		};

		window.removeEventListener("scroll", this.listenScroll);
		container.removeEventListener("scroll", this.listenScroll);

		if(this.isRoot) {
			window.addEventListener("scroll", this.listenScroll);
		} else {
			container.addEventListener("scroll", this.listenScroll);
		}

		this.container = container;
		this.checkScrollBar();

	}

	private listenScroll = () => {
		this.checkScrollBar();
	}

	private scrollUp = () => {
		if(!this.isRoot) this.container.scrollTop = 0;
		else window.scrollTo(0, 0);
	}

	private checkScrollBar() {
		let container = this.container;
		
		//not reliable, since mobile devices don't reserve space for scrollbars. should relly only on scrolling position
		//let isScrollBar = container.scrollHeight > container.clientHeight; 

		let scrollTop = container.scrollTop; //works in chrome for body element
		if(this.isRoot && !scrollTop) {
			scrollTop = document.documentElement.scrollTop //works in ff for body element (we actually looking at <html> instead)
		}

		if(scrollTop) { //if scrollbar is moved
			this.setState({showButton: true});
		} else { //if no scrollbar or scrollbar is not moved
			this.state.showButton && this.setState({showButton: false});
		}

	}

	public render () {
		if(!this.state.showButton) {
			console.log(`rendering Scroller hidden state`);
		} else {
			console.log(`rendering Scroller with focus on '${this.props.contentContainer}' container`);
		}
		
		let addClass = this.state.showButton ? "show" : "hidden";
		
		return (
			<div className={"item scroll_up " + addClass} onClick={this.scrollUp}></div>
		);

	}

	public shouldComponentUpdate(nextProps: ScrollerProps, nextState: ScrollerState) {
		return (
			nextProps.contentContainer != this.props.contentContainer || 
			nextState.showButton != this.state.showButton
		);
	}

	public componentWillReceiveProps(nextProps: ScrollerProps) {
		if(nextProps.contentContainer) {
			this.setContainer(nextProps.contentContainer);
		}
	}

}