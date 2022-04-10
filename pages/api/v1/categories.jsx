// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function categories(req, res) {
  res.status(200).json({
    status: "success",
    code: 200,
    isSuccess: true,
    data: [
      {
        id: 1,
        name: "Featured",
        subCategories: [
          {
            img: "/mega-menu-img-1.jpg",
            name: "New",
          },
          {
            img: "/best-seller.jpg",
            name: "Best Seller",
          },
          {
            img: "/award-winner.jpg",
            name: "Award Winner",
          },
          {
            img: "/wellness.jpg",
            name: "Wellness",
          },
          {
            img: "/subscribe.jpg",
            name: "Subscribe & Save",
          },
          {
            img: "/home.jpg",
            name: "home",
          },
        ],
      },
      {
        id: 2,
        name: "FRUIT PIGMENTED MAKEUP",
        subCategories: [],
      },
      {
        id: 3,
        name: "SKIN CARE",
        subCategories: [],
      },
      {
        id: 4,
        name: "HAIR & BODY",
        subCategories: [],
      },
      {
        id: 5,
        name: "GIFTS",
        subCategories: [],
      },
      {
        id: 6,
        name: "EXPLORE",
        subCategories: [],
      },
    ],
  });
}
