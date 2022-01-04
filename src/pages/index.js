import axios     from 'axios'
import Head      from 'next/head'
import Featured  from '../components/Featured.jsx'
import PizzaList from '../components/PizzaList.jsx'
import styles    from '../styles/Home.module.css'

export default function Home ({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta
          name='description'
          content='Best pizza shop in town'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3336/api/products')
  return {
    props: {
      pizzaList: data.products
    }
  }
}
