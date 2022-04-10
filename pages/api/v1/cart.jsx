export default function cart(req, res) {
  let cartProducts = [
    {
      id: 1,
      name: "Coffee Bean Caffeine Eye Cream",
      images: ["/product-1.jpg"],
      rating: 4,
      price: 16.0,
      quantity: 1,
    },
    // {
    //     id: 2,
    //     name: 'Coffee Bean Caffeine Eye Cream',
    //     images: [
    //         '/product-2.jpg'
    //     ],
    //     rating: 4,
    //     price: 16.00,
    //     quantity: 2,
    // },
  ];

  if (req.method === "POST") {
    let { product } = req.body;
    cartProducts.find(
      (cartItem) => cartItem.id === product.id && cartItem.quantity++
    );
    console.log(cartProducts);
    res.status(200).json({
      status: "success",
      code: 200,
      isSuccess: true,
      data: cartProducts,
    });
  }

  if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      code: 200,
      isSuccess: true,
      data: cartProducts,
    });
  }
}
