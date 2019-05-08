import React, { Component } from "react";

const OrderContext = React.createContext();

// The order consumer will contain all the logic for the usage of the cart
// the order consumer will read localstorage on init
// the order consumer should not be rendered on the server by next
// the order consumer should return default empty values on init to ensure type safety
export class OrderProvider extends Component {
  constructor(props) {
    super(props);

    /*
      {
        id: 2,              // the unique key for in the browserstore
        name: 'xyz'         // the name
        quantity: 4,        // the amount 
        pricePerItem: 500,  // just for displaying sake
        productId: 2,       // we need the original product id
        variationId: 4      // we need the variation
      }
    
    */
    this.state = {
      products: []
    };

    this.itemKey = "pizza.party.basket";

    this.add = this.add.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.set = this.set.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  // send a copy of this.state.products to per. store
  async writeState(products) {
    const content = JSON.stringify(products || this.state.products);
    return await localStorage.setItem(this.itemKey, content);
  }

  // read the per. storage, only required on init.
  async readState() {
    const raw = localStorage.getItem(this.itemKey);
    const products = JSON.parse(raw) || [];
    return this.setState({ products });
  }

  async retrieve(id) {
    const { products } = this.state;
    products.filter(p => p.id === id)[0];
  }

  async add(product) {
    const { products } = this.state;
    let didManipulate = false;

    products.forEach((p, key) => {
      if (p.id === product.id) {
        products[key].quantity = p.quantity += parseInt(product.quantity, 10);
        didManipulate = true;
      }
    });

    if (!didManipulate) {
      products.push(product);
    }
    this.setState({ products });

    // async
    this.writeState();
  }

  async remove(id) {
    const products = this.state.products.filter(p => p.id !== id) || [];

    await this.setState({ products });
    this.writeState(products);
  }

  async set(list) {
    this.setState({ products: list });

    // async
    this.writeState();
  }

  async update(id, data) {
    const { products } = this.state;
    const mapped = products.map(p => (p.id !== id ? p : { ...p, ...data }));
    this.setState({ products: mapped });

    // async
    this.writeState();
  }

  async componentDidMount() {
    await this.readState();
  }

  render() {
    return (
      <OrderContext.Provider
        value={{
          retrieve: this.retrieve,
          set: this.set,
          update: this.update,
          remove: this.remove,
          add: this.add,
          list: this.state.products
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export const OrderConsumer = OrderContext.Consumer;
