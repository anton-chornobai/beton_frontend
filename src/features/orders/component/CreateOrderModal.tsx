import React, { useEffect, useState } from "react";
import styles from "./CreateOrderModal.module.scss";
import ProductPicker from "./ProductPicker";
import { getProducts } from "../../products/api/products";
import { Product } from "../../products/types/Product";
import { Order, OrderForm, OrderItem, PaymentStatus } from "../types/Order";
import { postOrder } from "../api/order";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
};

const CreateOrderModal: React.FC<Props> = ({ isOpen, onClose, orders, setOrders }) => {
  const [stage, setStage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [productPickerOpen, setProductPickerOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    order_name: "order1",
    customer_name: "",
    customer_number: null,
    description: "",
    payment_status: "unpaid",
    status: "pending",
    discount: 0,
    shipping_address: null,
    shipping_city: null,
    shipping_postal_code: null,
    items: [],
    total: 0,
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts("/v1/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        if (data.data) setProducts(data.data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const total = orderForm.items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  if (!isOpen) return null;

  const handleInputChange = (key: keyof OrderForm, value: any) => {
    setOrderForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddItem = (product: Product) => {
    setOrderForm((prev) => {
      const existing = prev.items.find((i) => i.product_id === product.id);

      const newItem: OrderItem = {
        id: crypto.randomUUID(),
        title: product.title,
        type: product.type || "default",
        color: product.color || "default",
        product_id: product.id,
        quantity: selectedQuantity,
        unit_price: product.price,
        size: product.size || { height: 0, width: 0 },
      };

      return {
        ...prev,
        items: existing
          ? prev.items.map((i) =>
              i.product_id === product.id
                ? { ...i, quantity: i.quantity + selectedQuantity }
                : i
            )
          : [...prev.items, newItem],
      };
    });

    setSelectedQuantity(1);
    setProductPickerOpen(false);
  };

  const handleRemoveItem = (productId: number) => {
    setOrderForm((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.product_id !== productId),
    }));
  };

  const handleItemQuantityChange = (productId: number, quantity: number) => {
    setOrderForm((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.product_id === productId ? { ...i, quantity } : i
      ),
    }));
  };

  const handleSubmit = async () => {
    const payload = { ...orderForm, total };

    try {
      console.log("Submitting order:", payload);

      const res = await postOrder("/v1/orders", payload);
      if (!res.ok) {
        throw new Error("Failed to post order");
      }

      const data = await res.json();

      if (!data.id) {
        throw new Error("Invalid response: missing order ID");
      }

      const serverOrderID = data.id

      setOrders(prev => [
        ...prev,
        {
          id: serverOrderID,
          user_id: payload.userId || "", // or get from auth context
          order_name: payload.order_name,
          customer_name: payload.customer_name,
          customer_number: payload.customer_number || undefined,
          total: payload.total,
          items: payload.items,
          status: payload.status,
          payment_status: payload.payment_status as PaymentStatus,
          discount: payload.discount,
          shipping_address: payload.shipping_address || undefined,
          shipping_city: payload.shipping_city || undefined,
          shipping_postal_code: payload.shipping_postal_code || undefined,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]);
      
      onClose()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Створити замовлення</h2>

        <div className={styles.progress}>
          <span className={stage >= 1 ? styles.active : ""}>
            Інформація про замовлення
          </span>
          <span className={stage >= 2 ? styles.active : ""}>Додати товари</span>
          <span className={stage >= 3 ? styles.active : ""}>Перевірка</span>
        </div>

        {stage === 1 && (
          <div className={styles.stage}>
            <input
              placeholder="Ім’я замовника"
              value={orderForm.customer_name}
              onChange={(e) =>
                handleInputChange("customer_name", e.target.value)
              }
            />
            <input
              placeholder="Номер замовника"
              type="number"
              value={orderForm.customer_number || ""}
              onChange={(e) =>
                handleInputChange("customer_number", e.target.value)
              }
            />
            <textarea
              placeholder="Опис замовлення (макс. 500 символів)"
              value={orderForm.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            <select
              value={orderForm.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <option value="очікується">В обробці</option>
              <option value="підтверджено">Підтверджено</option>
              <option value="відправлено">Відправлено по почті</option>
              <option value="доставлено">Доставлено</option>
              <option value="скасовано">Скасовано</option>
            </select>
            <input
              placeholder="Адреса доставки"
              value={orderForm.shipping_address || ""}
              onChange={(e) =>
                handleInputChange("shipping_address", e.target.value)
              }
            />
            <input
              placeholder="Місто"
              value={orderForm.shipping_city || ""}
              onChange={(e) =>
                handleInputChange("shipping_city", e.target.value)
              }
            />
            <input
              placeholder="Поштовий індекс"
              value={orderForm.shipping_postal_code || ""}
              onChange={(e) =>
                handleInputChange("shipping_postal_code", e.target.value)
              }
            />
            <button
              onClick={() => setStage(2)}
              disabled={!orderForm.customer_name}
            >
              Далі: Додати товари
            </button>
          </div>
        )}

        {stage === 2 && (
          <div className={styles.stage}>
            <div className={styles.add_item}>
              <button onClick={() => setProductPickerOpen(true)}>
                Оберіть Продукт
              </button>
            </div>

            <div className={styles.items_list}>
              {orderForm.items.length === 0 ? (
                <p>Товари відсутні</p>
              ) : (
                orderForm.items.map((item) => (
                  <div key={item.product_id} className={styles.item_row}>
                    <span>{item.title}</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemQuantityChange(
                          item.product_id,
                          Number(e.target.value)
                        )
                      }
                    />
                    <span>{item.unit_price * item.quantity} грн</span>
                    <button onClick={() => handleRemoveItem(item.product_id)}>
                      🗑
                    </button>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => setStage(1)}>Назад</button>
            <button
              onClick={() => setStage(3)}
              disabled={orderForm.items.length === 0}
            >
              Далі: Перевірка
            </button>
          </div>
        )}

        {stage === 3 && (
          <div className={styles.stage}>
            <h3>Підсумок замовлення</h3>
            <p>
              <strong>Ім’я замовника:</strong> {orderForm.customer_name}
            </p>
            <p>
              <strong>Опис:</strong> {orderForm.description}
            </p>
            <p>
              <strong>Статус:</strong> {orderForm.status}
            </p>
            <p>
              <strong>Доставка:</strong> {orderForm.shipping_address},{" "}
              {orderForm.shipping_city}, {orderForm.shipping_postal_code}
            </p>

            <h4>Товари:</h4>
            <ul>
              {orderForm.items.map((item) => (
                <li key={item.product_id}>
                  {item.title} x {item.quantity} ={" "}
                  {item.unit_price * item.quantity} грн
                </li>
              ))}
            </ul>

            <p>
              <strong>Всього:</strong> {total} грн
            </p>

            <button onClick={() => setStage(2)}>Назад</button>
            <button
              onClick={handleSubmit}
              disabled={orderForm.items.length === 0}
            >
              Підтвердити замовлення
            </button>
          </div>
        )}

        <button className={styles.close_button} onClick={onClose}>
          Закрити
        </button>

        {productPickerOpen && (
          <ProductPicker
            products={products}
            onClose={() => setProductPickerOpen(false)}
            onSelect={handleAddItem}
          />
        )}
      </div>
    </div>
  );
};

export default CreateOrderModal;
