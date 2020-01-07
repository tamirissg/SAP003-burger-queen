
import React, {useState, useEffect} from 'react';
import firebase from '../../utils/firebase.js';
import Button from '../Button/index.js';
import Input from '../Input/index.js';
import Card from '../Card/index.js';
import Nav from '../nav/index.js'
import '../Button/style.css';
import '../Card/style.css';
import '../Menu/style.css'
import '../Input/style.css'
import '../nav/style.css'

const Menu = () => {
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);


  useEffect(() => {
    firebase.firestore().collection('menu')
      .get().then((snapshot) => {
        const Breakfast = snapshot.docs.filter(doc => doc.data().Breakfast).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItem1(Breakfast)

        const Lunch = snapshot.docs.filter(doc => doc.data().Lunch).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItem2(Lunch)
      })
  }, [])



  function onSubmit(e) {
    e.preventDefault()
    firebase.firestore().collection('client').add({
      client,
      table: parseInt(table),
      order
    }).then(() => {
      setTable('')
      setClient('')
      setOrder([])
    })
  }

  const addItem = (item) => {
    setOrder([...order, item])
    if (!order.includes(item)) {
      item.count = 1;
      setOrder([...order, item])
    }
    else {
      item.count += 1;
      setOrder([...order])
    }
  }

  const deleteItem = (item) => {
    const remove = (order.indexOf(item))
    order.splice(remove, 1);
    setOrder([...order]);
  }

  const totalDeItens = order.reduce((acc, item) => acc + (item.count * item.price), 0)
  // 

  return (
    <>
      <Nav/>
      <section>
      <div className='menu.item1'>
        <p>Menu de Café da manhã </p>
        {item1.map((Breakfast) => <Card handleClick={() => addItem(Breakfast)} key={Breakfast.id} name={Breakfast.name} price={Breakfast.price} />)}
        </div>
        </section> 
        <section>
        <div className ="menu.item2">
        <p>Menu</p>
        {item2.map((Lunch) => <Card handleClick={() => addItem(Lunch)} key={Lunch.id} name={Lunch.name} price={Lunch.price} />)}
        </div>
        </section>
     
      <section>
        {order.map((product, index) => <div key={product.id+index}> {product.name} {product.price}
        <Button id='button-delete' handleClick={(e) => {
          e.preventDefault()
          deleteItem(product);
        }} text={'deletar'} /></div>)}
        <p>Total de Itens {totalDeItens}</p>
        <p>Pedidos</p>
          <strong>Cliente</strong>
        <Input id='input-text' type='text' state={client} handleChange={e => setClient(e.currentTarget.value)} />
        <label>
          <strong>Mesa</strong>
        </label>
        <Input id='input-number' type='number' state={table} handleChange={e => setTable(e.currentTarget.value)} />
        <Button id='button-send' handleClick={onSubmit} text={'enviar'} />
        </section>
    </>
  );
};


export default Menu