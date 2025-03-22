
import Card from "./Card";
import Link from "next/link";

export default async function MassageCatalog({shopsJson} : {shopsJson:Promise<ShopJson>}){
    const shopJsonReady = await shopsJson
    console.log(shopJsonReady)
    return (
        <>
        Explore {shopJsonReady.count} Massage shop in catalog
        <div className="m-5 flex flex-row content-around justify-around flex-wrap">
                    {
                        shopJsonReady.data.map((ShopItem:ShopItem)=>
                        <Link href={`/shops/${ShopItem.id}`} className="w-1/5" key={ShopItem.id}>
                        <Card shopName={ShopItem.name} imgSrc={ShopItem.picture??'/img/logo.png'}/>
                        </Link>
                        )
                    }

                </div>
        </>
    )

}