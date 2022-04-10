export default function products(req, res) {
  res.status(200).json({
    status: "success",
    code: 200,
    isSuccess: true,
    data: [
      {
        id: 1,
        name: "Coffee Bean Caffeine Eye Cream",
        images: ["/product-1.jpg"],
        rating: 4,
        price: 16.0,
      },
      {
        id: 2,
        name: "Coffee Bean Caffeine Eye Cream",
        images: ["/product-2.jpg"],
        rating: 4,
        price: 16.0,
      },
      {
        id: 3,
        name: "Coffee Bean Caffeine Eye Cream",
        images: ["/product-3.jpg"],
        rating: 4,
        price: 16.0,
      },
      {
        id: 4,
        name: "Coffee Bean Caffeine Eye Cream",
        images: ["/product-4.jpg"],
        rating: 4,
        price: 16.0,
      },
      {
        id: 5,
        name: "Coffee Bean Caffeine Eye Cream",
        images: ["/product-5.jpg"],
        rating: 4,
        price: 16.0,
      },
    ],
  });
}
