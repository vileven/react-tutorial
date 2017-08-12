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

const Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState() {
        return {
            visible: false
        };
    },

    readmoreClick(e) {
        e.preventDefault();
        this.setState({visible: true});
    },

    render() {
       const author = this.props.data.author,
           text = this.props.data.text,
           bigText = this.props.data.bigText,
           visible = this.state.visible;


       return (
           <div className="article">
               <p className="news__author">{author}</p>
               <p className="news__text">{text}</p>
               <a href="#"
                  onClick={this.readmoreClick}
                  className={'news__readmore ' + (visible ? 'none': '')}>
                   Подробнее
               </a>
               <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
           </div>
       )
   }
});

const News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },

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

                <strong className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

const App = React.createClass({
    render: () => {
        return (
            <div className="app">
                <h3>Новости</h3>
                <News data={myNews}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);