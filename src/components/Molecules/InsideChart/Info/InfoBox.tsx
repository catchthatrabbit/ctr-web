
interface IInfoBox {
    items:Array<{
        value:number,
        label:string
    }>
}

const InfoBox = ({items}:IInfoBox) => {
    return items?.map((item, index) => (
        <div key={index}>
            <div>
                {item.value}
            </div>
            <div>
                {item.label}
            </div>
        </div>
    ))
}

export default InfoBox;