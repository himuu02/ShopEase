import { useEffect, useMemo, useState } from "react";
import products from "./data/products";
import "./App.css";

const formatPrice = (price) =>
  `₹${Number(price).toLocaleString("en-IN")}`;

const getDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) {
    return 0;
  }

  return Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );
};

const generateOrderId = () => {
  const date = new Date();

  const datePart =
    `${date.getFullYear()}` +
    `${String(date.getMonth() + 1).padStart(2, "0")}` +
    `${String(date.getDate()).padStart(2, "0")}`;

  const randomPart = Math.floor(
    100000 + Math.random() * 900000
  );

  return `SE-${datePart}-${randomPart}`;
};

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] =
    useState("featured");

  const [cart, setCart] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("shopease-cart")
        ) || []
      );
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("shopease-wishlist")
        ) || []
      );
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("shopease-orders")
        ) || []
      );
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [selectedQuantity, setSelectedQuantity] =
    useState(1);

  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [orderConfirmation, setOrderConfirmation] =
    useState(null);

  const [checkoutStep, setCheckoutStep] =
    useState(1);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [formErrors, setFormErrors] =
    useState({});

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Accessories",
    "Home & Living",
  ];

  // =====================================================
  // PERSIST APPLICATION DATA
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "shopease-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "shopease-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(
      "shopease-orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // =====================================================
  // PRODUCT FILTERING
  // =====================================================

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.category
          .toLowerCase()
          .includes(searchText) ||
        product.brand
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortOrder === "low-high") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortOrder === "high-low") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortOrder === "rating") {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    if (sortOrder === "discount") {
      result.sort(
        (a, b) =>
          getDiscount(
            b.price,
            b.originalPrice
          ) -
          getDiscount(
            a.price,
            a.originalPrice
          )
      );
    }

    return result;
  }, [search, category, sortOrder]);

  // =====================================================
  // CART FUNCTIONS
  // =====================================================

  const addToCart = (
    product,
    quantity = 1
  ) => {
    if (!product || product.stock <= 0) {
      return;
    }

    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  item.stock
                ),
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: Math.min(
            quantity,
            product.stock
          ),
        },
      ];
    });

    setCartOpen(true);
  };

  const updateQuantity = (
    id,
    change
  ) => {
    setCart((previousCart) =>
      previousCart
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          const nextQuantity =
            item.quantity + change;

          return {
            ...item,
            quantity: Math.min(
              Math.max(nextQuantity, 0),
              item.stock
            ),
          };
        })
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const isWishlisted = (id) =>
    wishlist.some(
      (item) => item.id === id
    );

  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const exists =
        previousWishlist.some(
          (item) => item.id === product.id
        );

      if (exists) {
        return previousWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...previousWishlist,
        product,
      ];
    });
  };

  // =====================================================
  // CART CALCULATIONS
  // =====================================================

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartSubtotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const cartSavings = cart.reduce(
    (total, item) =>
      total +
      (item.originalPrice - item.price) *
        item.quantity,
    0
  );

  const shippingCharge =
    cartSubtotal >= 999 || cartSubtotal === 0
      ? 0
      : 79;

  const checkoutTotal =
    cartSubtotal + shippingCharge;

  // =====================================================
  // PRODUCT DETAILS
  // =====================================================

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
  };

  const relatedProducts = selectedProduct
    ? products
        .filter(
          (product) =>
            product.category ===
              selectedProduct.category &&
            product.id !==
              selectedProduct.id
        )
        .slice(0, 4)
    : [];

  // =====================================================
  // CHECKOUT
  // =====================================================

  const updateCustomer = (
    field,
    value
  ) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));

    setFormErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const validateCustomer = () => {
    const errors = {};

    if (
      !customer.fullName.trim() ||
      customer.fullName.trim().length < 3
    ) {
      errors.fullName =
        "Please enter your full name.";
    }

    if (
      !customer.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        customer.email
      )
    ) {
      errors.email =
        "Please enter a valid email.";
    }

    if (
      !/^[6-9]\d{9}$/.test(
        customer.phone
      )
    ) {
      errors.phone =
        "Enter a valid 10-digit mobile number.";
    }

    if (
      !customer.address.trim() ||
      customer.address.trim().length < 10
    ) {
      errors.address =
        "Please enter your complete address.";
    }

    if (
      !customer.city.trim()
    ) {
      errors.city =
        "City is required.";
    }

    if (
      !customer.state.trim()
    ) {
      errors.state =
        "State is required.";
    }

    if (
      !/^\d{6}$/.test(
        customer.pincode
      )
    ) {
      errors.pincode =
        "Enter a valid 6-digit PIN code.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const startCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    setCartOpen(false);
    setCheckoutStep(1);
    setCheckoutOpen(true);
    setFormErrors({});
  };

  const goToPayment = () => {
    if (validateCustomer()) {
      setCheckoutStep(2);
    }
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      return;
    }

    const orderId = generateOrderId();

    const newOrder = {
      id: orderId,
      createdAt:
        new Date().toISOString(),

      customer: {
        ...customer,
      },

      paymentMethod,

      items: cart.map((item) => ({
        ...item,
      })),

      subtotal: cartSubtotal,
      shipping: shippingCharge,
      total: checkoutTotal,
      savings: cartSavings,

      status:
        paymentMethod === "cod"
          ? "Confirmed"
          : "Payment Pending",
    };

    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    setCart([]);
    setCheckoutOpen(false);
    setCheckoutStep(1);
    setOrderConfirmation(newOrder);
  };

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortOrder("featured");
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatOrderDate = (
    dateString
  ) => {
    return new Date(
      dateString
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="app">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">

        <a
          href="#home"
          className="logo"
        >
          Shop<span>Ease.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">
            Home
          </a>

          <a href="#products">
            Products
          </a>

          <a href="#about">
            About
          </a>
        </nav>

        <div className="nav-actions">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <button
            className="wishlist-nav-button"
            onClick={() =>
              setWishlistOpen(true)
            }
          >
            ♡

            <span>
              {wishlist.length}
            </span>
          </button>

          <button
            className="cart-button"
            onClick={() =>
              setCartOpen(true)
            }
          >
            🛒 Cart

            <span className="cart-count">
              {cartCount}
            </span>
          </button>

        </div>

      </header>

      {/* =================================================
          CART PANEL
      ================================================= */}

      {cartOpen && (
        <>
          <div
            className="side-panel-overlay"
            onClick={() =>
              setCartOpen(false)
            }
          />

          <aside className="side-panel">

            <div className="side-panel-header">

              <div>
                <span className="section-tag">
                  SHOPPING BAG
                </span>

                <h2>
                  Your Cart
                </h2>
              </div>

              <button
                className="panel-close"
                onClick={() =>
                  setCartOpen(false)
                }
              >
                ×
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  🛒
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add products to
                  start shopping.
                </p>

                <button
                  className="primary-button"
                  onClick={() =>
                    setCartOpen(false)
                  }
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              <>
                <div className="side-items">

                  {cart.map((item) => (

                    <div
                      className="side-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="side-item-info">

                        <div className="side-item-title">

                          <div>
                            <span>
                              {item.category}
                            </span>

                            <h4>
                              {item.name}
                            </h4>
                          </div>

                          <button
                            className="remove-button"
                            onClick={() =>
                              removeFromCart(
                                item.id
                              )
                            }
                          >
                            ×
                          </button>

                        </div>

                        <strong>
                          {formatPrice(
                            item.price
                          )}
                        </strong>

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                -1
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="side-summary">

                  <div className="summary-line">
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {formatPrice(
                        cartSubtotal
                      )}
                    </strong>
                  </div>

                  <div className="summary-line">
                    <span>
                      You save
                    </span>

                    <strong className="saving">
                      {formatPrice(
                        cartSavings
                      )}
                    </strong>
                  </div>

                  <div className="summary-line">
                    <span>
                      Delivery
                    </span>

                    <strong className="free">
                      {shippingCharge === 0
                        ? "FREE"
                        : formatPrice(
                            shippingCharge
                          )}
                    </strong>
                  </div>

                  <div className="total-line">
                    <span>
                      Total
                    </span>

                    <strong>
                      {formatPrice(
                        checkoutTotal
                      )}
                    </strong>
                  </div>

                  <button
                    className="primary-button"
                    onClick={
                      startCheckout
                    }
                  >
                    Proceed to Checkout →
                  </button>

                </div>
              </>

            )}

          </aside>
        </>
      )}

      {/* =================================================
          WISHLIST
      ================================================= */}

      {wishlistOpen && (
        <>
          <div
            className="side-panel-overlay"
            onClick={() =>
              setWishlistOpen(false)
            }
          />

          <aside className="side-panel">

            <div className="side-panel-header">

              <div>
                <span className="section-tag">
                  SAVED ITEMS
                </span>

                <h2>
                  My Wishlist
                </h2>
              </div>

              <button
                className="panel-close"
                onClick={() =>
                  setWishlistOpen(false)
                }
              >
                ×
              </button>

            </div>

            {wishlist.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  ♡
                </div>

                <h3>
                  Your wishlist is empty
                </h3>

                <p>
                  Save products you love
                  for later.
                </p>

                <button
                  className="primary-button"
                  onClick={() =>
                    setWishlistOpen(false)
                  }
                >
                  Explore Products
                </button>

              </div>

            ) : (

              <div className="wishlist-items">

                {wishlist.map(
                  (product) => (

                    <div
                      className="wishlist-item"
                      key={product.id}
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div>

                        <span>
                          {product.category}
                        </span>

                        <h4>
                          {product.name}
                        </h4>

                        <strong>
                          {formatPrice(
                            product.price
                          )}
                        </strong>

                        <div className="wishlist-actions">

                          <button
                            className="small-outline-button"
                            onClick={() => {
                              setWishlistOpen(
                                false
                              );

                              openProduct(
                                product
                              );
                            }}
                          >
                            View
                          </button>

                          <button
                            className="small-primary-button"
                            onClick={() =>
                              addToCart(
                                product
                              )
                            }
                          >
                            Add
                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </aside>
        </>
      )}

      {/* =================================================
          CHECKOUT
      ================================================= */}

      {checkoutOpen && (

        <div className="checkout-overlay">

          <div className="checkout-container">

            <div className="checkout-header">

              <div>
                <span className="section-tag">
                  SHOPEASE CHECKOUT
                </span>

                <h2>
                  Complete Your Order
                </h2>
              </div>

              <button
                className="checkout-close"
                onClick={() =>
                  setCheckoutOpen(false)
                }
              >
                ×
              </button>

            </div>

            <div className="checkout-progress">

              <div
                className={
                  checkoutStep >= 1
                    ? "progress-step active"
                    : "progress-step"
                }
              >
                <span>1</span>
                <strong>
                  Delivery
                </strong>
              </div>

              <div className="progress-line" />

              <div
                className={
                  checkoutStep >= 2
                    ? "progress-step active"
                    : "progress-step"
                }
              >
                <span>2</span>
                <strong>
                  Payment
                </strong>
              </div>

            </div>

            <div className="checkout-layout">

              {/* ==========================================
                  LEFT CHECKOUT FORM
              ========================================== */}

              <div className="checkout-main">

                {checkoutStep === 1 && (

                  <section className="checkout-card">

                    <div className="checkout-card-title">

                      <div>
                        <span>
                          DELIVERY INFORMATION
                        </span>

                        <h3>
                          Where should we deliver?
                        </h3>
                      </div>

                      <span className="checkout-number">
                        01
                      </span>

                    </div>

                    <div className="checkout-form">

                      <div className="form-group full">

                        <label>
                          Full Name
                        </label>

                        <input
                          type="text"
                          value={
                            customer.fullName
                          }
                          onChange={(event) =>
                            updateCustomer(
                              "fullName",
                              event.target.value
                            )
                          }
                          placeholder="Enter your full name"
                        />

                        {formErrors.fullName && (
                          <small className="form-error">
                            {formErrors.fullName}
                          </small>
                        )}

                      </div>

                      <div className="form-group">

                        <label>
                          Email Address
                        </label>

                        <input
                          type="email"
                          value={
                            customer.email
                          }
                          onChange={(event) =>
                            updateCustomer(
                              "email",
                              event.target.value
                            )
                          }
                          placeholder="you@example.com"
                        />

                        {formErrors.email && (
                          <small className="form-error">
                            {formErrors.email}
                          </small>
                        )}

                      </div>

                      <div className="form-group">

                        <label>
                          Mobile Number
                        </label>

                        <input
                          type="tel"
                          maxLength="10"
                          value={
                            customer.phone
                          }
                          onChange={(event) =>
                            updateCustomer(
                              "phone",
                              event.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                          placeholder="10-digit mobile number"
                        />

                        {formErrors.phone && (
                          <small className="form-error">
                            {formErrors.phone}
                          </small>
                        )}

                      </div>

                      <div className="form-group full">

                        <label>
                          Complete Address
                        </label>

                        <textarea
                          rows="4"
                          value={
                            customer.address
                          }
                          onChange={(event) =>
                            updateCustomer(
                              "address",
                              event.target.value
                            )
                          }
                          placeholder="House/Flat No., Street, Area, Landmark"
                        />

                        {formErrors.address && (
                          <small className="form-error">
                            {formErrors.address}
                          </small>
                        )}

                      </div>

                      <div className="form-group">

                        <label>
                          City
                        </label>

                        <input
                          type="text"
                          value={
                            customer.city
                          }
                          onChange={(event) =>
                            updateCustomer(
                              "city",
                              event.target.value
                            )
                          }
                          placeholder="City"
                        />

                        {formErrors.city && (
                          <small className="form-error">
                            {formErrors.city}
                          </small>
                        )}

                      </div>

                      <div className="form-group">

                        <label>
                          State
                        </label>

                        <input
                          type="text"
                          value={
                            customer.state
                          }
                          onChange={(event) =>
                            updateCustomer(
                              "state",
                              event.target.value
                            )
                          }
                          placeholder="State"
                        />

                        {formErrors.state && (
                          <small className="form-error">
                            {formErrors.state}
                          </small>
                        )}

                      </div>

                      <div className="form-group">

                        <label>
                          PIN Code
                        </label>

                        <input
                          type="text"
                          maxLength="6"
                          value={
                            customer.pincode
                          }
                          onChange={(event) =>
                            updateCustomer(
                              "pincode",
                              event.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                          placeholder="6-digit PIN"
                        />

                        {formErrors.pincode && (
                          <small className="form-error">
                            {formErrors.pincode}
                          </small>
                        )}

                      </div>

                    </div>

                    <button
                      className="checkout-next-button"
                      onClick={
                        goToPayment
                      }
                    >
                      Continue to Payment →
                    </button>

                  </section>

                )}

                {checkoutStep === 2 && (

                  <section className="checkout-card">

                    <div className="checkout-card-title">

                      <div>
                        <span>
                          PAYMENT METHOD
                        </span>

                        <h3>
                          Choose how to pay
                        </h3>
                      </div>

                      <span className="checkout-number">
                        02
                      </span>

                    </div>

                    <div className="payment-options">

                      <button
                        className={
                          paymentMethod ===
                          "cod"
                            ? "payment-option active"
                            : "payment-option"
                        }
                        onClick={() =>
                          setPaymentMethod(
                            "cod"
                          )
                        }
                      >

                        <div className="payment-icon">
                          💵
                        </div>

                        <div>
                          <strong>
                            Cash on Delivery
                          </strong>

                          <small>
                            Pay when your order
                            arrives
                          </small>
                        </div>

                        <span className="radio-circle" />

                      </button>

                      <button
                        className={
                          paymentMethod ===
                          "upi"
                            ? "payment-option active"
                            : "payment-option"
                        }
                        onClick={() =>
                          setPaymentMethod(
                            "upi"
                          )
                        }
                      >

                        <div className="payment-icon">
                          📱
                        </div>

                        <div>
                          <strong>
                            UPI
                          </strong>

                          <small>
                            Google Pay, PhonePe,
                            Paytm and more
                          </small>
                        </div>

                        <span className="radio-circle" />

                      </button>

                      <button
                        className={
                          paymentMethod ===
                          "card"
                            ? "payment-option active"
                            : "payment-option"
                        }
                        onClick={() =>
                          setPaymentMethod(
                            "card"
                          )
                        }
                      >

                        <div className="payment-icon">
                          💳
                        </div>

                        <div>
                          <strong>
                            Credit / Debit Card
                          </strong>

                          <small>
                            Secure card payment
                          </small>
                        </div>

                        <span className="radio-circle" />

                      </button>

                    </div>

                    <div className="demo-payment-notice">

                      <strong>
                        Demo Payment Mode
                      </strong>

                      <p>
                        Online payment methods are
                        currently simulated for this
                        project. No real payment will
                        be processed.
                      </p>

                    </div>

                    <div className="checkout-buttons">

                      <button
                        className="back-button"
                        onClick={() =>
                          setCheckoutStep(1)
                        }
                      >
                        ← Back
                      </button>

                      <button
                        className="checkout-next-button"
                        onClick={
                          placeOrder
                        }
                      >
                        Place Order •{" "}
                        {formatPrice(
                          checkoutTotal
                        )}
                      </button>

                    </div>

                  </section>

                )}

              </div>

              {/* ==========================================
                  ORDER SUMMARY
              ========================================== */}

              <aside className="checkout-summary">

                <div className="checkout-summary-header">

                  <span>
                    ORDER SUMMARY
                  </span>

                  <strong>
                    {cartCount} items
                  </strong>

                </div>

                <div className="checkout-products">

                  {cart.map((item) => (

                    <div
                      className="checkout-product"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>

                        <h4>
                          {item.name}
                        </h4>

                        <p>
                          Qty:{" "}
                          {item.quantity}
                        </p>

                      </div>

                      <strong>
                        {formatPrice(
                          item.price *
                            item.quantity
                        )}
                      </strong>

                    </div>

                  ))}

                </div>

                <div className="checkout-summary-lines">

                  <div>
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {formatPrice(
                        cartSubtotal
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Savings
                    </span>

                    <strong className="saving">
                      −
                      {formatPrice(
                        cartSavings
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Delivery
                    </span>

                    <strong>
                      {shippingCharge === 0
                        ? "FREE"
                        : formatPrice(
                            shippingCharge
                          )}
                    </strong>
                  </div>

                </div>

                <div className="checkout-grand-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    {formatPrice(
                      checkoutTotal
                    )}
                  </strong>

                </div>

                <div className="secure-checkout">

                  <span>
                    🔒
                  </span>

                  <div>
                    <strong>
                      Secure Checkout
                    </strong>

                    <small>
                      Your information is
                      protected.
                    </small>
                  </div>

                </div>

              </aside>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          ORDER CONFIRMATION
      ================================================= */}

      {orderConfirmation && (

        <div className="confirmation-overlay">

          <div className="confirmation-card">

            <div className="success-icon">
              ✓
            </div>

            <span className="section-tag">
              ORDER CONFIRMED
            </span>

            <h2>
              Thank you for your order!
            </h2>

            <p>
              Your order has been successfully
              placed. We will send order updates
              to your email address.
            </p>

            <div className="order-id-box">

              <span>
                ORDER ID
              </span>

              <strong>
                {orderConfirmation.id}
              </strong>

            </div>

            <div className="confirmation-details">

              <div>
                <span>
                  Order Date
                </span>

                <strong>
                  {formatOrderDate(
                    orderConfirmation.createdAt
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Payment
                </span>

                <strong>
                  {orderConfirmation.paymentMethod ===
                  "cod"
                    ? "Cash on Delivery"
                    : orderConfirmation.paymentMethod ===
                      "upi"
                    ? "UPI"
                    : "Card"}
                </strong>
              </div>

              <div>
                <span>
                  Total
                </span>

                <strong>
                  {formatPrice(
                    orderConfirmation.total
                  )}
                </strong>
              </div>

            </div>

            <div className="delivery-message">

              <strong>
                📦 Delivery Address
              </strong>

              <p>
                {orderConfirmation.customer.fullName}
                <br />

                {orderConfirmation.customer.address}
                <br />

                {orderConfirmation.customer.city},{" "}
                {orderConfirmation.customer.state}{" "}
                -{" "}
                {orderConfirmation.customer.pincode}
              </p>

            </div>

            <button
              className="primary-button"
              onClick={() => {
                setOrderConfirmation(null);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Continue Shopping
            </button>

          </div>

        </div>

      )}

      {/* =================================================
          PRODUCT DETAILS MODAL
      ================================================= */}

      {selectedProduct && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>

            <div className="modal-left">

              <div className="modal-image-container">

                <img
                  src={
                    selectedProduct.image
                  }
                  alt={
                    selectedProduct.name
                  }
                />

                <span className="modal-badge">
                  {selectedProduct.badge}
                </span>

              </div>

              <div className="related-section">

                <h3>
                  You may also like
                </h3>

                <div className="related-grid">

                  {relatedProducts.map(
                    (product) => (

                      <button
                        key={product.id}
                        className="related-card"
                        onClick={() =>
                          openProduct(
                            product
                          )
                        }
                      >

                        <img
                          src={
                            product.image
                          }
                          alt={
                            product.name
                          }
                        />

                        <span>
                          {product.name}
                        </span>

                        <strong>
                          {formatPrice(
                            product.price
                          )}
                        </strong>

                      </button>

                    )
                  )}

                </div>

              </div>

            </div>

            <div className="modal-content">

              <span className="product-category">
                {selectedProduct.category}
              </span>

              <p className="product-brand">
                {selectedProduct.brand}
              </p>

              <h2>
                {selectedProduct.name}
              </h2>

              <div className="rating-row">

                <span>
                  ★
                </span>

                <strong>
                  {selectedProduct.rating}
                </strong>

                <small>
                  ({selectedProduct.reviews} reviews)
                </small>

              </div>

              <div className="modal-price">

                <strong>
                  {formatPrice(
                    selectedProduct.price
                  )}
                </strong>

                <del>
                  {formatPrice(
                    selectedProduct.originalPrice
                  )}
                </del>

                <span>
                  {getDiscount(
                    selectedProduct.price,
                    selectedProduct.originalPrice
                  )}
                  % OFF
                </span>

              </div>

              <p className="description">
                {selectedProduct.description}
              </p>

              <div className="stock-box">

                <span className="stock-success-dot" />

                <strong>
                  In Stock
                </strong>

                {" "}— Ready to ship

              </div>

              <div className="quantity-section">

                <span>
                  Quantity
                </span>

                <div className="modal-quantity">

                  <button
                    onClick={() =>
                      setSelectedQuantity(
                        Math.max(
                          1,
                          selectedQuantity - 1
                        )
                      )
                    }
                  >
                    −
                  </button>

                  <strong>
                    {selectedQuantity}
                  </strong>

                  <button
                    onClick={() =>
                      setSelectedQuantity(
                        Math.min(
                          selectedProduct.stock,
                          selectedQuantity + 1
                        )
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="modal-actions">

                <button
                  className="wishlist-button-large"
                  onClick={() =>
                    toggleWishlist(
                      selectedProduct
                    )
                  }
                >
                  {isWishlisted(
                    selectedProduct.id
                  )
                    ? "♥ Saved"
                    : "♡ Wishlist"}
                </button>

                <button
                  className="primary-button"
                  onClick={() => {
                    addToCart(
                      selectedProduct,
                      selectedQuantity
                    );

                    setSelectedProduct(
                      null
                    );
                  }}
                >
                  Add to Cart →
                </button>

              </div>

              <div className="specifications">

                <h3>
                  Product Specifications
                </h3>

                {Object.entries(
                  selectedProduct.specifications
                ).map(
                  ([key, value]) => (

                    <div
                      className="spec-row"
                      key={key}
                    >

                      <span>
                        {key}
                      </span>

                      <strong>
                        {value}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <span className="hero-tag">
            THE NEW WAY TO SHOP
          </span>

          <h1>
            Shopping made
            <br />
            <span>simple.</span>{" "}
            Life made better.
          </h1>

          <p>
            Discover thoughtfully selected
            products, exceptional value,
            and everything you love —
            all in one place.
          </p>

          <a
            href="#products"
            className="hero-button"
          >
            Explore Collection →
          </a>

          <div className="hero-stats">

            <div>
              <strong>
                {products.length}+
              </strong>

              <span>
                Products
              </span>
            </div>

            <div>
              <strong>
                {categories.length - 1}
              </strong>

              <span>
                Categories
              </span>
            </div>

            <div>
              <strong>
                4.7★
              </strong>

              <span>
                Top Rated
              </span>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
            alt="Modern shopping store"
          />

          <div className="floating-card">

            <span>
              ✦ Curated for you
            </span>

            <strong>
              Find your next favorite.
            </strong>

          </div>

        </div>

      </section>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <main
        className="products-section"
        id="products"
      >

        <div className="section-heading">

          <div>

            <span className="section-tag">
              THE SHOPEASE EDIT
            </span>

            <h2>
              Explore Our Collection
            </h2>

            <p>
              Quality finds for every
              part of your everyday life.
            </p>

          </div>

          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(
                event.target.value
              )
            }
          >

            <option value="featured">
              Featured
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>

            <option value="discount">
              Biggest Discount
            </option>

          </select>

        </div>

        <div className="category-filter">

          {categories.map(
            (item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>

            )
          )}

        </div>

        <div className="results-row">

          <p>
            {filteredProducts.length}{" "}
            products found
          </p>

          {(search ||
            category !== "All") && (

            <button
              className="clear-search"
              onClick={clearFilters}
            >
              Clear filters ×
            </button>

          )}

        </div>

        <div className="products-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map(
              (product) => (

                <article
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    <span className="product-badge">
                      {product.badge}
                    </span>

                    <button
                      className={
                        isWishlisted(
                          product.id
                        )
                          ? "wishlist-icon active"
                          : "wishlist-icon"
                      }
                      onClick={() =>
                        toggleWishlist(
                          product
                        )
                      }
                    >
                      {isWishlisted(
                        product.id
                      )
                        ? "♥"
                        : "♡"}
                    </button>

                    <button
                      className="quick-view"
                      onClick={() =>
                        openProduct(
                          product
                        )
                      }
                    >
                      Quick View
                    </button>

                  </div>

                  <div className="product-info">

                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p className="product-brand">
                      {product.brand}
                    </p>

                    <p className="product-rating">

                      <span>
                        ★
                      </span>{" "}

                      {product.rating}

                      <small>
                        ({product.reviews})
                      </small>

                    </p>

                    <div className="price-container">

                      <strong>
                        {formatPrice(
                          product.price
                        )}
                      </strong>

                      <del>
                        {formatPrice(
                          product.originalPrice
                        )}
                      </del>

                      <span className="discount">
                        {getDiscount(
                          product.price,
                          product.originalPrice
                        )}
                        %
                      </span>

                    </div>

                    <div className="stock-mini">
                      {product.stock <= 5
                        ? `Only ${product.stock} left`
                        : "In Stock"}
                    </div>

                    <div className="product-actions">

                      <button
                        className="details-button"
                        onClick={() =>
                          openProduct(
                            product
                          )
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="add-button"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        + Add
                      </button>

                    </div>

                  </div>

                </article>

              )
            )

          ) : (

            <div className="no-products">

              <div className="no-products-icon">
                🔎
              </div>

              <h3>
                No products found
              </h3>

              <p>
                Try another search or
                category.
              </p>

              <button
                className="add-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </main>

      {/* =================================================
          ABOUT
      ================================================= */}

      <section
        className="about-section"
        id="about"
      >

        <span className="section-tag">
          OUR STORY
        </span>

        <h2>
          A better way to discover
          what you love.
        </h2>

        <p>
          ShopEase is a modern e-commerce
          web application designed to make
          online shopping simple, convenient
          and enjoyable. Customers can browse
          products, compare prices, save
          favourites, manage their cart and
          complete a complete demo checkout
          experience.
        </p>

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div>

          <a
            href="#home"
            className="logo"
          >
            Shop<span>Ease.</span>
          </a>

          <p>
            Making everyday shopping easier.
          </p>

        </div>

        <div className="footer-links">

          <a href="#home">
            Home
          </a>

          <a href="#products">
            Products
          </a>

          <a href="#about">
            About
          </a>

        </div>

        <p>
          © 2026 ShopEase. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;