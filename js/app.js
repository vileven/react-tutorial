'use strict';

const myNews = [
	{
		author: 'Саша Печкин',
		text: 'В четверг, четвертого числа...',
		bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
	},

	{
		author: 'Просто Вася',
		text: 'Считаю, что $ должен стоить 35 рублей',
		bigText: 'А евро 42!'
	},

	{
		author: 'Гость',
		text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
		bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
	}
];

class Article extends React.Component {

	constructor() {
		super();
		this.state = {
			visible: false
		};
	}

	readmoreClick(e) {
		e.preventDefault();
		this.setState({visible: true});
	}

	render() {
		const author = this.props.data.author;
		const text = this.props.data.text;
		const bigText = this.props.data.bigText;
		const visible = this.state.visible;

		return (
			<div className="article">
				<p className="news__author">{author}</p>
				<p className="news__text">{text}</p>
				<a href="#"
				   onClick={this.readmoreClick.bind(this)}
				   className={'news__readmore ' + (visible ? 'none': '')}>
					Подробнее
				</a>
				<p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
			</div>
		)
	}
}

Article.propTypes = {
	data: React.PropTypes.shape({
		author: React.PropTypes.string.isRequired,
		text: React.PropTypes.string.isRequired,
		bigText: React.PropTypes.string.isRequired
	})
};



class News extends React.Component {
	render() {
		const data = this.props.data;
		let newsTemplate;
		if (data.length > 0) {
			newsTemplate= data.map((item, index) => {
				return (
					<div key={index}>
						<Article data={item}/>
					</div>
				)
			});
		} else {
			newsTemplate = <p>К сожалению новостей нет</p>
		}


		return (
			<div className="news">
				{newsTemplate}

				<strong className={'news__count ' + (data.length > 0 ? '':'none')}>
					Всего новостей: {data.length}
				</strong>
			</div>
		);
	}
}

News.propTypes = {
	data: React.PropTypes.array.isRequired
};

class TestInput extends React.Component {
	onClick(e) {
		e.preventDefault();
		console.log(this.refs);
		alert(this.btn.value);
	}

	render() {
		return (
			<div>
				<input
					className="test-input"
					defaultValue=""
					placeholder="Ввведите значение"
					ref={(btn) => {this.btn = btn}}
				/>
				<button onClick={this.onClick.bind(this)}>
					Go
				</button>
			</div>
		);
	}
};

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<h3>Новости</h3>
				<TestInput/>
				<News data={myNews}/>
			</div>
		);
	}
};

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);
