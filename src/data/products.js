const raga = {
  id: 1,
  name: "Raga",
  price: 699000,
  image: "https://static.wixstatic.com/media/c67d9c_215cccafe30c4bf9887ccb3741c3c547~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ChatGPT%20Image%20Mar%2023%2C%202026%2C%2003_19_17%20AM.png",
  badge: "new"
}

const lawi = {
  id: 2,
  name: "Lawi",
  price: 799000,
  image: "https://static.wixstatic.com/media/c67d9c_7ab57782729f49d1a7a9f1fcc5246e1c~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/45926841-69db-4535-bcf4-0c81add9c19a.png",
  badge: "limited"
}

const puti = {
  id: 3,
  name: "Puti",
  price: 899000,
  image: "https://static.wixstatic.com/media/c67d9c_474111e7a1ac48f99584eefb91caccfc~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/25687281-2168-45e4-aa8e-5f49c9239eb6.png",
  badge: "bestseller"
}

const lira = {
  id: 4,
  name: "Lira",
  price: 599000,
  image: "https://static.wixstatic.com/media/c67d9c_2f37cc40c205495e82bb993e16b7b967~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b423d8b3-43b2-4544-9949-12ef88c13844.png",
  badge: null
}

const sammy = {
  id: 5,
  name: "Sammy",
  price: 749000,
  image: "https://static.wixstatic.com/media/c67d9c_112a47b5e4254cf0981c768608aad970~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b5e13107-7c49-4cc7-b45a-78f9240384b0.png",
  badge: "new"
}

const nira = {
  id: 6,
  name: "Nira",
  price: 849000,
  image: "https://static.wixstatic.com/media/c67d9c_d587368a9a664e2996756a6de9a22c45~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d0f2c23a-3906-4172-a0f0-a1c404966a7b.png",
  badge: "null"
}

export const newArrivals = [raga, lawi, puti, lira, sammy, nira]

export const recommendations = [
  { ...raga, id: 16, badge: "limited",  price:585000, originalPrice: 898000 },
  { ...lawi, id: 11, badge: "new", price:585000, originalPrice: 898000 },
  { ...lira, id: 13, badge: "new", price:585000, originalPrice: 898000 },
  { ...puti, id: 12, badge: "new", price:585000, originalPrice: 898000 },
  { ...sammy, id: 14, badge: "new", price:585000, originalPrice: 898000},
  { ...nira, id: 15, badge: "new",  price:585000, originalPrice: 898000 },
]