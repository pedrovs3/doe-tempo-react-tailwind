import {Header} from "../../components/HeaderHome";
import Hello from "../../assets/img/Hello.svg";
import {HomeWelcome} from "../../components/HomeWelcome";
import {HomeWelcomeDois} from "../../components/HomeWelcomeDois";

export default function Home() {
    return (
        <div className={''}>
            <Header />
            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow h-32 place-items-center">
                    <HomeWelcome />
                </div>
                <div className="grid flex-grow place-items-center">
                    <img src={Hello} alt={'Pessoa dando Oi'}/>
                </div>
            </div>
            <HomeWelcomeDois/>
        </div>

    )

}
