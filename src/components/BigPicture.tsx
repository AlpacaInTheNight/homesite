import * as React from 'react';
import { ShowDetails } from './ShowDetails';
import { Link } from 'react-router-dom';
import { compareBasic } from './Utils';

interface BigPictureProps {
	source: Elerium.BigPicture.block[];
	language: Elerium.availableLanguages;
	showDetails?: string;
	setContainer: Function;
}

interface BigPictureState {

}

export class BigPicture extends React.Component<BigPictureProps, BigPictureState> {

	private DOCUMENT_BODY: HTMLElement;

	private SCROLLING_CONTAINER_QUERY: string = "body";

	public constructor(props: BigPictureProps) {
		super();

		this.DOCUMENT_BODY = document.body;

		console.log("Creating instance of BigPicture");
	}

	public renderSource(source: Elerium.BigPicture.block[]): JSX.Element[] {
		let output: JSX.Element[]				= [];
		let blockKey: number					= 0;
		let itemKey: number						= 0;
		let lang: Elerium.availableLanguages	= this.props.language;

		//big block dom class
		const BLOCK_BIG = "block_big";
		
		//big block item dom class
		const ITEM_BIG = "big";

		//text node
		const ITEM_TEXT = "text";

		//English id
		const ENG = "eng";

		//Russian id
		const RUS = "rus";

		//Empty string
		const EMPTY = "";

		//Block with available details page css class name
		const DETAILS = "details";

		const READ_MORE_ENG = "Read more";

		const READ_MORE_RUS = "Читать дальше";

		source.forEach((elem: Elerium.BigPicture.item[]) => {
			let children: JSX.Element[] = [];
			let bigClass = elem.length == 1 ? BLOCK_BIG : EMPTY;

			elem.forEach( (elem: Elerium.BigPicture.item) => {
				let addClass = elem.isBig ? ITEM_BIG : EMPTY;
				let style = elem.image ? {backgroundImage: `url("img/${elem.image}")`} : {};
				let name = elem.name;
				let description: string = "";
				let descNode: JSX.Element;

				if(lang == RUS && elem.nameRus ) {
					name = elem.nameRus;
				}

				if(elem.english && lang == ENG) description = elem.english;
				if(elem.russian && lang == RUS) description = elem.russian;
				if(!elem.russian && lang == RUS && elem.english) description = elem.english;

				if(elem.isText) addClass += " text";

				if(elem.details) {
					let text = lang == ENG ? READ_MORE_ENG : READ_MORE_RUS;
					addClass += " " + DETAILS;
					description += `<br /> <b class="read_more">${text}</b>`;

					descNode = (
						<Link to={"/details/" + elem.details}>
							<div className='description' dangerouslySetInnerHTML={{__html: description}}></div>
						</Link>
					);

				} else {
					descNode = <div className='description' dangerouslySetInnerHTML={{__html: description}}></div>;
				}

				children.push(
					<div className={`item ${addClass}`} key={itemKey++} style={style}>
	
						{name &&
							<div className='header'>
								{name}
							</div>
						}

						{descNode}

						{elem.open &&
							<div className='open'><a target="_blank" href={elem.open}>Open</a></div>
						}

					</div>
				);
			} );

			output.push(
				<div className={`block block${blockKey} ${bigClass}`} key={blockKey++}>
					{children}
				</div>
			);

		});

		return output;
	}

	public render() {
		if(this.props.showDetails) {
			console.log(`rendering BigPicture with document "${this.props.showDetails}" opened`);
		} else {
			console.log("rendering BigPicture");
		}

		//used to hide page scrolling when overlay window is open
		if(this.props.showDetails) {
			this.DOCUMENT_BODY.classList.add("overlay");
		} else {
			this.DOCUMENT_BODY.classList.remove("overlay");
		}

		let content = this.renderSource(this.props.source);

		return (
			<div>

				<div className='content_body big_picture'>
					{content}
				</div>

				{this.props.showDetails &&
					<div className="bigpicture_overlay" />
				}

				{this.props.showDetails &&
					<ShowDetails setContainer={this.props.setContainer} target={this.props.showDetails} language={this.props.language} />
				}

			</div>

			
		);

	};

	public shouldComponentUpdate(nextProps: BigPictureProps, nextState: BigPictureState) {
		return !compareBasic(nextProps, this.props) || !compareBasic(nextState, this.state);
	}

	public componentDidMount() {
		if(!this.props.showDetails) {
			this.props.setContainer(this.SCROLLING_CONTAINER_QUERY);
		}
	}

	public componentWillReceiveProps(nextProps: BigPictureProps) {

		//if going back from the virtual sub-page back to real page
		if(!nextProps.showDetails && this.props.showDetails) {
			this.props.setContainer(this.SCROLLING_CONTAINER_QUERY);
		}
		
	}

}
