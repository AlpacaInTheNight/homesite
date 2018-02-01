import * as React from 'react';
import Catalog from '../catalog/Catalog';
import { Link } from 'react-router-dom';

interface ShowDetailsProps {
	language: Elerium.availableLanguages;
	target: string;
	setContainer: Function;
}

interface ShowDetailsState {
	loading: "loading" | "success" | "error";
}

export class ShowDetails extends React.Component<ShowDetailsProps, ShowDetailsState> {

	private readonly DOCUMENT_URL: string = "./details/";

	private SCROLLING_CONTAINER_QUERY: string = ".bigpicture_details_content";

	private document: string;

	private documentTitle: string;

	private ENGLISH: Elerium.availableLanguages = "eng";
	private RUSSIAN: Elerium.availableLanguages = "rus";

	public constructor(props: ShowDetailsProps) {
		super();

		this.state = {
			loading: "loading"
		};

		this.getDocument(props.target);

		console.log("Creating instance of ShowDetails");
	}

	public getDocument(target: string) {
		let url = this.DOCUMENT_URL + target + ".html";
		this.loadExternal(url);
	}

	private getDocumentDetails(target: string) {
		const UNNAMED_ENG: string = "Document";
		const UNNAMED_RUS: string = "Документ";

		if(Catalog[target]) {
			let doc = Catalog[target];

			if(this.props.language == this.RUSSIAN && doc.nameRus) {
				this.documentTitle = doc.nameRus;
			} else if(doc.name) {
				this.documentTitle = doc.name;
			} else {
				this.documentTitle = this.props.language == this.ENGLISH ? UNNAMED_ENG : UNNAMED_RUS;
			}

		} else {
			this.documentTitle = this.props.language == this.ENGLISH ? UNNAMED_ENG : UNNAMED_RUS;
		}
	}

	/**
	 * Loads external template by XMLHttpRequest request
	 */
	private loadExternal(url: string) {
		if(!url) {
			throw("Error: no url provided for document loader");
		}
		let self = this;

		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.responseText) {
				self.document = xhr.responseText;
				self.setState({loading: "success"});
			}
		}

		xhr.onerror = (foo: any) => {
			self.setState({loading: "error"});
		}

		xhr.open("GET", url, true);
		xhr.send(null);

	}

	private showIsLoading(): JSX.Element {

		return (
			<div className="bigpicture_details_loading loading">
				<div className="loading_icon" />
			</div>
		);
	}

	private showError(): JSX.Element {
		const ERROR_ENG: string = "Error loading document";
		const ERROR_RUS: string = "Ошибка загрузки документа";

		let text = this.props.language == this.ENGLISH ? ERROR_ENG : ERROR_RUS;
		
		return (
			<div className="bigpicture_details_error error">
				{text}
			</div>
		);
	}

	private showContent(): JSX.Element {
		return (
			<div dangerouslySetInnerHTML={{__html: this.document}} />
		);
	}

	public render() {
		console.log(`rendering ShowDetails with loading status: ${this.state.loading}`);

		this.getDocumentDetails(this.props.target);
		let output: JSX.Element | JSX.Element[];
		let title: string = "";

		switch(this.state.loading) {
			case "success": 
				output = this.showContent();
				title = this.documentTitle;
			break;
			case "error":
				output = this.showError();
				title = this.documentTitle + " - Error";
			break;

			default:
				output = this.showIsLoading();
				title = this.documentTitle + " - Loading";
			break;
		}
		
		return (
			<div className="bigpicture_details_wrapper">

				<div className="bigpicture_details_menu">
					<div className="title">{title}</div>

					<Link className="close" to={"/"}></Link>
				</div>

				<div className="bigpicture_details_content">
					{output}
				</div>

			</div>
		);

	}

	public componentDidMount() {
		this.props.setContainer(this.SCROLLING_CONTAINER_QUERY);
	}

	public componentWillUnmount() {
		console.log("unmounting");
	}

}
