import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Image                                                           from 'next/image'
import { useRouter }                                                   from 'next/router.js'
import { useEffect, useState }                                         from 'react'
import { useDispatch, useSelector }                                    from 'react-redux'
import { cartSelector }                                                from '../redux/cartSlice.js'
import styles                                                          from '../styles/Cart.module.css'

const Cart = () => {

  const cart = useSelector(cartSelector)
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const amount = cart.total
  const currency = 'RUB'
  const style = { layout: 'vertical' }
  const dispatch = useDispatch()
  const router = useRouter()

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency
        }
      })
    }, [currency, showSpinner])

    return (<>
        {(showSpinner && isPending) && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount
                    }
                  }
                ]
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capture the order
            })
          }}
        />
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          {cart.products.map(product => (
            <tr
              className={styles.tr}
              key={product._id}
            >
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={product.image}
                    layout='fill'
                    objectFit='cover'
                    alt=''
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{product.title}</span>
              </td>
              <td>
                <span className={styles.extras}>
                {product.extras.map(extra => (
                  <span key={extra._id}>{extra.text}, </span>
                ))}
              </span>
              </td>
              <td>
                <span className={styles.price}>${product.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{product.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>${product.price * product.quantity}</span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
          <PayPalScriptProvider
            options={{
              'client-id': 'test',
              components: 'buttons',
              currency: 'RUB',
              'disable-funding': 'credit,card,p24'
            }}
          >
            <ButtonWrapper
              currency={currency}
              showLoader={false}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  )
}

export default Cart
