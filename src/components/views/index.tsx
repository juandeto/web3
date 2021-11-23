import * as React from 'react'
import Account from 'components/layout/Account'
import 'styles/layouts/home.scss';

const MainView: React.FC = () => {

    return (
        <main className="main__container">
            <section className="landing__container">
                <div className="landing__titles">
                   <div className="landing__title">
                    <h1>Make payments easily</h1>
                    <p>Enjoy a <span className="highligth">nice</span>, <span className="highligth">practic</span> and <span className="highligth">solid</span> payment experience while discovering <span className="highligth">Defi</span> apps.</p>
                    </div>
                    <div className="landing__connect">
                        <Account />
                    </div> 
                </div>
                <div className="landing__img"> 
                    <img src="https://regexlearn.com/Done.webp" alt="easy pic" />
                </div>
            </section>
        </main>
    )
}

export default MainView;