import { useLoaderData } from "react-router-dom"
import Content from "../compnents/Content"

export default function Hochimin() {
  const data = useLoaderData()
  return (
    <div className='layout-detail'>
      <section className="left">
        <img src="/images/03.jpg" alt="Hochimin" />
      </section>
      <section className="right">
        <Content data={data} />
      </section>
    </div>
  )
}
