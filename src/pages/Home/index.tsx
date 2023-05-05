import {Header} from "../../components/HeaderHome";
import Hello from "../../assets/img/Hello.svg";
import Wave from "../../assets/img/wave-footer.svg";
import {HomeWelcome} from "../../components/HomeWelcome";
import {HomeWelcomeDois} from "../../components/HomeWelcomeDois";
import CampanhasList from "../CampanhasList";
import {Footer} from "../../components/Footer";

export default function Home() {
    return (
        <div className={''}>
            <Header />
            <div className="flex flex-col w-full lg:flex-row gap-5">
                <div className="flex flex-grow pl-8 place-items-center">
                    <HomeWelcome />
                </div>
                <div className="grid flex-grow place-items-center">
                    <img src={Hello} alt={'Pessoa dando Oi'}/>
                </div>
            </div>
            <HomeWelcomeDois/>
            <CampanhasList/>
            <img src={Wave} className={"w-full"}/>
            <Footer/>
        </div>

    )

}
