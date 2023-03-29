import {DetalhesBody} from "../../components/DetalhesBody";
import {DetalhesBodyDois} from "../../components/DetalhesBodyDois";


export default function DetalhesCampanha() {
    return (
        <div className={'p-20'}>
            <div className={'flex w-full justify-between'}>
                <DetalhesBody/>
                <DetalhesBodyDois />
            </div>
        </div>
    )

}
