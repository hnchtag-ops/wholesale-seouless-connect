import { useState } from "react";
import { ShoppingBag, CheckCircle2, CreditCard, Sparkles, Truck } from "lucide-react";
import { Order, ProductCatalogItem, UserProfile } from "@/types";

interface OrdersProps {
  orders: Order[];
  products: ProductCatalogItem[];
  currentUser: UserProfile;
  onCreateOrder: (newOrder: Order) => void;
  selectedProductForOrder: ProductCatalogItem | null;
  onCloseOrderModal: () => void;
}

export function Orders({
  orders,
  products,
  currentUser,
  onCreateOrder,
  selectedProductForOrder,
  onCloseOrderModal,
}: OrdersProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    selectedProductForOrder?.variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(selectedProductForOrder?.moq || 12);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const activeProduct = selectedProductForOrder || products[0];
  const activeVariant = activeProduct?.variants.find((v) => v.id === selectedVariantId) || activeProduct?.variants[0];
  const unitPrice = activeProduct?.wholesalePriceUSD || 100;
  const totalPrice = unitPrice * quantity;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProduct) return;
    const newOrder: Order = {
      id: `ord_${Math.floor(Math.random() * 90000 + 10000)}`,
      buyerId: currentUser.id,
      brandId: activeProduct.brandId,
      status: "submitted",
      totalAmountUSD: totalPrice,
      items: [
        {
          productId: activeProduct.id,
          variantId: activeVariant?.id || "v_default",
          quantity: Number(quantity),
          unitPriceUSD: unitPrice,
        },
      ],
      createdAt: new Date().toISOString(),
    };
    onCreateOrder(newOrder);
    setIsSuccessModal(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <div className="bg-card/70 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-bold mb-2">
            <CreditCard className="w-4 h-4" />
            <span>Secure B2B Escrow & Wholesale Orders</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Wholesale Order Ledger</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Track net-30 terms, milestone payments, and automated shipping manifests.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const prod = products.find((p) => p.id === order.items[0]?.productId);
          return (
            <div
              key={order.id}
              className="rounded-3xl bg-card/70 backdrop-blur-xl border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/40 transition-all shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary border border-border overflow-hidden flex-shrink-0">
                  {prod?.images[0] ? (
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-8 h-8 m-4 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-extrabold text-foreground">Order #{order.id}</h3>
                    <span
                      className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase ${
                        order.status === "paid"
                          ? "bg-success/10 text-success border border-success/30"
                          : order.status === "approved"
                            ? "bg-accent/10 text-accent border border-accent/30"
                            : "bg-primary/10 text-primary border border-primary/30"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-foreground font-medium">{prod ? prod.name : "Wholesale Lot"}</p>
                  <p className="text-xs text-muted-foreground">
                    Quantity: {order.items.reduce((acc, i) => acc + i.quantity, 0)} units • Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-border">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Total Amount</span>
                  <p className="text-xl font-extrabold text-foreground">${order.totalAmountUSD.toLocaleString()}</p>
                </div>
                <button className="px-5 py-3 rounded-2xl bg-secondary hover:bg-muted border border-border text-xs font-bold text-foreground transition-all flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent" />
                  <span>Manifest</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Creation Modal (triggered from catalog) */}
      {selectedProductForOrder && !isSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-8 shadow-2xl relative">
            <h2 className="text-xl font-extrabold text-foreground mb-2">Create Wholesale Order</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Review MOQ requirements and tier discounts for {selectedProductForOrder.name}
            </p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary border border-border">
                <img
                  src={selectedProductForOrder.images[0]}
                  alt={selectedProductForOrder.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">{selectedProductForOrder.name}</h4>
                  <p className="text-xs text-primary font-semibold">
                    ${selectedProductForOrder.wholesalePriceUSD.toFixed(2)} per unit
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Minimum Order Quantity (MOQ): {selectedProductForOrder.moq}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase">Select Variant</label>
                  <select
                    value={selectedVariantId}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    className="w-full mt-1 bg-secondary border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    {selectedProductForOrder.variants.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.color} - {v.size} ({v.inventoryCount} in stock)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase">Quantity (Units)</label>
                  <input
                    type="number"
                    min={selectedProductForOrder.moq}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full mt-1 bg-secondary border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background border border-border space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Unit Wholesale Price:</span>
                  <span className="text-foreground font-bold">${unitPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Total Units:</span>
                  <span className="text-foreground font-bold">{quantity}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-border">
                  <span className="font-extrabold text-foreground">Grand Total (USD):</span>
                  <span className="font-extrabold text-primary">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCloseOrderModal}
                  className="px-5 py-3 rounded-xl bg-secondary text-xs font-bold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-deep text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30"
                >
                  Submit Wholesale Order (Net-30)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-success/20 border border-success/40 text-success flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-foreground">Order Submitted Successfully!</h3>
              <p className="text-xs text-muted-foreground">
                Your wholesale order has been routed to the brand admin and AI escrow verification engine.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSuccessModal(false);
                onCloseOrderModal();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-deep text-primary-foreground font-bold text-xs shadow-lg shadow-primary/30"
            >
              Return to Ledger
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
