import axios              from 'axios'
import Image              from 'next/image'
import { useState }       from 'react'
import { useDispatch }    from 'react-redux'
import { addCartProduct } from '../../redux/cartSlice.js'
import styles             from '../../styles/Product.module.css'

const Product = ({ pizza }) => {

  const dispatch = useDispatch()

  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(pizza.prices[0])
  const [extras, setExtras] = useState([])

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const diff = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(diff)
  }

  const handleCheckOptions = (e, option) => {
    if (e.target.checked) {
      changePrice(option.price)
      setExtras(prev => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  const handleAddToCart = () => {
    dispatch(addCartProduct({ ...pizza, extras, price, quantity }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.image}
            objectFit='contain'
            layout='fill'
            alt=''
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div
            className={styles.size}
            onClick={() => handleSize(0)}
          >
            <Image
              src='/img/size.png'
              layout='fill'
              alt=''
            />
            <span className={styles.number}>Small</span>
          </div>
          <div
            className={styles.size}
            onClick={() => handleSize(1)}
          >
            <Image
              src='/img/size.png'
              layout='fill'
              alt=''
            />
            <span className={styles.number}>Medium</span>
          </div>
          <div
            className={styles.size}
            onClick={() => handleSize(2)}
          >
            <Image
              src='/img/size.png'
              layout='fill'
              alt=''
            />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map(option => (
            <div
              className={styles.option}
              key={option._id}
            >
              <input
                type='checkbox'
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleCheckOptions(e, option)}
              />
              <label htmlFor='double'>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type='number'
            defaultValue={quantity}
            className={styles.quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />
          <button
            className={styles.button}
            onClick={handleAddToCart}
          >Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`http://localhost:3336/api/products/${params.id}`)
  return {
    props: {
      pizza: data.product
    }
  }
}
