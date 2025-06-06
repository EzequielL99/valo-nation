export const getProductInfo = (data) => {
  const { uuid, displayIcon, displayName, shopData, weaponStats, skins } = data;

  return {
    id: uuid,
    img: displayIcon,
    name: displayName,
    category: shopData !== null ? shopData.category : "Knife",
    price: shopData !== null ? shopData.cost : 0,
    stats: weaponStats,
    skins:
      skins.length > 0
        ? skins.slice(0, skins.length < 4 ? skins.length : 4)
        : [],
  };
};

export const createFakeJWT = (username) => {
  localStorage.setItem("authToken", `fake-token-${username.toLowerCase()}`);
};
